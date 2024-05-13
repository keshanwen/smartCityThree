import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "../scene";
import modifyCityMaterial from "../modify/modifyCityMaterial";
import MeshLine from "./MeshLine";
import { Fyline } from "./Fyline";
import LightWall from "./LightWall";

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/city.glb", (gltf) => {
    // console.log(gltf);

    gltf.scene.traverse((item) => {
      if (item.type == "Mesh") {
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e33), // 0x009966
        });
        item.material = cityMaterial;
        modifyCityMaterial(item);
        if (item.name == "Layerbuildings") {
          const meshLine = new MeshLine(item.geometry);
          const size = item.scale.x;
          meshLine.mesh.scale.set(size, size, size);
          scene.add(meshLine.mesh);
        }
      }
    });
    scene.add(gltf.scene);

    // 添加飞线
    scene.add(Fyline)

    // 添加光墙
    const lightWall = new LightWall();
    scene.add(lightWall.mesh);
  });
}