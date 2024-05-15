import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";



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

const geometry = new THREE.PlaneGeometry(100, 50);

// 顶点着色器代码
const vertexShader = `
varying vec3 vPosition;//表示顶点插值后位置数据，与片元数量相同，一一对应
void main(){
  //vPosition = position;// 顶点位置坐标插值计算
   // 考虑mesh及其父对象旋转、缩放、平移的影响
  vPosition = vec3(modelMatrix * vec4( position, 1.0 ));
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

// 片元着色器代码
const fragmentShader = `
varying vec3 vPosition;
void main() {
    // float per = (vPosition.y + 25.0)/50.0;
    float per = (vPosition.y)/50.0;
    // 几何体顶点y坐标25，颜色值：1  0  0(红色)
    // 几何体顶点y坐标-25，颜色值：0  1  0(绿色)
    gl_FragColor = vec4(per,1.0-per,0.0,1.0);
}
`



const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  vertexColors: true,//允许设置使用顶点颜色渲染
});


// 创建一个网格模型 三角形渲染模式
const mesh = new THREE.Mesh(geometry, material)
mesh.position.y += 25
scene.add(mesh)





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















