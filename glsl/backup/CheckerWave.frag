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
    gl_FragColor = vec4(cG, cG, cG, 1.0);

	float s0 = 
 		
		getR(vec2(-5.0, 0.0)) +
		getR(vec2(-4.0, -3.0)) +
		getR(vec2(-4.0, -1.0)) +
		getR(vec2(-4.0, 0.0)) +
		getR(vec2(-4.0, 1.0)) +
		getR(vec2(-4.0, 3.0)) +
		getR(vec2(-3.0, -4.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-3.0, 4.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-1.0, -4.0)) +
		getR(vec2(-1.0, 4.0)) +
		getR(vec2(0.0, -5.0)) +
		getR(vec2(0.0, -4.0)) +
		getR(vec2(0.0, 4.0)) +
		getR(vec2(0.0, 5.0)) +
		getR(vec2(1.0, -4.0)) +
		getR(vec2(1.0, 4.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(3.0, -4.0)) +
		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(3.0, 4.0)) +
		getR(vec2(4.0, -3.0)) +
		getR(vec2(4.0, -1.0)) +
		getR(vec2(4.0, 0.0)) +
		getR(vec2(4.0, 1.0)) +
		getR(vec2(4.0, 3.0)) +
		getR(vec2(5.0, 0.0));

	int sum_0 = int(s0);

	
	
	//if(sum_0 >= 7 && sum_0 <= 32) 	{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); } 



	//if(sum_0 >= 16 && sum_0 <= 16) 	{ gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); } 	//Highest sustained owtward growth (range-1) 
	//if(sum_0 >= 21 && sum_0 <= 21) 	{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); } 	//Lowest stable 100% density (range-1) 
	//if(sum_0 >= 11 && sum_0 <= 11) 	{ gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); } 	//Lowest non-exponential growth (range-1)
	//if(sum_0 >= 26 && sum_0 <= 32) 	{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); } //Highest interesting (upper bound)
	//if(sum_0 >= 5 && sum_0 <= 5) 		{ gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); }	//Highest self-sustained (no safe space above) growth (range-1)

	if(sum_0 >= 2 && sum_0 <= 4) 		{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 6 && sum_0 <= 8) 		{ gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); }
	if(sum_0 >= 11 && sum_0 <= 31) 		{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 11 && sum_0 <= 25) 		{ gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); }
	if(sum_0 >= 27 && sum_0 <= 32) 		{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	
	
}


