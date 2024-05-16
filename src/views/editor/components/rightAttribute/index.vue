<template>
  <div class="demo-collapse">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="模型" name="1">
        <div>
          模型
        </div>
      </el-collapse-item>
      <el-collapse-item title="数据" name="2">
        <div>
          数据
        </div>
      </el-collapse-item>
      <el-collapse-item title="场景" name="3">
        <div>
          场景
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
  console.log(val)
}
</script>
