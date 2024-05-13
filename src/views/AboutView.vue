<template>
  <div ref="container" class="about">
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from "three";
import gsap from "gsap";
// 导入gui对象
import gui from "@/threes/gui.js";
// 导入场景
import scene from "@/threes/scene";
// 导入相机
import camera from "@/threes/camera";
// 导入控制器
import controls from "@/threes/controls";
// 导入辅助坐标轴
import axesHelper from "@/threes/axesHelper";
// 导入渲染器
import renderer from "@/threes/renderer";
// 初始化调整屏幕
import "@/threes/init";
// 导入添加物体函数
import createMesh from "@/threes/createMesh";

// 导入每一帧的执行函数
import animate from "@/threes/animate";


let container = ref()
scene.add(camera)
scene.add(axesHelper)

// 创建物体
createMesh()


onMounted(() => {
  container.value.appendChild(renderer.domElement)
  animate();
})


</script>

<style>
.about {
  width: 100vw;
  height: 100vh;
}
</style>
