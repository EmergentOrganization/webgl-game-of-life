precision mediump float;

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).b);
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
        get(vec2( 1.0,  1.0)) +

        get(vec2(-2.0, -2.0)) +
        get(vec2(-2.0, -1.0)) +
        get(vec2(-2.0,  0.0)) +
        get(vec2(-2.0,  1.0)) +
        get(vec2(-2.0,  2.0)) +
        get(vec2( 2.0, -2.0)) +
        get(vec2( 2.0, -1.0)) +
        get(vec2( 2.0,  0.0)) +
        get(vec2( 2.0,  1.0)) +
        get(vec2( 2.0,  2.0)) +
        get(vec2(-1.0, -2.0)) +
        get(vec2( 0.0, -2.0)) +
        get(vec2( 1.0, -2.0)) +
        get(vec2(-1.0,  2.0)) +
        get(vec2( 0.0,  2.0)) +
        get(vec2( 1.0,  2.0));


    if (sum == 4) { gl_FragColor = vec4(0.0, 0.7, 1.0, 1.0); }
	if (sum != 4) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if (sum == 3) { gl_FragColor = vec4(1.0, 0.4, 0.0, 1.0); }
}
