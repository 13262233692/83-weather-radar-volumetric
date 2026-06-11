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

export class VolumeRenderer {
  constructor(container) {
    this.container = container;
    this.clock = new THREE.Clock();
    this.volumeMesh = null;
    this.volumeTexture = null;
    this.transferFuncTexture = null;
    this.volumeMaterial = null;
    this.bboxMesh = null;
    this.dataReady = false;

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
      rotationSpeed: 0
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

    this.addAxesGrid();
    this.addLightingRig();
    this.createBBox();

    window.addEventListener('resize', this.onResize.bind(this));
    this.animate();
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

  setVolumeData(data, size, range, stats) {
    this.disposeVolume();

    this.stats.resolution = size;
    this.stats.range = range;
    this.stats.voxelCount = stats?.voxelCount || size.x * size.y * size.z;
    this.stats.nonZero = stats?.nonZero || 0;

    this.volumeTexture = new Data3DTexture(
      data,
      size.x,
      size.y,
      size.z
    );
    this.volumeTexture.format = THREE.RedFormat;
    this.volumeTexture.type = THREE.UnsignedByteType;
    this.volumeTexture.minFilter = THREE.LinearFilter;
    this.volumeTexture.magFilter = THREE.LinearFilter;
    this.volumeTexture.unpackAlignment = 1;
    this.volumeTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.volumeTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.volumeTexture.wrapR = THREE.ClampToEdgeWrapping;
    this.volumeTexture.needsUpdate = true;

    this.updateTransferFunction();

    const volGeom = new THREE.BoxGeometry(2, 2, 2);

    this.volumeMaterial = new THREE.ShaderMaterial({
      vertexShader: VolumeVertexShader,
      fragmentShader: VolumeFragmentShader,
      uniforms: {
        u_volume: { value: this.volumeTexture },
        u_transferFunc: { value: this.transferFuncTexture },
        u_cameraPos: { value: new THREE.Vector3() },
        u_threshold: { value: 0.1 },
        u_maxdBZ: { value: range.max },
        u_mindBZ: { value: range.min },
        u_stepSize: { value: this.params.stepSize },
        u_density: { value: this.params.density },
        u_brightness: { value: this.params.brightness },
        u_renderMode: { value: this.params.renderMode },
        u_boundsMin: { value: new THREE.Vector3(0, 0, 0) },
        u_boundsMax: { value: new THREE.Vector3(1, 1, 1) },
        u_showSlice: { value: this.params.showSlice },
        u_sliceZ: { value: this.params.sliceZ },
        u_sliceOpacity: { value: this.params.sliceOpacity }
      },
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    this.volumeMesh = new THREE.Mesh(volGeom, this.volumeMaterial);
    this.scene.add(this.volumeMesh);

    this.dataReady = true;
  }

  updateTransferFunction() {
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

    if (this.transferFuncTexture) {
      this.transferFuncTexture.dispose();
    }

    this.transferFuncTexture = new THREE.CanvasTexture(canvas);
    this.transferFuncTexture.minFilter = THREE.LinearFilter;
    this.transferFuncTexture.magFilter = THREE.LinearFilter;
    this.transferFuncTexture.wrapS = THREE.ClampToEdgeWrapping;
    this.transferFuncTexture.wrapT = THREE.ClampToEdgeWrapping;
    this.transferFuncTexture.needsUpdate = true;

    if (this.volumeMaterial) {
      this.volumeMaterial.uniforms.u_transferFunc.value = this.transferFuncTexture;
    }
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
    } else {
      this.updateUniforms();
    }
  }

  disposeVolume() {
    if (this.volumeMesh) {
      this.scene.remove(this.volumeMesh);
      this.volumeMesh.geometry.dispose();
      this.volumeMesh.material.dispose();
      this.volumeMesh = null;
    }
    if (this.volumeTexture) {
      this.volumeTexture.dispose();
      this.volumeTexture = null;
    }
    if (this.transferFuncTexture) {
      this.transferFuncTexture.dispose();
      this.transferFuncTexture = null;
    }
    this.volumeMaterial = null;
    this.dataReady = false;
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
    const dt = this.clock.getDelta();
    this.controls.update();

    if (this.volumeMesh && this.volumeMaterial) {
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
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposeVolume();
    this.renderer.dispose();
    this.controls.dispose();
    if (this.renderer.domElement.parentNode) {
      this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
    }
  }
}
