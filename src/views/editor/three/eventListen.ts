import mitt from 'mitt';


export const emitter = mitt();


export const emitControlChange = (playload?: any) => {
  emitter.emit('controlChange', playload)
}


export const onControlChange = (cb: any) => {
  emitter.on('controlChange', cb);
}


// 点击事件的触发
export const emitClickListener = (playload?: any) => {
  emitter.emit('clickListener', playload);
};


// 监听事件的触发
export const onClickListener = (cb: any) => {
  emitter.on('clickListener', cb);
}