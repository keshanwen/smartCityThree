uniform float uTime;
uniform float uScale;
varying vec2 vUv;



void main() {
  // 1. 通过顶点对应的 uv, 决定每一个像素在uv图像的位置， 通过这个位置 x, y 决定颜色
  // gl_FragColor = vec4(vUv,0,1);

  // 2. 对第一种的变形
  // gl_FragColor = vec4(vUv,1,1);

  // 3. 利用 uv 实现渐变效果, 从左到右
  // float strength = vUv.x;
  // gl_FragColor = vec4(strength,strength,strength, 1);

  //4. 利用uv 实现渐变效果， 从下到上
  // float strength = vUv.y;
  // gl_FragColor = vec4(strength, strength, strength, 1);

  //5. 利用uv 实现渐变效果， 从上到下
  // float strength = 1.0 - vUv.y;
  // gl_FragColor = vec4(strength, strength, strength, 1);

  //6. 利用uv 实现短范围内渐变
  // float strength = vUv.y * 10.0;
  // gl_FragColor = vec4(strength, strength, strength, 1);

  //7. 利用通过取模达到反复的效果
  // float strength = mod(vUv.y * 10.0, 1.0);
  // gl_FragColor = vec4(strength, strength, strength,1);

  //8. 利用 step(edge,x) 如果 x < edge, 返回 0 .0， 否则返回 1.0
  // float strength = mod(vUv.y * 10.0, 1.0);
  // strength = step(0.5, strength);
  // gl_FragColor = vec4(strength, strength, strength,1);

  //9. 利用 step(edge,x) 如果 x < edge, 返回0.0，否则返回 1.0
  float strength =  mod(vUv.y * 10.0 , 1.0) ;
  strength = step(0.8, strength);
  gl_FragColor = vec4(strength, strength, strength,1);

}