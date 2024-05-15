import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useEditorStore = defineStore('editor', () => {

  const state: any = ref([])

  const pushState = (component: any) => {
    state.value.push(component);
  }

  return { state, pushState };
});
