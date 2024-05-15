// 顶点着色器代码
const vertexShader = `
varying vec3 vPosition;
void main(){
  // vPosition = position;
  // 考虑mesh及其父对象旋转、缩放、平移的影响
  vPosition = vec3(modelMatrix * vec4( position, 1.0 ));
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
// 片元着色器代码
const fragmentShader = `
varying vec3 vPosition;
void main() {
    float per = vPosition.y /50.0;
    // Mesh y坐标50，颜色值：1  0  0(红色)
    // Mesh y坐标0，颜色值：0  1  0(绿色)
    gl_FragColor = vec4(per,1.0-per,0.0,1.0);
}
`
