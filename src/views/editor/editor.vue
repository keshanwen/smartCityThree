<template>
    <div class='editor-home'>
    <div ref="containerRef" class="left">

    </div>
    <div class="right">

    </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, nextTick, onMounted } from 'vue'
import * as THREE from 'three';
import { getContainerWH } from '@/views/editor/three/util'
import InitThree from '@/views/editor/three/index'
import { cretateBackground, plane } from '@/views/editor/three/mesh/createBackground.js'


let containerRef = ref()
let config = ref({
  container: undefined,
  width: 200,
  height: 200,
  series: []
})
let app: InitThree  // three 实例

async function initConfig() {
  try {
    await nextTick()
    const { width, height } = getContainerWH(containerRef.value)
    config.value.width = width
    config.value.height = height
  } catch (error) {
    console.log(error)
  }
}

function test() {
    const geometry = new THREE.BoxGeometry(40, 40, 40)
    const material = new THREE.MeshLambertMaterial({
      color: 'red'
    })
  const mesh = new THREE.Mesh(geometry, material)
    mesh.position.y += 20
    app.scene.add(mesh)
}

function initBackground() {
  const backgroundMesh = cretateBackground()
  const { gridHelper,mesh } = plane()

  app.scene.add(backgroundMesh)
  app.scene.add(gridHelper)
  app.scene.add(mesh)
}

async function init() {
  try {
    await initConfig()
    // 初始化 three 实例
    app = new InitThree({
      container: containerRef.value,
      width: config.value.width,
      height: config.value.height,
      series: [],
    })

   test()
   initBackground()
  } catch (error) {
    console.log(error)
  }
}
init()

onMounted(() => {

})

</script>


<style scoped lang="less">
.editor-home {
  display: flex;
  height: 100vh;
  .left {
    flex: 1;
    height: 100%;
  }
  .right {
    width: 300px;
    height: 100%;
    border-left: 1px solid red;
  }
}
</style>