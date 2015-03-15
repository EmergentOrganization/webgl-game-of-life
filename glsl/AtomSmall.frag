#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {

    float current = float(get(vec2(0.0, 0.0)));
    gl_FragColor = vec4(0, current, current, 1.0);
    

    int s1 =
        get(vec2(-4.0, -1.0)) +
        get(vec2(-4.0, 0.0)) +
        get(vec2(-4.0, 1.0)) +
        get(vec2(-3.0, -3.0)) +
        get(vec2(-3.0, -2.0)) +
        get(vec2(-3.0, 0.0)) +
        get(vec2(-3.0, 2.0)) +
        get(vec2(-3.0, 3.0)) +
        get(vec2(-2.0, -3.0)) +
        get(vec2(-2.0, -1.0)) +
        get(vec2(-2.0, 1.0)) +
        get(vec2(-2.0, 3.0)) +
        get(vec2(-1.0, -4.0)) +
        get(vec2(-1.0, -2.0)) +
        get(vec2(-1.0, -1.0)) +
        get(vec2(-1.0, 0.0)) +
        get(vec2(-1.0, 1.0)) +
        get(vec2(-1.0, 2.0)) +
        get(vec2(-1.0, 4.0)) +
        get(vec2(0.0, -4.0)) +
        get(vec2(0.0, -3.0)) +
        get(vec2(0.0, -1.0)) +
        get(vec2(0.0, 1.0)) +
        get(vec2(0.0, 3.0)) +
        get(vec2(0.0, 4.0)) +
        get(vec2(1.0, -4.0)) +
        get(vec2(1.0, -2.0)) +
        get(vec2(1.0, -1.0)) +
        get(vec2(1.0, 0.0)) +
        get(vec2(1.0, 1.0)) +
        get(vec2(1.0, 2.0)) +
        get(vec2(1.0, 4.0)) +
        get(vec2(2.0, -3.0)) +
        get(vec2(2.0, -1.0)) +
        get(vec2(2.0, 1.0)) +
        get(vec2(2.0, 3.0)) +
        get(vec2(3.0, -3.0)) +
        get(vec2(3.0, -2.0)) +
        get(vec2(3.0, 0.0)) +
        get(vec2(3.0, 2.0)) +
        get(vec2(3.0, 3.0)) +
        get(vec2(4.0, -1.0)) +
        get(vec2(4.0, 0.0)) +
        get(vec2(4.0, 1.0));

    int sum_one = s1;

    if(sum_one >= 17 && sum_one <= 27)	{gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}
    if(sum_one >= 6 && sum_one <= 6)    {gl_FragColor = vec4(1.0, 0.7, 0.0, 1.0);}
    
}
