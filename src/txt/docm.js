/*

深度冲突

// 假设我们有两个对象object1和object2，它们都添加到了场景中

// 设置object1的渲染顺序为1，object2的渲染顺序为2
object1.renderOrder = 1;
object2.renderOrder = 2;

// 如果object1比object2更靠近摄像机，它将被渲染在object2之上


// 确保材质的深度写入被启用
object1.material.depthWrite = true;
object2.material.depthWrite = true;


*/