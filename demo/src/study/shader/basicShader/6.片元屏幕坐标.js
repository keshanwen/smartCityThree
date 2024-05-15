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


const geometry = new THREE.PlaneGeometry(200.0, 200.0)


/*

  gl_FragCoord.xy坐标系的坐标原点，位于threejs canvas画布的左下角，x轴水平向右，y轴竖直向上，单位是像素px。

  一定注意gl_FragCoord.xy的坐标系，不是平时你threejs代码里面的xyz世界坐标系。

  比如咱们代码中canvas画布的宽高度是500px、500px，右上角的坐标就是(500,500)，中间就是(250,250)
*/

const vertexShader = `
void main(){
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
  // gl_Position = vec4( position, 1.0 );
}
`
// 片元着色器代码
const fragmentShader = `
void main() {
  //根据片元的y坐标，来设置片元的像素值
  if (gl_FragCoord.y < 370.0) {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = vec4(gl_FragCoord.y/740.0*1.0,0.0,0.0,1.0);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  }
}
`

const material = new THREE.ShaderMaterial({
  vertexShader: vertexShader,// 顶点着色器
  fragmentShader: fragmentShader,// 片元着色器
  side: THREE.DoubleSide,
  transparent: true
});

// 创建一个网格模型 三角形渲染模式
const mesh = new THREE.Mesh(geometry, material)
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















