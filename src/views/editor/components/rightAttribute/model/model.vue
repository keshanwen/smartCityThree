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

const app = inject('app')
const value = ref('');

const options = [
  {
    value: 'http://localhost:5173/models/科技_工业建筑_003',
    label: '科技_工业建筑_003',
  },
  {
    value: 'http://localhost:5173/models/科技_工业建筑_004',
    label: '科技_工业建筑_004',
  },
];




const selectModel = (item: any) => {
  console.log(item)
  console.log(app)
}



</script>

<style lang="scss" scoped>
.home {
  border: 1px solid red;
}
</style>
