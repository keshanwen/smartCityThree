<template>
    <div class='view-params-home'>
       <p class="row">
        <span class="clow">{{ state.position.x }},</span>
        <span class="clow">{{ state.position.y}},</span>
        <span class="clow">{{ state.position.z}}</span>
       </p>
       <p class="row">
        <span class="clow">{{ state.target.x }},</span>
        <span class="clow">{{ state.target.y }},</span>
        <span class="clow">{{ state.target.z }}</span>
       </p>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, reactive, ref } from 'vue'
// import { viewParams } from '@/views/editor/three/index'
import { onControlChange } from '@/views/editor/three/eventListen';

let state = reactive({
  position: {
    x: 0,
    y: 0,
    z: 0
  },
  target: {
    x: 0,
    y: 0,
    z: 0
  }
})


onMounted(() => {
  onControlChange((obj: any) => {
    state.position.x = obj.position.x.toFixed(2)
    state.position.y = obj.position.y.toFixed(2)
    state.position.z = obj.position.z.toFixed(2)
    state.target.x = obj.target.x.toFixed(2)
    state.target.y = obj.target.y.toFixed(2)
    state.target.z = obj.target.z.toFixed(2)

  })
})

</script>


<style lang='less' scoped>
.view-params-home {
  position: absolute;
  top: 50px;
  right: 320px;
  width: 150px;
  border-radius: 5px;
  height: 60px;
  color: white;
  background-color: #0009;
  font-size: 12px;

  .row {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
    .clow {
      padding-right: 4px
    }
  }

}
</style>