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

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // console.log(camera.position);
}
render();



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var model = new THREE.Group(); //声明一个组对象

const geometry = new THREE.BufferGeometry()
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(100, 0, -100),
  new THREE.Vector3(0, 80, 0),
  new THREE.Vector3(-100, 0, 100)
])
const points = curve.getSpacedPoints(100)
geometry.setFromPoints(points)
const material = new THREE.LineBasicMaterial({
  color: 0x006666,
})
const line = new THREE.Line(geometry, material)

model.add(line)


let index = 20 // 取点索引位置
const num = 15 // 从曲线上获取点的位置
const points2 = points.slice(index, index + num) // 从曲线上获取一段
const curve2 = new THREE.CatmullRomCurve3(points2)
const newPoints2 = curve2.getSpacedPoints(100)
const geometry2 = new THREE.BufferGeometry()
geometry2.setFromPoints(newPoints2)

// 每个顶点对应一哥百分比数据 attributes.percent 用于控制点的渲染大小
const percentArr = [] // attribute.percent 的数据
const newPoint2Len = newPoints2.length
for (let i = 0; i < newPoint2Len; i++) {
  percentArr.push(i / newPoint2Len)
}
const percentAttribue = new THREE.BufferAttribute(new Float32Array(percentArr), 1)
geometry2.attributes.percent = percentAttribue

// 批量计算所有顶点颜色数据
const colorArr = [];
for (var i = 0; i < newPoint2Len; i++) {
  const color1 = new THREE.Color(0x006666); //轨迹线颜色 青色, 起点颜色
  const color2 = new THREE.Color(0xffff00); //黄色, 终点颜色
  const color = color1.lerp(color2, i / newPoint2Len)
  colorArr.push(color.r, color.g, color.b);
}
// 设置几何体顶点颜色数据
geometry2.attributes.color = new THREE.BufferAttribute(new Float32Array(colorArr), 3);

// 点模型渲染几何体每个顶点
const PointsMaterial = new THREE.PointsMaterial({
  size: 5.0,
  vertexColors: true,
  transparent: true,
  depthTest: false
})
const flyPoints = new THREE.Points(geometry2, PointsMaterial)
model.add(flyPoints)

// 修改点材质的着色器源码
PointsMaterial.onBeforeCompile = (shader) => {

  // 顶点着色器中声明一个attribute 变量： 百分比
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    [
      'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
      'void main() {',
    ].join('\n') // .join()把数组元素合成字符串
  )

  // 调整点渲染的大小
  shader.vertexShader = shader.vertexShader.replace(
    'gl_PointSize = size;',
    [
      'gl_PointSize = percent * size;',
    ].join('\n') // .join()把数组元素合成字符串
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <premultiplied_alpha_fragment>',
    [
      '#include <premultiplied_alpha_fragment>',
      'gl_FragColor.a = 0.5;'
    ].join('\n')
  )

  console.log(shader.fragmentShader)
}

// 飞线动画
let indexMax = points.length - num // 飞线取点索引范围
function animation() {
  if (index > indexMax) index = 0
  index += 1
  const points2 = points.slice(index, index + num) // 从曲线上获取一段
  const curve = new THREE.CatmullRomCurve3(points2)
  const newPoints2 = curve.getSpacedPoints(100)
  geometry2.setFromPoints(newPoints2)

  requestAnimationFrame(animation)
}
// animation()

plane();//设置一个地面
function plane() {
  var gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
  model.add(gridHelper);
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
  model.add(mesh);
  mesh.rotateX(-Math.PI / 2);
}



scene.add(model)











