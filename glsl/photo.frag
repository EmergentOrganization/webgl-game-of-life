precision mediump float;

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

float getG(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).g);
}

float getB(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).b);
}

void main() {
	float current_back = float(get(vec2(0.0, 0.0), back));
	float current_state = float(get(vec2(0.0, 0.0), state));
	float current_front = float(get(vec2(0.0, 0.0), front));

	if(current_back == 0.0) {
		float r = getR(vec2(0, 0), front);
		float g = getG(vec2(0, 0), front);
		float b = getB(vec2(0, 0), front);

		if(r == g && r == b && r > 0.0) {
			gl_FragColor = vec4((r-0.04), (g-0.04), (b-0.04), 1.0);
		}
	} else if (current_back != 0.0){
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}

	if(current_back == 0.0 && current_state == 0.0) {
		float r = getR(vec2(0, 0), front);
		float g = getG(vec2(0, 0), front);
		float b = getB(vec2(0, 0), front);

		if((r != g && r != b) || b > r) {
			if(r > 0.0) {
				gl_FragColor = vec4((r-0.04), (g+0.08), (b+0.04), 1.0);
			} else if (g > 0.0) {
				gl_FragColor = vec4(r, (g-0.06), (b+0.08), 1.0);
			} else {
				gl_FragColor = vec4(r, g, (b-0.08), 1.0);
			}
		}
		

		//gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	} else if(current_state != 0.0){
		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	}	

	
}
