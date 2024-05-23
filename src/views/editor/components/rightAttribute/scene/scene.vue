<template>
  <div class="scene-home">
    <div>
      <div>相机视角 <span class="add-opeator" @click="showViewSet = true">+ 添加当前视角</span></div>
      <!-- 视角参数设置 -->
      <div v-if="showViewSet">
        <div>视角设置</div>
        <div class="ml-20">
          <div>
            视角名称
            <el-input v-model="state.name" />
          </div>
          <div>
            <div>视角参数</div>
            <div>相机坐标</div>
            <div>
              <div>
                <span>x</span>
                <el-input-number v-model="state.position.x" />
              </div>
              <div>
                <span>y</span>
                <el-input-number v-model="state.position.y" />
              </div>
              <div>
                <span>z</span>
                <el-input-number v-model="state.position.z" />
              </div>
            </div>
            <div>视点坐标</div>
            <div>
              <div>
                <span>x</span>
                <el-input-number v-model="state.target.x" />
              </div>
              <div>
                <span>y</span>
                <el-input-number v-model="state.target.y" />
              </div>
              <div>
                <span>z</span>
                <el-input-number v-model="state.target.z" />
              </div>
            </div>
          </div>
        </div>
        <div class="ml-20">
          <el-button @click="cancelViewSet">取消</el-button>
          <el-button type="primary" @click="confirmViewSet">确定</el-button>
        </div>
      </div>
      <div class="data-wrap">
         <div v-for="item in threeStore.config.scene.view" :key="item.name" @click="() => changeView(item)" class="view-item">
          {{ item.name }}
         </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, inject, onMounted } from 'vue';
import * as THREE from 'three';
import { useThreeStore } from '@/stores/editor';
import InitThree from '@/views/editor/three/index';
import gsap from "gsap";
import TWEEN from '@tweenjs/tween.js';

const app = inject('app') as InitThree;
const threeStore = useThreeStore();

let showViewSet = ref(false)
const state = reactive({
  name: '',
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  target: {
    x: 0,
    y: 0,
    z: 0,
  },
  // bind: '',
});

function resetState() {
  state.name = ''
  state.position.x = 0
  state.position.y = 0
  state.position.z = 0
  state.target.x = 0
  state.target.y = 0
  state.target.z = 0
  showViewSet.value = false
}


function cancelViewSet() {
  resetState()
}

function confirmViewSet() {
  const obj = {
    name: state.name,
    position: {
      x: state.position.x,
      y: state.position.y,
      z: state.position.z
    },
    target: {
      x: state.target.x,
      y: state.target.y,
      z: state.target.z
    }
  }
  threeStore.pushViewItem(obj)
  resetState()
}

const changeView = (item: any) => {
    const tween = new TWEEN.Tween({
            // 相机开始坐标
            x: app.camera.position.x,
            y: app.camera.position.y,
            z: app.camera.position.z,
            // 相机开始指向的目标观察点
            tx: app.controls.target.x,
            ty: app.controls.target.y,
            tz: app.controls.target.z,
        })
        .to({
            // 相机结束坐标
            x:  item.position.x,
            y:  item.position.y,
            z:  item.position.z,
            // 相机结束指向的目标观察点
            tx: item.target.x,
            ty: item.target.y,
            tz: item.target.z,
        }, 3000)
        .onUpdate(function (obj) {
          // 动态改变相机位置
          app.camera.position.set(obj.x, obj.y, obj.z);
          // 动态计算相机视线
          app.controls.target.set(obj.tx, obj.ty, obj.tz)
          app.controls.update() // 内部执行 lookAT()
        })
     .start()
     .onComplete(() => {
        // 完成的回调
        console.log('完成~~~~~~~~~')
     })
    .easing(TWEEN.Easing.Sinusoidal.InOut); //使用二次缓动函数

    function loop() {
        tween.update();
        window.requestAnimationFrame(loop);
      }

     loop()
}


</script>

<style lang="scss" scoped>
.scene-home {
  border: 2px solid rgb(52, 204, 57);

  .ml-20 {
    margin-left: 20px;
  }

  .add-opeator {
    color: blue;
    cursor: pointer;
  }

  .data-wrap {
    border: 1px solid #cdd0d6;
    margin: 6px;
    min-height: 200px;
  }

  .view-item {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    border-bottom: 1px solid red;
  }
}
</style>
