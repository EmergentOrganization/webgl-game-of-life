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
    gl_FragColor = vec4(cB, cB, cB, 1.0);



	



	//restore last frame's data (current, a[my_id])









	//EDGE_1
float s0 = 
 		
		getB(vec2(-3.0, -1.0)) +
		getB(vec2(-3.0, 0.0)) +
		getB(vec2(-3.0, 1.0)) +
		getB(vec2(-2.0, -2.0)) +
		getB(vec2(-2.0, 2.0)) +
		getB(vec2(-1.0, -3.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 3.0)) +
		getB(vec2(0.0, -3.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 3.0)) +
		getB(vec2(1.0, -3.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 3.0)) +
		getB(vec2(2.0, -2.0)) +
		getB(vec2(2.0, 2.0)) +
		getB(vec2(3.0, -1.0)) +
		getB(vec2(3.0, 0.0)) +
		getB(vec2(3.0, 1.0));   /*NEWLINE*/ int sum_0 = int(s0); //EDGE_0

	if(sum_0 >= 14 && sum_0 <= 17) { gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0); }	
	if(sum_0 >= 9 && sum_0 <= 9) { gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); }	

	if(sum_0 >= 18) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	


	//EDGE_1
float s1 = 
 		
		getB(vec2(-4.0, -1.0)) +
		getB(vec2(-4.0, 0.0)) +
		getB(vec2(-4.0, 1.0)) +
		getB(vec2(-3.0, -3.0)) +
		getB(vec2(-3.0, -2.0)) +
		getB(vec2(-3.0, 0.0)) +
		getB(vec2(-3.0, 2.0)) +
		getB(vec2(-3.0, 3.0)) +
		getB(vec2(-2.0, -3.0)) +
		getB(vec2(-2.0, -1.0)) +
		getB(vec2(-2.0, 1.0)) +
		getB(vec2(-2.0, 3.0)) +
		getB(vec2(-1.0, -4.0)) +
		getB(vec2(-1.0, -2.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 2.0)) +
		getB(vec2(-1.0, 4.0)) +
		getB(vec2(0.0, -4.0)) +
		getB(vec2(0.0, -3.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 3.0)) +
		getB(vec2(0.0, 4.0)) +
		getB(vec2(1.0, -4.0)) +
		getB(vec2(1.0, -2.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 2.0)) +
		getB(vec2(1.0, 4.0)) +
		getB(vec2(2.0, -3.0)) +
		getB(vec2(2.0, -1.0)) +
		getB(vec2(2.0, 1.0)) +
		getB(vec2(2.0, 3.0)) +
		getB(vec2(3.0, -3.0)) +
		getB(vec2(3.0, -2.0)) +
		getB(vec2(3.0, 0.0)) +
		getB(vec2(3.0, 2.0)) +
		getB(vec2(3.0, 3.0)) +
		getB(vec2(4.0, -1.0)) +
		getB(vec2(4.0, 0.0)) +
		getB(vec2(4.0, 1.0));   /*NEWLINE*/ int sum_1 = int(s1); //EDGE_0

		
	if(sum_1 >= 21 && sum_1 <= 31) { gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); }
	if(sum_1 >= 21 && sum_1 <= 26) { gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0); }
	
	if(sum_1 >= 7 && sum_1 <= 7) { gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); }	
	if(sum_1 >= 10 && sum_1 <= 16) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	if(sum_1 >= 10 && sum_1 <= 13) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	

	

//EDGE_1
float s2 = 
 		
		getB(vec2(-6.0, -1.0)) +
		getB(vec2(-6.0, 0.0)) +
		getB(vec2(-6.0, 1.0)) +
		getB(vec2(-5.0, -3.0)) +
		getB(vec2(-5.0, -2.0)) +
		getB(vec2(-5.0, 2.0)) +
		getB(vec2(-5.0, 3.0)) +
		getB(vec2(-4.0, -4.0)) +
		getB(vec2(-4.0, 4.0)) +
		getB(vec2(-3.0, -5.0)) +
		getB(vec2(-3.0, -2.0)) +
		getB(vec2(-3.0, -1.0)) +
		getB(vec2(-3.0, 0.0)) +
		getB(vec2(-3.0, 1.0)) +
		getB(vec2(-3.0, 2.0)) +
		getB(vec2(-3.0, 5.0)) +
		getB(vec2(-2.0, -5.0)) +
		getB(vec2(-2.0, -3.0)) +
		getB(vec2(-2.0, 3.0)) +
		getB(vec2(-2.0, 5.0)) +
		getB(vec2(-1.0, -6.0)) +
		getB(vec2(-1.0, -3.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 3.0)) +
		getB(vec2(-1.0, 6.0)) +
		getB(vec2(0.0, -6.0)) +
		getB(vec2(0.0, -3.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 3.0)) +
		getB(vec2(0.0, 6.0)) +
		getB(vec2(1.0, -6.0)) +
		getB(vec2(1.0, -3.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 3.0)) +
		getB(vec2(1.0, 6.0)) +
		getB(vec2(2.0, -5.0)) +
		getB(vec2(2.0, -3.0)) +
		getB(vec2(2.0, 3.0)) +
		getB(vec2(2.0, 5.0)) +
		getB(vec2(3.0, -5.0)) +
		getB(vec2(3.0, -2.0)) +
		getB(vec2(3.0, -1.0)) +
		getB(vec2(3.0, 0.0)) +
		getB(vec2(3.0, 1.0)) +
		getB(vec2(3.0, 2.0)) +
		getB(vec2(3.0, 5.0)) +
		getB(vec2(4.0, -4.0)) +
		getB(vec2(4.0, 4.0)) +
		getB(vec2(5.0, -3.0)) +
		getB(vec2(5.0, -2.0)) +
		getB(vec2(5.0, 2.0)) +
		getB(vec2(5.0, 3.0)) +
		getB(vec2(6.0, -1.0)) +
		getB(vec2(6.0, 0.0)) +
		getB(vec2(6.0, 1.0));   /*NEWLINE*/ int sum_2 = int(s2); //EDGE_0


	if(sum_2 >= 7 && sum_2 <= 12) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	if(sum_2 >= 13 && sum_2 <= 14) { gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0); }	
	if(sum_2 >= 32 && sum_2 <= 40) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	

	


	//EDGE_1
float s3 = 
 		
		getB(vec2(-14.0, -1.0)) +
		getB(vec2(-14.0, 0.0)) +
		getB(vec2(-14.0, 1.0)) +
		getB(vec2(-13.0, -4.0)) +
		getB(vec2(-13.0, -3.0)) +
		getB(vec2(-13.0, -2.0)) +
		getB(vec2(-13.0, 2.0)) +
		getB(vec2(-13.0, 3.0)) +
		getB(vec2(-13.0, 4.0)) +
		getB(vec2(-12.0, -6.0)) +
		getB(vec2(-12.0, -5.0)) +
		getB(vec2(-12.0, 5.0)) +
		getB(vec2(-12.0, 6.0)) +
		getB(vec2(-11.0, -8.0)) +
		getB(vec2(-11.0, -7.0)) +
		getB(vec2(-11.0, 7.0)) +
		getB(vec2(-11.0, 8.0)) +
		getB(vec2(-10.0, -9.0)) +
		getB(vec2(-10.0, -1.0)) +
		getB(vec2(-10.0, 0.0)) +
		getB(vec2(-10.0, 1.0)) +
		getB(vec2(-10.0, 9.0)) +
		getB(vec2(-9.0, -10.0)) +
		getB(vec2(-9.0, -4.0)) +
		getB(vec2(-9.0, -3.0)) +
		getB(vec2(-9.0, -2.0)) +
		getB(vec2(-9.0, 2.0)) +
		getB(vec2(-9.0, 3.0)) +
		getB(vec2(-9.0, 4.0)) +
		getB(vec2(-9.0, 10.0)) +
		getB(vec2(-8.0, -11.0)) +
		getB(vec2(-8.0, -6.0)) +
		getB(vec2(-8.0, -5.0)) +
		getB(vec2(-8.0, 5.0)) +
		getB(vec2(-8.0, 6.0)) +
		getB(vec2(-8.0, 11.0)) +
		getB(vec2(-7.0, -11.0)) +
		getB(vec2(-7.0, -7.0)) +
		getB(vec2(-7.0, -2.0)) +
		getB(vec2(-7.0, -1.0)) +
		getB(vec2(-7.0, 0.0)) +
		getB(vec2(-7.0, 1.0)) +
		getB(vec2(-7.0, 2.0)) +
		getB(vec2(-7.0, 7.0)) +
		getB(vec2(-7.0, 11.0)) +
		getB(vec2(-6.0, -12.0)) +
		getB(vec2(-6.0, -8.0)) +
		getB(vec2(-6.0, -4.0)) +
		getB(vec2(-6.0, -3.0)) +
		getB(vec2(-6.0, 3.0)) +
		getB(vec2(-6.0, 4.0)) +
		getB(vec2(-6.0, 8.0)) +
		getB(vec2(-6.0, 12.0)) +
		getB(vec2(-5.0, -12.0)) +
		getB(vec2(-5.0, -8.0)) +
		getB(vec2(-5.0, -5.0)) +
		getB(vec2(-5.0, -1.0)) +
		getB(vec2(-5.0, 0.0)) +
		getB(vec2(-5.0, 1.0)) +
		getB(vec2(-5.0, 5.0));
float s4 = 		getB(vec2(-5.0, 8.0)) +
		getB(vec2(-5.0, 12.0)) +
		getB(vec2(-4.0, -13.0)) +
		getB(vec2(-4.0, -9.0)) +
		getB(vec2(-4.0, -6.0)) +
		getB(vec2(-4.0, -3.0)) +
		getB(vec2(-4.0, -2.0)) +
		getB(vec2(-4.0, 2.0)) +
		getB(vec2(-4.0, 3.0)) +
		getB(vec2(-4.0, 6.0)) +
		getB(vec2(-4.0, 9.0)) +
		getB(vec2(-4.0, 13.0)) +
		getB(vec2(-3.0, -13.0)) +
		getB(vec2(-3.0, -9.0)) +
		getB(vec2(-3.0, -6.0)) +
		getB(vec2(-3.0, -4.0)) +
		getB(vec2(-3.0, -1.0)) +
		getB(vec2(-3.0, 0.0)) +
		getB(vec2(-3.0, 1.0)) +
		getB(vec2(-3.0, 4.0)) +
		getB(vec2(-3.0, 6.0)) +
		getB(vec2(-3.0, 9.0)) +
		getB(vec2(-3.0, 13.0)) +
		getB(vec2(-2.0, -13.0)) +
		getB(vec2(-2.0, -9.0)) +
		getB(vec2(-2.0, -7.0)) +
		getB(vec2(-2.0, -4.0)) +
		getB(vec2(-2.0, -2.0)) +
		getB(vec2(-2.0, 2.0)) +
		getB(vec2(-2.0, 4.0)) +
		getB(vec2(-2.0, 7.0)) +
		getB(vec2(-2.0, 9.0)) +
		getB(vec2(-2.0, 13.0)) +
		getB(vec2(-1.0, -14.0)) +
		getB(vec2(-1.0, -10.0)) +
		getB(vec2(-1.0, -7.0)) +
		getB(vec2(-1.0, -5.0)) +
		getB(vec2(-1.0, -3.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 3.0)) +
		getB(vec2(-1.0, 5.0)) +
		getB(vec2(-1.0, 7.0)) +
		getB(vec2(-1.0, 10.0)) +
		getB(vec2(-1.0, 14.0)) +
		getB(vec2(0.0, -14.0)) +
		getB(vec2(0.0, -10.0)) +
		getB(vec2(0.0, -7.0)) +
		getB(vec2(0.0, -5.0)) +
		getB(vec2(0.0, -3.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 3.0)) +
		getB(vec2(0.0, 5.0)) +
		getB(vec2(0.0, 7.0)) +
		getB(vec2(0.0, 10.0)) +
		getB(vec2(0.0, 14.0)) +
		getB(vec2(1.0, -14.0)) +
		getB(vec2(1.0, -10.0)) +
		getB(vec2(1.0, -7.0));
float s5 = 		getB(vec2(1.0, -5.0)) +
		getB(vec2(1.0, -3.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 3.0)) +
		getB(vec2(1.0, 5.0)) +
		getB(vec2(1.0, 7.0)) +
		getB(vec2(1.0, 10.0)) +
		getB(vec2(1.0, 14.0)) +
		getB(vec2(2.0, -13.0)) +
		getB(vec2(2.0, -9.0)) +
		getB(vec2(2.0, -7.0)) +
		getB(vec2(2.0, -4.0)) +
		getB(vec2(2.0, -2.0)) +
		getB(vec2(2.0, 2.0)) +
		getB(vec2(2.0, 4.0)) +
		getB(vec2(2.0, 7.0)) +
		getB(vec2(2.0, 9.0)) +
		getB(vec2(2.0, 13.0)) +
		getB(vec2(3.0, -13.0)) +
		getB(vec2(3.0, -9.0)) +
		getB(vec2(3.0, -6.0)) +
		getB(vec2(3.0, -4.0)) +
		getB(vec2(3.0, -1.0)) +
		getB(vec2(3.0, 0.0)) +
		getB(vec2(3.0, 1.0)) +
		getB(vec2(3.0, 4.0)) +
		getB(vec2(3.0, 6.0)) +
		getB(vec2(3.0, 9.0)) +
		getB(vec2(3.0, 13.0)) +
		getB(vec2(4.0, -13.0)) +
		getB(vec2(4.0, -9.0)) +
		getB(vec2(4.0, -6.0)) +
		getB(vec2(4.0, -3.0)) +
		getB(vec2(4.0, -2.0)) +
		getB(vec2(4.0, 2.0)) +
		getB(vec2(4.0, 3.0)) +
		getB(vec2(4.0, 6.0)) +
		getB(vec2(4.0, 9.0)) +
		getB(vec2(4.0, 13.0)) +
		getB(vec2(5.0, -12.0)) +
		getB(vec2(5.0, -8.0)) +
		getB(vec2(5.0, -5.0)) +
		getB(vec2(5.0, -1.0)) +
		getB(vec2(5.0, 0.0)) +
		getB(vec2(5.0, 1.0)) +
		getB(vec2(5.0, 5.0)) +
		getB(vec2(5.0, 8.0)) +
		getB(vec2(5.0, 12.0)) +
		getB(vec2(6.0, -12.0)) +
		getB(vec2(6.0, -8.0)) +
		getB(vec2(6.0, -4.0)) +
		getB(vec2(6.0, -3.0)) +
		getB(vec2(6.0, 3.0)) +
		getB(vec2(6.0, 4.0)) +
		getB(vec2(6.0, 8.0)) +
		getB(vec2(6.0, 12.0)) +
		getB(vec2(7.0, -11.0)) +
		getB(vec2(7.0, -7.0)) +
		getB(vec2(7.0, -2.0));
float s6 = 		getB(vec2(7.0, -1.0)) +
		getB(vec2(7.0, 0.0)) +
		getB(vec2(7.0, 1.0)) +
		getB(vec2(7.0, 2.0)) +
		getB(vec2(7.0, 7.0)) +
		getB(vec2(7.0, 11.0)) +
		getB(vec2(8.0, -11.0)) +
		getB(vec2(8.0, -6.0)) +
		getB(vec2(8.0, -5.0)) +
		getB(vec2(8.0, 5.0)) +
		getB(vec2(8.0, 6.0)) +
		getB(vec2(8.0, 11.0)) +
		getB(vec2(9.0, -10.0)) +
		getB(vec2(9.0, -4.0)) +
		getB(vec2(9.0, -3.0)) +
		getB(vec2(9.0, -2.0)) +
		getB(vec2(9.0, 2.0)) +
		getB(vec2(9.0, 3.0)) +
		getB(vec2(9.0, 4.0)) +
		getB(vec2(9.0, 10.0)) +
		getB(vec2(10.0, -9.0)) +
		getB(vec2(10.0, -1.0)) +
		getB(vec2(10.0, 0.0)) +
		getB(vec2(10.0, 1.0)) +
		getB(vec2(10.0, 9.0)) +
		getB(vec2(11.0, -8.0)) +
		getB(vec2(11.0, -7.0)) +
		getB(vec2(11.0, 7.0)) +
		getB(vec2(11.0, 8.0)) +
		getB(vec2(12.0, -6.0)) +
		getB(vec2(12.0, -5.0)) +
		getB(vec2(12.0, 5.0)) +
		getB(vec2(12.0, 6.0)) +
		getB(vec2(13.0, -4.0)) +
		getB(vec2(13.0, -3.0)) +
		getB(vec2(13.0, -2.0)) +
		getB(vec2(13.0, 2.0)) +
		getB(vec2(13.0, 3.0)) +
		getB(vec2(13.0, 4.0)) +
		getB(vec2(14.0, -1.0)) +
		getB(vec2(14.0, 0.0)) +
		getB(vec2(14.0, 1.0));   /*NEWLINE*/ int sum_3 = int(s3 + s4 + s5 + s6); //EDGE_0


	if(sum_3 >= 89 && sum_3 <= 92) { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); }

	if(sum_3 >= 112 && sum_3 <= 170) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }
	if(sum_3 >= 135 && sum_3 <= 140) { gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); }

	if(sum_3 >= 96 && sum_3 <= 100) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }



	//EDGE_2

}
