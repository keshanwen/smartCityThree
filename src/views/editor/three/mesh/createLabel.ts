import * as THREE from 'three';
// 引入CSS3渲染器CSS3DRenderer
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import InitThree from '@/views/editor/three/index';

function createBox(mesh: THREE.Object3D) {
  const box = new THREE.Box3();
  box.setFromObject(mesh);
  const size = new THREE.Vector3();
  box.getSize(size);
  var center = new THREE.Vector3();
  box.getCenter(center);

  return {
    size,
    center,
  };
}

export function creatShowTag(
  app: InitThree,
  parentName: string,
  name: string,
  content: any[],
) {
    // 创建 html 元素
    const div = document.createElement('div');
    let text = content.reduce((acc, cur) => {
      return acc + cur.text + '<br/>';
    }, '');

    div.innerHTML = `${text}`;
    div.style.fontSize = '12px';
  div.style.color = '#fff';
  div.style.padding = '6px';
    div.style.backgroundColor = 'rgba(0,0,0,0.4)';
    div.style.borderRadius = '5px';

    div.classList.add('tag');

    let tag = new CSS3DObject(div);
    tag.name = name;
    tag.scale.set(0.5, 0.5, 0.5); //缩放标签尺寸
    const parentMesh: any = app.scene.getObjectByName(parentName);
    const { size, center } = createBox(parentMesh);
    const { x: tx, y: ty, z: tz } = parentMesh.position;
    const OFFSET = 10;
    // 简单的判断
    if (center.y == 0) {
      tag.position.y = size.y / 2 + OFFSET;
    } else {
      tag.position.y = size.y + OFFSET;
    }
    // tag.position.y = size.y - center.y;
    tag.position.x = tx;
    tag.position.z = tz;

    parentMesh.add(tag)
}

export function changeMeshVisible(app: InitThree, name: string, visible: boolean) {
  const mesh: any = app.scene.getObjectByName(name);
  mesh.visible = visible;
}

export function deleteMesh(app: InitThree, parentName: string, name: string) {
  const parentMesh: any = app.scene.getObjectByName(parentName);
  let mesh: any = app.scene.getObjectByName(name);
  parentMesh.remove(mesh)

  mesh.traverse((obj: any) => {
    if (obj?.geometry?.dispose) {
      obj.geometry.dispose();
    }
    if (obj?.material?.dispose) {
      obj.material.dispose();
    }
    if (obj?.dispose) {
      obj.dispose();
    }
  });
  mesh = null;

}

