import * as THREE from 'three'
import { lon2xy } from '@/three/util/math.js'


const texture = new THREE.TextureLoader().load('./水面.jpg')
const normalTexture = new THREE.TextureLoader().load('./normal.jpg')

texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping



