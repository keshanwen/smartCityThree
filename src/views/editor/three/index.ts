import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import { getContainerWH } from '@/views/editor/three/util';

interface SeriesItem {
  name: string
}

interface Config {
  container: HTMLElement;
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
  constructor(config: Config) {
    this.config = config;
    this.scene = this.initScene();
    this.camera = this.initCamera();
    this.renderer = this.initRenderer();
    this.controls = this.initCrols();
    // this.gui = this.initGui()
    this.initAxesHelper()
    this.listentEvent()
    this.appendParent()
    this.render()
    this.initLight()
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
    // 设置相机位置
    camera.position.set(5, 10, 15);

    return camera;
  }
  initRenderer() {
    // 初始化渲染器
    const renderer = new THREE.WebGLRenderer({
      // 抗锯齿
      antialias: true,
      // logarithmicDepthBuffer: true,
    });
    // 设置渲染尺寸大小
    renderer.setSize(this.config.width, this.config.height);
    renderer.shadowMap.enabled = true;

    return renderer
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

    return gui
  }
  listentEvent() {
    // 更新摄像头
    this.camera.aspect = this.config.width / this.config.height;
    //   更新摄像机的投影矩阵
    this.camera.updateProjectionMatrix();

    // 监听屏幕大小改变的变化，设置渲染的尺寸
    window.addEventListener('resize', () => {
      const { width, height } = getContainerWH(this.config.container);
      this.config.width = width;
      this.config.height = height;
      console.log('resize');
      // 更新摄像头
      this.camera.aspect = this.config.width / this.config.height;
      //   更新摄像机的投影矩阵
      this.camera.updateProjectionMatrix();

      //   更新渲染器
      this.renderer.setSize(this.config.width, this.config.height);
      //   设置渲染器的像素比例
      this.renderer.setPixelRatio(window.devicePixelRatio);
    });
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

    return controls
  }
  render() {
    const clock = new THREE.Clock();
    this.controls.update();
    const time = clock.getElapsedTime();
    requestAnimationFrame(() => this.render());
    // 使用渲染器渲染相机看这个场景的内容渲染出来
    this.renderer.render(this.scene, this.camera);
  }
  appendParent() {
    this.config.container.appendChild(this.renderer.domElement)
  }
}

export default InitThree




