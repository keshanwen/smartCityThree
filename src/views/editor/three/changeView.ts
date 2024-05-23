import TWEEN from '@tweenjs/tween.js';
import InitThree from '@/views/editor/three/index';


export function changeView(app: InitThree, target: any = {}, cb?: any) {
  const { x = 0,y = 0,z = 0, tx = 0, ty = 0, tz = 0} = target
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
    .to(
      {
        // 相机结束坐标
        x,
        y,
        z,
        // 相机结束指向的目标观察点
        tx,
        ty,
        tz,
      },
      3000
    )
    .onUpdate(function (obj) {
      // 动态改变相机位置
      app.camera.position.set(obj.x, obj.y, obj.z);
      // 动态计算相机视线
      app.controls.target.set(obj.tx, obj.ty, obj.tz);
      app.controls.update(); // 内部执行 lookAT()
    })
    .start()
    .onComplete(() => {
      // 完成的回调
      console.log('完成~~~~~~~~~');
      cb && cb()
    })
    .easing(TWEEN.Easing.Sinusoidal.InOut); //使用二次缓动函数

  function loop() {
    tween.update();
    window.requestAnimationFrame(loop);
  }

  loop();
}