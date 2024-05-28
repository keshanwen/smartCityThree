<template>
  <div class='wrapp-home'>
    <div class="left">
      <div v-for="item in componentType" :key="item.type" class="left-item" @click="() => cilckNav(item)">
        {{ item.label  }}
      </div>
    </div>
    <div class="context">
      <div v-for="(item,index) in store.state" @click="() => clickComponent(item)" :key="item.uuid" :style="styleTop(index, item)" :class="[item.type === '3D' ? 'three-editor' : 'other-type']">
        <ThreePreview v-if="item.type === '3D'"/>
        <Button  v-else-if="item.type === 'button'" :item="item"></Button>
        <Switch v-else-if="item.type === 'switch'" :item="item"></Switch>
        <Bar  v-else-if="item.type === 'bar'" :item="item"></Bar>
      </div>
    </div>
    <div class="right">
      <div v-if="store.activeComponent?.type === 'button'">
        <el-input v-model="store.activeComponent.config.text" />
        <div>绑定视角</div>

         <el-select v-model="store.activeComponent.config.view" clearable>
          <el-option
            v-for="item in threeConfig.scene.view"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>

        <div>
          绑定漫游视角
        </div>


        <el-select v-model="store.activeComponent.config.roam" clearable>
          <el-option
            v-for="item in threeConfig.scene.roam"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>


        <!-- {{ threeConfig }} -->
      </div>
      <div v-else-if="store.activeComponent?.type === 'switch'">
        <div>开启显示的文字</div>
        <el-input v-model="store.activeComponent.config.activeText" />
        <div>关闭时的文字</div>
        <el-input v-model="store.activeComponent.config.inactiveText" />
        <div>开启绑定的图层显示</div>
          <el-select v-model="store.activeComponent.config.acitveEvent" multiple clearable>
          <el-option
            v-for="item in labelLayer"
            :key="item.layerName"
            :label="item.layerName"
            :value="item.layerName"
          />
        </el-select>
        <div>关闭隐藏的图层显示</div>
          <el-select v-model="store.activeComponent.config.inactiveEvent" multiple clearable>
          <el-option
            v-for="item in labelLayer"
            :key="item.layerName"
            :label="item.layerName"
            :value="item.layerName"
          />
        </el-select>
      </div>
      <div v-else-if="store.activeComponent?.type === 'bar'">

      </div>
      <div v-else-if="store.activeComponent?.type === '3D'">

      </div>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { ref, computed, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useRoute, useRouter } from 'vue-router'
import Button from '@/views/editor/components/button/index.vue'
import Bar from '@/views/editor/components/bar/index.vue'
import Switch from '@/views/editor/components/switch/index.vue'
import ThreePreview from '@/views/editor/preView.vue'
import { v4 as uuidv4 } from 'uuid';

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


const threeConfig = computed(() => {
  return store.state.find((item: any) => {
    return item.type === '3D'
  })?.config
})


const labelLayer = computed(() => {
  const layerData = threeConfig?.value?.layerData

  return layerData?.filter((item: any) => {
    return item.event.some( (jtem: any) => jtem.eventName === 'showLabel')
  })
})


const styleTop = (index: number,item: any) => {
  if (index === 0) {
    return {}
  }
  const obj: any = {
    // left: '10px',
    top: index * 60 + 'px'
  }
  if (item.type === 'bar') {
    obj.right = '10px'
  } else {
    obj.left = '10px'
  }
  return obj
}


const cilckNav = (item: any) => {
  if (item.type === '3D') {
    router.push({
      path: '/editor',
    })
  } else {
    const { type } = item
    const obj = {
      type,
      uuid: uuidv4(),
      config: {}
    }
    if (type === 'button') {
      obj.config = {
        text: '按钮',
        view: '',
        roam: ''
      }
    } else if (type === 'switch') {
      obj.config = {
        activeText: '开',
        inactiveText: "关",
        acitveEvent: [],
        inactiveEvent: []
      }
    } else if (type === 'bar') {

    }
    store.pushState(obj)
  }

}

const clickComponent = (item: any) => {
  store.confirmActiveComponent(item)
}


onMounted(() => {
  console.log(store.state, 'store.state~~~')
})




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
    position: relative;
    flex: 1;
    .three-editor {
      position: relative;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .other-type {
      position: absolute;
     // left: 10px;
    }
  }
  .right {
    width: 300px;
    border-left: 2px solid red;
  }
}
</style>