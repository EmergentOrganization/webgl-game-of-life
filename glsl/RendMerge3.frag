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
	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);
}
