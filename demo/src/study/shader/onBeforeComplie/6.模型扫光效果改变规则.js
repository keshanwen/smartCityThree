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
mesh.translateY(40)


material.onBeforeCompile = (shader) => {
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    `
    varying vec3 vPosition;//顶点位置插值后的坐标
    void main(){
      // 顶点位置坐标模型矩阵变换后，进行插值计算
      vPosition = vec3(modelMatrix * vec4( position, 1.0 ));
    `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    'void main() {',
    `
    uniform float y; //变化的y控制光带高度
    float w = 10.0;//光带宽度一半
    varying vec3 vPosition;
    void main() {
    `
  );


  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <dithering_fragment>',
    `
  #include <dithering_fragment>
  // 如果让y随着时间的变化，就可以实现一个动态的扫光效果。
        // y随着时间改变光带位置也会改变
    if (vPosition.y >= y && vPosition.y < y + w) {
      float per = (vPosition.y - y) / w;//范围0~1
      per = pow(per, 2.0);//平方
      gl_FragColor.rgb = mix(vec3(1.0, 1.0, 0.0), gl_FragColor.rgb, per);
    }
    if (vPosition.y <= y && vPosition.y > y - w) {
      float per = (y - vPosition.y) / w;//范围0~1
      per = pow(per, 2.0);//平方
      gl_FragColor.rgb = mix(vec3(1.0, 1.0, 0.0), gl_FragColor.rgb, per);
    }
  `
  );


  shader.uniforms.y = { value: 30 }
  console.log(shader.uniforms)

  mesh.shader = shader
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

const clock = new THREE.Clock();
function render() {
  const deltaTime = clock.getDelta();
  renderer.render(scene, camera);
  // console.log(camera.position);
  if (mesh.shader) {
    // enderer.render执行一次，才能获取到mesh.shader
    mesh.shader.uniforms.y.value += 30 * deltaTime;
    // 一旦y接近模型mesh顶部，重新设置为0，这样扫光反复循环
    if (mesh.shader.uniforms.y.value > 80) mesh.shader.uniforms.y.value = 0;
  }
  requestAnimationFrame(render);
}
render();















