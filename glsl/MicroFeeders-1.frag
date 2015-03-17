precision mediump float;

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}


void main() {

    float current = float(get(vec2(0.0, 0.0)));
    gl_FragColor = vec4(current, current, current, 1.0);

    int sum =
        get(vec2(-10.0,-1.0)) +
        get(vec2(-10.0,0.0)) +
        get(vec2(-10.0,1.0)) +
        get(vec2(-9.0,-4.0)) +
        get(vec2(-9.0,-3.0)) +
        get(vec2(-9.0,-2.0)) +
        get(vec2(-9.0,2.0)) +
        get(vec2(-9.0,3.0)) +
        get(vec2(-9.0,4.0)) +
        get(vec2(-8.0,-6.0)) +
        get(vec2(-8.0,-5.0)) +
        get(vec2(-8.0,5.0)) +
        get(vec2(-8.0,6.0)) +
        get(vec2(-7.0,-7.0)) +
        get(vec2(-7.0,7.0)) +
        get(vec2(-6.0,-8.0)) +
        get(vec2(-6.0,8.0)) +
        get(vec2(-5.0,-8.0)) +
        get(vec2(-5.0,-1.0)) +
        get(vec2(-5.0,0.0)) +
        get(vec2(-5.0,1.0)) +
        get(vec2(-5.0,8.0)) +
        get(vec2(-4.0,-9.0)) +
        get(vec2(-4.0,-3.0)) +
        get(vec2(-4.0,-2.0)) +
        get(vec2(-4.0,2.0)) +
        get(vec2(-4.0,3.0)) +
        get(vec2(-4.0,9.0)) +
        get(vec2(-3.0,-9.0)) +
        get(vec2(-3.0,-4.0)) +
        get(vec2(-3.0,4.0)) +
        get(vec2(-3.0,9.0)) +
        get(vec2(-2.0,-9.0)) +
        get(vec2(-2.0,-4.0)) +
        get(vec2(-2.0,4.0)) +
        get(vec2(-2.0,9.0)) +
        get(vec2(-1.0,-10.0)) +
        get(vec2(-1.0,-5.0)) +
        get(vec2(-1.0,-1.0)) +
        get(vec2(-1.0,0.0)) +
        get(vec2(-1.0,1.0)) +
        get(vec2(-1.0,5.0)) +
        get(vec2(-1.0,10.0)) +
        get(vec2(0.0,-10.0)) +
        get(vec2(0.0,-5.0)) +
        get(vec2(0.0,-1.0)) +
        get(vec2(0.0,1.0)) +
        get(vec2(0.0,5.0)) +
        get(vec2(0.0,10.0)) +
        get(vec2(1.0,-10.0)) +
        get(vec2(1.0,-5.0)) +
        get(vec2(1.0,-1.0)) +
        get(vec2(1.0,0.0)) +
        get(vec2(1.0,1.0)) +
        get(vec2(1.0,5.0)) +
        get(vec2(1.0,10.0)) +
        get(vec2(2.0,-9.0)) +
        get(vec2(2.0,-4.0)) +
        get(vec2(2.0,4.0)) +
        get(vec2(2.0,9.0)) +
        get(vec2(3.0,-9.0)) +
        get(vec2(3.0,-4.0)) +
        get(vec2(3.0,4.0)) +
        get(vec2(3.0,9.0)) +
        get(vec2(4.0,-9.0)) +
        get(vec2(4.0,-3.0)) +
        get(vec2(4.0,-2.0)) +
        get(vec2(4.0,2.0)) +
        get(vec2(4.0,3.0)) +
        get(vec2(4.0,9.0)) +
        get(vec2(5.0,-8.0)) +
        get(vec2(5.0,-1.0)) +
        get(vec2(5.0,0.0)) +
        get(vec2(5.0,1.0)) +
        get(vec2(5.0,8.0)) +
        get(vec2(6.0,-8.0)) +
        get(vec2(6.0,8.0)) +
        get(vec2(7.0,-7.0)) +
        get(vec2(7.0,7.0)) +
        get(vec2(8.0,-6.0)) +
        get(vec2(8.0,-5.0)) +
        get(vec2(8.0,5.0)) +
        get(vec2(8.0,6.0)) +
        get(vec2(9.0,-4.0)) +
        get(vec2(9.0,-3.0)) +
        get(vec2(9.0,-2.0)) +
        get(vec2(9.0,2.0)) +
        get(vec2(9.0,3.0)) +
        get(vec2(9.0,4.0)) +
        get(vec2(10.0,-1.0)) +
        get(vec2(10.0,0.0)) +
        get(vec2(10.0,1.0));

    if(sum >= 55) {gl_FragColor = vec4(0.0, 0.5, 0.3, 1.0);}
    if(sum >= 32 && sum <= 46) {gl_FragColor = vec4(1.0, 0.7, 0.3, 1.0);}
    if(sum >= 23 && sum <= 30) {gl_FragColor = vec4(0.0, 0.3, 1.0, 1.0);}
}
