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
 		
		getR(vec2(-11.0, -2.0)) +
		getR(vec2(-11.0, -1.0)) +
		getR(vec2(-11.0, 0.0)) +
		getR(vec2(-11.0, 1.0)) +
		getR(vec2(-11.0, 2.0)) +
		getR(vec2(-10.0, -5.0)) +
		getR(vec2(-10.0, -4.0)) +
		getR(vec2(-10.0, -3.0)) +
		getR(vec2(-10.0, 3.0)) +
		getR(vec2(-10.0, 4.0)) +
		getR(vec2(-10.0, 5.0)) +
		getR(vec2(-9.0, -7.0)) +
		getR(vec2(-9.0, -6.0)) +
		getR(vec2(-9.0, 6.0)) +
		getR(vec2(-9.0, 7.0)) +
		getR(vec2(-8.0, -8.0)) +
		getR(vec2(-8.0, 8.0)) +
		getR(vec2(-7.0, -9.0)) +
		getR(vec2(-7.0, -1.0)) +
		getR(vec2(-7.0, 0.0)) +
		getR(vec2(-7.0, 1.0)) +
		getR(vec2(-7.0, 9.0)) +
		getR(vec2(-6.0, -9.0)) +
		getR(vec2(-6.0, -3.0)) +
		getR(vec2(-6.0, -2.0)) +
		getR(vec2(-6.0, -1.0)) +
		getR(vec2(-6.0, 0.0)) +
		getR(vec2(-6.0, 1.0)) +
		getR(vec2(-6.0, 2.0)) +
		getR(vec2(-6.0, 3.0)) +
		getR(vec2(-6.0, 9.0)) +
		getR(vec2(-5.0, -10.0)) +
		getR(vec2(-5.0, -5.0)) +
		getR(vec2(-5.0, -4.0)) +
		getR(vec2(-5.0, -3.0)) +
		getR(vec2(-5.0, -2.0)) +
		getR(vec2(-5.0, 2.0)) +
		getR(vec2(-5.0, 3.0)) +
		getR(vec2(-5.0, 4.0)) +
		getR(vec2(-5.0, 5.0)) +
		getR(vec2(-5.0, 10.0)) +
		getR(vec2(-4.0, -10.0)) +
		getR(vec2(-4.0, -5.0)) +
		getR(vec2(-4.0, -4.0)) +
		getR(vec2(-4.0, 4.0)) +
		getR(vec2(-4.0, 5.0)) +
		getR(vec2(-4.0, 10.0)) +
		getR(vec2(-3.0, -10.0)) +
		getR(vec2(-3.0, -6.0)) +
		getR(vec2(-3.0, -5.0)) +
		getR(vec2(-3.0, 5.0)) +
		getR(vec2(-3.0, 6.0)) +
		getR(vec2(-3.0, 10.0)) +
		getR(vec2(-2.0, -11.0)) +
		getR(vec2(-2.0, -6.0)) +
		getR(vec2(-2.0, -5.0)) +
		getR(vec2(-2.0, -2.0)) +
		getR(vec2(-2.0, -1.0)) +
		getR(vec2(-2.0, 0.0)) +
		getR(vec2(-2.0, 1.0));
float s1 = 		getR(vec2(-2.0, 2.0)) +
		getR(vec2(-2.0, 5.0)) +
		getR(vec2(-2.0, 6.0)) +
		getR(vec2(-2.0, 11.0)) +
		getR(vec2(-1.0, -11.0)) +
		getR(vec2(-1.0, -7.0)) +
		getR(vec2(-1.0, -6.0)) +
		getR(vec2(-1.0, -2.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 2.0)) +
		getR(vec2(-1.0, 6.0)) +
		getR(vec2(-1.0, 7.0)) +
		getR(vec2(-1.0, 11.0)) +
		getR(vec2(0.0, -11.0)) +
		getR(vec2(0.0, -7.0)) +
		getR(vec2(0.0, -6.0)) +
		getR(vec2(0.0, -2.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 2.0)) +
		getR(vec2(0.0, 6.0)) +
		getR(vec2(0.0, 7.0)) +
		getR(vec2(0.0, 11.0)) +
		getR(vec2(1.0, -11.0)) +
		getR(vec2(1.0, -7.0)) +
		getR(vec2(1.0, -6.0)) +
		getR(vec2(1.0, -2.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 2.0)) +
		getR(vec2(1.0, 6.0)) +
		getR(vec2(1.0, 7.0)) +
		getR(vec2(1.0, 11.0)) +
		getR(vec2(2.0, -11.0)) +
		getR(vec2(2.0, -6.0)) +
		getR(vec2(2.0, -5.0)) +
		getR(vec2(2.0, -2.0)) +
		getR(vec2(2.0, -1.0)) +
		getR(vec2(2.0, 0.0)) +
		getR(vec2(2.0, 1.0)) +
		getR(vec2(2.0, 2.0)) +
		getR(vec2(2.0, 5.0)) +
		getR(vec2(2.0, 6.0)) +
		getR(vec2(2.0, 11.0)) +
		getR(vec2(3.0, -10.0)) +
		getR(vec2(3.0, -6.0)) +
		getR(vec2(3.0, -5.0)) +
		getR(vec2(3.0, 5.0)) +
		getR(vec2(3.0, 6.0)) +
		getR(vec2(3.0, 10.0)) +
		getR(vec2(4.0, -10.0)) +
		getR(vec2(4.0, -5.0)) +
		getR(vec2(4.0, -4.0)) +
		getR(vec2(4.0, 4.0)) +
		getR(vec2(4.0, 5.0)) +
		getR(vec2(4.0, 10.0)) +
		getR(vec2(5.0, -10.0)) +
		getR(vec2(5.0, -5.0));
float s2 = 		getR(vec2(5.0, -4.0)) +
		getR(vec2(5.0, -3.0)) +
		getR(vec2(5.0, -2.0)) +
		getR(vec2(5.0, 2.0)) +
		getR(vec2(5.0, 3.0)) +
		getR(vec2(5.0, 4.0)) +
		getR(vec2(5.0, 5.0)) +
		getR(vec2(5.0, 10.0)) +
		getR(vec2(6.0, -9.0)) +
		getR(vec2(6.0, -3.0)) +
		getR(vec2(6.0, -2.0)) +
		getR(vec2(6.0, -1.0)) +
		getR(vec2(6.0, 0.0)) +
		getR(vec2(6.0, 1.0)) +
		getR(vec2(6.0, 2.0)) +
		getR(vec2(6.0, 3.0)) +
		getR(vec2(6.0, 9.0)) +
		getR(vec2(7.0, -9.0)) +
		getR(vec2(7.0, -1.0)) +
		getR(vec2(7.0, 0.0)) +
		getR(vec2(7.0, 1.0)) +
		getR(vec2(7.0, 9.0)) +
		getR(vec2(8.0, -8.0)) +
		getR(vec2(8.0, 8.0)) +
		getR(vec2(9.0, -7.0)) +
		getR(vec2(9.0, -6.0)) +
		getR(vec2(9.0, 6.0)) +
		getR(vec2(9.0, 7.0)) +
		getR(vec2(10.0, -5.0)) +
		getR(vec2(10.0, -4.0)) +
		getR(vec2(10.0, -3.0)) +
		getR(vec2(10.0, 3.0)) +
		getR(vec2(10.0, 4.0)) +
		getR(vec2(10.0, 5.0)) +
		getR(vec2(11.0, -2.0)) +
		getR(vec2(11.0, -1.0)) +
		getR(vec2(11.0, 0.0)) +
		getR(vec2(11.0, 1.0)) +
		getR(vec2(11.0, 2.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1 + s2); //EDGE_0

//:0,999,0,:77,130,1,:33,41,1,:11,11,1,
//:0,999,0,:77,133,1,:39,47,1,:11,11,1,

	//restore last frame's data (current, a[my_id])
    if(sum_0 <= 32) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 87 && sum_0 <= 133) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 54 && sum_0 <= 62) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 32 && sum_0 <= 32) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 11 && sum_0 <= 11) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 134) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	//EDGE_2

}
