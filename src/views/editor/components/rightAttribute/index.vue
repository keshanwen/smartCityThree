<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="模型" name="1">
        <Model/>
      </el-collapse-item>
      <el-collapse-item title="数据" name="2">
         <Data/>
      </el-collapse-item>
      <el-collapse-item title="场景" name="3">
        <Scene/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Model from '@/views/editor/components/rightAttribute/model/model.vue'
import Scene from '@/views/editor/components/rightAttribute/scene/scene.vue'
import Data from '@/views/editor/components/rightAttribute/data/data.vue'

const activeNames = ref(['3'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>

<style scoped lang="less">



</style>
