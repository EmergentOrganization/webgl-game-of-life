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



	



	//restore last frame's data (current, a[my_id])









	//EDGE_1
float s0 = 
 		
		getR(vec2(-3.0, -1.0)) +
		getR(vec2(-3.0, 0.0)) +
		getR(vec2(-3.0, 1.0)) +
		getR(vec2(-2.0, -2.0)) +
		getR(vec2(-2.0, 2.0)) +
		getR(vec2(-1.0, -3.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 3.0)) +
		getR(vec2(0.0, -3.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 3.0)) +
		getR(vec2(1.0, -3.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 3.0)) +
		getR(vec2(2.0, -2.0)) +
		getR(vec2(2.0, 2.0)) +
		getR(vec2(3.0, -1.0)) +
		getR(vec2(3.0, 0.0)) +
		getR(vec2(3.0, 1.0));   /*NEWLINE*/ int sum_0 = int(s0); //EDGE_0

	if(sum_0 >= 14 && sum_0 <= 17) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	
	if(sum_0 >= 9 && sum_0 <= 9) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	

	if(sum_0 >= 18) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 0 && sum_0 <= 4) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 7 && sum_0 <= 8) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 9) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	

	


	//EDGE_1
float s1 = 
 		
		getR(vec2(-4.0, -1.0)) +
		getR(vec2(-4.0, 0.0)) +
		getR(vec2(-4.0, 1.0)) +
		getR(vec2(-3.0, -3.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, 0.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-3.0, 3.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, -1.0)) +
		getR(vec2(-2.0, 1.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-1.0, -4.0)) +
		getR(vec2(-1.0, -2.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 2.0)) +
		getR(vec2(-1.0, 4.0)) +
		getR(vec2(0.0, -4.0)) +
		getR(vec2(0.0, -3.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 3.0)) +
		getR(vec2(0.0, 4.0)) +
		getR(vec2(1.0, -4.0)) +
		getR(vec2(1.0, -2.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 2.0)) +
		getR(vec2(1.0, 4.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, -1.0)) +
		getR(vec2(2.0, 1.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(3.0, -3.0)) +
		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, 0.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(3.0, 3.0)) +
		getR(vec2(4.0, -1.0)) +
		getR(vec2(4.0, 0.0)) +
		getR(vec2(4.0, 1.0));   /*NEWLINE*/ int sum_1 = int(s1); //EDGE_0

		
	if(sum_1 >= 21 && sum_1 <= 31) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	
	if(sum_1 >= 7 && sum_1 <= 7) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	
	//if(sum_1 >= 31) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	if(sum_1 >= 10 && sum_1 <= 16) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	

	

//EDGE_1
float s2 = 
 		
		getR(vec2(-6.0, -1.0)) +
		getR(vec2(-6.0, 0.0)) +
		getR(vec2(-6.0, 1.0)) +
		getR(vec2(-5.0, -3.0)) +
		getR(vec2(-5.0, -2.0)) +
		getR(vec2(-5.0, 2.0)) +
		getR(vec2(-5.0, 3.0)) +
		getR(vec2(-4.0, -4.0)) +
		getR(vec2(-4.0, 4.0)) +
		getR(vec2(-3.0, -5.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, -1.0)) +
		getR(vec2(-3.0, 0.0)) +
		getR(vec2(-3.0, 1.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-3.0, 5.0)) +
		getR(vec2(-2.0, -5.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-2.0, 5.0)) +
		getR(vec2(-1.0, -6.0)) +
		getR(vec2(-1.0, -3.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 3.0)) +
		getR(vec2(-1.0, 6.0)) +
		getR(vec2(0.0, -6.0)) +
		getR(vec2(0.0, -3.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 3.0)) +
		getR(vec2(0.0, 6.0)) +
		getR(vec2(1.0, -6.0)) +
		getR(vec2(1.0, -3.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 3.0)) +
		getR(vec2(1.0, 6.0)) +
		getR(vec2(2.0, -5.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(2.0, 5.0)) +
		getR(vec2(3.0, -5.0)) +
		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, -1.0)) +
		getR(vec2(3.0, 0.0)) +
		getR(vec2(3.0, 1.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(3.0, 5.0)) +
		getR(vec2(4.0, -4.0)) +
		getR(vec2(4.0, 4.0)) +
		getR(vec2(5.0, -3.0)) +
		getR(vec2(5.0, -2.0)) +
		getR(vec2(5.0, 2.0)) +
		getR(vec2(5.0, 3.0)) +
		getR(vec2(6.0, -1.0)) +
		getR(vec2(6.0, 0.0)) +
		getR(vec2(6.0, 1.0));   /*NEWLINE*/ int sum_2 = int(s2); //EDGE_0


	if(sum_2 >= 13 && sum_2 <= 13) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	//if(sum_2 >= 19 && sum_2 <= 19) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	




	//EDGE_2

}
