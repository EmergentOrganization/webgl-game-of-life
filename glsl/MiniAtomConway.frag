#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}


void main() {

    int sum =
        get(vec2(-1.0, -1.0)) +
        get(vec2(-1.0,  0.0)) +
        get(vec2(-1.0,  1.0)) +
        get(vec2( 0.0, -1.0)) +
        get(vec2( 0.0,  1.0)) +
        get(vec2( 1.0, -1.0)) +
        get(vec2( 1.0,  0.0)) +
        get(vec2( 1.0,  1.0));
    if (sum == 3) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    } else if (sum == 2) {
        float current = float(get(vec2(0.0, 0.0)));
        gl_FragColor = vec4(current, current, current, 1.0);
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }

 	sum =
		get(vec2(-6.0, -1.0)) +
		get(vec2(-6.0, 0.0)) +
		get(vec2(-6.0, 1.0)) +
		get(vec2(-5.0, -3.0)) +
		get(vec2(-5.0, -2.0)) +
		get(vec2(-5.0, 2.0)) +
		get(vec2(-5.0, 3.0)) +
		get(vec2(-4.0, -4.0)) +
		get(vec2(-4.0, 4.0)) +
		get(vec2(-3.0, -5.0)) +
		get(vec2(-3.0, -2.0)) +
		get(vec2(-3.0, -1.0)) +
		get(vec2(-3.0, 0.0)) +
		get(vec2(-3.0, 1.0)) +
		get(vec2(-3.0, 2.0)) +
		get(vec2(-3.0, 5.0)) +
		get(vec2(-2.0, -5.0)) +
		get(vec2(-2.0, -3.0)) +
		get(vec2(-2.0, 3.0)) +
		get(vec2(-2.0, 5.0)) +
		get(vec2(-1.0, -6.0)) +
		get(vec2(-1.0, -3.0)) +
		get(vec2(-1.0, 3.0)) +
		get(vec2(-1.0, 6.0)) +
		get(vec2(0.0, -6.0)) +
		get(vec2(0.0, -3.0)) +
		get(vec2(0.0, 3.0)) +
		get(vec2(0.0, 6.0)) +
		get(vec2(1.0, -6.0)) +
		get(vec2(1.0, -3.0)) +
		get(vec2(1.0, 3.0)) +
		get(vec2(1.0, 6.0)) +
		get(vec2(2.0, -5.0)) +
		get(vec2(2.0, -3.0)) +
		get(vec2(2.0, 3.0)) +
		get(vec2(2.0, 5.0)) +
		get(vec2(3.0, -5.0)) +
		get(vec2(3.0, -2.0)) +
		get(vec2(3.0, -1.0)) +
		get(vec2(3.0, 0.0)) +
		get(vec2(3.0, 1.0)) +
		get(vec2(3.0, 2.0)) +
		get(vec2(3.0, 5.0)) +
		get(vec2(4.0, -4.0)) +
		get(vec2(4.0, 4.0)) +
		get(vec2(5.0, -3.0)) +
		get(vec2(5.0, -2.0)) +
		get(vec2(5.0, 2.0)) +
		get(vec2(5.0, 3.0)) +
		get(vec2(6.0, -1.0)) +
		get(vec2(6.0, 0.0)) +
		get(vec2(6.0, 1.0));

    if(sum >= 21 && sum <= 30) {gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}
    if(sum >= 48) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
}
