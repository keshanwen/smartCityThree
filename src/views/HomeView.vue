<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { renderer } from '@/three/RenderLoop'

let container = ref()

onMounted(() => {
  container.value.appendChild(renderer.domElement)
})

</script>

<template>
  <div ref="container" class="container">

  </div>
</template>


<style>

.container {
  height: 100vh;
}


</style>