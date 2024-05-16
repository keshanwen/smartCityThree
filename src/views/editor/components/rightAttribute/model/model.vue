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
  </div>
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
import InitThree from '@/views/editor/three/index'

const app = inject('app') as InitThree
const value = ref('');

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
    value: 'http://localhost:1949/models/科技_工业建筑_003.glb',
    label: '科技_工业建筑_003',
  },
  {
    value: 'http://localhost:1949/models/科技_工业建筑_004.glb',
    label: '科技_工业建筑_004',
  },
];




const selectModel = (url: string) => {
  app.GLTFLoader.load(url, (gltf) => {
    console.log(gltf, 'gltf~~~~~~~~')
    app.scene.add(gltf.scene)
  })
}



</script>

<style lang="scss" scoped>
.home {
  border: 1px solid red;
}
</style>
