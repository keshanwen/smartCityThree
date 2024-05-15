const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
const vertices = new Float32Array([//类型数组创建顶点数据
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 25, 0, //顶点3坐标
]);
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);
