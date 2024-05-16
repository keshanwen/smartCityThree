import mitt from 'mitt';


export const emitter = mitt();

 // 发射更新地图的
export const emitControlChange = (playload?: any) => {
  emitter.emit('controlChange', playload)
}

// 监听更新地图
export const onControlChange = (cb: any) => {
  emitter.on('controlChange', cb);
}
