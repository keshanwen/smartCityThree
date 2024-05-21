<template>
  <div class="data-home">
    <el-button type="primary" :icon="Plus" circle @click="addLayer"></el-button
    >添加数据图层
    <!-- 添加数据图层设置 -->
    <div v-if="showLayerSet" class="add-layer">
      <div>图层名称： <el-input v-model="layerMessage.layerName" /></div>
      <div>
        模型名称：
        <el-select v-model="layerMessage.modelName">
          <el-option
            v-for="item in threeStore.config.series"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </div>
      <button @click="addModelContent">增加模型内容</button>
      <div v-for="(item, index) in layerMessage.modelContent" :key="index">
        模型内容 <el-input v-model="item.text" />
      </div>
      <el-button @click="cancleLayer">取消</el-button>
      <el-button type="primary" @click="confirmLayer">确定</el-button>
    </div>
    <div class="data-wrap">
      <div v-for="item in threeStore.config.layerData" class="layer-data-item">
        <div class="layer-name">
          <div style="color: red">{{ item.layerName }}</div>
          <div class="delete" @click="() => delteLayer(item)">删除</div>
        </div>
        <section class="pl-20">
          <div class="add-opeator">
            <div class="add-name">添加事件</div>
            <el-select
              v-model="templateClick"
              @change="(e) => selectEvent(e, item)"
            >
              <el-option
                v-for="item in eventOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div v-for="jtem in item.event" class="event-item">
            <div>{{ jtem.eventName }}</div>
            <div>
              <el-switch
                v-model="jtem.open"
                @change="(e) => eventOpenChange(e, jtem, item)"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, inject, onMounted } from 'vue';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { useThreeStore } from '@/stores/editor';
import InitThree from '@/views/editor/three/index'
import { Plus } from '@element-plus/icons-vue';
// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
// 引入CSS3模型对象CSS3DObject
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { creatShowTag, deleteMesh } from '@/views/editor/three/mesh/createLabel'


const eventOptions = [
  {
    label: '数据标签',
    value: 'showLabel',
  },
  // {
  //   label: '隐藏数据标签',
  //   value: 'hiddenLabel'
  // }
];

const app = inject('app') as InitThree
const threeStore = useThreeStore();

let showLayerSet = ref(false);
const layerMessage = reactive({
  uuid: uuidv4(),
  layerName: '',
  modelName: '',
  modelContent: [{ text: '' }],
  event: [],
});
let templateClick = ref('');

const addLayer = () => {
  showLayerSet.value = true;
  templateClick.value = '';
};

const addModelContent = () => {
  layerMessage.modelContent.push({
    text: '',
  });
};

const resetLayerMessage = () => {
  showLayerSet.value = false;
  layerMessage.uuid = uuidv4();
  layerMessage.layerName = '';
  layerMessage.modelName = '';
  layerMessage.modelContent = [{ text: '' }];
};

const cancleLayer = () => {
  resetLayerMessage();
};

const confirmLayer = () => {
  const newObj = JSON.parse(JSON.stringify(layerMessage));
  threeStore.pushLayerData(newObj);
  resetLayerMessage();
};

const selectEvent = (value: any, item: any) => {
  const obj = {
    uuid: uuidv4(),
    eventName: value,
    open: false,
  };
  item.event.push(obj);
};

const eventOpenChange = (e: any, jtem: any, item: any) => {
  const { modelName,layerName,modelContent } = item
  if (e) {
    creatShowTag(app, modelName, layerName, modelContent)
  } else {
    deleteMesh(app, modelName, layerName)
  }
};

const delteLayer = (item: any) => {
  const { modelName, layerName } = item
  deleteMesh(app, modelName, layerName)
  threeStore.deleteLayerData(item.uuid)
}

onMounted(() => {

})
</script>

<style lang="scss" scoped>
.data-home {
  border: 2px solid green;

  .pl-20 {
    padding-left: 20px;
  }

  .add-layer {
    margin: 10px;
    border: 1px solid blue;
  }

  .layer-name {
    display: flex;
    justify-content: space-between;
    .delete {
      cursor: pointer;
    }
  }

  .data-wrap {
    border: 1px solid #cdd0d6;
    margin: 6px;
    min-height: 200px;

    .layer-data-item {
      border: 1px solid yellowgreen;
    }
  }
  .add-opeator {
    display: flex;
    .add-name {
      width: 72px;
    }
  }
  .event-item {
    display: flex;
    justify-content: space-between;
    padding-left: 6px;
    padding-right: 6px;
  }
}
</style>
