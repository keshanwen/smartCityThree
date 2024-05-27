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

// 外部事件的触发
export const emitOuterEvent = (playload?: any) => {
  emitter.emit('outerEvent', playload);
};

// 监听外部事件的触发
export const onOuterEvent = (cb: any) => {
  emitter.on('outerEvent', cb);
};