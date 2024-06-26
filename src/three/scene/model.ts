import * as THREE from 'three';
import { ShapeMesh } from '@/three/util/shapeMesh.js';
import { ExtrudeMesh } from '@/three/util/extrudeMesh.js';

const model = new THREE.Group(); //声明一个组对象，用来添加城市三场场景的模型对象
const loader = new THREE.FileLoader();
loader.setResponseType('json');
loader.load('./上海外滩.json', function (data: any) {
  const buildGroup = new THREE.Group(); //作为所有每栋楼Mesh的父对象
  data.features.forEach((build: any) => {
    if (build.geometry) {
      // build.geometry.type === "Polygon"表示建筑物底部包含一个多边形轮廓
      //build.geometry.type === "MultiPolygon"表示建筑物底部包含多个多边形轮廓
      if (build.geometry.type === 'Polygon') {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      // buildGroup.add(ShapeMesh(build.geometry.coordinates));
      //build.properties.Floor*3近似表示楼的高度
      var height = build.properties.Floor * 3;
      buildGroup.add(ExtrudeMesh(build.geometry.coordinates, height));
    }
  });
  model.add(buildGroup);
});
loader.load('./黄浦江.json', function (data:any) {
  const buildGroup = new THREE.Group();
  data.features.forEach((build: any) => {
    if (build.geometry) {
      if (build.geometry.type === 'Polygon') {
        build.geometry.coordinates = [build.geometry.coordinates];
      }
      buildGroup.add(ShapeMesh(build.geometry.coordinates));
    }
  });
  model.add(buildGroup);
});

export { model };