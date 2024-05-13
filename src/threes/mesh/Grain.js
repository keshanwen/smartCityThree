import * as THREE from "three";
import gsap from "gsap";


export default class Grain {
  constructor() {
    // const edges = new THREE.EdgesGeometry(geometry);
    // this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
    // const line = new THREE.LineSegments(edges, this.material);
    // this.geometry = edges;
    // this.mesh = line;
    const geometry = new THREE.SphereGeometry(0.05);
    const material = new THREE.MeshBasicMaterial({ color: 'red', transparent: true });
    this.group = new THREE.Group()
    this.meshs = []

    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      function  p(x,z) {
        return new THREE.vec2(x,0,z)
      }
      const ps = [[2,2],[-2,5],[1,6],[-3,5],[4,4],[8,1],[-6,-6],[-9,-1],[0,0],[2,6]]
      mesh.position.x = ps[i][0]
      mesh.position.z = ps[i][1]
      // mesh.position = ps[i]
      this.meshs.push(mesh)
      this.group.add(mesh)
    }
    this.mesh = new THREE.Mesh(geometry, material);
    this.meshs
    // this.mesh.position = new vec3(0,0,10)
    // this.group.add(...this.meshs)
    const animation = () => {
      this.meshs.forEach((item) => {
        if (item.position.y >= 10) {
          item.position.y = 0
        } else {
          item.position.y += 0.03
        }
      })


      requestAnimationFrame(animation)
    }
    animation()
    // gsap.to(this.mesh.position, {
    //   y: 100
    //   duration: 10,
    //   repeat: -1,
    //   yoyo: true,
    // });
  }
}


