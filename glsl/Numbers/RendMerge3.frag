precision mediump float;

uniform sampler2D render;
uniform sampler2D state;
uniform sampler2D front;
uniform sampler2D back;
uniform vec2 scale;


int get(vec2 offset, sampler2D tex) {
	int checksum = 0;
    checksum += int(ceil(texture2D(tex, (gl_FragCoord.xy + offset) / scale).r));
    checksum += int(ceil(texture2D(tex, (gl_FragCoord.xy + offset) / scale).g));
   	checksum += int(ceil(texture2D(tex, (gl_FragCoord.xy + offset) / scale).b));
	return checksum;
}

float getR(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {
    //gl_FragColor = texture2D(render, gl_FragCoord.xy / scale);

	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
	float current_back = float(get(vec2(0.0, 0.0), back));
	float current_state = float(get(vec2(0.0, 0.0), state));
	float current_front = float(get(vec2(0.0, 0.0), front));

	
	//if(current_back == float(0) && current_state == float(0)) {
		//float r = getR(vec2(0, 0), front);
	//}
	gl_FragColor = texture2D(front, gl_FragCoord.xy / scale);

	if(current_back != float(0)) {gl_FragColor = texture2D(back, gl_FragCoord.xy / scale);}
	if(current_state != float(0)) {gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);}
	//if(current_front != float(0)) {gl_FragColor = texture2D(front, gl_FragCoord.xy / scale);}
	
	


}
