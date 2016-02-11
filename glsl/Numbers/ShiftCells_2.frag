precision mediump float;

uniform sampler2D state;
uniform vec2 scale;
uniform float mx;
uniform float my;

float getR(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).r);
}

float getG(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).g);
}

float getB(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).b);
}


void main() {

    float r = getR(vec2(mx, my), state);
    float g = getG(vec2(mx, my), state);
    float b = getB(vec2(mx, my), state);

    gl_FragColor = vec4(r, g, b, 1.0);

}
