precision mediump float;

uniform sampler2D state;
uniform vec2 scale;
uniform float mx;
uniform float my;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {

    float current = float(get(vec2(mx, my)));
    gl_FragColor = vec4(current, current, current, 1.0);

}
