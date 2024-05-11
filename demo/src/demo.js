var planeGeom = new THREE.PlaneGeometry(1000, 1000, 100, 100);
uniforms = {
  time: {
    value: 0
  }
}
var planeMate = new THREE.ShaderMaterial({
  transparent: true,
  side: THREE.DoubleSide,
  uniforms: uniforms,
  vertexShader: `
                uniform float time;
        void main() {
            float y = sin(position.x / 50.0 + time) * 10.0 + sin(position.y / 50.0 + time) * 10.0;
            vec3 newPosition = vec3(position.x, position.y, y * 2.0 );
            gl_PointSize = (y + 20.0) / 4.0;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
        }
    `,
  fragmentShader: `
        void main() {
            float r = distance(gl_PointCoord, vec2(0.5, 0.5));
            if(r < 0.5) {
                gl_FragColor = vec4(0.0,1.0,1.0,1.0);
            }
        }
    `
})
var planeMesh = new THREE.Points(planeGeom, planeMate);
planeMesh.rotation.x = - Math.PI / 2;
scene.add(planeMesh);