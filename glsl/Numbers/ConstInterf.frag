precision mediump float;

uniform sampler2D state;
uniform sampler2D front;
uniform sampler2D back;

uniform vec2 scale;

float getSum(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).r) + (texture2D(tex, (gl_FragCoord.xy + offset) / scale).g) + (texture2D(tex, (gl_FragCoord.xy + offset) / scale).b);
}

void main() {
	float current_back = getSum(vec2(0, 0), back);
	float current_state = getSum(vec2(0, 0), state);

	if((current_back != float(0) && current_state != float(0)) || current_back != float(0)) {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	} else {gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);}

}
