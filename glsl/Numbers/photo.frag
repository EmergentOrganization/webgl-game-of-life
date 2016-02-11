precision mediump float;

uniform sampler2D state;
uniform sampler2D front;
uniform sampler2D back;
uniform vec2 scale;
uniform float duration;


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

	//dissipate (flat + mult)

	float r = getR(vec2(0, 0), state)*0.125;
	float g = getG(vec2(0, 0), state)*0.125;
	float b = getB(vec2(0, 0), state)*0.125;

	//gl_FragColor = vec4((r*0.95)-0.05, (g*0.95)-0.05, (b*0.95)-0.05, 1.0);

	//reinforce (take from moore)

	float r1 = (getR(vec2(1, 0), front) + getR(vec2(1, 1), front) + getR(vec2(0, 1), front) + getR(vec2(-1, 0), front) + getR(vec2(-1, -1), front) + getR(vec2(0, -1), front) + getR(vec2(1, -1), front) + getR(vec2(-1, 1), front) + getR(vec2(0, 0), front)) / 9.0;
	float g1 = (getG(vec2(1, 0), front) + getG(vec2(1, 1), front) + getG(vec2(0, 1), front) + getG(vec2(-1, 0), front) + getG(vec2(-1, -1), front) + getG(vec2(0, -1), front) + getG(vec2(1, -1), front) + getG(vec2(-1, 1), front) + getG(vec2(0, 0), front)) / 9.0;
	float b1 = (getB(vec2(1, 0), front) + getB(vec2(1, 1), front) + getB(vec2(0, 1), front) + getB(vec2(-1, 0), front) + getB(vec2(-1, -1), front) + getB(vec2(0, -1), front) + getB(vec2(1, -1), front) + getB(vec2(-1, 1), front) + getB(vec2(0, 0), front)) / 9.0;

	float rb = (getR(vec2(0, 0), back));
	float gb = (getG(vec2(0, 0), back));
	float bb = (getB(vec2(0, 0), back));

	r1 += rb * 0.05;
	g1 += gb * 0.05;
	b1 += bb * 0.05;

	if(r1+g1+b1 > 2.5) {
		r1 = r1*0.9;
		g1 = g1*0.9;
		b1 = b1*0.9;
	}

	if(r1 == g1 && g1 == b1 && r1 < 0.2) {
		r1 = (r1-0.01)*0.95;
		g1 = (g1-0.01)*0.95;
		b1 = (b1-0.01)*0.95;
	}

	if(r1+g1+b1 < 0.04) {
		r1 = 0.0;
		g1 = 0.0;
		b1 = 0.0;
	}


	gl_FragColor = vec4(r+(r1*0.993)-0.004, g+(g1*0.993)-0.004, b+(b1*0.993)-0.004, 1.0);


	
	
}

/*float r = (getR(vec2(0, 0), state)*0.125+getR(vec2(0, 0), back)*0.125)/2.0;
	float g = (getG(vec2(0, 0), state)*0.125+getG(vec2(0, 0), back)*0.125)/2.0;
	float b = (getB(vec2(0, 0), state)*0.125+getB(vec2(0, 0), back)*0.125)/2.0;


	//gl_FragColor = vec4((r*0.95)-0.05, (g*0.95)-0.05, (b*0.95)-0.05, 1.0);

	//reinforce (take from moore)

	float r1 = ((getR(vec2(1, 0), front) + getR(vec2(1, 1), front) + getR(vec2(0, 1), front) + getR(vec2(-1, 0), front) + getR(vec2(-1, -1), front) + getR(vec2(0, -1), front) + getR(vec2(1, -1), front) + getR(vec2(-1, 1), front)) / 8.0)+((getR(vec2(1, 0), back) + getR(vec2(1, 1), back) + getR(vec2(0, 1), back) + getR(vec2(-1, 0), back) + getR(vec2(-1, -1), back) + getR(vec2(0, -1), back) + getR(vec2(1, -1), back) + getR(vec2(-1, 1), back)) / 8.0)/2.0;
	float g1 = ((getG(vec2(1, 0), front) + getG(vec2(1, 1), front) + getG(vec2(0, 1), front) + getG(vec2(-1, 0), front) + getG(vec2(-1, -1), front) + getG(vec2(0, -1), front) + getG(vec2(1, -1), front) + getG(vec2(-1, 1), front)) / 8.0)+((getG(vec2(1, 0), back) + getG(vec2(1, 1), back) + getG(vec2(0, 1), back) + getG(vec2(-1, 0), back) + getG(vec2(-1, -1), back) + getG(vec2(0, -1), back) + getG(vec2(1, -1), back) + getG(vec2(-1, 1), back)) / 8.0)/2.0;
	float b1 = ((getB(vec2(1, 0), front) + getB(vec2(1, 1), front) + getB(vec2(0, 1), front) + getB(vec2(-1, 0), front) + getB(vec2(-1, -1), front) + getB(vec2(0, -1), front) + getB(vec2(1, -1), front) + getB(vec2(-1, 1), front)) / 8.0)+((getB(vec2(1, 0), back) + getB(vec2(1, 1), back) + getB(vec2(0, 1), back) + getB(vec2(-1, 0), back) + getB(vec2(-1, -1), back) + getB(vec2(0, -1), back) + getB(vec2(1, -1), back) + getB(vec2(-1, 1), back)) / 8.0)/2.0;

*/
