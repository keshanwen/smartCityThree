<template>
  <div ref="containerRef" class='preview-home'>
  </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import {useEditorStore, useThreeStore } from '@/stores/editor'
import { app } from './index'
import InitThree from '@/views/editor/three/index'
import { cretateBackground, plane } from '@/views/editor/three/mesh/createBackground.js'


/*

  初始化  camera ，clickObj，config

*/

console.log(app, 'app~~~~~~~~~~~~~~~~~')

let containerRef = ref()
const store = useEditorStore()
const threeStore = useThreeStore()

// 模拟接口数据
const obj = JSON.parse(localStorage.getItem('threeStore')!)
threeStore.changeConfig(obj)



function initBackground() {
  const backgroundMesh = cretateBackground()
  const { gridHelper,mesh } = plane()

  app.scene.add(backgroundMesh)
  app.scene.add(gridHelper)
  app.scene.add(mesh)
}

function initModule() {
  const series = threeStore.config.series
  let i = 0
  let seriesLength = series.length

  function next() {
    const curItem = series[i]
    if (!curItem) return
    const { url, modelMessage } = curItem
    app.GLTFLoader.load(url, (gltf) => {
      app.scene.add(gltf.scene)
      gltf.scene.scale.x = modelMessage.scale.x
      gltf.scene.scale.y = modelMessage.scale.y
      gltf.scene.scale.z = modelMessage.scale.z

      gltf.scene.position.x = modelMessage.position.x
      gltf.scene.position.y = modelMessage.position.y
      gltf.scene.position.z = modelMessage.position.z

      gltf.scene.rotation.x = modelMessage.rotation.x
      gltf.scene.rotation.y = modelMessage.rotation.y
      gltf.scene.rotation.z = modelMessage.rotation.z
      i++
      next()
    })
  }

  next()
}

async function init() {
  try {
    initBackground()
   // initModule()
  } catch (error) {
    console.log(error)
  }
}
// init()


onMounted(() => {
  app.appendParent(containerRef.value)
})

</script>


<style lang='scss' scoped>
.preview-home {
  width: 100%;
  height: 100%;
}
</style>