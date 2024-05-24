<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames" accordion>
      <el-collapse-item title="模型" name="1">
        <Model v-if="activeNames === '1'"/>
      </el-collapse-item>
      <el-collapse-item title="数据" name="2">
         <Data v-if="activeNames === '2'"/>
      </el-collapse-item>
      <el-collapse-item title="场景" name="3">
        <Scene v-if="activeNames === '3'"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Model from '@/views/editor/components/rightAttribute/model/model.vue'
import Scene from '@/views/editor/components/rightAttribute/scene/scene.vue'
import Data from '@/views/editor/components/rightAttribute/data/data.vue'

const activeNames = ref('')

</script>

<style scoped lang="less">



</style>
