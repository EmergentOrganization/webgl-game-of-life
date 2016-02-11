precision mediump float;

uniform sampler2D state;
uniform vec2 scale;

float getR(vec2 offset) {
	return (texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

float getG(vec2 offset) {
	return (texture2D(state, (gl_FragCoord.xy + offset) / scale).g);
}

float getB(vec2 offset) {
	return (texture2D(state, (gl_FragCoord.xy + offset) / scale).b);
}


void main() {

    float cR = getR(vec2(0.0, 0.0));
    float cG = getG(vec2(0.0, 0.0));
    float cB = getB(vec2(0.0, 0.0));
	
	//set to last frame's colour
    gl_FragColor = vec4(cR, cG, cB, 1.0);

	
	float s0 = 
		getR(vec2(1.0, 1.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(1.0, -1.0));
	
	float s1 = 
		getR(vec2(-4.0, 0.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, -1.0)) +
		getR(vec2(-3.0, 0.0)) +
		getR(vec2(-3.0, 1.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, -2.0)) +
		getR(vec2(-2.0, -1.0)) +
		getR(vec2(-2.0, 0.0)) +
		getR(vec2(-2.0, 1.0)) +
		getR(vec2(-2.0, 2.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-1.0, -3.0)) +
		getR(vec2(-1.0, -2.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 2.0)) +
		getR(vec2(-1.0, 3.0)) +
		getR(vec2(0.0, -4.0)) +
		getR(vec2(0.0, -3.0)) +
		getR(vec2(0.0, -2.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 2.0)) +
		getR(vec2(0.0, 3.0)) +
		getR(vec2(0.0, 4.0)) +
		getR(vec2(1.0, -3.0)) +
		getR(vec2(1.0, -2.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 2.0)) +
		getR(vec2(1.0, 3.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, -2.0)) +
		getR(vec2(2.0, -1.0)) +
		getR(vec2(2.0, 0.0)) +
		getR(vec2(2.0, 1.0)) +
		getR(vec2(2.0, 2.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, -1.0)) +
		getR(vec2(3.0, 0.0)) +
		getR(vec2(3.0, 1.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(4.0, 0.0));


	int f0 = int(s0);
	int f1 = int(s1);

	//if(f0 >= 7) 				{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(f1 >= 20) 				{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(f0 >= 0 && f0 <= 3) 		{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(f0 >= 5 && f0 <= 7) 		{ gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(f1 >= 13 && f1 <= 13) 	{ gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }

}
