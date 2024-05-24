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
  mesh.name = '天空全景图'
  mesh.position.y += 20;
  mesh.rotateY(Math.PI);

  //设置纹理贴图编码方式和WebGL渲染器或composer后期伽马修正一致
  material.map.encoding = THREE.sRGBEncoding;

  mesh.renderOrder = -2
  return mesh
}


export function plane() {
  // var gridHelper = new THREE.GridHelper(1000, 80, 0x003333, 0x003333);
  // 0x004444 '#60A6F0'
  var gridHelper = new THREE.GridHelper(1000, 80, '#60A6F0', '#60A6F0');
  gridHelper.material.depthWrite = false;
  gridHelper.renderOrder = -2;
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
  mesh.name = '地板'
  mesh.renderOrder = -1;
 //mesh.position.y = 0.1
  mesh.rotateX(-Math.PI / 2);
  return {
    gridHelper,
    mesh
  }
}


/*

封装一个函数，几何相关参数尽量参数化，方便快速调整尺寸改变渲染效果
rangeSize：地面网格尺寸
divisions:地面网格细分数
color：网格线颜色
R:圆点半径  加号宽高尺寸
RColor：原点颜色

*/
export function plus(rangeSize, divisions, color, R, RColor) {
  var group = new THREE.Group();
  var gridHelper = new THREE.GridHelper(rangeSize, divisions, color, color);
  group.add(gridHelper);
  // console.log('gridHelper',gridHelper)
  gridHelper.material.depthWrite = false;
  gridHelper.renderOrder = -2;
  // 加号点缀符号
  var 加号宽度 = R / 6
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //类型数组创建顶点数据
  var w = 加号宽度 / 2;
  var h = R / 2
  var vertices = new Float32Array([
    -h, 0, 0, 0, 0, -h, h, 0, 0, 0, 0, h,
  ]);
  geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);
  var indexs = new Uint16Array([
    0, 1, 2, 0, 2, 3,
  ]);
  geometry.index = new THREE.BufferAttribute(indexs, 1);
  // 可以选择基础网格材质，基础网格材质不受光照影响，和其它场景配合，颜色更稳定，而且节约渲染资源
  var material = new THREE.MeshBasicMaterial({
    color: RColor,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  // 共享材质和几何体数据，批量创建圆点mesh
  var 间距 = rangeSize / divisions
  var 范围一半 = rangeSize / 2
  for (let i = 0; i < divisions; i++) {
    for (let j = 0; j < divisions; j++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.renderOrder = -1;
      mesh.translateX(-范围一半 + i * 间距);
      mesh.translateZ(-范围一半 + j * 间距);
      group.add(mesh)
    }
  }
  return group
}
