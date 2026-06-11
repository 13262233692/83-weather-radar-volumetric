import * as THREE from 'three';
import { Data3DTexture } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  VolumeVertexShader,
  VolumeFragmentShader,
  VolumeBBoxShader,
  VolumeBBoxFragShader
} from '../shaders/VolumeShader.js';
import { createTransferFunctionCanvas, applyThresholdToCanvas } from '../utils/TransferFunction.js';

const MAX_TEX_WIDTH = 256;
const MAX_TEX_HEIGHT = 256;
const MAX_TEX_DEPTH = 128;

export class VolumeRenderer {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.volumeMesh = null;
    this.volumeTexture = null;
    this.transferFuncTexture = null;
    this.transferFuncCanvas = null;
    this.volumeMaterial = null;
    this.bboxMesh = null;

    this.hailCoreMesh = null;
    this.hailCoreMaterial = null;
    this.hailCoreGeom = null;
    this.hailCoreGlow = null;
    this.hailCoreReady = false;
    this.dataReady = false;
    this.glInitialized = false;
    this.contextLost = false;
    this.pendingData = null;
    this.frameCount = 0;

    this.activeSize = { x: 0, y: 0, z: 0 };

    this.params = {
      stepSize: 0.003,
      density: 0.6,
      brightness: 1.3,
      thresholdMin: 5,
      thresholdMax: 70,
      renderMode: 0,
      colormap: 'default',
      showBBox: true,
      showAxes: true,
      showSlice: false,
      sliceZ: 0.5,
      sliceOpacity: 0.8,
      sliceAnimate: false,
      rotationSpeed: 0,

      showHailCore: true,
      hailThreshold: 65,
      hailPulseSpeed: 2.5,
      hailPulseIntensity: 0.35,
      hailOpacity: 1.0,
      hailWireframe: false
    };

    this.stats = {
      resolution: { x: 0, y: 0, z: 0 },
      range: { min: 0, max: 0 },
      voxelCount: 0,
      nonZero: 0
    };

    this.init();
  }

  init() {
    const { clientWidth, clientHeight } = this.container;
    this.width = clientWidth;
    this.height = clientHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050510);

    this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.1, 1000);
    this.camera.position.set(2.8, 2.0, 3.2);
    this.camera.lookAt(0, 0.3, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(clientWidth, clientHeight);
    this.renderer.setClearColor(0x050510, 1);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 0.8;
    this.controls.maxDistance = 12;
    this.controls.target.set(0, 0.3, 0);

    this.renderer.domElement.addEventListener('webglcontextlost', this.onContextLost.bind(this));
    this.renderer.domElement.addEventListener('webglcontextrestored', this.onContextRestored.bind(this));

    this.addAxesGrid();
    this.addLightingRig();
    this.createBBox();
    this.initPersistentResources();

    window.addEventListener('resize', this.onResize.bind(this));
    this.animate();
  }

  onContextLost(event) {
    event.preventDefault();
    this.contextLost = true;
    this.glInitialized = false;
    console.error('[VolumeRenderer] WebGL Context Lost! 显存溢出或GPU异常。等待恢复...');
  }

  onContextRestored() {
    this.contextLost = false;
    console.log('[VolumeRenderer] WebGL Context 已恢复，重新初始化资源...');
    this.initPersistentResources();
    if (this.pendingData) {
      const pd = this.pendingData;
      this.pendingData = null;
      this.updateVolumeData(pd.data, pd.size, pd.range, pd.stats);
    }
  }

  initPersistentResources() {
    if (this.glInitialized) return;

    this._createPersistentVolumeTexture();
    this._createPersistentTransferFunc();
    this._createPersistentMaterial();
    this._createPersistentMesh();

    this.glInitialized = true;
  }

  _createPersistentVolumeTexture() {
    if (this.volumeTexture) return;

    const data = new Uint8Array(MAX_TEX_WIDTH * MAX_TEX_HEIGHT * MAX_TEX_DEPTH);

    this.volumeTexture = new Data3DTexture(
      data,
      MAX_TEX_WIDTH,
      MAX_TEX_HEIGHT,
      MAX_TEX_DEPTH
    );
    this.volumeTexture.format = THREE.RedFormat;
    this.volumeTexture.type = THREE.UnsignedByteType;
    this.volumeTexture.minFilter = THREE.LinearFilter;
    this.volumeTexture.magFilter = THREE.LinearFilter;
    this.volumeTexture.unpackAlignment = 1;
    this.volumeTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.volumeTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.volumeTexture.wrapR = THREE.ClampToEdgeWrapping;

    this._forceUploadTexture();
  }

  _forceUploadTexture() {
    if (!this.volumeTexture) return;
    this.volumeTexture.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  _createPersistentTransferFunc() {
    if (this.transferFuncTexture) return;

    this.transferFuncCanvas = document.createElement('canvas');
    this.transferFuncCanvas.width = 256;
    this.transferFuncCanvas.height = 1;

    this.transferFuncTexture = new THREE.CanvasTexture(this.transferFuncCanvas);
    this.transferFuncTexture.minFilter = THREE.LinearFilter;
    this.transferFuncTexture.magFilter = THREE.LinearFilter;
    this.transferFuncTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.transferFuncTexture.wrapT = THREE.ClampToEdgeWrapping;
  }

  _createPersistentMaterial() {
    if (this.volumeMaterial) return;

    this.volumeMaterial = new THREE.ShaderMaterial({
      vertexShader: VolumeVertexShader,
      fragmentShader: VolumeFragmentShader,
      uniforms: {
        u_volume: { value: this.volumeTexture },
        u_transferFunc: { value: this.transferFuncTexture },
        u_cameraPos: { value: new THREE.Vector3() },
        u_threshold: { value: 0.1 },
        u_maxdBZ: { value: 80 },
        u_mindBZ: { value: -32 },
        u_stepSize: { value: this.params.stepSize },
        u_density: { value: this.params.density },
        u_brightness: { value: this.params.brightness },
        u_renderMode: { value: this.params.renderMode },
        u_boundsMin: { value: new THREE.Vector3(0, 0, 0) },
        u_boundsMax: { value: new THREE.Vector3(1, 1, 1) },
        u_showSlice: { value: this.params.showSlice },
        u_sliceZ: { value: this.params.sliceZ },
        u_sliceOpacity: { value: this.params.sliceOpacity },
        u_activeSize: { value: new THREE.Vector3(1.0, 1.0, 1.0) }
      },
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });
  }

  _createPersistentMesh() {
    if (this.volumeMesh) return;

    const volGeom = new THREE.BoxGeometry(2, 2, 2);
    this.volumeMesh = new THREE.Mesh(volGeom, this.volumeMaterial);
    this.scene.add(this.volumeMesh);
  }

  _initHailCoreMesh() {
    if (this.hailCoreMesh) return;

    this.hailCoreGeom = new THREE.BufferGeometry();
    const emptyPos = new Float32Array(0);
    const emptyNorm = new Float32Array(0);
    const emptyColor = new Float32Array(0);
    const emptyIdx = new Uint32Array(0);

    this.hailCoreGeom.setAttribute('position', new THREE.BufferAttribute(emptyPos, 3));
    this.hailCoreGeom.setAttribute('normal', new THREE.BufferAttribute(emptyNorm, 3));
    this.hailCoreGeom.setAttribute('color', new THREE.BufferAttribute(emptyColor, 4));
    this.hailCoreGeom.setIndex(new THREE.BufferAttribute(emptyIdx, 1));

    this.hailCoreMaterial = new THREE.MeshPhongMaterial({
      color: 0xff3030,
      emissive: 0xff1010,
      emissiveIntensity: 0.8,
      shininess: 100,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
      vertexColors: true,
      wireframe: false
    });

    this.hailCoreMesh = new THREE.Mesh(this.hailCoreGeom, this.hailCoreMaterial);
    this.hailCoreMesh.visible = this.params.showHailCore;
    this.scene.add(this.hailCoreMesh);

    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xff2020,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
      depthWrite: false
    });
    const glowGeom = new THREE.BoxGeometry(2.08, 2.08, 2.08);
    this.hailCoreGlow = new THREE.Mesh(glowGeom, glowMat);
    this.hailCoreGlow.visible = false;
    this.scene.add(this.hailCoreGlow);
  }

  setHailCoreGeometry(meshData) {
    this._initHailCoreMesh();

    if (!meshData || meshData.vertexCount === 0) {
      this.hailCoreMesh.visible = false;
      this.hailCoreGlow.visible = false;
      this.hailCoreReady = false;
      return;
    }

    const posAttr = this.hailCoreGeom.getAttribute('position');
    if (posAttr.count !== meshData.vertices.length / 3) {
      this.hailCoreGeom.setAttribute('position', new THREE.BufferAttribute(meshData.vertices, 3));
      this.hailCoreGeom.setAttribute('normal', new THREE.BufferAttribute(meshData.normals, 3));
      this.hailCoreGeom.setAttribute('color', new THREE.BufferAttribute(meshData.colors, 4));
      this.hailCoreGeom.setIndex(new THREE.BufferAttribute(meshData.indices, 1));
    } else {
      posAttr.array.set(meshData.vertices);
      posAttr.needsUpdate = true;
      const normAttr = this.hailCoreGeom.getAttribute('normal');
      normAttr.array.set(meshData.normals);
      normAttr.needsUpdate = true;
      const colAttr = this.hailCoreGeom.getAttribute('color');
      colAttr.array.set(meshData.colors);
      colAttr.needsUpdate = true;
      const idxAttr = this.hailCoreGeom.getIndex();
      idxAttr.array.set(meshData.indices);
      idxAttr.needsUpdate = true;
    }

    this.hailCoreGeom.computeBoundingBox();
    this.hailCoreGeom.computeBoundingSphere();

    this.hailCoreMesh.visible = this.params.showHailCore;
    this.hailCoreGlow.visible = this.params.showHailCore && meshData.vertexCount > 0;
    this.hailCoreReady = true;
  }

  _updateHailCorePulse(time) {
    if (!this.hailCoreReady || !this.params.showHailCore) return;

    const pulse = 0.5 + 0.5 * Math.sin(time * this.params.hailPulseSpeed);
    const intensity = 0.6 + pulse * this.params.hailPulseIntensity;

    if (this.hailCoreMaterial) {
      this.hailCoreMaterial.emissiveIntensity = intensity;
      this.hailCoreMaterial.opacity = this.params.hailOpacity * (0.85 + pulse * 0.15);
    }

    if (this.hailCoreGlow && this.hailCoreGlow.material) {
      this.hailCoreGlow.material.opacity = 0.1 + pulse * 0.2;
      const glowScale = 1 + pulse * 0.04;
      this.hailCoreGlow.scale.set(glowScale, glowScale, glowScale);
    }
  }

  setVolumeData(data, size, range, stats) {
    this.initPersistentResources();

    this.activeSize = { x: size.x, y: size.y, z: size.z };
    this.stats.resolution = size;
    this.stats.range = range;
    this.stats.voxelCount = stats?.voxelCount || size.x * size.y * size.z;
    this.stats.nonZero = stats?.nonZero || 0;

    if (this.volumeMaterial) {
      this.volumeMaterial.uniforms.u_maxdBZ.value = range.max;
      this.volumeMaterial.uniforms.u_mindBZ.value = range.min;
      this.volumeMaterial.uniforms.u_activeSize.value.set(
        size.x / MAX_TEX_WIDTH,
        size.y / MAX_TEX_HEIGHT,
        size.z / MAX_TEX_DEPTH
      );
    }

    this._uploadVolumeDataInPlace(data, size);
    this.updateTransferFunction();
    this.dataReady = true;
  }

  updateVolumeData(data, size, range, stats) {
    if (this.contextLost) {
      this.pendingData = { data, size, range, stats };
      return;
    }

    this.activeSize = { x: size.x, y: size.y, z: size.z };
    this.stats.resolution = size;
    if (range) {
      this.stats.range = range;
      if (this.volumeMaterial) {
        this.volumeMaterial.uniforms.u_maxdBZ.value = range.max;
        this.volumeMaterial.uniforms.u_mindBZ.value = range.min;
      }
    }
    if (stats) {
      this.stats.voxelCount = stats.voxelCount || size.x * size.y * size.z;
      this.stats.nonZero = stats.nonZero || 0;
    }

    if (this.volumeMaterial) {
      this.volumeMaterial.uniforms.u_activeSize.value.set(
        size.x / MAX_TEX_WIDTH,
        size.y / MAX_TEX_HEIGHT,
        size.z / MAX_TEX_DEPTH
      );
    }

    this._uploadVolumeDataInPlace(data, size);
    this.dataReady = true;
  }

  _uploadVolumeDataInPlace(data, size) {
    if (!this.volumeTexture) return;

    const gl = this.renderer.getContext();
    const textureProps = this.renderer.properties.get(this.volumeTexture);

    if (!textureProps || !textureProps.__webglTexture) {
      this.volumeTexture.image.data.set(data);
      this.volumeTexture.needsUpdate = true;
      return;
    }

    gl.bindTexture(gl.TEXTURE_3D, textureProps.__webglTexture);
    gl.texSubImage3D(
      gl.TEXTURE_3D,
      0,
      0, 0, 0,
      size.x, size.y, size.z,
      gl.RED,
      gl.UNSIGNED_BYTE,
      data
    );
    gl.bindTexture(gl.TEXTURE_3D, null);
  }

  updateTransferFunction() {
    if (!this.transferFuncCanvas) return;

    const canvas = createTransferFunctionCanvas(
      this.stats.range.min,
      this.stats.range.max,
      this.params.colormap
    );
    applyThresholdToCanvas(
      canvas,
      this.params.thresholdMin,
      this.params.thresholdMax,
      this.stats.range.min,
      this.stats.range.max
    );

    const ctx = this.transferFuncCanvas.getContext('2d');
    ctx.clearRect(0, 0, this.transferFuncCanvas.width, this.transferFuncCanvas.height);
    ctx.drawImage(canvas, 0, 0);

    this.transferFuncTexture.needsUpdate = true;
  }

  updateUniforms() {
    if (!this.volumeMaterial) return;
    const u = this.volumeMaterial.uniforms;
    u.u_stepSize.value = this.params.stepSize;
    u.u_density.value = this.params.density;
    u.u_brightness.value = this.params.brightness;
    u.u_renderMode.value = this.params.renderMode;
    u.u_showSlice.value = this.params.showSlice;
    u.u_sliceZ.value = this.params.sliceZ;
    u.u_sliceOpacity.value = this.params.sliceOpacity;
  }

  setParam(key, value) {
    this.params[key] = value;
    if (key === 'colormap' || key === 'thresholdMin' || key === 'thresholdMax') {
      this.updateTransferFunction();
    } else if (key === 'showHailCore') {
      if (this.hailCoreMesh) this.hailCoreMesh.visible = value;
      if (this.hailCoreGlow) this.hailCoreGlow.visible = value && this.hailCoreReady;
    } else if (key === 'hailWireframe') {
      if (this.hailCoreMaterial) this.hailCoreMaterial.wireframe = value;
    } else if (key === 'hailOpacity') {
      if (this.hailCoreMaterial) this.hailCoreMaterial.opacity = value;
    } else {
      this.updateUniforms();
    }
  }

  addAxesGrid() {
    const grid = new THREE.GridHelper(2, 20, 0x1a3a5c, 0x0a1a2a);
    grid.position.y = -1.01;
    this.scene.add(grid);

    const origin = new THREE.Vector3(-1, -1, -1);
    const axisLen = 2;
    const axesGroup = new THREE.Group();

    const xMat = new THREE.LineBasicMaterial({ color: 0xff4444, transparent: true, opacity: 0.5 });
    const yMat = new THREE.LineBasicMaterial({ color: 0x44ff44, transparent: true, opacity: 0.5 });
    const zMat = new THREE.LineBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.5 });

    const xGeom = new THREE.BufferGeometry().setFromPoints([origin, new THREE.Vector3(origin.x + axisLen, origin.y, origin.z)]);
    const yGeom = new THREE.BufferGeometry().setFromPoints([origin, new THREE.Vector3(origin.x, origin.y + axisLen, origin.z)]);
    const zGeom = new THREE.BufferGeometry().setFromPoints([origin, new THREE.Vector3(origin.x, origin.y, origin.z + axisLen)]);

    axesGroup.add(new THREE.Line(xGeom, xMat));
    axesGroup.add(new THREE.Line(yGeom, yMat));
    axesGroup.add(new THREE.Line(zGeom, zMat));
    this.scene.add(axesGroup);

    for (let ring = 1; ring <= 3; ring++) {
      const radius = ring * 0.66;
      const ringPts = [];
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(a) * radius, -1, Math.sin(a) * radius));
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPts);
      const ringMat = new THREE.LineBasicMaterial({ color: 0x224466, transparent: true, opacity: 0.3 });
      this.scene.add(new THREE.Line(ringGeom, ringMat));
    }
  }

  addLightingRig() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(ambient);

    const dir1 = new THREE.DirectionalLight(0x4fc3f7, 0.3);
    dir1.position.set(3, 5, 3);
    this.scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0xab47bc, 0.2);
    dir2.position.set(-3, 2, -3);
    this.scene.add(dir2);
  }

  createBBox() {
    const bboxGeom = new THREE.BoxGeometry(2, 2, 2);
    const bboxEdges = new THREE.EdgesGeometry(bboxGeom);
    const bboxMat = new THREE.LineBasicMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.25
    });
    this.bboxLine = new THREE.LineSegments(bboxEdges, bboxMat);
    this.scene.add(this.bboxLine);

    const edgesGeom = new THREE.BoxGeometry(2, 2, 2);
    const edgesMat = new THREE.ShaderMaterial({
      vertexShader: VolumeBBoxShader,
      fragmentShader: VolumeBBoxFragShader,
      uniforms: {
        u_bboxColor: { value: new THREE.Color(0x4fc3f7) },
        u_opacity: { value: 0.1 }
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false
    });
    this.bboxMesh = new THREE.Mesh(edgesGeom, edgesMat);
    this.scene.add(this.bboxMesh);
  }

  onResize() {
    const { clientWidth, clientHeight } = this.container;
    this.width = clientWidth;
    this.height = clientHeight;
    this.camera.aspect = clientWidth / clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    if (this.contextLost) return;

    const dt = this.clock.getDelta();
    this.controls.update();

    if (this.volumeMesh && this.volumeMaterial && this.dataReady) {
      const worldCam = new THREE.Vector3();
      this.camera.getWorldPosition(worldCam);
      const localCam = this.volumeMesh.worldToLocal(worldCam.clone()).multiplyScalar(0.5).addScalar(0.5);
      this.volumeMaterial.uniforms.u_cameraPos.value.copy(localCam);

      if (this.params.sliceAnimate) {
        this.params.sliceZ = (Math.sin(this.clock.elapsedTime * 0.4) + 1) * 0.5;
        this.volumeMaterial.uniforms.u_sliceZ.value = this.params.sliceZ;
      }

      if (this.params.rotationSpeed > 0) {
        this.volumeMesh.rotation.y += dt * this.params.rotationSpeed;
        if (this.bboxMesh) this.bboxMesh.rotation.y += dt * this.params.rotationSpeed;
        if (this.bboxLine) this.bboxLine.rotation.y += dt * this.params.rotationSpeed;
        if (this.hailCoreMesh) this.hailCoreMesh.rotation.y += dt * this.params.rotationSpeed;
        if (this.hailCoreGlow) this.hailCoreGlow.rotation.y += dt * this.params.rotationSpeed;
      }
    }

    this._updateHailCorePulse(this.clock.elapsedTime);

    this.renderer.render(this.scene, this.camera);
    this.frameCount++;
  }

  dispose() {
    if (this.volumeMesh) {
      this.scene.remove(this.volumeMesh);
      this.volumeMesh.geometry.dispose();
      this.volumeMesh = null;
    }
    if (this.volumeMaterial) {
      this.volumeMaterial.dispose();
      this.volumeMaterial = null;
    }
    if (this.volumeTexture) {
      this.volumeTexture.dispose();
      this.volumeTexture = null;
    }
    if (this.transferFuncTexture) {
      this.transferFuncTexture.dispose();
      this.transferFuncTexture = null;
    }
    this.transferFuncCanvas = null;
    this.renderer.dispose();
    this.controls.dispose();
    this.glInitialized = false;
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
