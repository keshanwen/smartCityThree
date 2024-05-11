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

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // console.log(camera.position);

}
render();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const textLoader = new THREE.TextureLoader()
const texture = textLoader.load('ca.jpeg')

//const geometry = new THREE.RingGeometry(12, 20, 60)
const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshLambertMaterial({
  map: texture,
  // color: 'red',
  side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material)
// mesh.rotation.x = -Math.PI / 2
mesh.translateY(15)


material.onBeforeCompile = (shader) => {
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',//一行代码字符串，你可以用单双引号
    //多行代码字符串，用模板字符串``更方便
    `
        #include <dithering_fragment>
          // 灰度图公式
       float gray = 0.299*gl_FragColor.r+0.587*gl_FragColor.g+0.114*gl_FragColor.b;
      gl_FragColor = vec4(gray,gray,gray,gl_FragColor.a);
        `
  )
}

scene.add(mesh)


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

















