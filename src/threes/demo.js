
function  addGradColor(shader, mesh) {
  mesh.geometry.computedBoundingBox()

  let { min, max } = mesh.geometry.boundingBox

  let uHeight = max.y - min.y

  shader.uniforms.uTopColor = {
    value: new THREE.Color('#aaaeff')
  }

  shader.uniforms.uHeigh = {
    value: uHeight
  }

  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
    #include <common>
    varying vec3 vPosition
    `
  )

  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
      #include <begin_vertex>
      vPosition = position;
  `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>

      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;

        `
  );


  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `

     vec4 distGradColor = gl_FragColor;

     // 设置混合的百分比
     float gradMix = (vPosition.y + )
        //#end#

      `
  );

}

// float gradMix = (vPosition.y-uMinHeight)/uHeight;

function addSpread(shader, center = new THREE.Vector2(0,0)) {
  shader.uniforms.uSpreadCenter = {
    value: center
  }

  shader.uniforms.uSpreadTime = {
    value: -2000
  }

  shader.uniforms.uSpreadWidth = {
    value: 40
  }

  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <common>",
    `
      #include <common>

      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
      `
  );

  shader.fragmentShader = shader.fragmentShader.replace(
    "//#end#",
    `
      float spreadRadius = distance(vPosition.xz,uSpreadCneter);
    `
  )
}