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


const geometry = new THREE.PlaneGeometry(20.0, 20.0)

const vertexShader = `
void main(){
  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );
  // gl_Position = vec4( position, 1.0 );
}
`
// 片元着色器代码
const fragmentShader = `
uniform float opacity;//uniform声明透明度变量opacity
void main() {
    gl_FragColor = vec4(0.0,1.0,1.0, opacity);
}
`

const material = new THREE.ShaderMaterial({
  uniforms: {
    // 给透明度uniform变量opacity传值
    opacity: { value: 0.3 }
  },
  vertexShader: vertexShader,// 顶点着色器
  fragmentShader: fragmentShader,// 片元着色器
  side: THREE.DoubleSide,
  transparent: true
});

// 创建一个网格模型 三角形渲染模式
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


setTimeout(() => {

  // material.uniforms.color.value.set(0xff0000);
  setInterval(() => {
    if (material.uniforms.opacity.value > 1) {
      material.uniforms.opacity.value = 0
    }
    material.uniforms.opacity.value += 0.1;
  }, 100)
}, 2000)



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















