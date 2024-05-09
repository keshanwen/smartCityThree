import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './context'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// var scene = new THREE.Scene();


// var pointLight = new THREE.PointLight(0xffffff, 1.0);
// pointLight.position.set(400, 200, 300);

// scene.add(pointLight);
// var ambient = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambient);

// // AxesHelper：辅助观察的坐标系
// const axesHelper = new THREE.AxesHelper(150);
// scene.add(axesHelper);


// var width = window.innerWidth - 10;
// var height = window.innerHeight - 10;

// var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(6, 6, 6);
// camera.lookAt(0, 0, 0);

// var renderer = new THREE.WebGLRenderer({
//   antialias: true
// });
// renderer.setSize(width, height);
// document.body.appendChild(renderer.domElement);


// const controls = new OrbitControls(camera, renderer.domElement);



// // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load('./ca.jpeg')


// const geometry = new THREE.PlaneGeometry(1, 1,64,64)
// const shaderMaterial = new THREE.RawShaderMaterial({
//   vertexShader: basicVertexShader,
//   fragmentShader: basicFragmentShader,
//   side: THREE.DoubleSide,
//   uniforms: {
//     uTime: {
//       value: 0,
//     },
//     uTexture: {
//       value: texture
//     }
//   }
// })
// const mesh = new THREE.Mesh(geometry, shaderMaterial)

// scene.add(mesh)


// const clock = new THREE.Clock()
// function render() {
//   const elapsedTime = clock.getElapsedTime();
//   shaderMaterial.uniforms.uTime.value = elapsedTime
//   renderer.render(scene, camera);
//   requestAnimationFrame(render);
// }
// render();

// // plane();//设置一个地面
// function plane() {
//   var gridHelper = new THREE.GridHelper(300, 15, 0x003333, 0x003333);
//   scene.add(gridHelper);
//   var geometry = new THREE.PlaneGeometry(310, 310);
//   var material = new THREE.MeshLambertMaterial({
//     // map: texture,
//     color: 0xffffff,
//     transparent: true,
//     opacity: 0.1,
//     side: THREE.DoubleSide,
//   });
//   var mesh = new THREE.Mesh(geometry, material);
//   mesh.position.y = 1
//   scene.add(mesh);
//   mesh.rotateX(-Math.PI / 2);
// }



