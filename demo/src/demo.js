

const vertexShader = `
varying vec2 vUv;
void main(){
  vUv = uv;// UV坐标插值计算
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
const fragmentShader = `
uniform sampler2D map;//颜色贴图变量
varying vec2 vUv;
void main() {
    // 通过几何体的UV坐标从颜色贴图获取像素值
    gl_FragColor = texture2D( map, vUv );
}
`
const texture = new THREE.TextureLoader().load('./Earth.png');
const material = new THREE.ShaderMaterial({
  uniforms: {
    // 给着色器中同名uniform变量map传值
    map: { value: texture },
  },
  vertexShader: vertexShader,// 顶点着色器
  fragmentShader: fragmentShader,// 片元着色器
});

