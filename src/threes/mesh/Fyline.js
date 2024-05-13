
import * as THREE from "three";


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var Fyline = new THREE.Group(); //声明一个组对象

const geometry = new THREE.BufferGeometry()
const curve = new THREE.CatmullRomCurve3([
  // new THREE.Vector3(100, 0, -100),
  // new THREE.Vector3(0, 80, 0),
  // new THREE.Vector3(-100, 0, 100)
  new THREE.Vector3(-10, 0, 10),
  new THREE.Vector3(0, 4, 0),
  new THREE.Vector3(10, 0, -10),
])
const points = curve.getSpacedPoints(100)
geometry.setFromPoints(points)
const material = new THREE.LineBasicMaterial({
  color: 0x006666,
})
const line = new THREE.Line(geometry, material)

Fyline.add(line)


let index = 20 // 取点索引位置
const num = 15 // 从曲线上获取点的位置
const points2 = points.slice(index, index + num) // 从曲线上获取一段
const curve2 = new THREE.CatmullRomCurve3(points2)
const newPoints2 = curve2.getSpacedPoints(100)
const geometry2 = new THREE.BufferGeometry()
geometry2.setFromPoints(newPoints2)

// 每个顶点对应一哥百分比数据 attributes.percent 用于控制点的渲染大小
const percentArr = [] // attribute.percent 的数据
const newPoint2Len = newPoints2.length
for (let i = 0; i < newPoint2Len; i++) {
  percentArr.push(i / newPoint2Len)
}
const percentAttribue = new THREE.BufferAttribute(new Float32Array(percentArr), 1)
geometry2.attributes.percent = percentAttribue

// 批量计算所有顶点颜色数据
const colorArr = [];
for (var i = 0; i < newPoint2Len; i++) {
  const color1 = new THREE.Color(0x006666); //轨迹线颜色 青色, 起点颜色
  const color2 = new THREE.Color(0xffff00); //黄色, 终点颜色
  const color = color1.lerp(color2, i / newPoint2Len)
  colorArr.push(color.r, color.g, color.b);
}
// 设置几何体顶点颜色数据
geometry2.attributes.color = new THREE.BufferAttribute(new Float32Array(colorArr), 3);

// 点模型渲染几何体每个顶点
const PointsMaterial = new THREE.PointsMaterial({
  size: 1.0,
  vertexColors: true,
  transparent: true,
  depthTest: false
})
const flyPoints = new THREE.Points(geometry2, PointsMaterial)
Fyline.add(flyPoints)

// 修改点材质的着色器源码
PointsMaterial.onBeforeCompile = (shader) => {

  // 顶点着色器中声明一个attribute 变量： 百分比
  shader.vertexShader = shader.vertexShader.replace(
    'void main() {',
    [
      'attribute float percent;', //顶点大小百分比变量，控制点渲染大小
      'void main() {',
    ].join('\n') // .join()把数组元素合成字符串
  )

  // 调整点渲染的大小
  shader.vertexShader = shader.vertexShader.replace(
    'gl_PointSize = size;',
    [
      'gl_PointSize = percent * size * 0.3;',
    ].join('\n') // .join()把数组元素合成字符串
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <premultiplied_alpha_fragment>',
    [
      '#include <premultiplied_alpha_fragment>',
      'float r = distance(gl_PointCoord, vec2(0.5, 0.5));',
      'gl_FragColor.a = 0.6 - r;'
    ].join('\n')
  )

  console.log(shader.fragmentShader)
}

// 飞线动画
let indexMax = points.length - num // 飞线取点索引范围
function animation() {
  if (index > indexMax) index = 0
  index += 1
  const points2 = points.slice(index, index + num) // 从曲线上获取一段
  const curve = new THREE.CatmullRomCurve3(points2)
  const newPoints2 = curve.getSpacedPoints(100)
  geometry2.setFromPoints(newPoints2)

  requestAnimationFrame(animation)
}
animation()



export {
  Fyline
}










