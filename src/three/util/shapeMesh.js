import * as THREE from 'three';
import { lon2xy } from '@/three/util/math.js'

// pointsArrs：多个多边形轮廓
function ShapeMesh(pointsArrs) {
  var shapeArr = []; //轮廓形状Shape集合
  pointsArrs.forEach(pointsArr => {
    var vector2Arr = [];
    // 转化为Vector2构成的顶点数组
    pointsArr[0].forEach(elem => {
      const xy = lon2xy(elem[0],elem[1])
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y))
    });
    var shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });
  var geometry = new THREE.ShapeGeometry( //填充多边形
    shapeArr,
  );
  var material = new THREE.MeshLambertMaterial({
    color: 0x009999,
  }); //材质对象
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}
export {
  ShapeMesh
};