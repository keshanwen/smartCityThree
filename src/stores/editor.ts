import { ref, reactive,computed } from 'vue';
import { defineStore } from 'pinia';

// 2维和3维 大屏数据
export const useEditorStore = defineStore('editor', () => {

  const state: any = ref([])

  const pushState = (component: any) => {
    state.value.push(component);
  }

  return { state, pushState };
});

interface ModelMessage {
  name: string;
  scale: {
    x: number;
    y: number;
    z: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
}

interface SeriesItem {
  uuid: string;
  name: string;
  visible: boolean;
  url: string;
  modelMessage: ModelMessage;
}

interface ModelContentItem {
  text: string
}

interface EventItem {
  uuid: string
  eventName: string
  open: boolean
  config: any
}



interface LayerDataItem {
  uuid: string;
  layerName: string;
  modelName: string;
  modelContent: ModelContentItem[];
  event: EventItem[]
}

interface Config {
  series: SeriesItem[];
  layerData: LayerDataItem[]
}


// 3 维大屏数据
export const useThreeStore = defineStore('threeStore', () => {
  let config = ref<Config>({
    series: [], // 各个模型数据
    layerData: [], // 数据图层信息
  });

  let activeModel: any = ref(undefined) // 当前激活的模型

  const changeConfig = (key: string,value: any) => {
    config.value[key] = value
  }

  const pushSeries = (obj: any) => {
    config.value.series.push(obj)
  }

  const deleteSeries = (uuid: string) => {
    config.value.series = config.value.series.filter((item: any) => {
      return item.uuid !== uuid
    })
  }

  const confirmActiveModel = (item: any) => {
    activeModel.value = item
  }


  const resetActiveModel = () => {
    activeModel.value = undefined
  }

  const pushLayerData = (obj: any) => {
    config.value.layerData.push(obj)
  }

  const deleteLayerData = (uuid: string) => {
     config.value.layerData = config.value.layerData.filter((item: any) => {
       return item.uuid !== uuid;
     });
  }

  return {
    config,
    activeModel,
    changeConfig,
    pushSeries,
    deleteSeries,
    confirmActiveModel,
    resetActiveModel,
    pushLayerData,
    deleteLayerData,
  };
});
