precision highp float;

uniform vec3 uColor;
varying float vElevation;
varying vec2 vUv;

uniform sampler2D uTexture;

void main() {
    float alpha = (vElevation + 0.1) + 0.8;

    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb*=alpha;
    gl_FragColor = textureColor;
}