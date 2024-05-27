<template>
    <div class='home'>
      <el-button type="primary" @click="handleClick">{{ props.item.config.text }}</el-button>
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { emitOuterEvent } from '@/views/editor/three/eventListen'

const props = defineProps({
  item: Object
})

const store = useEditorStore()



function handleClick() {
  console.log(props.item, 'handleClick')
  const { view, roam } = props?.item?.config || {}
  if (view) {
    emitOuterEvent({
      view
    })
  } else if (roam) {
    emitOuterEvent({
      roam
    })
  }

}


</script>


<style lang='scss' scoped>
.home {}
</style>