import { ref, reactive,computed } from 'vue';
import { defineStore } from 'pinia';

// 2维和3维 大屏数据
export const useEditorStore = defineStore('editor', () => {

  const state: any = ref([])


  const activeComponent = ref()

  const pushState = (component: any) => {
    state.value.push(component);
  }


  const confirmActiveComponent = (component: any) => {
    activeComponent.value = component
  }

  return { state, activeComponent, pushState, confirmActiveComponent };
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
  layerData: LayerDataItem[];
  scene: Scene;
}

interface ViewItem {
  name: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  target: {
    x: number;
    y: number;
    z: number;
  };
 // bind: string
}

type View = ViewItem[]


interface RoamItem {
  name: string
  view: View[]
}

interface Scene {
  view: View;
  roam: RoamItem[];
}

// 3 维大屏数据
export const useThreeStore = defineStore('threeStore', () => {
  let config = ref<Config>({
    series: [], // 各个模型数据
    layerData: [], // 数据图层信息
    scene: {
      view: [],
      roam: []
    }
  });

  let activeModel: any = ref(undefined) // 当前激活的模型

  const changeConfig = (obj: any) => {
    config.value.series = obj.series;
    config.value.layerData = obj.layerData
    config.value.scene.view = obj.scene.view
    config.value.scene.roam = obj.scene.roam
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

  const pushViewItem = (item: ViewItem) => {
    config.value.scene.view.push(item)
  };

  const pushRoamItem = (arr: RoamItem) => {
    config.value.scene.roam.push(arr);
  };

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
    pushViewItem,
    pushRoamItem
  };
});
