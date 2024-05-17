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



// 3 维大屏数据
export const useThreeStore = defineStore('threeStore', () => {
  let config: any = ref({
    series: [] // 各个模型数据
  })

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

  return {
    config,
    activeModel,
    changeConfig,
    pushSeries,
    deleteSeries,
    confirmActiveModel,
    resetActiveModel,
  };
});
