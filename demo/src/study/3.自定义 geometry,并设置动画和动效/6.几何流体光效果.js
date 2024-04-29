import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import output_fragment from '@/shader/output_fragment.glsl'

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

var renderer = new THREE.WebGLRenderer({
  antialias: true
});
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


var W = 50;
var geometry = new THREE.PlaneGeometry(5000, W); //矩形平面
// 浏览器控制台查看几何体UV坐标
// console.log('geometry.attributes.uv',geometry.attributes.uv)
var material = new THREE.MeshLambertMaterial({
  color: 0x001111, //颜色
}); //材质对象Material
var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
model.add(mesh); //网格模型添加到model中


const mesh2 = mesh.clone()
const textLoader = new THREE.TextureLoader()
const texture = textLoader.load('./路面流光.png')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.x = 10

mesh2.material = new THREE.MeshLambertMaterial({
  color: 0x00ffff, //颜色
  map: texture,
  transparent: true,
  depthTest: false,
})
mesh2.material.color.set(0xffd700);
mesh2.scale.y *= 0.1
model.add(mesh2);
mesh2.position.y = W / 4


scene.add(model)

const mesh3 = mesh2.clone()
mesh3.material = mesh2.material.clone()
mesh3.position.y = -W / 4
const texture2 = textLoader.load('./路面流光.png')
// 设置阵列模式为 RepeatWrapping
texture2.wrapS = THREE.RepeatWrapping
texture2.wrapT = THREE.RepeatWrapping
texture2.repeat.x = 10;// x方向阵列
mesh3.material.map = texture2
mesh3.material.color.set(0x00ffff)
model.add(mesh3);

function flowAnimation() {
  requestAnimationFrame(flowAnimation);
  //光带流动效果
  texture.offset.x -= 0.02;
  texture2.offset.x += 0.02;
}
flowAnimation();


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



