import * as THREE from 'three';
import { lon2xy } from '@/three/util/math.js'

var material = new THREE.MeshLambertMaterial({
  color: 0x009999,
}); //材质对象
// pointsArrs：多个轮廓，一个轮廓对应pointsArrs的一个元素
function ExtrudeMesh(pointsArrs, height) {
  var shapeArr = []; //轮廓形状Shape集合
  pointsArrs.forEach(pointsArr => {
    var vector2Arr = [];
    // 转化为Vector2构成的顶点数组
    pointsArr[0].forEach(elem => {
      var xy = lon2xy(elem[0], elem[1]);//经纬度转墨卡托坐标
      vector2Arr.push(new THREE.Vector2(xy.x, xy.y));
    });
    var shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });

  var geometry = new THREE.ExtrudeGeometry( //拉伸造型
    shapeArr, //多个多边形二维轮廓
    //拉伸参数
    {
      depth: height, //拉伸高度
      bevelEnabled: false, //无倒角
    }
  );
  var mesh = new THREE.Mesh(geometry, material); //网格模型对象
  return mesh;
}
export {
  ExtrudeMesh
}

