
void main() {
    float r = distance(gl_PointCoord, vec2(0.5, 0.5));
    if(r < 0.5) {
        gl_FragColor = vec4(0.0,1.0,1.0,1.0);
    }
}