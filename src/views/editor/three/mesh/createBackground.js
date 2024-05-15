import * as THREE from 'three';


export function cretateBackground() {
  // 全景图作为球体Mesh颜色纹理贴图
  const texture = new THREE.TextureLoader().load("./全景2048.jpg");
  var geometry = new THREE.SphereGeometry(500, 50, 50);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.BackSide, //默认前面可见，设置为背面可见即可
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y += 20;
  mesh.rotateY(Math.PI);

  //设置纹理贴图编码方式和WebGL渲染器或composer后期伽马修正一致
  material.map.encoding = THREE.sRGBEncoding;


  return mesh
}


export function plane() {
  // var gridHelper = new THREE.GridHelper(1000, 80, 0x003333, 0x003333);
  var gridHelper = new THREE.GridHelper(1000, 80, '#1111D4', '#1111D4');
  var geometry = new THREE.PlaneGeometry(1001, 1001);
  var material = new THREE.MeshBasicMaterial({
    // map: texture,
    color: 0xffffff,
   // color: '#2181E6',
    transparent: true,
    opacity: 0.8,
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 1
  mesh.rotateX(-Math.PI / 2);
  return {
    gridHelper,
    mesh
  }
}
