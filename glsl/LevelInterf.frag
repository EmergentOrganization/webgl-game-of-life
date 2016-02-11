precision mediump float;

uniform sampler2D state;
uniform sampler2D level;

uniform vec2 scale;

float getSum(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).r) + (texture2D(tex, (gl_FragCoord.xy + offset) / scale).g) + (texture2D(tex, (gl_FragCoord.xy + offset) / scale).b);
}

void main() {
	float current_level = getSum(vec2(0, 0), level);

	if(current_level != 0.0){
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	} else {
		gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);
	}

}
