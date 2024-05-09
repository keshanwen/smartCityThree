uniform vec3 uColor;
uniform float uFrequency;
uniform float uScale;
uniform float uTime;

varying float vElevation;
varying vec2 vUv;



precision highp float;

void main() {
   vec4 modelPosition = modelMatrix * vec4( position, 1.0 );

    modelPosition.z += sin((modelPosition.x+uTime) * uFrequency)*uScale ;
    modelPosition.z += cos((modelPosition.y+uTime) * uFrequency)*uScale ;

    vElevation = modelPosition.z;
    gl_Position =  projectionMatrix * viewMatrix * modelPosition;
    vUv = uv;
}