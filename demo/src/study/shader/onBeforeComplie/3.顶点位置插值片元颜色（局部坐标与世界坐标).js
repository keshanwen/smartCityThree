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



//const geometry = new THREE.RingGeometry(12, 20, 60)
// const geometry = new THREE.SphereGeometry(15, 32, 16);
const geometry = new THREE.BoxGeometry(30, 80, 30);
const material = new THREE.MeshLambertMaterial({
  // color: 'red',
  side: THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, material)
// mesh.rotation.x = -Math.PI / 2
// mesh.position.y = 0;
// mesh.position.y = 25;
// mesh.position.y = 40
// mesh.position.y = 50;
// mesh.rotateZ(Math.PI / 6);

mesh.position.x = 20
mesh.position.z = 20
mesh.position.y = 40

// 查看模型局部坐标系：判断几何体顶点坐标分布情况
const axesHelper2 = new THREE.AxesHelper(100);
mesh.add(axesHelper2);




material.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    `
    varying vec3 vPosition;//顶点位置插值后的坐标
    void main(){
      // 顶点位置坐标模型矩阵变换后，进行插值计算
      // vPosition = vec3(modelMatrix * vec4( position, 1.0 ));
      vPosition = position;//不考虑模型旋转缩放平移变换(modelMatrix)
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    'void main() {',
    `
    varying vec3 vPosition;
    void main() {
    `
  );


  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',
    `
  #include <dithering_fragment>
  float y0 = 0.0;
  for (int i = 0; i < 4; i++) {
    y0 += 20.0;
    if(vPosition.y > y0 && vPosition.y < y0+1.0 ){
      gl_FragColor = vec4(1.0,1.0,0.0,1.0);
    }
  }
  `
  );

  console.log(shader.fragmentShader)
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

















