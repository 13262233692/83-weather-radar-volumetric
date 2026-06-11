self.onmessage = async function(e) {
  const { type, payload } = e.data;

  if (type === 'processPolar') {
    try {
      const result = await processPolarToCartesian(payload);
      self.postMessage({ type: 'processComplete', payload: result }, [result.data.buffer]);
    } catch (err) {
      self.postMessage({ type: 'processError', error: err.message });
    }
  } else if (type === 'processNetCDF') {
    try {
      const parsed = await parseNetCDF(payload.buffer);
      self.postMessage({ type: 'parseComplete', payload: parsed });
    } catch (err) {
      self.postMessage({ type: 'parseError', error: err.message });
    }
  } else if (type === 'processNetCDFAndConvert') {
    try {
      const parsed = await parseNetCDF(payload.buffer);
      self.postMessage({ type: 'parseProgress', payload: { percent: 30, message: '解析 NetCDF 完成，开始坐标转换...' } });
      const result = await processPolarToCartesian(parsed);
      self.postMessage({ type: 'processComplete', payload: result }, [result.data.buffer]);
    } catch (err) {
      self.postMessage({ type: 'processError', error: err.message });
    }
  }
};

async function parseNetCDF(buffer) {
  const view = new DataView(buffer);
  let offset = 0;

  function readString(len) {
    let s = '';
    for (let i = 0; i < len; i++) {
      s += String.fromCharCode(view.getUint8(offset++));
    }
    return s;
  }

  function readInt() {
    const v = view.getInt32(offset);
    offset += 4;
    return v;
  }

  function readFloat() {
    const v = view.getFloat32(offset);
    offset += 4;
    return v;
  }

  function readDouble() {
    const v = view.getFloat64(offset);
    offset += 8;
    return v;
  }

  const magic = readString(3);
  const version = view.getUint8(offset++);

  if (magic !== 'CDF') {
    throw new Error('无效的 NetCDF 文件格式');
  }

  function readType() { return readInt(); }
  function readDims() {
    const tag = readInt();
    if (tag === 0) return 0;
    const count = readInt();
    const dims = {};
    for (let i = 0; i < count; i++) {
      const nameLen = readInt();
      const name = readString(nameLen);
      const size = readInt();
      dims[name] = size;
    }
    return dims;
  }

  function readGlobalAttrs() {
    const tag = readInt();
    if (tag === 0) return {};
    const count = readInt();
    const attrs = {};
    for (let i = 0; i < count; i++) {
      const nameLen = readInt();
      const name = readString(nameLen);
      const type = readInt();
      const nelems = readInt();
      readValues(type, nelems);
      attrs[name] = true;
    }
    return attrs;
  }

  function readValues(type, nelems) {
    const results = [];
    for (let i = 0; i < nelems; i++) {
      switch (type) {
        case 1: results.push(view.getUint8(offset++)); break;
        case 2: results.push(view.getInt8(offset++)); break;
        case 3: results.push(view.getInt16(offset)); offset += 2; break;
        case 4: results.push(readInt()); break;
        case 5: results.push(readFloat()); break;
        case 6: results.push(readDouble()); break;
        default: offset++; break;
      }
    }
    return results;
  }

  function readVars(dims) {
    const tag = readInt();
    if (tag === 0) return { vars: {}, data: {} };
    const count = readInt();
    const vars = {};
    const varHeaders = [];

    for (let i = 0; i < count; i++) {
      const nameLen = readInt();
      const name = readString(nameLen);
      const ndims = readInt();
      const dimIds = [];
      for (let j = 0; j < ndims; j++) dimIds.push(readInt());
      const natts = readInt();
      for (let a = 0; a < natts; a++) {
        const attrNameLen = readInt();
        readString(attrNameLen);
        const type = readInt();
        const nelems = readInt();
        readValues(type, nelems);
      }
      const dataType = readInt();
      const dataSize = readInt();
      const begin = offset;

      const dimNames = Object.keys(dims);
      varHeaders.push({
        name,
        dimIds,
        dimNames: dimIds.map(id => dimNames[id]),
        dataType,
        dataSize,
        begin
      });
      offset = begin + dataSize;
    }

    return { vars, varHeaders };
  }

  const numRecs = readInt();
  const dims = readDims();
  readGlobalAttrs();
  const { varHeaders } = readVars(dims);

  const radarData = {
    reflectivity: null,
    elevations: [],
    numElevations: 0,
    numAzimuths: 0,
    numRanges: 0,
    rangeStep: 0.5,
    maxRangeKm: 200,
    minValue: -32,
    maxValue: 80
  };

  let elevVar = null, azimVar = null, rangeVar = null, reflVar = null;
  for (const v of varHeaders) {
    const n = v.name.toLowerCase();
    if (n.includes('elev') || n === 'elevation') elevVar = v;
    if (n.includes('azim') || n === 'azimuth') azimVar = v;
    if (n.includes('range') || n === 'gate') rangeVar = v;
    if (n.includes('reflect') || n === 'cz' || n === 'dbz' || n === 'z') reflVar = v;
  }

  if (elevVar) {
    const saved = offset;
    offset = elevVar.begin;
    const arr = readValues(elevVar.dataType, elevVar.dimIds.reduce((s, id) => s * (Object.values(dims)[id] || 1), 1));
    radarData.elevations = arr.map(v => typeof v === 'number' ? v * Math.PI / 180 : 0);
    radarData.numElevations = radarData.elevations.length;
    offset = saved;
  }

  if (rangeVar) {
    const saved = offset;
    offset = rangeVar.begin;
    const dimSize = rangeVar.dimIds.reduce((s, id) => s * (Object.values(dims)[id] || 1), 1);
    const arr = readValues(rangeVar.dataType, dimSize);
    if (arr.length >= 2) {
      radarData.rangeStep = arr[1] - arr[0];
      radarData.maxRangeKm = arr[arr.length - 1];
    }
    radarData.numRanges = arr.length;
    offset = saved;
  } else if (dims['range'] || dims['gate']) {
    radarData.numRanges = dims['range'] || dims['gate'] || 500;
  }

  if (azimVar) {
    const saved = offset;
    offset = azimVar.begin;
    const dimSize = azimVar.dimIds.reduce((s, id) => s * (Object.values(dims)[id] || 1), 1);
    radarData.numAzimuths = dimSize || 360;
    offset = saved;
  } else if (dims['azimuth'] || dims['azim']) {
    radarData.numAzimuths = dims['azimuth'] || dims['azim'] || 360;
  }

  if (!radarData.numElevations) radarData.numElevations = dims['elevation'] || dims['elev'] || 14;
  if (!radarData.numAzimuths) radarData.numAzimuths = dims['azimuth'] || dims['azim'] || 360;
  if (!radarData.numRanges) radarData.numRanges = dims['range'] || dims['gate'] || 500;

  if (reflVar) {
    const saved = offset;
    offset = reflVar.begin;
    const total = radarData.numElevations * radarData.numAzimuths * radarData.numRanges;
    const values = readValues(reflVar.dataType, total);
    radarData.reflectivity = new Float32Array(total);
    for (let i = 0; i < total; i++) {
      let v = values[i];
      if (typeof v !== 'number' || !isFinite(v) || v < -32) v = -32;
      if (v > 80) v = 80;
      radarData.reflectivity[i] = v;
    }
    offset = saved;
  }

  if (!radarData.reflectivity) {
    throw new Error('NetCDF 中未找到反射率数据字段，请确保文件包含 Reflectivity / DBZ / Z 变量');
  }

  return radarData;
}

async function processPolarToCartesian(opts) {
  return new Promise((resolve, reject) => {
    const {
      reflectivity,
      elevations,
      numElevations,
      numAzimuths,
      numRanges,
      rangeStep,
      maxRangeKm,
      minValue = -32,
      maxValue = 80,
      gridSize = 200,
      gridHeight = 100
    } = opts;

    const Nx = gridSize;
    const Ny = gridSize;
    const Nz = gridHeight;
    const total = Nx * Ny * Nz;

    self.postMessage({ type: 'processProgress', payload: { percent: 5, message: `初始化 ${Nx}×${Ny}×${Nz} 笛卡尔网格...` } });

    const output = new Uint8Array(total);
    const maxH = 20;

    const elevDeg = elevations.map(e => e * 180 / Math.PI);

    self.postMessage({ type: 'processProgress', payload: { percent: 15, message: '极坐标→笛卡尔三线性插值中...' } });

    const batchSize = Math.max(1, Math.floor(Nz / 20));
    let processed = 0;

    function processBatch(startZ, endZ) {
      for (let z = startZ; z < endZ; z++) {
        const h = (z / (Nz - 1)) * maxH;
        for (let y = 0; y < Ny; y++) {
          const py = (y / (Ny - 1)) * 2 - 1;
          for (let x = 0; x < Nx; x++) {
            const px = (x / (Nx - 1)) * 2 - 1;
            const outIdx = z * Nx * Ny + y * Nx + x;

            const X = px * maxRangeKm;
            const Y = py * maxRangeKm;
            const groundR = Math.sqrt(X * X + Y * Y);

            if (groundR > maxRangeKm || groundR < 0.5) {
              output[outIdx] = 0;
              continue;
            }

            const slantR = Math.sqrt(groundR * groundR + h * h);
            const elev = Math.atan2(h, groundR);
            const elevDegVal = elev * 180 / Math.PI;
            let azim = Math.atan2(Y, X);
            if (azim < 0) azim += 2 * Math.PI;

            let ei = 0;
            for (let e = 0; e < numElevations - 1; e++) {
              if (elevDegVal >= elevDeg[e] && elevDegVal <= elevDeg[e + 1]) {
                ei = e;
                break;
              }
              ei = e;
            }
            if (elevDegVal > elevDeg[numElevations - 1]) ei = numElevations - 2;
            if (elevDegVal < elevDeg[0]) ei = 0;

            const e0 = ei;
            const e1 = Math.min(ei + 1, numElevations - 1);
            const ed0 = elevDeg[e0];
            const ed1 = elevDeg[e1];
            let fe;
            if (ed1 === ed0) fe = 0;
            else fe = (elevDegVal - ed0) / (ed1 - ed0);
            fe = Math.max(0, Math.min(1, fe));

            const rIdx = slantR / rangeStep;
            const r0 = Math.floor(rIdx);
            const r1 = Math.min(r0 + 1, numRanges - 1);
            const fr = rIdx - r0;

            const aIdx = azim * numAzimuths / (2 * Math.PI);
            let a0 = Math.floor(aIdx);
            let a1 = a0 + 1;
            a0 = ((a0 % numAzimuths) + numAzimuths) % numAzimuths;
            a1 = ((a1 % numAzimuths) + numAzimuths) % numAzimuths;
            const fa = aIdx - Math.floor(aIdx);

            function sample(e, a, r) {
              if (r < 0 || r >= numRanges) return minValue;
              return reflectivity[e * numAzimuths * numRanges + a * numRanges + r];
            }

            const c000 = sample(e0, a0, r0);
            const c001 = sample(e0, a0, r1);
            const c010 = sample(e0, a1, r0);
            const c011 = sample(e0, a1, r1);
            const c100 = sample(e1, a0, r0);
            const c101 = sample(e1, a0, r1);
            const c110 = sample(e1, a1, r0);
            const c111 = sample(e1, a1, r1);

            const c00 = c000 * (1 - fr) + c001 * fr;
            const c01 = c010 * (1 - fr) + c011 * fr;
            const c10 = c100 * (1 - fr) + c101 * fr;
            const c11 = c110 * (1 - fr) + c111 * fr;
            const c0 = c00 * (1 - fa) + c01 * fa;
            const c1 = c10 * (1 - fa) + c11 * fa;
            const dbz = c0 * (1 - fe) + c1 * fe;

            const val = (dbz - minValue) / (maxValue - minValue);
            output[outIdx] = Math.max(0, Math.min(255, Math.round(val * 255)));
          }
        }
        processed++;
        const pct = 15 + Math.round((processed / Nz) * 80);
        self.postMessage({ type: 'processProgress', payload: { percent: pct, message: `插值进度 ${Math.round((processed / Nz) * 100)}% (Z层 ${z}/${Nz})` } });
      }
    }

    function runBatches() {
      try {
        let z = 0;
        function next() {
          if (z >= Nz) {
            self.postMessage({ type: 'processProgress', payload: { percent: 98, message: '生成三维纹理数据中...' } });
            setTimeout(() => {
              resolve({
                data: output,
                size: { x: Nx, y: Ny, z: Nz },
                range: { min: minValue, max: maxValue },
                stats: {
                  voxelCount: total,
                  nonZero: output.reduce((a, v) => v > 0 ? a + 1 : a, 0)
                }
              });
            }, 30);
            return;
          }
          const end = Math.min(z + batchSize, Nz);
          processBatch(z, end);
          z = end;
          setTimeout(next, 0);
        }
        next();
      } catch (err) {
        reject(err);
      }
    }

    setTimeout(runBatches, 0);
  });
}
