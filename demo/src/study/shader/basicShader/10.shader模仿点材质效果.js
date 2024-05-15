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

const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  25, 0, 0, //顶点2坐标
  50, 0, 0, //顶点3坐标
  75, 0, 0, //顶点4坐标
  100, 0, 0, //顶点5坐标
]);
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

// 顶点着色器代码
const vertexShader = `
void main(){
  gl_PointSize = 10.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
/*
const fragmentShader = `
void main() {
    if(gl_PointCoord.x<0.5){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }else{
      gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    }
}
` */

/* const fragmentShader = `
void main() {
    if(gl_PointCoord.y<0.5){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }else{
      gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    }
}
` */


/* // 片元着色器代码
const fragmentShader = `
void main() {
    if(gl_PointCoord.x<0.5 && gl_PointCoord.y<0.5){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }else{
      gl_FragColor = vec4(0.0,0.0,1.0,1.0);
    }
}
`
 */

// 片元着色器代码
const fragmentShader = `
void main() {
  // vec2(0.5, 0.5)是方形点的圆心
  float r = distance(gl_PointCoord, vec2(0.5, 0.5));
  if(r < 0.5){
    // 方形区域片元距离几何中心半径小于0.5，像素颜色设置红色
    gl_FragColor = vec4(1.0,0.0,0.0,0.5);
  }else {
    // 方形区域距离几何中心半径不小于0.5的片元剪裁舍弃掉：
    discard;
  }
}
`

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  vertexColors: true,//允许设置使用顶点颜色渲染,
  transparent: true
});
// const material = new THREE.PointsMaterial({
//   color: 0x00ffff,
//   size: 10.0 //点渲染大小调节
// });


/*
  Points表示把顶点数据渲染为方形点。
*/
const points = new THREE.Points(geometry, material); //点模型对象

scene.add(points)
points.position.y += 40




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















