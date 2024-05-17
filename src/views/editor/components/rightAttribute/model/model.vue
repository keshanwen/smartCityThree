<template>
  <div class="home">
    <p>step: 1 选择模型</p>
    <el-select v-model="value" placeholder="Select" style="width: 240px" @change="selectModel">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <div class="model-wrap">
      <div v-for="item in threeStore.config.series" :key="item.uuid" :class="[ threeStore?.activeModel?.url === item.url ? 'active-item' : '', 'series-item']">
        <div @click="() => clickModel(item)">{{ item.modelMessage.name }}</div>
        <div>
          <span class="opeator show" @click="() => showModel(item)">{{ item.visible ? '隐藏' : '显示' }}</span>
          <span class="opeator delete" @click="() => deleteModel(item)">删除</span>
        </div>
      </div>
    </div>
    <!-- 模型信息 -->
    <div v-if="threeStore.activeModel" class="model-message">
      <div>
        <span> 名称 </span>
         <el-input
        v-model="threeStore.activeModel.modelMessage.name"
        style="width: 240px"
        disabled
        placeholder="Please input"
      />
      </div>
      <div>
        <span>缩放</span>
        <div>
          <span>x</span>
          <el-input-number v-model="threeStore.activeModel.modelMessage.scale.x" :step="0.01"/>
        </div>
        <div>
          <span>y</span>
           <el-input-number v-model="threeStore.activeModel.modelMessage.scale.x" :step="0.01"/>
        </div>
        <div>
          <span>z</span>
          <el-input-number v-model="threeStore.activeModel.modelMessage.scale.x" :step="0.01"/>
        </div>
      </div>
        <div>
        <span>位置</span>
         <div>
          <span>x</span>
          <el-input-number v-model="threeStore.activeModel.modelMessage.position.x" :step="1"/>
        </div>
        <div>
          <span>y</span>
           <el-input-number v-model="threeStore.activeModel.modelMessage.position.x" :step="1"/>
        </div>
        <div>
          <span>z</span>
          <el-input-number v-model="threeStore.activeModel.modelMessage.position.x" :step="1"/>
        </div>
      </div>
      <div>
        <span>旋转</span>
         <div>
          <span>x</span>
          <el-input-number v-model="threeStore.activeModel.modelMessage.rotation.x" :step="0.1"/>
        </div>
        <div>
          <span>y</span>
           <el-input-number v-model="threeStore.activeModel.modelMessage.rotation.x" :step="0.1"/>
        </div>
        <div>
          <span>z</span>
          <el-input-number v-model="threeStore.activeModel.modelMessage.rotation.x" :step="0.1"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
import InitThree from '@/views/editor/three/index'
import { useThreeStore } from '@/stores/editor'
import { assemblyData } from '@/views/editor/components/rightAttribute/model/handleModel'

const app = inject('app') as InitThree
const value = ref('');
const threeStore = useThreeStore()

const options = [
   {
    value: 'http://localhost:1949/models/仓库.glb',
    label: '仓库',
  },
  {
    value: 'http://localhost:1949/models/车间.glb',
    label: '车间',
  },
   {
    value: 'http://localhost:1949/models/房子.glb',
    label: '房子',
  },
  {
    value: 'http://localhost:1949/models/综合仓库.glb',
    label: '综合仓库',
  },
   {
    value: 'http://localhost:1949/models/总控室.glb',
    label: '总控室',
  },
    {
    value: 'http://localhost:1949/models/科技_工业建筑_001.glb',
    label: '科技_工业建筑_001',
  },
  {
    value: 'http://localhost:1949/models/科技_工业建筑_002.glb',
    label: '科技_工业建筑_002',
  },
    {
    value: 'http://localhost:1949/models/科技_工业建筑_003.glb',
    label: '科技_工业建筑_003',
  },
  {
    value: 'http://localhost:1949/models/科技_工业建筑_004.glb',
    label: '科技_工业建筑_004',
  },
  {
    value: 'http://localhost:1949/models/科技_工业建筑_005.glb',
    label: '科技_工业建筑_005',
  },
  {
    value: 'http://localhost:1949/models/科技_工业建筑_006.glb',
    label: '科技_工业建筑_006',
  },
];




const selectModel = (url: string) => {
  app.GLTFLoader.load(url, (gltf) => {
    app.scene.add(gltf.scene)
    const model = assemblyData(gltf.scene, url)
    threeStore.pushSeries(model)
  })
}

const clickModel = (item: any) => {
  threeStore.activeModel = item
}

const showModel = (item: any) => {
  const name = item.modelMessage.name
  const mesh = app.scene.getObjectByName(name)
  item.visible =  mesh!.visible = !mesh!.visible
}

const deleteModel = (item: any) => {
  const name = item.modelMessage.name
  const uuid = item.uuid
  const mesh = app.scene.getObjectByName(name)
  let deleteMesh: any = mesh?.parent || mesh
  // 从场景中移除数据不再渲染 不在占用渲染 gltf.scene 需要的 GPU 资源占用
  app.scene.remove(deleteMesh)
  // 执行 remove() 后， 注意执行 geometry.dispose() 释放顶点数据占用的GPU 内存（显存）
  // 递归遍历批量释放所有Mesh的几何体和材质占用的GPU内存(显存)
  deleteMesh.traverse((obj: any) => {
    if (obj?.geometry?.dispose) {
      obj.geometry.dispose()
    }
    if (obj?.material?.dispose) {
      obj.material.dispose()
    }
    if (obj?.dispose) {
      obj.dispose()
    }
  })
  deleteMesh = null

  threeStore.deleteSeries(uuid)

  if (threeStore?.activeModel?.uuid === uuid) {
    threeStore.resetActiveModel()
  }
}



</script>

<style lang="scss" scoped>
.home {
  border: 1px solid red;

  .model-wrap {
    border: 1px solid #CDD0D6;
    margin: 6px;
    min-height: 200px;

    .series-item {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      padding-left: 6px;
      height: 30px;
      line-height: 30px;
    }
    .active-item {
      background-color: aquamarine;
    }
    .opeator {
      font-size: 12px;
      padding-right: 6px
    }
    .show {
      color: green;
    }
    .delete {
      color: red;
    }
  }

  .model-message {

  }
}
</style>
