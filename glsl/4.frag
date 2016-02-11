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
    gl_FragColor = vec4(cR, cR, cR, 1.0);



	






	//EDGE_1
float s0 = 
 		
		getR(vec2(0.0, 0.0)) +
		getR(vec2(-5.0, -5.0)) +
		getR(vec2(-5.0, -4.0)) +
		getR(vec2(-5.0, -3.0)) +
		getR(vec2(-5.0, -2.0)) +
		getR(vec2(-5.0, -1.0)) +
		getR(vec2(-5.0, 0.0)) +
		getR(vec2(-5.0, 1.0)) +
		getR(vec2(-5.0, 2.0)) +
		getR(vec2(-5.0, 3.0)) +
		getR(vec2(-5.0, 4.0)) +
		getR(vec2(-5.0, 5.0)) +
		getR(vec2(-4.0, -5.0)) +
		getR(vec2(-4.0, -4.0)) +
		getR(vec2(-4.0, -3.0)) +
		getR(vec2(-4.0, -2.0)) +
		getR(vec2(-4.0, -1.0)) +
		getR(vec2(-4.0, 0.0)) +
		getR(vec2(-4.0, 1.0)) +
		getR(vec2(-4.0, 2.0)) +
		getR(vec2(-4.0, 3.0)) +
		getR(vec2(-4.0, 4.0)) +
		getR(vec2(-4.0, 5.0)) +
		getR(vec2(-3.0, -5.0)) +
		getR(vec2(-3.0, -4.0)) +
		getR(vec2(-3.0, -3.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, -1.0)) +
		getR(vec2(-3.0, 0.0)) +
		getR(vec2(-3.0, 1.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-3.0, 3.0)) +
		getR(vec2(-3.0, 4.0)) +
		getR(vec2(-3.0, 5.0)) +
		getR(vec2(-2.0, -5.0)) +
		getR(vec2(-2.0, -4.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, -2.0)) +
		getR(vec2(-2.0, -1.0)) +
		getR(vec2(-2.0, 0.0)) +
		getR(vec2(-2.0, 1.0)) +
		getR(vec2(-2.0, 2.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-2.0, 4.0)) +
		getR(vec2(-2.0, 5.0)) +
		getR(vec2(-1.0, -5.0)) +
		getR(vec2(-1.0, -4.0)) +
		getR(vec2(-1.0, -3.0)) +
		getR(vec2(-1.0, -2.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 2.0)) +
		getR(vec2(-1.0, 3.0)) +
		getR(vec2(-1.0, 4.0)) +
		getR(vec2(-1.0, 5.0)) +
		getR(vec2(0.0, -5.0)) +
		getR(vec2(0.0, -4.0)) +
		getR(vec2(0.0, -3.0)) +
		getR(vec2(0.0, -2.0));
float s1 = 		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 2.0)) +
		getR(vec2(0.0, 3.0)) +
		getR(vec2(0.0, 4.0)) +
		getR(vec2(0.0, 5.0)) +
		getR(vec2(1.0, -5.0)) +
		getR(vec2(1.0, -4.0)) +
		getR(vec2(1.0, -3.0)) +
		getR(vec2(1.0, -2.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 2.0)) +
		getR(vec2(1.0, 3.0)) +
		getR(vec2(1.0, 4.0)) +
		getR(vec2(1.0, 5.0)) +
		getR(vec2(2.0, -5.0)) +
		getR(vec2(2.0, -4.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, -2.0)) +
		getR(vec2(2.0, -1.0)) +
		getR(vec2(2.0, 0.0)) +
		getR(vec2(2.0, 1.0)) +
		getR(vec2(2.0, 2.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(2.0, 4.0)) +
		getR(vec2(2.0, 5.0)) +
		getR(vec2(3.0, -5.0)) +
		getR(vec2(3.0, -4.0)) +
		getR(vec2(3.0, -3.0)) +
		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, -1.0)) +
		getR(vec2(3.0, 0.0)) +
		getR(vec2(3.0, 1.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(3.0, 3.0)) +
		getR(vec2(3.0, 4.0)) +
		getR(vec2(3.0, 5.0)) +
		getR(vec2(4.0, -5.0)) +
		getR(vec2(4.0, -4.0)) +
		getR(vec2(4.0, -3.0)) +
		getR(vec2(4.0, -2.0)) +
		getR(vec2(4.0, -1.0)) +
		getR(vec2(4.0, 0.0)) +
		getR(vec2(4.0, 1.0)) +
		getR(vec2(4.0, 2.0)) +
		getR(vec2(4.0, 3.0)) +
		getR(vec2(4.0, 4.0)) +
		getR(vec2(4.0, 5.0)) +
		getR(vec2(5.0, -5.0)) +
		getR(vec2(5.0, -4.0)) +
		getR(vec2(5.0, -3.0)) +
		getR(vec2(5.0, -2.0)) +
		getR(vec2(5.0, -1.0)) +
		getR(vec2(5.0, 0.0)) +
		getR(vec2(5.0, 1.0)) +
		getR(vec2(5.0, 2.0)) +
		getR(vec2(5.0, 3.0)) +
		getR(vec2(5.0, 4.0)) +
		getR(vec2(5.0, 5.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1); //EDGE_0






	//restore last frame's data (current, a[my_id])

    if(sum_0 >= 34 && sum_0 <= 46) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 <= 33) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
    if(sum_0 >= 59) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	//EDGE_2


}
