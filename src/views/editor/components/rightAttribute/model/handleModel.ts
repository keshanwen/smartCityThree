import { useThreeStore } from '@/stores/editor';
import * as THREE from 'three';


const threeStore = useThreeStore();

export function handleModelName(mesh: THREE.Object3D) {
  let obj: any = {};

  // 这里简单处理，只处理第一层, type: 'Object3D' 暂时不处理
  mesh.traverse((item) => {
    if (item.name !== 'Scene' && item.type !== 'Object3D') {
      if (Object.keys(obj).length == 0) {
        const { name, scale, position, rotation } = item
        obj = {
          name,
          scale: {
            x: Number(scale.x),
            y: Number(scale.y),
            z: Number(scale.z),
          },
          position: {
            x: Number(position.x),
            y: Number(position.y),
            z: Number(position.z),
          },
          rotation: {
            x: Number(rotation.x),
            y: Number(rotation.y),
            z: Number(rotation.z),
          },
        };
      }
    }
  });

  return obj;
}


// 组装数据
export function assemblyData(mesh: THREE.Object3D, url: string) {
  let modelMessage = handleModelName(mesh);

  return {
    url,
    modelMessage
  }
}