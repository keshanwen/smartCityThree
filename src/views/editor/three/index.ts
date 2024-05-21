import { ref,reactive, nextTick } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as dat from 'dat.gui';
import { getContainerWH } from '@/views/editor/three/util';
import { emitControlChange } from '@/views/editor/three/eventListen';
// 引入CSS2渲染器CSS2DRenderer
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';



interface SeriesItem {
  name: string
}

interface Config {
  width: number;
  height: number;
  series: SeriesItem[]
}

class InitThree {
  config: Config;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  gui: any;
  controls: any;
  GLTFLoader: GLTFLoader;
  css2Renderer: CSS2DRenderer;
  constructor(config?: Partial<Config>) {
    this.config = this.initConfig((config = {}));
    /* 在写项目时每一个功能应该是一个类 */
    this.scene = this.initScene();
    this.camera = this.initCamera();
    this.renderer = this.initRenderer();
    this.css2Renderer = this.initcss2Renderer();
    this.controls = this.initCrols();
    // this.gui = this.initGui()
    // this.initAxesHelper()
    this.GLTFLoader = this.initGLTFLoader();
    this.render();
    this.initLight();
    nextTick(() => {
      this.confirmViewParams();
    });
  }
  private initGLTFLoader(): GLTFLoader {
    // gltf加载
    const draco = new DRACOLoader();
    draco.setDecoderPath('http://localhost:1949/draco/');
    const loader: GLTFLoader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    return loader;
  }
  initConfig(config: Partial<Config>): Config {
    return {
      series: config?.series || [],
      width: config?.width || 100,
      height: config?.height || 100,
    };
  }
  // 写项目时不应该将此方法挂载在此类中,将此方法抽取到工具类中
  confirmViewParams() {
    emitControlChange({
      position: this.camera.position,
      target: this.controls.target,
    });
  }
  initScene() {
    // 初始化场景
    const scene = new THREE.Scene();
    return scene;
  }
  initCamera() {
    // 创建透视相机
    const camera = new THREE.PerspectiveCamera(
      75,
      this.config.width / this.config.height,
      1,
      50000
    );
    // 设置相机位置  -183.05,29.03,25.47
    // camera.position.set(5, 10, 15);
    // camera.position.set(50, 100, 150);
    camera.position.set(-183.05, 29.03, 25.47);

    return camera;
  }
  initRenderer() {
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({
      // 抗锯齿
      antialias: true,
      // 设置对数深度缓冲区，优化深度冲突问题
      // logarithmicDepthBuffer: true,
      // logarithmicDepthBuffer: true,
    });
    // 设置渲染尺寸大小
    renderer.setSize(this.config.width, this.config.height);
    renderer.shadowMap.enabled = true;

    return renderer;
  }
  initcss2Renderer() {
    // 创建一个CSS2渲染器CSS2DRenderer
    let css2Renderer = new CSS2DRenderer();
    // width, height：canvas画布宽高度
    css2Renderer.setSize(this.config.width, this.config.height);
    css2Renderer.domElement.style.pointerEvents = 'none';

    return css2Renderer;
  }
  initLight() {
    /**
     * 光源设置
     */
    // 平行光1
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(200, 400, 300);
    this.scene.add(directionalLight);
    // 平行光2
    var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-200, -400, 300);
    this.scene.add(directionalLight2);
    //环境光
    var ambient = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambient);
  }
  initGui() {
    //创建gui对象
    const gui = new dat.GUI();

    return gui;
  }
  resize(parentDOM: HTMLElement) {
    const { width, height } = getContainerWH(parentDOM);
    this.config.width = width;
    this.config.height = height;

    // 更新摄像头
    this.camera.aspect = this.config.width / this.config.height;
    //   更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix();

    //   更新渲染器
    this.renderer.setSize(this.config.width, this.config.height);
    //   设置渲染器的像素比例
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // width, height：canvas画布宽高度
    this.css2Renderer.setSize(this.config.width, this.config.height);
  }
  initAxesHelper() {
    // 加入辅助轴，帮助我们查看3维坐标轴
    const axesHelper = new THREE.AxesHelper(150);
    this.scene.add(axesHelper);
  }
  initCrols() {
    // 初始化控制器
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 设置控制器阻尼
    controls.enableDamping = true;
    // controls.autoRotate = true;

    controls.addEventListener('change', () => {
      this.confirmViewParams();
    }); //监听鼠标、键盘事件

    return controls;
  }
  render() {
    const clock = new THREE.Clock();
    this.controls.update();
    const time = clock.getElapsedTime();
    requestAnimationFrame(() => this.render());
    // 使用渲染器渲染相机看这个场景的内容渲染出来
    this.renderer.render(this.scene, this.camera);
    // 用法和webgl渲染器渲染方法类似
    this.css2Renderer.render(this.scene, this.camera);
  }
  appendParent(parentDOM: HTMLElement) {
    this.resize(parentDOM);
    this.css2Renderer.domElement.style.position = 'absolute';
    this.css2Renderer.domElement.style.top = '0px';

    parentDOM.appendChild(this.renderer.domElement);
    parentDOM.appendChild(this.css2Renderer.domElement);
  }
}

export default InitThree




