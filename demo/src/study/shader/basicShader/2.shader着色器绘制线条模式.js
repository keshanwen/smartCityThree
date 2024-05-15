import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from '@/shader/wave/vertex.glsl';
import fragmentShader from '@/shader/wave/fragment.glsl'




var scene = new THREE.Scene();
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
var ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambient);
var axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);
var width = window.innerWidth;
var height = window.innerHeight;
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({
  antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
// renderer.setClearColor(0xffffff, 1); //设置背景颜色
// renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

var controls = new OrbitControls(camera, renderer.domElement);
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const geometry = new THREE.BufferGeometry()
var vertices = new Float32Array([
  0.6, 0.2, 0, //顶点1坐标
  0.7, 0.6, 0, //顶点2坐标
  0.8, 0.2, 0, //顶点3坐标
  -0.6, -0.2, 0, //顶点4坐标
  -0.7, -0.6, 0, //顶点5坐标
  -0.8, -0.2, 0, //顶点6坐标
]);
const attribute = new THREE.BufferAttribute(vertices, 3)
geometry.setAttribute('position', attribute)

const material = new THREE.ShaderMaterial({
  vertexShader: `
    void main() {
      // 控制渲染的点大小
      // gl_PointSize=20.0;
      // 逐顶点处理：顶点位置数据赋值给内置变量gl_Position
      gl_Position = vec4( position, 1.0 );
    }
  `,
  fragmentShader: `
    void main() {
      // 逐片元处理：每个片元或者说像素设置为红色
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  `
})


const line = new THREE.Line(geometry, material)
scene.add(line)


// plane();//设置一个地面
function plane() {
  var gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
  var geometry = new THREE.PlaneGeometry(310, 310);
  var material = new THREE.MeshLambertMaterial({
    // map: texture,
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 1
  mesh.rotateX(-Math.PI / 2);
  scene.add(gridHelper)
  scene.add(mesh)
}

const clock = new THREE.Clock();
function render() {
  const deltaTime = clock.getDelta();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();















