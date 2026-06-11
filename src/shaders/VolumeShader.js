export const VolumeVertexShader = /* glsl */`
  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vLocalPosition = position * 0.5 + 0.5;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const VolumeFragmentShader = /* glsl */`
  precision highp float;
  precision highp sampler3D;
  precision highp sampler2D;

  varying vec3 vWorldPosition;
  varying vec3 vLocalPosition;

  uniform sampler3D u_volume;
  uniform sampler2D u_transferFunc;
  uniform vec3 u_cameraPos;
  uniform float u_threshold;
  uniform float u_maxdBZ;
  uniform float u_mindBZ;
  uniform float u_stepSize;
  uniform float u_density;
  uniform float u_brightness;
  uniform int u_renderMode;
  uniform vec3 u_boundsMin;
  uniform vec3 u_boundsMax;
  uniform bool u_showSlice;
  uniform float u_sliceZ;
  uniform float u_sliceOpacity;
  uniform vec3 u_activeSize;

  bool intersectBox(vec3 ro, vec3 rd, vec3 bmin, vec3 bmax, out float tNear, out float tFar) {
    vec3 invR = 1.0 / rd;
    vec3 tbot = invR * (bmin - ro);
    vec3 ttop = invR * (bmax - ro);
    vec3 tmin = min(ttop, tbot);
    vec3 tmax = max(ttop, tbot);
    tNear = max(max(tmin.x, tmin.y), tmin.z);
    tFar = min(min(tmax.x, tmax.y), tmax.z);
    return tNear < tFar;
  }

  float sampleScalar(vec3 localPos) {
    vec3 texCoord = localPos * u_activeSize;
    return texture(u_volume, texCoord).r;
  }

  vec4 sampleVolume(vec3 localPos) {
    float scalar = sampleScalar(localPos);
    vec4 tf = texture2D(u_transferFunc, vec2(scalar, 0.5));
    return tf;
  }

  vec4 raymarchVolume(vec3 rayOrigin, vec3 rayDir) {
    vec3 bmin = vec3(0.0);
    vec3 bmax = vec3(1.0);

    float tNear, tFar;
    if (!intersectBox(rayOrigin, rayDir, bmin, bmax, tNear, tFar)) {
      discard;
    }
    tNear = max(tNear, 0.0);

    vec3 startPos = rayOrigin + rayDir * tNear;
    vec3 endPos = rayOrigin + rayDir * tFar;
    float dist = length(endPos - startPos);
    int maxSteps = 512;
    int stepCount = int(dist / u_stepSize);
    stepCount = min(stepCount, maxSteps);
    if (stepCount < 1) stepCount = 1;
    float actualStep = dist / float(stepCount);

    vec4 accumulatedColor = vec4(0.0);
    float accumulatedAlpha = 0.0;

    vec3 stepVec = rayDir * actualStep;
    vec3 currentPos = startPos;

    float maxVal = 0.0;
    vec3 maxPos = vec3(0.0);

    for (int i = 0; i < 512; i++) {
      if (i >= stepCount) break;
      if (accumulatedAlpha >= 0.99) break;

      vec4 col = sampleVolume(currentPos);

      if (u_showSlice) {
        float sliceDist = abs(currentPos.z - u_sliceZ);
        if (sliceDist < 0.01) {
          col.a = max(col.a, u_sliceOpacity);
        }
      }

      if (col.a > 0.001) {
        if (u_renderMode == 0) {
          float alpha = col.a * u_density * actualStep * 100.0;
          alpha = min(alpha, 1.0);
          accumulatedColor.rgb += (1.0 - accumulatedAlpha) * col.rgb * alpha;
          accumulatedAlpha += (1.0 - accumulatedAlpha) * alpha;
        } else if (u_renderMode == 1) {
          if (col.a > maxVal) {
            maxVal = col.a;
            accumulatedColor = col;
            maxPos = currentPos;
          }
        } else if (u_renderMode == 2) {
          if (col.a > maxVal) {
            maxVal = col.a;
            maxPos = currentPos;
          }
        }
      }

      currentPos += stepVec;
    }

    if (u_renderMode == 2 && maxVal > 0.001) {
      float eps = 0.005;
      vec3 grad;
      grad.x = sampleScalar(maxPos + vec3(eps, 0.0, 0.0)) - sampleScalar(maxPos - vec3(eps, 0.0, 0.0));
      grad.y = sampleScalar(maxPos + vec3(0.0, eps, 0.0)) - sampleScalar(maxPos - vec3(0.0, eps, 0.0));
      grad.z = sampleScalar(maxPos + vec3(0.0, 0.0, eps)) - sampleScalar(maxPos - vec3(0.0, 0.0, eps));
      float gradLen = length(grad);
      if (gradLen > 0.0001) grad /= gradLen;
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
      float diffuse = max(dot(grad, lightDir), 0.0);
      float ambient = 0.3;
      vec4 baseColor = texture2D(u_transferFunc, vec2(sampleScalar(maxPos), 0.5));
      accumulatedColor.rgb = baseColor.rgb * (ambient + diffuse * 0.7);
      accumulatedColor.a = baseColor.a;
    }

    if (u_renderMode == 1) {
      accumulatedColor.a = maxVal;
    }

    accumulatedColor.rgb *= u_brightness;
    accumulatedColor.a = clamp(accumulatedAlpha, 0.0, 1.0);

    return accumulatedColor;
  }

  void main() {
    vec3 rayDir = normalize(vWorldPosition - u_cameraPos);
    vec4 color = raymarchVolume(vLocalPosition, rayDir);

    if (color.a < 0.01) {
      discard;
    }

    gl_FragColor = vec4(color.rgb, color.a);
  }
`;

export const VolumeBBoxShader = /* glsl */`
  varying vec3 vLocalPosition;
  varying vec3 vNormal;

  void main() {
    vLocalPosition = position * 0.5 + 0.5;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const VolumeBBoxFragShader = /* glsl */`
  varying vec3 vLocalPosition;
  varying vec3 vNormal;

  uniform vec3 u_bboxColor;
  uniform float u_opacity;

  void main() {
    vec3 edge = abs(vNormal);
    float isEdge = max(max(edge.x, edge.y), edge.z);
    if (isEdge < 0.99) discard;

    gl_FragColor = vec4(u_bboxColor, u_opacity);
  }
`;
