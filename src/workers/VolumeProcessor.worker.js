self.onmessage = async function(e) {
  const { type, payload } = e.data;

  if (type === 'processPolar') {
    try {
      const result = await processPolarToCartesian(payload);
      self.postMessage({ type: 'processComplete', payload: result }, [result.data.buffer]);
    } catch (err) {
      self.postMessage({ type: 'processError', error: err.message });
    }
  } else if (type === 'extractHailCore') {
    try {
      const mesh = await extractHailCoreMT(payload);
      const transferBuffers = [mesh.vertices.buffer, mesh.normals.buffer, mesh.colors.buffer];
      if (mesh.indices) transferBuffers.push(mesh.indices.buffer);
      self.postMessage({ type: 'hailCoreComplete', payload: mesh }, transferBuffers);
    } catch (err) {
      self.postMessage({ type: 'hailCoreError', error: err.message });
    }
  } else if (type === 'processAndExtract') {
    try {
      const result = await processPolarToCartesian(payload);
      self.postMessage({ type: 'processComplete', payload: result }, [result.data.buffer]);
      const mesh = await extractHailCoreMT({
        volumeData: result.data,
        size: result.size,
        range: result.range,
        threshold: payload.hailThreshold || 65,
        zdrThreshold: payload.zdrThreshold || 0.5
      });
      const transferBuffers = [mesh.vertices.buffer, mesh.normals.buffer, mesh.colors.buffer];
      if (mesh.indices) transferBuffers.push(mesh.indices.buffer);
      self.postMessage({ type: 'hailCoreComplete', payload: mesh }, transferBuffers);
    } catch (err) {
      self.postMessage({ type: 'hailCoreError', error: err.message });
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

const MT_CASE_TABLE = [
  [],
  [[0, 3, 2]],
  [[0, 1, 4]],
  [[2, 3, 4], [2, 4, 1]],
  [[1, 2, 5]],
  [[0, 3, 5], [0, 5, 1]],
  [[0, 2, 5], [0, 5, 4]],
  [[3, 4, 5]],
  [[3, 5, 4]],
  [[0, 4, 5], [0, 5, 2]],
  [[0, 1, 5], [0, 5, 3]],
  [[1, 5, 2]],
  [[2, 4, 3], [2, 1, 4]],
  [[0, 4, 1]],
  [[0, 2, 3]],
  []
];

const TETRA_INDICES_6 = [
  [0, 1, 2, 6],
  [0, 2, 3, 6],
  [0, 3, 7, 6],
  [0, 7, 4, 6],
  [0, 4, 5, 6],
  [0, 5, 1, 6]
];

const TETRA_EDGES = [
  [0, 1],
  [1, 2],
  [2, 0],
  [0, 3],
  [1, 3],
  [2, 3]
];

function interpolatePos(p0, p1, v0, v1, iso) {
  if (Math.abs(v1 - v0) < 1e-6) return [(p0[0] + p1[0]) * 0.5, (p0[1] + p1[1]) * 0.5, (p0[2] + p1[2]) * 0.5];
  const t = (iso - v0) / (v1 - v0);
  return [
    p0[0] + t * (p1[0] - p0[0]),
    p0[1] + t * (p1[1] - p0[1]),
    p0[2] + t * (p1[2] - p0[2])
  ];
}

async function extractHailCoreMT(opts) {
  return new Promise((resolve, reject) => {
    const {
      volumeData,
      size,
      range,
      threshold = 65,
      zdrThreshold = 0.5
    } = opts;

    const Nx = size.x;
    const Ny = size.y;
    const Nz = size.z;

    self.postMessage({ type: 'hailCoreProgress', payload: { percent: 5, message: `🧊 Marching Tetrahedra 冰雹核心提取 (${Nx}×${Ny}×${Nz})...` } });

    const isoNorm = (threshold - range.min) / (range.max - range.min);
    const isoVal = isoNorm * 255;

    const verticesArr = [];
    const normalsArr = [];
    const colorsArr = [];
    const indicesArr = [];
    let vertexCount = 0;

    const batchSize = Math.max(1, Math.floor(Nz / 15));
    let z = 0;

    function getVoxel(x, y, z) {
      if (x < 0 || y < 0 || z < 0 || x >= Nx || y >= Ny || z >= Nz) return 0;
      return volumeData[z * Nx * Ny + y * Nx + x];
    }

    function computeNormal(x, y, z) {
      const eps = 1;
      const dx = (getVoxel(x + eps, y, z) - getVoxel(x - eps, y, z)) / (2 * eps);
      const dy = (getVoxel(x, y + eps, z) - getVoxel(x, y - eps, z)) / (2 * eps);
      const dz = (getVoxel(x, y, z + eps) - getVoxel(x, y, z - eps)) / (2 * eps);
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (len < 1e-6) return [0, 0, 1];
      return [-dx / len, -dy / len, -dz / len];
    }

    function processZSlice(startZ, endZ) {
      for (let zi = startZ; zi < endZ; zi++) {
        for (let yi = 0; yi < Ny - 1; yi++) {
          for (let xi = 0; xi < Nx - 1; xi++) {
            const idx000 = zi * Nx * Ny + yi * Nx + xi;
            const idx100 = idx000 + 1;
            const idx010 = idx000 + Nx;
            const idx110 = idx000 + Nx + 1;
            const idx001 = idx000 + Nx * Ny;
            const idx101 = idx000 + Nx * Ny + 1;
            const idx011 = idx000 + Nx * Ny + Nx;
            const idx111 = idx000 + Nx * Ny + Nx + 1;

            const v0 = volumeData[idx000];
            const v1 = volumeData[idx100];
            const v2 = volumeData[idx110];
            const v3 = volumeData[idx010];
            const v4 = volumeData[idx001];
            const v5 = volumeData[idx101];
            const v6 = volumeData[idx111];
            const v7 = volumeData[idx011];

            let maxVal = v0;
            maxVal = Math.max(maxVal, v1, v2, v3, v4, v5, v6, v7);
            if (maxVal < isoVal) continue;

            let minVal = v0;
            minVal = Math.min(minVal, v1, v2, v3, v4, v5, v6, v7);
            if (minVal >= isoVal) continue;

            const cubeVerts = [
              [xi, yi, zi],
              [xi + 1, yi, zi],
              [xi + 1, yi + 1, zi],
              [xi, yi + 1, zi],
              [xi, yi, zi + 1],
              [xi + 1, yi, zi + 1],
              [xi + 1, yi + 1, zi + 1],
              [xi, yi + 1, zi + 1]
            ];
            const cubeVals = [v0, v1, v2, v3, v4, v5, v6, v7];

            for (let t = 0; t < 6; t++) {
              const tet = TETRA_INDICES_6[t];
              const tv0 = cubeVals[tet[0]];
              const tv1 = cubeVals[tet[1]];
              const tv2 = cubeVals[tet[2]];
              const tv3 = cubeVals[tet[3]];

              let mask = 0;
              if (tv0 >= isoVal) mask |= 1;
              if (tv1 >= isoVal) mask |= 2;
              if (tv2 >= isoVal) mask |= 4;
              if (tv3 >= isoVal) mask |= 8;

              if (mask === 0 || mask === 15) continue;

              const tetPos = [
                cubeVerts[tet[0]],
                cubeVerts[tet[1]],
                cubeVerts[tet[2]],
                cubeVerts[tet[3]]
              ];
              const tetVal = [tv0, tv1, tv2, tv3];

              const edgeVerts = [];
              for (let e = 0; e < 6; e++) {
                const ea = TETRA_EDGES[e][0];
                const eb = TETRA_EDGES[e][1];
                edgeVerts.push(interpolatePos(
                  tetPos[ea], tetPos[eb],
                  tetVal[ea], tetVal[eb],
                  isoVal
                ));
              }

              const triangles = MT_CASE_TABLE[mask];
              for (let tri = 0; tri < triangles.length; tri++) {
                const triEdges = triangles[tri];
                for (let vi = 0; vi < 3; vi++) {
                  const ev = edgeVerts[triEdges[vi]];
                  const px = (ev[0] / (Nx - 1)) * 2 - 1;
                  const py = (ev[1] / (Ny - 1)) * 2 - 1;
                  const pz = (ev[2] / (Nz - 1)) * 2 - 1;

                  const vx = (ev[0] + 0.5) | 0;
                  const vy = (ev[1] + 0.5) | 0;
                  const vz = (ev[2] + 0.5) | 0;
                  const n = computeNormal(vx, vy, vz);

                  let intensity = (tetVal[0] + tetVal[1] + tetVal[2] + tetVal[3]) / 4 / 255;
                  intensity = Math.min(1, Math.max(0, (intensity - isoNorm) / (1 - isoNorm) * 2));

                  verticesArr.push(px, py, pz);
                  normalsArr.push(n[0], n[1], n[2]);
                  colorsArr.push(1.0, 0.15 + intensity * 0.3, 0.1 + intensity * 0.1, 0.95);
                  indicesArr.push(vertexCount++);
                }
              }
            }
          }
        }
        const pct = 5 + Math.round(((zi - startZ + 1) / (endZ - startZ)) * 90 * (endZ - startZ) / Nz);
        self.postMessage({ type: 'hailCoreProgress', payload: { percent: pct, message: `🧊 提取进度 ${Math.round(((zi + 1) / Nz) * 100)}%` } });
      }
    }

    function processNextBatch() {
      try {
        if (z >= Nz - 1) {
          self.postMessage({ type: 'hailCoreProgress', payload: { percent: 97, message: '🧊 构建网格数据...' } });

          const vertices = new Float32Array(verticesArr);
          const normals = new Float32Array(normalsArr);
          const colors = new Float32Array(colorsArr);
          const indices = new Uint32Array(indicesArr);

          setTimeout(() => {
            resolve({
              vertices,
              normals,
              colors,
              indices,
              vertexCount: vertexCount,
              triangleCount: Math.floor(vertexCount / 3),
              threshold,
              boundingBox: { min: [0, 0, 0], max: [Nx, Ny, Nz] }
            });
          }, 20);
          return;
        }

        const end = Math.min(z + batchSize, Nz - 1);
        processZSlice(z, end);
        z = end;
        setTimeout(processNextBatch, 0);
      } catch (err) {
        reject(err);
      }
    }

    setTimeout(processNextBatch, 0);
  });
}
