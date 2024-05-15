const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  25, 0, 0, //顶点2坐标
  50, 0, 0, //顶点3坐标
  75, 0, 0, //顶点4坐标
  100, 0, 0, //顶点5坐标
]);
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);
const material = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 10.0 //点渲染大小调节
});
const points = new THREE.Points(geometry, material); //点模型对象
