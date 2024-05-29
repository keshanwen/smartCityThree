<template>
    <div class='home'>
      {{ state }}
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { onOuterEvent } from '@/views/editor/three/eventListen'

const props = defineProps({
  item: Object
})

const state = ref('我是默认数据')

const store = useEditorStore()

onMounted(() => {
  onOuterEvent((params: any) => {
    const { link, linkParams } = params
    const { link: propsLink } = props?.item?.config || []
    if (link && linkParams && propsLink.some( (item: any) => item === link)) {
      state.value = linkParams
    }
  })
})

</script>


<style lang='scss' scoped>
.home {

      width: 200px;
    height: 200px;
    border: 1px solid blue;

}
</style>