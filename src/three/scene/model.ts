import * as THREE from 'three';



const model = new THREE.Group()

const shape = new THREE.Shape([
  new THREE.Vector2(0, 0),
  new THREE.Vector2(60, 0),
  new THREE.Vector2(60, 80),
  new THREE.Vector2(40, 120),
  new THREE.Vector2(-20,80)
])

const shape2 = new THREE.Shape([
  new THREE.Vector2(100, 0),
  new THREE.Vector2(160, 0),
  new THREE.Vector2(160, 80),
  new THREE.Vector2(140, 120),
]);

const geometry = new THREE.ShapeGeometry([shape, shape2])
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide,
  // wireframe: true
})
const mesh = new THREE.Mesh(geometry, material)

model.add(mesh)


export {
  model
}