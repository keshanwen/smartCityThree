<template>
  <div v-if="props.url">
      <nut-video :source="state.source" :options="state.options" class="video-wrap"></nut-video>
  </div>
  <div v-else>
    请先上传url
  </div>
</template>
<script lang="ts" setup>
import { toRefs, reactive } from 'vue';

const props = defineProps({
  url: String
})

/*

https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzQl&Signature=ViMFjz%2BOkBxS%2FY1rjtUVqbopbJI%3D
https://vjs.zencdn.net/v/oceans.mp4
https://storage.360buyimg.com/nutui/video/video_NutUI.mp4
https://storage.jd.com/about/big-final.mp4?Expires=3730193075&AccessKey=3LoYX1dQWa6ZXzQl&Signature=ViMFjz%2BOkBxS%2FY1rjtUVqbopbJI%3D

*/

const state = reactive({
  source: {
    src: props.url,
    type: 'video/mp4',
  },
  options: {
    autoplay: true,
    muted: true,
    controls: true,
  },
});




</script>

<style scoped lang="less">
.video-wrap {
  width: 100%;
}
</style>
