import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from '@/shader/varying/vertexShader.glsl'
import fragmentShader from '@/shader/varying/fragmentShader.glsl'



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
const planeGeom = new THREE.PlaneGeometry(100, 100, 100, 100)
const uniforms = {
  time: {
    value: 0
  }
}
const planeMate = new THREE.ShaderMaterial({
  transparent: true,
  side: THREE.DoubleSide,
  uniforms,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
})

const planeMesh = new THREE.Points(planeGeom, planeMate)
planeMesh.rotation.x = -Math.PI / 2;

scene.add(planeMesh)


plane();//设置一个地面
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

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // console.log(camera.position);
}
render();













