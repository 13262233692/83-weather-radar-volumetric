import * as THREE from 'three';
import { VolumeRenderer } from './scene/VolumeRenderer.js';
import { generateMockPolarVolume } from './utils/MockRadarData.js';
import { createTransferFunctionCanvas } from './utils/TransferFunction.js';
import VolumeProcessor from './workers/VolumeProcessor.worker.js?worker';
import GUI from 'lil-gui';

const SIMULATED_UPDATE_INTERVAL = 15000;

class RadarVolumetricApp {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.loader = document.getElementById('loading-overlay');
    this.loaderFill = document.getElementById('loader-fill');
    this.loaderText = document.getElementById('loader-text');
    this.dropZone = document.getElementById('file-drop-zone');
    this.dropText = document.getElementById('drop-text');
    this.fileInput = document.getElementById('file-input');

    this.currentData = null;
    this.worker = null;
    this.gui = null;
    this.liveUpdateTimer = null;
    this.liveUpdateCount = 0;
    this.firstLoad = true;

    this.init();
  }

  async init() {
    this.renderer = new VolumeRenderer(this.container);
    this.initWorker();
    this.initGUI();
    this.initFileHandler();
    await this.loadDemoData();
  }

  initWorker() {
    this.worker = new VolumeProcessor();
    this.worker.onmessage = (e) => {
      const { type, payload, error } = e.data;
      if (type === 'processProgress') {
        this.updateLoader(payload.percent, payload.message);
      } else if (type === 'processComplete') {
        this.onVolumeProcessed(payload);
      } else if (type === 'hailCoreProgress') {
        this.updateLoader(payload.percent, payload.message);
      } else if (type === 'hailCoreComplete') {
        this.onHailCoreProcessed(payload);
      } else if (type === 'hailCoreError') {
        console.warn('冰雹核心提取失败:', error);
      } else if (type === 'processError' || type === 'parseError') {
        this.hideLoader();
        alert('处理失败: ' + error);
        console.error(error);
      }
    };
  }

  initGUI() {
    this.gui = new GUI({ title: '⚙ 体积渲染参数', width: 320 });
    this.gui.domElement.style.position = 'absolute';
    this.gui.domElement.style.top = '16px';
    this.gui.domElement.style.right = '16px';
    this.gui.domElement.style.zIndex = '50';

    const renderFolder = this.gui.addFolder('🎛 渲染参数');
    renderFolder.add(this.renderer.params, 'stepSize', 0.0005, 0.02, 0.0001)
      .name('步进大小').onChange(v => this.renderer.setParam('stepSize', v));
    renderFolder.add(this.renderer.params, 'density', 0.05, 3, 0.01)
      .name('密度系数').onChange(v => this.renderer.setParam('density', v));
    renderFolder.add(this.renderer.params, 'brightness', 0.2, 3, 0.01)
      .name('亮度').onChange(v => this.renderer.setParam('brightness', v));
    renderFolder.add(this.renderer.params, 'rotationSpeed', 0, 2, 0.01)
      .name('自动旋转').onChange(v => this.renderer.setParam('rotationSpeed', v));
    renderFolder.open();

    const modeFolder = this.gui.addFolder('🎨 渲染模式');
    const modes = { '0-体渲染(累积)': 0, '1-MIP最大投影': 1, '2-等值面渲染': 2 };
    modeFolder.add(this.renderer.params, 'renderMode', modes)
      .name('模式').onChange(v => this.renderer.setParam('renderMode', parseInt(v)));
    const cmaps = { 'default-气象色板': 'default', 'severe-强对流增强': 'severe', 'thermal-热力': 'thermal', 'monochrome-单色调': 'monochrome' };
    modeFolder.add(this.renderer.params, 'colormap', cmaps)
      .name('颜色映射').onChange(v => this.renderer.setParam('colormap', v));
    modeFolder.open();

    const threshFolder = this.gui.addFolder('📊 反射率阈值 (dBZ)');
    threshFolder.add(this.renderer.params, 'thresholdMin', -32, 70, 0.5)
      .name('最小 dBZ').onChange(v => this.renderer.setParam('thresholdMin', v));
    threshFolder.add(this.renderer.params, 'thresholdMax', -30, 80, 0.5)
      .name('最大 dBZ').onChange(v => this.renderer.setParam('thresholdMax', v));
    threshFolder.open();

    const sliceFolder = this.gui.addFolder('🔪 切片显示');
    sliceFolder.add(this.renderer.params, 'showSlice').name('启用切片')
      .onChange(v => this.renderer.setParam('showSlice', v));
    sliceFolder.add(this.renderer.params, 'sliceZ', 0, 1, 0.001)
      .name('Z层位置').onChange(v => this.renderer.setParam('sliceZ', v));
    sliceFolder.add(this.renderer.params, 'sliceOpacity', 0, 1, 0.01)
      .name('切片不透明度').onChange(v => this.renderer.setParam('sliceOpacity', v));
    sliceFolder.add(this.renderer.params, 'sliceAnimate').name('自动扫切');

    const dataFolder = this.gui.addFolder('📁 数据操作');
    dataFolder.add({
      '加载模拟数据': () => this.loadDemoData()
    }, '加载模拟数据');
    dataFolder.add({
      '从文件上传': () => this.fileInput.click()
    }, '从文件上传');
    dataFolder.add({
      '重置视角': () => {
        this.renderer.camera.position.set(2.8, 2.0, 3.2);
        this.renderer.controls.target.set(0, 0.3, 0);
        this.renderer.controls.update();
      }
    }, '重置视角');

    this.liveUpdateObj = { enabled: false };
    dataFolder.add(this.liveUpdateObj, 'enabled').name('🔄 模拟实时更新').onChange(v => {
      if (v) this.startLiveUpdate();
      else this.stopLiveUpdate();
    });

    const hailFolder = this.gui.addFolder('🧊 冰雹核心提取');
    hailFolder.add(this.renderer.params, 'showHailCore').name('显示冰雹核心')
      .onChange(v => this.renderer.setParam('showHailCore', v));
    hailFolder.add(this.renderer.params, 'hailThreshold', 40, 75, 1)
      .name('dBZ 阈值').onChange(v => {
        this.renderer.params.hailThreshold = v;
        this._scheduleHailReextract();
      });
    hailFolder.add(this.renderer.params, 'hailPulseSpeed', 0, 8, 0.1)
      .name('脉动速度').onChange(v => this.renderer.setParam('hailPulseSpeed', v));
    hailFolder.add(this.renderer.params, 'hailPulseIntensity', 0, 1, 0.01)
      .name('脉动强度').onChange(v => this.renderer.setParam('hailPulseIntensity', v));
    hailFolder.add(this.renderer.params, 'hailOpacity', 0, 1, 0.01)
      .name('不透明度').onChange(v => this.renderer.setParam('hailOpacity', v));
    hailFolder.add(this.renderer.params, 'hailWireframe').name('线框模式')
      .onChange(v => this.renderer.setParam('hailWireframe', v));
    hailFolder.add({ '重新提取': () => this.extractHailCore() }, '重新提取');
    this.hailStatEl = document.createElement('div');
    this.hailStatEl.style.cssText = 'font-size:10px; color:#888; margin-top:6px; font-family:Consolas,monospace;';
    this.hailStatEl.textContent = '冰雹核心: 等待提取...';
    hailFolder.domElement.appendChild(this.hailStatEl);
    hailFolder.open();

    this._hailReextractTimer = null;

    this.createColorBar();
  }

  startLiveUpdate() {
    this.stopLiveUpdate();
    this.liveUpdateCount = 0;
    this.liveUpdateTimer = setInterval(() => {
      this.liveUpdateCount++;
      this.updateLoader(5, `⏱ 实时更新 #${this.liveUpdateCount} (模拟 ${SIMULATED_UPDATE_INTERVAL/1000}s 间隔)...`);
      this.showLoader();
      this.generateAndProcessData();
    }, SIMULATED_UPDATE_INTERVAL);
    console.log('[LiveUpdate] 已启动模拟实时雷达流，间隔', SIMULATED_UPDATE_INTERVAL / 1000, '秒');
  }

  stopLiveUpdate() {
    if (this.liveUpdateTimer) {
      clearInterval(this.liveUpdateTimer);
      this.liveUpdateTimer = null;
      console.log('[LiveUpdate] 已停止，共更新', this.liveUpdateCount, '帧');
    }
  }

  generateAndProcessData() {
    const polar = generateMockPolarVolume({
      numElevations: 14,
      numAzimuths: 360,
      numRanges: 500,
      maxRange: 200
    });

    this.currentData = polar;

    this.worker.postMessage({
      type: 'processPolar',
      payload: {
        ...polar,
        reflectivity: polar.reflectivity,
        gridSize: 160,
        gridHeight: 96
      }
    }, [polar.reflectivity.buffer]);
  }

  _scheduleHailReextract() {
    if (this._hailReextractTimer) clearTimeout(this._hailReextractTimer);
    this._hailReextractTimer = setTimeout(() => {
      this.extractHailCore();
    }, 250);
  }

  extractHailCore() {
    if (!this.currentVolumeData) {
      console.warn('暂无体数据，无法提取冰雹核心');
      return;
    }

    const dataCopy = new Uint8Array(this.currentVolumeData.data);
    this.worker.postMessage({
      type: 'extractHailCore',
      payload: {
        volumeData: dataCopy,
        size: this.currentVolumeData.size,
        range: this.currentVolumeData.range,
        threshold: this.renderer.params.hailThreshold,
        zdrThreshold: 0.5
      }
    }, [dataCopy.buffer]);
  }

  onHailCoreProcessed(meshData) {
    this.renderer.setHailCoreGeometry(meshData);
    if (this.hailStatEl) {
      if (meshData.vertexCount > 0) {
        this.hailStatEl.innerHTML = `✅ 冰雹核心: ${meshData.triangleCount.toLocaleString()} 三角面 / ${meshData.vertexCount.toLocaleString()} 顶点`;
      } else {
        this.hailStatEl.innerHTML = '⚠ 未检测到冰雹核心 (阈值过高或无强对流区)';
      }
    }
  }

  createColorBar() {
    const bar = document.createElement('div');
    bar.style.cssText = `
      position:absolute; left:16px; bottom:48px; width:24px; height:220px;
      background: linear-gradient(to top, transparent);
      border-radius: 4px; z-index: 20; pointer-events: none;
      border: 1px solid rgba(79,195,247,0.3);
    `;
    const canvas = document.createElement('canvas');
    canvas.width = 24; canvas.height = 256; canvas.style.cssText = 'display:block; width:24px; height:220px; border-radius:3px;';
    bar.appendChild(canvas);
    document.getElementById('app').appendChild(bar);

    const labels = document.createElement('div');
    labels.style.cssText = `
      position:absolute; left:48px; bottom:48px; height:220px;
      display:flex; flex-direction:column; justify-content:space-between;
      font-size:10px; color:#888; z-index:20; font-family:Consolas,monospace;
      pointer-events:none;
    `;
    for (let i = 0; i <= 8; i++) {
      const span = document.createElement('span');
      labels.appendChild(span);
    }
    document.getElementById('app').appendChild(labels);

    this.colorBar = { canvas, labels };
    this.updateColorBar();

    setInterval(() => this.updateColorBar(), 2000);
  }

  updateColorBar() {
    if (!this.colorBar) return;
    const { canvas, labels } = this.colorBar;
    const tfCanvas = createTransferFunctionCanvas(
      this.renderer.stats.range.min,
      this.renderer.stats.range.max,
      this.renderer.params.colormap
    );
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const tfCtx = tfCanvas.getContext('2d');
    const srcData = tfCtx.getImageData(0, 0, 256, 1).data;

    const minT = Math.max(0, (this.renderer.params.thresholdMin - this.renderer.stats.range.min) / (this.renderer.stats.range.max - this.renderer.stats.range.min));
    const maxT = Math.min(1, (this.renderer.params.thresholdMax - this.renderer.stats.range.min) / (this.renderer.stats.range.max - this.renderer.stats.range.min));

    for (let y = 0; y < canvas.height; y++) {
      const t = 1 - (y / (canvas.height - 1));
      let xi = Math.floor(t * 255);
      xi = Math.max(0, Math.min(255, xi));
      let alpha = srcData[xi * 4 + 3];
      if (t < minT || t > maxT) alpha = 0;
      ctx.fillStyle = `rgba(${srcData[xi*4]},${srcData[xi*4+1]},${srcData[xi*4+2]},${alpha/255})`;
      ctx.fillRect(0, y, canvas.width, 1);
    }

    const spans = labels.querySelectorAll('span');
    const n = spans.length;
    for (let i = 0; i < n; i++) {
      const t = 1 - (i / (n - 1));
      const dbz = this.renderer.stats.range.min + t * (this.renderer.stats.range.max - this.renderer.stats.range.min);
      spans[i].textContent = `${dbz >= 0 ? ' ' : ''}${dbz.toFixed(0)} dBZ`;
    }
  }

  initFileHandler() {
    const onDragOver = (e) => {
      e.preventDefault();
      this.dropZone.classList.add('drag');
      this.dropText.textContent = '释放文件以解析 NetCDF 雷达数据';
    };
    const onDragLeave = () => {
      this.dropZone.classList.remove('drag');
      this.dropText.textContent = '📁 拖入 NetCDF 文件或点击上传';
    };
    const onDrop = (e) => {
      e.preventDefault();
      onDragLeave();
      if (e.dataTransfer.files[0]) {
        this.handleFile(e.dataTransfer.files[0]);
      }
    };
    this.dropZone.addEventListener('dragover', onDragOver);
    this.dropZone.addEventListener('dragleave', onDragLeave);
    this.dropZone.addEventListener('drop', onDrop);
    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files[0]) this.handleFile(e.target.files[0]);
    });
  }

  handleFile(file) {
    this.updateLoader(2, `读取文件: ${file.name} (${(file.size/1024/1024).toFixed(1)} MB)`);
    this.showLoader();
    const reader = new FileReader();
    reader.onload = (e) => {
      this.updateLoader(8, '提交 Web Worker 处理...');
      this.worker.postMessage({
        type: 'processNetCDFAndConvert',
        payload: { buffer: e.target.result }
      });
    };
    reader.readAsArrayBuffer(file);
  }

  async loadDemoData() {
    this.showLoader();
    this.updateLoader(2, '生成模拟雷达体扫数据 (5个风暴系统)...');

    await new Promise(r => setTimeout(r, 100));

    this.firstLoad = true;
    this.generateAndProcessData();
  }

  onVolumeProcessed(result) {
    this.currentVolumeData = {
      data: result.data,
      size: result.size,
      range: result.range,
      stats: result.stats
    };

    if (this.firstLoad) {
      this.renderer.setVolumeData(result.data, result.size, result.range, result.stats);
      this.firstLoad = false;
    } else {
      this.renderer.updateVolumeData(result.data, result.size, result.range, result.stats);
    }

    this.updateInfoPanel(result);
    this.updateColorBar();

    if (this.renderer.params.showHailCore) {
      this.extractHailCore();
    }

    if (this.liveUpdateCount > 0) {
      const memInfo = this.getMemoryInfo();
      const memStr = memInfo ? ` | JS堆: ${(memInfo.usedJSHeapSize / 1048576).toFixed(1)}MB` : '';
      this.loaderText.textContent = `✅ 实时更新 #${this.liveUpdateCount} 完成${memStr}`;
      setTimeout(() => this.hideLoader(), 2000);
    } else {
      setTimeout(() => this.hideLoader(), 400);
    }
  }

  getMemoryInfo() {
    if (performance.memory) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }

  updateInfoPanel(result) {
    const { x, y, z } = result.size;
    document.getElementById('stat-resolution').textContent = `${x} × ${y} × ${z}`;
    document.getElementById('stat-range').textContent = `${result.range.min} ~ ${result.range.max} dBZ`;
    const count = (x * y * z);
    document.getElementById('stat-count').textContent = count >= 1e6 ? `${(count/1e6).toFixed(2)} M` : count.toLocaleString();
    const modes = ['体渲染', 'MIP投影', '等值面'];
    document.getElementById('stat-mode').textContent = modes[this.renderer.params.renderMode];
  }

  showLoader() {
    this.loader.classList.remove('hidden');
  }
  hideLoader() {
    this.loader.classList.add('hidden');
  }
  updateLoader(pct, text) {
    this.loaderFill.style.width = Math.max(0, Math.min(100, pct)) + '%';
    if (text) this.loaderText.textContent = text;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new RadarVolumetricApp();
});
