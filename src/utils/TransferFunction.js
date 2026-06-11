export function createTransferFunctionCanvas(
  minVal = 0,
  maxVal = 70,
  mode = 'default'
) {
  const width = 256;
  const height = 1;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);

  const colormaps = {
    default: [
      { pos: 0.0, r: 0, g: 0, b: 0, a: 0 },
      { pos: 0.08, r: 0, g: 100, b: 200, a: 0.02 },
      { pos: 0.15, r: 0, g: 180, b: 255, a: 0.06 },
      { pos: 0.25, r: 0, g: 220, b: 180, a: 0.1 },
      { pos: 0.35, r: 80, g: 255, b: 80, a: 0.15 },
      { pos: 0.45, r: 200, g: 255, b: 50, a: 0.22 },
      { pos: 0.55, r: 255, g: 220, b: 0, a: 0.3 },
      { pos: 0.65, r: 255, g: 150, b: 0, a: 0.4 },
      { pos: 0.75, r: 255, g: 80, b: 40, a: 0.5 },
      { pos: 0.85, r: 220, g: 20, b: 120, a: 0.65 },
      { pos: 0.95, r: 180, g: 0, b: 180, a: 0.8 },
      { pos: 1.0, r: 255, g: 50, b: 255, a: 0.95 }
    ],
    severe: [
      { pos: 0.0, r: 0, g: 0, b: 0, a: 0 },
      { pos: 0.1, r: 0, g: 120, b: 180, a: 0.05 },
      { pos: 0.2, r: 0, g: 200, b: 220, a: 0.1 },
      { pos: 0.3, r: 50, g: 220, b: 100, a: 0.18 },
      { pos: 0.4, r: 150, g: 240, b: 50, a: 0.25 },
      { pos: 0.5, r: 255, g: 240, b: 0, a: 0.35 },
      { pos: 0.57, r: 255, g: 160, b: 0, a: 0.5 },
      { pos: 0.65, r: 255, g: 80, b: 0, a: 0.65 },
      { pos: 0.75, r: 255, g: 0, b: 80, a: 0.8 },
      { pos: 0.85, r: 220, g: 0, b: 220, a: 0.9 },
      { pos: 1.0, r: 255, g: 100, b: 255, a: 1.0 }
    ],
    thermal: [
      { pos: 0.0, r: 0, g: 0, b: 0, a: 0 },
      { pos: 0.1, r: 20, g: 0, b: 80, a: 0.08 },
      { pos: 0.2, r: 60, g: 0, b: 140, a: 0.15 },
      { pos: 0.35, r: 120, g: 0, b: 160, a: 0.25 },
      { pos: 0.5, r: 180, g: 40, b: 100, a: 0.4 },
      { pos: 0.65, r: 220, g: 100, b: 40, a: 0.55 },
      { pos: 0.8, r: 255, g: 180, b: 0, a: 0.75 },
      { pos: 1.0, r: 255, g: 255, b: 150, a: 1.0 }
    ],
    monochrome: [
      { pos: 0.0, r: 0, g: 0, b: 0, a: 0 },
      { pos: 0.1, r: 30, g: 30, b: 40, a: 0.05 },
      { pos: 0.3, r: 80, g: 80, b: 100, a: 0.15 },
      { pos: 0.5, r: 140, g: 140, b: 160, a: 0.3 },
      { pos: 0.7, r: 190, g: 190, b: 210, a: 0.5 },
      { pos: 0.85, r: 230, g: 230, b: 240, a: 0.7 },
      { pos: 1.0, r: 255, g: 255, b: 255, a: 0.95 }
    ]
  };

  const stops = colormaps[mode] || colormaps.default;

  for (let x = 0; x < width; x++) {
    const t = x / (width - 1);
    let idx = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      if (t >= stops[i].pos && t <= stops[i + 1].pos) {
        idx = i;
        break;
      }
    }
    const s0 = stops[idx];
    const s1 = stops[Math.min(idx + 1, stops.length - 1)];
    const localT = s1.pos === s0.pos ? 0 : (t - s0.pos) / (s1.pos - s0.pos);
    const r = Math.round(s0.r + (s1.r - s0.r) * localT);
    const g = Math.round(s0.g + (s1.g - s0.g) * localT);
    const b = Math.round(s0.b + (s1.b - s0.b) * localT);
    const a = Math.round((s0.a + (s1.a - s0.a) * localT) * 255);

    const pixelIndex = x * 4;
    imageData.data[pixelIndex] = r;
    imageData.data[pixelIndex + 1] = g;
    imageData.data[pixelIndex + 2] = b;
    imageData.data[pixelIndex + 3] = a;
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}

export function applyThresholdToCanvas(canvas, minThreshold, maxThreshold, minVal = 0, maxVal = 70) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const minT = (minThreshold - minVal) / (maxVal - minVal);
  const maxT = (maxThreshold - minVal) / (maxVal - minVal);

  for (let x = 0; x < canvas.width; x++) {
    const t = x / (canvas.width - 1);
    const pixelIndex = x * 4;

    if (t < minT || t > maxT) {
      data[pixelIndex + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
}
