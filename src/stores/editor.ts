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
    container: undefined,
    width: 200,
    height: 200,
    series: []
  })

  const changeConfig = (key: string,value: any) => {
    config.value[key] = value
  }

  return {
    config,
    changeConfig,
  };
});
