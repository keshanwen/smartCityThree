<template>
  <div class='wrapp-home'>
    <div class="left">
      <div v-for="item in componentType" :key="item.type" class="left-item" @click="() => cilckNav(item)">
        {{ item.label  }}
      </div>
    </div>
    <div class="context">
      <div v-for="item in store.state" :key="item.uuid" :class="[item.type === '3D' ? 'three-editor' : '']">
        <ThreePreview v-if="item.type === '3D'"/>
        <div v-else>我不是 3D</div>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>
<script setup lang="tsx">
import { ref, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/views/editor/components/button/index.vue'
import Bar from '@/views/editor/components/bar/index.vue'
import Switch from '@/views/editor/components/switch/index.vue'
import ThreePreview from '@/views/editor/preView.vue'

const componentType = [
  {
    type: 'button',
    label: '按钮',
  },
  {
    type: 'switch',
    label: '切换'
  },
  {
    type: 'bar',
    label: '图表'
  },
  {
    type: '3D',
    label: '3D'
  }
]

const router = useRouter()
const store = useEditorStore()


const cilckNav = (item: any) => {
  if (item.type === '3D') {
    router.push({
      path: '/editor',
    })
  }
}







</script>


<style scoped lang="less">
.wrapp-home {
  display: flex;
  width: 100vw;
  height: 100vh;
  .left {
    width: 80px;
    border-right: 1px solid red;
    .left-item {
      height: 100px;
      line-height: 100px;
      background-color: aquamarine;
      border-bottom: 1px solid red;
      text-align: center;
      cursor: pointer;
    }
  }
  .context {
    flex: 1;
    .three-editor {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 300px;
    border-left: 2px solid red;
  }
}
</style>