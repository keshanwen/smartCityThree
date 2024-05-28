<template>
    <div class='home'>
    <el-switch
      v-model="value"
      :active-text="props?.item?.config?.activeText"
      :inactive-text="props?.item?.config?.inactiveText"
      @change="handleChange"
    />
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { emitOuterEvent } from '@/views/editor/three/eventListen'
import type { Value } from 'sass';

const props = defineProps({
  item: Object
})

const store = useEditorStore()

let value = ref(true)


function handleChange(value: boolean) {
  const { acitveEvent = [], inactiveEvent = []} = props?.item?.config || {}
  if (value) {
    if (!acitveEvent.length) return
    emitOuterEvent({
      acitveEvent
    })
  } else {
    if (!inactiveEvent.length) return
    emitOuterEvent({
      inactiveEvent
    })
  }
}
</script>


<style lang='scss' scoped>
.home {}
</style>