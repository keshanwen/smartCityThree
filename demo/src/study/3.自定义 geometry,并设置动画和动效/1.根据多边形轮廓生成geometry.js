import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

var scene = new THREE.Scene();


var pointLight = new THREE.PointLight(0xffffff, 1.0);
pointLight.position.set(400, 200, 300);
scene.add(pointLight);
var ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);


var width = window.innerWidth - 10;
var height = window.innerHeight - 10;

var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



var model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景


var c = [
  0, 0, //顶点1坐标
  60, 0, //顶点2坐标
  60, 80, //顶点3坐标
  40, 120, //顶点4坐标
  -20, 80, //顶点5坐标
  0, 0, //顶点6坐标  和顶点1重合
]
var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
var posArr = [];
var h = 20; //围墙拉伸高度
for (var i = 0; i < c.length - 2; i += 2) {
  // 三角形1  三个顶点坐标
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], 0, c[i + 2], c[i + 3], h);
  // 三角形2  三个顶点坐标
  posArr.push(c[i], c[i + 1], 0, c[i + 2], c[i + 3], h, c[i], c[i + 1], h);
}
// 设置几何体attributes属性的位置position属性
geometry.attributes.position = new THREE.BufferAttribute(new Float32Array(posArr), 3);
geometry.computeVertexNormals();
geometry.computeVertexNormals();
var material = new THREE.MeshLambertMaterial({
  color: 0xffff00, //三角面颜色
  side: THREE.DoubleSide, //两面可见
  // wireframe: true,//查看三角形结构
});
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh


scene.add(mesh)

plane();//设置一个地面
function plane() {
  var gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
  scene.add(gridHelper);
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
  scene.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}



