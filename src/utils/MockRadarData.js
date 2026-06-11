export function generateMockPolarVolume(opts = {}) {
  const numEle = opts.numElevations ?? 14;
  const numAzim = opts.numAzimuths ?? 360;
  const numRange = opts.numRanges ?? 500;
  const maxRangeKm = opts.maxRange ?? 200;
  const noiseLevel = opts.noise ?? 0.05;

  const elevations = [];
  const baseAngles = [0.5, 1.5, 2.5, 3.5, 4.5, 6.0, 8.0, 10.0, 12.0, 15.0, 19.0, 25.0, 32.0, 40.0];
  for (let i = 0; i < Math.min(numEle, baseAngles.length); i++) {
    elevations.push(baseAngles[i] * Math.PI / 180);
  }
  while (elevations.length < numEle) {
    elevations.push(elevations[elevations.length - 1] + 0.1);
  }

  const reflectivity = new Float32Array(numEle * numAzim * numRange);

  const storms = [
    { azim: 45 * Math.PI / 180, range: 60, height: 8, intensity: 55, width: 12, coreHeight: 5 },
    { azim: 120 * Math.PI / 180, range: 100, height: 14, intensity: 65, width: 15, coreHeight: 8 },
    { azim: 210 * Math.PI / 180, range: 80, height: 10, intensity: 50, width: 10, coreHeight: 6 },
    { azim: 300 * Math.PI / 180, range: 130, height: 6, intensity: 42, width: 8, coreHeight: 3.5 },
    { azim: 180 * Math.PI / 180, range: 150, height: 5, intensity: 35, width: 14, coreHeight: 2.5 }
  ];

  const stratiform = {
    active: true,
    maxIntensity: 28,
    height: 4,
    bandCenterAzim: 90 * Math.PI / 180,
    bandWidthAzim: 120 * Math.PI / 180,
    innerRange: 30,
    outerRange: 180,
    brightBandHeight: 3.5
  };

  const rangeStep = maxRangeKm / numRange;
  const azimStep = (2 * Math.PI) / numAzim;

  for (let e = 0; e < numEle; e++) {
    const elev = elevations[e];
    const cosElev = Math.cos(elev);
    const sinElev = Math.sin(elev);

    for (let a = 0; a < numAzim; a++) {
      const azim = a * azimStep;
      const cosAzim = Math.cos(azim);
      const sinAzim = Math.sin(azim);

      for (let r = 0; r < numRange; r++) {
        const range = r * rangeStep;
        const idx = e * numAzim * numRange + a * numRange + r;

        let dbz = -32;

        const height = range * sinElev;
        const groundRange = range * cosElev;

        if (groundRange < 2) {
          dbz = -32;
          reflectivity[idx] = dbz;
          continue;
        }

        for (const storm of storms) {
          const azimDiff = Math.atan2(Math.sin(azim - storm.azim), Math.cos(azim - storm.azim));
          const azimDist = Math.abs(azimDiff) * groundRange;
          const rangeDist = Math.abs(groundRange - storm.range);

          const azimSigma = storm.width * 1.2;
          const rangeSigma = storm.width * 0.8;
          const heightSigma = storm.height * 0.4;

          const azimTerm = -0.5 * (azimDist / azimSigma) ** 2;
          const rangeTerm = -0.5 * (rangeDist / rangeSigma) ** 2;

          let heightTerm;
          if (height < storm.coreHeight) {
            heightTerm = -0.5 * ((height - storm.coreHeight) / heightSigma) ** 2;
          } else {
            heightTerm = -0.5 * ((height - storm.coreHeight) / (storm.height * 0.6)) ** 2;
          }

          const stormDbz = storm.intensity * Math.exp(azimTerm + rangeTerm + heightTerm);
          dbz = Math.max(dbz, stormDbz);
        }

        if (stratiform.active) {
          let azimDiff = Math.atan2(Math.sin(azim - stratiform.bandCenterAzim), Math.cos(azim - stratiform.bandCenterAzim));
          azimDiff = Math.abs(azimDiff);

          if (azimDiff < stratiform.bandWidthAzim / 2 &&
              groundRange > stratiform.innerRange &&
              groundRange < stratiform.outerRange) {

            const azimWindow = Math.cos(Math.PI * azimDiff / (stratiform.bandWidthAzim / 2));
            const rangeWindow = Math.sin(Math.PI * (groundRange - stratiform.innerRange) / (stratiform.outerRange - stratiform.innerRange));
            const heightFalloff = Math.exp(-0.5 * ((height - stratiform.brightBandHeight) / 1.0) ** 2);

            const stratDbz = stratiform.maxIntensity * azimWindow * rangeWindow * heightFalloff;
            const stratBackground = stratiform.maxIntensity * 0.4 * azimWindow * rangeWindow *
              Math.exp(-0.5 * (height / (stratiform.height * 0.7)) ** 2);

            dbz = Math.max(dbz, Math.max(stratDbz, stratBackground));
          }
        }

        const noise = (Math.random() - 0.5) * 2 * noiseLevel * 10;
        dbz += noise;

        const clutterTerm = Math.exp(-groundRange / 5) * Math.exp(-height / 1) * (15 * Math.random());
        dbz = Math.max(dbz, clutterTerm - 10);

        reflectivity[idx] = Math.max(-32, Math.min(80, dbz));
      }
    }
  }

  return {
    reflectivity,
    elevations,
    numElevations: numEle,
    numAzimuths: numAzim,
    numRanges: numRange,
    rangeStep,
    maxRangeKm,
    minValue: -32,
    maxValue: 80
  };
}
