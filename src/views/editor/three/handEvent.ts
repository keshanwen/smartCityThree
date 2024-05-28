import {
  onClickListener,
  onOuterEvent,
} from '@/views/editor/three/eventListen';
import { useThreeStore } from '@/stores/editor';
import { changeView, changeRoam } from '@/views/editor/three/changeView';
import { app } from '@/views/editor/index'
import { ElMessageBox, ElSwitch } from 'element-plus';
import Video from '@/views/editor/components/video.vue';
import { ref, h } from 'vue';


const threeStore = useThreeStore();

onClickListener((obj: any) => {
  const name = handelName(obj) // 点击的对象
  const layerData = threeStore.config.layerData
    .filter((item: any) => item.modelName === name)
    .map((item: any) => {
      return item.event;
    })
    .flat()
    .filter((item: any) => item.open); // 绑定的事件

  handleClick(layerData)
})

function handelName(obj: any) {
  let name = ''
  const meshs = obj.map((item: any) => item.object).forEach((item: any) => {
    if (item.ancestor && !name) name = item.ancestor;
  })


  return name
}

// 处理click 事件
function handleClick(arr: any[]) {
  let clickArrs = arr.filter((item: any) => item.eventName === 'click')

  if (!clickArrs.length) return
  // 每个模型只能绑定一次， 要不然逻辑乱了
  const obj = clickArrs[0]
  const { config = {} } = obj
  const { type } = config
  if (type === 'view') {
    const view = config.view
    const viewMessage: any = threeStore.config.scene.view.find((item: any) => item.name === view)
    if (!viewMessage) return
    const params = {
      // 相机结束坐标
      x: viewMessage.position.x,
      y: viewMessage.position.y,
      z: viewMessage.position.z,
      // 相机结束指向的目标观察点
      tx: viewMessage.target.x,
      ty: viewMessage.target.y,
      tz: viewMessage.target.z,
    };
    changeView(app, params);
  } else if (type === 'video') {
    const url = config.url
    showComponet(url);
  } else if (type === 'roam') {
    const roam = config.roam;
    const roamMessage: any = threeStore.config.scene.roam.find(
      (item: any) => item.name === roam
    );
    if (!roamMessage) return;
    changeRoam(roamMessage, app);
  }
}


function showComponet(url: string) {
  ElMessageBox({
    title: 'Message',
    showConfirmButton: false,
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(Video, {
        url,
      }),
  })
    .then((res) => {
      console.log('then', res);
    })
    .catch((error) => {
      console.log(error, 'catch');
    });

}


// 监听外部绑定事件
onOuterEvent((params: any) => {
  const { view, roam, acitveEvent, inactiveEvent } = params;
  if (view) {
    const viewMessage: any = threeStore.config.scene.view.find(
      (item: any) => item.name === view
    );
    if (!viewMessage) return;
    const params = {
      // 相机结束坐标
      x: viewMessage.position.x,
      y: viewMessage.position.y,
      z: viewMessage.position.z,
      // 相机结束指向的目标观察点
      tx: viewMessage.target.x,
      ty: viewMessage.target.y,
      tz: viewMessage.target.z,
    };
    changeView(app, params);
  } else if (roam) {
    const roamMessage: any = threeStore.config.scene.roam.find(
      (item: any) => item.name === roam
    );
    if (!roamMessage) return;
    changeRoam(roamMessage, app);
  } else if (acitveEvent) {
    acitveEvent.forEach((name: string) => {
      const mesh = app.scene.getObjectByName(name);
      if (mesh) {
        mesh.visible = true
      }
    })
  } else if (inactiveEvent) {
    console.log(inactiveEvent, 'inactiveEvent~~~~~~');
     inactiveEvent.forEach((name: string) => {
       const mesh = app.scene.getObjectByName(name);
       if (mesh) {
         mesh.visible = false;
       }
     });
  }
})


