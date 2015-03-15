#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform sampler2D render;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(render, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);

	float current = float(get(vec2(0.0, 0.0)));

	//if(current != 0.0) {
    	gl_FragColor = texture2D(render, gl_FragCoord.xy / scale);
	//}
    

}
