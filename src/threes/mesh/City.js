import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import scene from "../scene";
import modifyCityMaterial from "../modify/modifyCityMaterial";

export default function createCity() {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load("./model/city.glb", (gltf) => {
    // console.log(gltf);

    gltf.scene.traverse((item) => {
      if (item.type == "Mesh") {
        console.log(item);
        const cityMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x0c0e33),
        });
        item.material = cityMaterial;
        modifyCityMaterial(item);
        // if (item.name == "Layerbuildings") {
        //   const meshLine = new MeshLine(item.geometry);
        //   const size = item.scale.x;
        //   meshLine.mesh.scale.set(size, size, size);
        //   scene.add(meshLine.mesh);
        // }
      }
    });
    scene.add(gltf.scene);


  });
}