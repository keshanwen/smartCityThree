<template>
    <div class='editor-home'>
      <!-- 3D 场景 -->
      <div class="left">
        <div class="opeator">
          <div class="back" @click="goIndex">
            < 返回可视化看板
          </div>
        </div>
        <div ref="containerRef" class="container"></div>
      </div>
      <!-- 右边属性 -->
      <div class="right">
        <rightAttribute/>
      </div>
      <!-- 视角 -->
      <viewParams/>
    </div>
</template>
<script setup lang='ts'>
import { ref, nextTick, onMounted, provide, onUnmounted } from 'vue'
import * as THREE from 'three';
import { app } from './index'
import {useEditorStore, useThreeStore } from '@/stores/editor'
import { getContainerWH } from '@/views/editor/three/util'
import InitThree from '@/views/editor/three/index'
import { cretateBackground, plane } from '@/views/editor/three/mesh/createBackground.js'
import rightAttribute from '@/views/editor/components/rightAttribute/index.vue'
import viewParams from '@/views/editor/components/rightAttribute/viewParams.vue';
import '@/views/editor/three/handEvent'
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid';
import { objectDirection } from 'three/examples/jsm/nodes/Nodes.js';



let containerRef = ref()
const store = useEditorStore()
const threeStore = useThreeStore()
const router = useRouter()



// let app: InitThree = new InitThree()  // 初始化 three 实例
provide('app', app as InitThree) // 将 app 实例传递下去



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
   // test()
   initBackground()
  } catch (error) {
    console.log(error)
  }
}
init()


const goIndex = () => {
  router.push({
    path: '/',
    query: {
      edit: '1'
    }
  })
  const obj = {
    type: '3D',
    uuid: uuidv4(),
    config: JSON.parse(JSON.stringify(threeStore.config))
  }
  store.pushState(obj)
  // 保存信息
  // localStorage.setItem('threeStore',JSON.stringify(threeStore.config))
}


onMounted(() => {
  app.appendParent(containerRef.value)
  console.log(threeStore, 'Onmounted~~~~~~~~')
})


onUnmounted(() => {
  // 这里需要卸载 app 的信息, 这里为了方便不清空缓存
  console.log(app, 'app~~~~~unmounted')
})

</script>


<style scoped lang="less">
.editor-home {
  display: flex;
  position: relative;
  height: 100vh;
  .left {
    flex: 1;
    height: 100%;
    .opeator {
      display: flex;
      height: 36px;
      line-height: 36px;
      padding-left: 20px;
      font-size: 12px;
      .back {
       cursor: pointer;
      }
    }
    .container {
      position: relative;
      height: calc( 100% - 36px );
    }
  }
  .right {
    width: 300px;
    height: 100%;
    border-left: 1px solid red;
    // overflow: scroll;
    overflow-y: scroll;
  }
}
</style>