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
 		
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0));   /*NEWLINE*/ int sum_0 = int(s0); //EDGE_0

	
	//EDGE_1
float s1 = 
 		
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0));   /*NEWLINE*/ int sum_1 = int(s1); //EDGE_0

	if(sum_1 >= 4) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_1 == 3) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_1 <= 1) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	


	//EDGE_1
float s2 = 
 		
		getR(vec2(-14.0, -1.0)) +
		getR(vec2(-14.0, 0.0)) +
		getR(vec2(-14.0, 1.0)) +
		getR(vec2(-13.0, -4.0)) +
		getR(vec2(-13.0, -3.0)) +
		getR(vec2(-13.0, -2.0)) +
		getR(vec2(-13.0, 2.0)) +
		getR(vec2(-13.0, 3.0)) +
		getR(vec2(-13.0, 4.0)) +
		getR(vec2(-12.0, -6.0)) +
		getR(vec2(-12.0, -5.0)) +
		getR(vec2(-12.0, 5.0)) +
		getR(vec2(-12.0, 6.0)) +
		getR(vec2(-11.0, -8.0)) +
		getR(vec2(-11.0, -7.0)) +
		getR(vec2(-11.0, 7.0)) +
		getR(vec2(-11.0, 8.0)) +
		getR(vec2(-10.0, -9.0)) +
		getR(vec2(-10.0, -1.0)) +
		getR(vec2(-10.0, 0.0)) +
		getR(vec2(-10.0, 1.0)) +
		getR(vec2(-10.0, 9.0)) +
		getR(vec2(-9.0, -10.0)) +
		getR(vec2(-9.0, -4.0)) +
		getR(vec2(-9.0, -3.0)) +
		getR(vec2(-9.0, -2.0)) +
		getR(vec2(-9.0, 2.0)) +
		getR(vec2(-9.0, 3.0)) +
		getR(vec2(-9.0, 4.0)) +
		getR(vec2(-9.0, 10.0)) +
		getR(vec2(-8.0, -11.0)) +
		getR(vec2(-8.0, -6.0)) +
		getR(vec2(-8.0, -5.0)) +
		getR(vec2(-8.0, 5.0)) +
		getR(vec2(-8.0, 6.0)) +
		getR(vec2(-8.0, 11.0)) +
		getR(vec2(-7.0, -11.0)) +
		getR(vec2(-7.0, -7.0)) +
		getR(vec2(-7.0, -2.0)) +
		getR(vec2(-7.0, -1.0)) +
		getR(vec2(-7.0, 0.0)) +
		getR(vec2(-7.0, 1.0)) +
		getR(vec2(-7.0, 2.0)) +
		getR(vec2(-7.0, 7.0)) +
		getR(vec2(-7.0, 11.0)) +
		getR(vec2(-6.0, -12.0)) +
		getR(vec2(-6.0, -8.0)) +
		getR(vec2(-6.0, -4.0)) +
		getR(vec2(-6.0, -3.0)) +
		getR(vec2(-6.0, 3.0)) +
		getR(vec2(-6.0, 4.0)) +
		getR(vec2(-6.0, 8.0)) +
		getR(vec2(-6.0, 12.0)) +
		getR(vec2(-5.0, -12.0)) +
		getR(vec2(-5.0, -8.0)) +
		getR(vec2(-5.0, -5.0)) +
		getR(vec2(-5.0, -1.0)) +
		getR(vec2(-5.0, 0.0)) +
		getR(vec2(-5.0, 1.0)) +
		getR(vec2(-5.0, 5.0));
float s3 = 		getR(vec2(-5.0, 8.0)) +
		getR(vec2(-5.0, 12.0)) +
		getR(vec2(-4.0, -13.0)) +
		getR(vec2(-4.0, -9.0)) +
		getR(vec2(-4.0, -6.0)) +
		getR(vec2(-4.0, -3.0)) +
		getR(vec2(-4.0, -2.0)) +
		getR(vec2(-4.0, 2.0)) +
		getR(vec2(-4.0, 3.0)) +
		getR(vec2(-4.0, 6.0)) +
		getR(vec2(-4.0, 9.0)) +
		getR(vec2(-4.0, 13.0)) +
		getR(vec2(-3.0, -13.0)) +
		getR(vec2(-3.0, -9.0)) +
		getR(vec2(-3.0, -6.0)) +
		getR(vec2(-3.0, -4.0)) +
		getR(vec2(-3.0, -1.0)) +
		getR(vec2(-3.0, 0.0)) +
		getR(vec2(-3.0, 1.0)) +
		getR(vec2(-3.0, 4.0)) +
		getR(vec2(-3.0, 6.0)) +
		getR(vec2(-3.0, 9.0)) +
		getR(vec2(-3.0, 13.0)) +
		getR(vec2(-2.0, -13.0)) +
		getR(vec2(-2.0, -9.0)) +
		getR(vec2(-2.0, -7.0)) +
		getR(vec2(-2.0, -4.0)) +
		getR(vec2(-2.0, -2.0)) +
		getR(vec2(-2.0, 2.0)) +
		getR(vec2(-2.0, 4.0)) +
		getR(vec2(-2.0, 7.0)) +
		getR(vec2(-2.0, 9.0)) +
		getR(vec2(-2.0, 13.0)) +
		getR(vec2(-1.0, -14.0)) +
		getR(vec2(-1.0, -10.0)) +
		getR(vec2(-1.0, -7.0)) +
		getR(vec2(-1.0, -5.0)) +
		getR(vec2(-1.0, -3.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 3.0)) +
		getR(vec2(-1.0, 5.0)) +
		getR(vec2(-1.0, 7.0)) +
		getR(vec2(-1.0, 10.0)) +
		getR(vec2(-1.0, 14.0)) +
		getR(vec2(0.0, -14.0)) +
		getR(vec2(0.0, -10.0)) +
		getR(vec2(0.0, -7.0)) +
		getR(vec2(0.0, -5.0)) +
		getR(vec2(0.0, -3.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 3.0)) +
		getR(vec2(0.0, 5.0)) +
		getR(vec2(0.0, 7.0)) +
		getR(vec2(0.0, 10.0)) +
		getR(vec2(0.0, 14.0)) +
		getR(vec2(1.0, -14.0)) +
		getR(vec2(1.0, -10.0)) +
		getR(vec2(1.0, -7.0));
float s4 = 		getR(vec2(1.0, -5.0)) +
		getR(vec2(1.0, -3.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 3.0)) +
		getR(vec2(1.0, 5.0)) +
		getR(vec2(1.0, 7.0)) +
		getR(vec2(1.0, 10.0)) +
		getR(vec2(1.0, 14.0)) +
		getR(vec2(2.0, -13.0)) +
		getR(vec2(2.0, -9.0)) +
		getR(vec2(2.0, -7.0)) +
		getR(vec2(2.0, -4.0)) +
		getR(vec2(2.0, -2.0)) +
		getR(vec2(2.0, 2.0)) +
		getR(vec2(2.0, 4.0)) +
		getR(vec2(2.0, 7.0)) +
		getR(vec2(2.0, 9.0)) +
		getR(vec2(2.0, 13.0)) +
		getR(vec2(3.0, -13.0)) +
		getR(vec2(3.0, -9.0)) +
		getR(vec2(3.0, -6.0)) +
		getR(vec2(3.0, -4.0)) +
		getR(vec2(3.0, -1.0)) +
		getR(vec2(3.0, 0.0)) +
		getR(vec2(3.0, 1.0)) +
		getR(vec2(3.0, 4.0)) +
		getR(vec2(3.0, 6.0)) +
		getR(vec2(3.0, 9.0)) +
		getR(vec2(3.0, 13.0)) +
		getR(vec2(4.0, -13.0)) +
		getR(vec2(4.0, -9.0)) +
		getR(vec2(4.0, -6.0)) +
		getR(vec2(4.0, -3.0)) +
		getR(vec2(4.0, -2.0)) +
		getR(vec2(4.0, 2.0)) +
		getR(vec2(4.0, 3.0)) +
		getR(vec2(4.0, 6.0)) +
		getR(vec2(4.0, 9.0)) +
		getR(vec2(4.0, 13.0)) +
		getR(vec2(5.0, -12.0)) +
		getR(vec2(5.0, -8.0)) +
		getR(vec2(5.0, -5.0)) +
		getR(vec2(5.0, -1.0)) +
		getR(vec2(5.0, 0.0)) +
		getR(vec2(5.0, 1.0)) +
		getR(vec2(5.0, 5.0)) +
		getR(vec2(5.0, 8.0)) +
		getR(vec2(5.0, 12.0)) +
		getR(vec2(6.0, -12.0)) +
		getR(vec2(6.0, -8.0)) +
		getR(vec2(6.0, -4.0)) +
		getR(vec2(6.0, -3.0)) +
		getR(vec2(6.0, 3.0)) +
		getR(vec2(6.0, 4.0)) +
		getR(vec2(6.0, 8.0)) +
		getR(vec2(6.0, 12.0)) +
		getR(vec2(7.0, -11.0)) +
		getR(vec2(7.0, -7.0)) +
		getR(vec2(7.0, -2.0));
float s5 = 		getR(vec2(7.0, -1.0)) +
		getR(vec2(7.0, 0.0)) +
		getR(vec2(7.0, 1.0)) +
		getR(vec2(7.0, 2.0)) +
		getR(vec2(7.0, 7.0)) +
		getR(vec2(7.0, 11.0)) +
		getR(vec2(8.0, -11.0)) +
		getR(vec2(8.0, -6.0)) +
		getR(vec2(8.0, -5.0)) +
		getR(vec2(8.0, 5.0)) +
		getR(vec2(8.0, 6.0)) +
		getR(vec2(8.0, 11.0)) +
		getR(vec2(9.0, -10.0)) +
		getR(vec2(9.0, -4.0)) +
		getR(vec2(9.0, -3.0)) +
		getR(vec2(9.0, -2.0)) +
		getR(vec2(9.0, 2.0)) +
		getR(vec2(9.0, 3.0)) +
		getR(vec2(9.0, 4.0)) +
		getR(vec2(9.0, 10.0)) +
		getR(vec2(10.0, -9.0)) +
		getR(vec2(10.0, -1.0)) +
		getR(vec2(10.0, 0.0)) +
		getR(vec2(10.0, 1.0)) +
		getR(vec2(10.0, 9.0)) +
		getR(vec2(11.0, -8.0)) +
		getR(vec2(11.0, -7.0)) +
		getR(vec2(11.0, 7.0)) +
		getR(vec2(11.0, 8.0)) +
		getR(vec2(12.0, -6.0)) +
		getR(vec2(12.0, -5.0)) +
		getR(vec2(12.0, 5.0)) +
		getR(vec2(12.0, 6.0)) +
		getR(vec2(13.0, -4.0)) +
		getR(vec2(13.0, -3.0)) +
		getR(vec2(13.0, -2.0)) +
		getR(vec2(13.0, 2.0)) +
		getR(vec2(13.0, 3.0)) +
		getR(vec2(13.0, 4.0)) +
		getR(vec2(14.0, -1.0)) +
		getR(vec2(14.0, 0.0)) +
		getR(vec2(14.0, 1.0));   /*NEWLINE*/ int sum_2 = int(s2 + s3 + s4 + s5); //EDGE_0

//Get gliders to be birthed from wave's crystal form

	

	if(sum_2 >= 25 && sum_2 <= 80) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_2 >= 39 && sum_2 <= 43) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	//if(sum_2 >= 49 && sum_2 <= 50) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_2 >= 84 && sum_2 <= 139) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	//if(sum_2 >= 89 && sum_2 <= 95) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	
	



	//EDGE_1
float s6 = 
 		
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
		getR(vec2(3.0, 1.0));   /*NEWLINE*/ int sum_3 = int(s6); //EDGE_0


	if(sum_3 >= 13 && sum_3 <= 20) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	
	if(sum_3 >= 9 && sum_3 <= 9) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	

	






//EDGE_1
float s7 = 
 		
		getR(vec2(-6.0, -1.0)) +
		getR(vec2(-6.0, 0.0)) +
		getR(vec2(-6.0, 1.0)) +
		getR(vec2(-5.0, -3.0)) +
		getR(vec2(-5.0, -2.0)) +
		getR(vec2(-5.0, -1.0)) +
		getR(vec2(-5.0, 0.0)) +
		getR(vec2(-5.0, 1.0)) +
		getR(vec2(-5.0, 2.0)) +
		getR(vec2(-5.0, 3.0)) +
		getR(vec2(-4.0, -4.0)) +
		getR(vec2(-4.0, -3.0)) +
		getR(vec2(-4.0, -2.0)) +
		getR(vec2(-4.0, -1.0)) +
		getR(vec2(-4.0, 0.0)) +
		getR(vec2(-4.0, 1.0)) +
		getR(vec2(-4.0, 2.0)) +
		getR(vec2(-4.0, 3.0)) +
		getR(vec2(-4.0, 4.0)) +
		getR(vec2(-3.0, -5.0)) +
		getR(vec2(-3.0, -4.0)) +
		getR(vec2(-3.0, -3.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-3.0, 3.0)) +
		getR(vec2(-3.0, 4.0)) +
		getR(vec2(-3.0, 5.0)) +
		getR(vec2(-2.0, -5.0)) +
		getR(vec2(-2.0, -4.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-2.0, 4.0)) +
		getR(vec2(-2.0, 5.0)) +
		getR(vec2(-1.0, -6.0)) +
		getR(vec2(-1.0, -5.0)) +
		getR(vec2(-1.0, -4.0)) +
		getR(vec2(-1.0, 4.0)) +
		getR(vec2(-1.0, 5.0)) +
		getR(vec2(-1.0, 6.0)) +
		getR(vec2(0.0, -6.0)) +
		getR(vec2(0.0, -5.0)) +
		getR(vec2(0.0, -4.0)) +
		getR(vec2(0.0, 4.0)) +
		getR(vec2(0.0, 5.0)) +
		getR(vec2(0.0, 6.0)) +
		getR(vec2(1.0, -6.0)) +
		getR(vec2(1.0, -5.0)) +
		getR(vec2(1.0, -4.0)) +
		getR(vec2(1.0, 4.0)) +
		getR(vec2(1.0, 5.0)) +
		getR(vec2(1.0, 6.0)) +
		getR(vec2(2.0, -5.0)) +
		getR(vec2(2.0, -4.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(2.0, 4.0)) +
		getR(vec2(2.0, 5.0)) +
		getR(vec2(3.0, -5.0)) +
		getR(vec2(3.0, -4.0)) +
		getR(vec2(3.0, -3.0));
float s8 = 		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(3.0, 3.0)) +
		getR(vec2(3.0, 4.0)) +
		getR(vec2(3.0, 5.0)) +
		getR(vec2(4.0, -4.0)) +
		getR(vec2(4.0, -3.0)) +
		getR(vec2(4.0, -2.0)) +
		getR(vec2(4.0, -1.0)) +
		getR(vec2(4.0, 0.0)) +
		getR(vec2(4.0, 1.0)) +
		getR(vec2(4.0, 2.0)) +
		getR(vec2(4.0, 3.0)) +
		getR(vec2(4.0, 4.0)) +
		getR(vec2(5.0, -3.0)) +
		getR(vec2(5.0, -2.0)) +
		getR(vec2(5.0, -1.0)) +
		getR(vec2(5.0, 0.0)) +
		getR(vec2(5.0, 1.0)) +
		getR(vec2(5.0, 2.0)) +
		getR(vec2(5.0, 3.0)) +
		getR(vec2(6.0, -1.0)) +
		getR(vec2(6.0, 0.0)) +
		getR(vec2(6.0, 1.0));   /*NEWLINE*/ int sum_4 = int(s7 + s8); //EDGE_0



	if(sum_4 >= 15 && sum_4 <= 29) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	if(sum_4 >= 59 && sum_4 <= 62) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	

	




































	
	//EDGE_1
float s9 = 
 		
		getR(vec2(-14.0, -3.0)) +
		getR(vec2(-14.0, -2.0)) +
		getR(vec2(-14.0, -1.0)) +
		getR(vec2(-14.0, 0.0)) +
		getR(vec2(-14.0, 1.0)) +
		getR(vec2(-14.0, 2.0)) +
		getR(vec2(-14.0, 3.0)) +
		getR(vec2(-13.0, -6.0)) +
		getR(vec2(-13.0, -5.0)) +
		getR(vec2(-13.0, -4.0)) +
		getR(vec2(-13.0, -3.0)) +
		getR(vec2(-13.0, -2.0)) +
		getR(vec2(-13.0, -1.0)) +
		getR(vec2(-13.0, 0.0)) +
		getR(vec2(-13.0, 1.0)) +
		getR(vec2(-13.0, 2.0)) +
		getR(vec2(-13.0, 3.0)) +
		getR(vec2(-13.0, 4.0)) +
		getR(vec2(-13.0, 5.0)) +
		getR(vec2(-13.0, 6.0)) +
		getR(vec2(-12.0, -8.0)) +
		getR(vec2(-12.0, -7.0)) +
		getR(vec2(-12.0, -6.0)) +
		getR(vec2(-12.0, -5.0)) +
		getR(vec2(-12.0, -4.0)) +
		getR(vec2(-12.0, -3.0)) +
		getR(vec2(-12.0, -2.0)) +
		getR(vec2(-12.0, -1.0)) +
		getR(vec2(-12.0, 0.0)) +
		getR(vec2(-12.0, 1.0)) +
		getR(vec2(-12.0, 2.0)) +
		getR(vec2(-12.0, 3.0)) +
		getR(vec2(-12.0, 4.0)) +
		getR(vec2(-12.0, 5.0)) +
		getR(vec2(-12.0, 6.0)) +
		getR(vec2(-12.0, 7.0)) +
		getR(vec2(-12.0, 8.0)) +
		getR(vec2(-11.0, -9.0)) +
		getR(vec2(-11.0, -8.0)) +
		getR(vec2(-11.0, -7.0)) +
		getR(vec2(-11.0, -6.0)) +
		getR(vec2(-11.0, -5.0)) +
		getR(vec2(-11.0, -4.0)) +
		getR(vec2(-11.0, -3.0)) +
		getR(vec2(-11.0, -2.0)) +
		getR(vec2(-11.0, -1.0)) +
		getR(vec2(-11.0, 0.0)) +
		getR(vec2(-11.0, 1.0)) +
		getR(vec2(-11.0, 2.0)) +
		getR(vec2(-11.0, 3.0)) +
		getR(vec2(-11.0, 4.0)) +
		getR(vec2(-11.0, 5.0)) +
		getR(vec2(-11.0, 6.0)) +
		getR(vec2(-11.0, 7.0)) +
		getR(vec2(-11.0, 8.0)) +
		getR(vec2(-11.0, 9.0)) +
		getR(vec2(-10.0, -10.0)) +
		getR(vec2(-10.0, -9.0)) +
		getR(vec2(-10.0, -8.0)) +
		getR(vec2(-10.0, -7.0));
float s10 = 		getR(vec2(-10.0, -6.0)) +
		getR(vec2(-10.0, -5.0)) +
		getR(vec2(-10.0, 5.0)) +
		getR(vec2(-10.0, 6.0)) +
		getR(vec2(-10.0, 7.0)) +
		getR(vec2(-10.0, 8.0)) +
		getR(vec2(-10.0, 9.0)) +
		getR(vec2(-10.0, 10.0)) +
		getR(vec2(-9.0, -11.0)) +
		getR(vec2(-9.0, -10.0)) +
		getR(vec2(-9.0, -9.0)) +
		getR(vec2(-9.0, -8.0)) +
		getR(vec2(-9.0, -7.0)) +
		getR(vec2(-9.0, 7.0)) +
		getR(vec2(-9.0, 8.0)) +
		getR(vec2(-9.0, 9.0)) +
		getR(vec2(-9.0, 10.0)) +
		getR(vec2(-9.0, 11.0)) +
		getR(vec2(-8.0, -12.0)) +
		getR(vec2(-8.0, -11.0)) +
		getR(vec2(-8.0, -10.0)) +
		getR(vec2(-8.0, -9.0)) +
		getR(vec2(-8.0, -8.0)) +
		getR(vec2(-8.0, 8.0)) +
		getR(vec2(-8.0, 9.0)) +
		getR(vec2(-8.0, 10.0)) +
		getR(vec2(-8.0, 11.0)) +
		getR(vec2(-8.0, 12.0)) +
		getR(vec2(-7.0, -12.0)) +
		getR(vec2(-7.0, -11.0)) +
		getR(vec2(-7.0, -10.0)) +
		getR(vec2(-7.0, -9.0)) +
		getR(vec2(-7.0, -2.0)) +
		getR(vec2(-7.0, -1.0)) +
		getR(vec2(-7.0, 0.0)) +
		getR(vec2(-7.0, 1.0)) +
		getR(vec2(-7.0, 2.0)) +
		getR(vec2(-7.0, 9.0)) +
		getR(vec2(-7.0, 10.0)) +
		getR(vec2(-7.0, 11.0)) +
		getR(vec2(-7.0, 12.0)) +
		getR(vec2(-6.0, -13.0)) +
		getR(vec2(-6.0, -12.0)) +
		getR(vec2(-6.0, -11.0)) +
		getR(vec2(-6.0, -10.0)) +
		getR(vec2(-6.0, -4.0)) +
		getR(vec2(-6.0, -3.0)) +
		getR(vec2(-6.0, 3.0)) +
		getR(vec2(-6.0, 4.0)) +
		getR(vec2(-6.0, 10.0)) +
		getR(vec2(-6.0, 11.0)) +
		getR(vec2(-6.0, 12.0)) +
		getR(vec2(-6.0, 13.0)) +
		getR(vec2(-5.0, -13.0)) +
		getR(vec2(-5.0, -12.0)) +
		getR(vec2(-5.0, -11.0)) +
		getR(vec2(-5.0, -10.0)) +
		getR(vec2(-5.0, -5.0)) +
		getR(vec2(-5.0, 5.0)) +
		getR(vec2(-5.0, 10.0)) +
		getR(vec2(-5.0, 11.0));
float s11 = 		getR(vec2(-5.0, 12.0)) +
		getR(vec2(-5.0, 13.0)) +
		getR(vec2(-4.0, -13.0)) +
		getR(vec2(-4.0, -12.0)) +
		getR(vec2(-4.0, -11.0)) +
		getR(vec2(-4.0, -6.0)) +
		getR(vec2(-4.0, -1.0)) +
		getR(vec2(-4.0, 0.0)) +
		getR(vec2(-4.0, 1.0)) +
		getR(vec2(-4.0, 6.0)) +
		getR(vec2(-4.0, 11.0)) +
		getR(vec2(-4.0, 12.0)) +
		getR(vec2(-4.0, 13.0)) +
		getR(vec2(-3.0, -14.0)) +
		getR(vec2(-3.0, -13.0)) +
		getR(vec2(-3.0, -12.0)) +
		getR(vec2(-3.0, -11.0)) +
		getR(vec2(-3.0, -6.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-3.0, 6.0)) +
		getR(vec2(-3.0, 11.0)) +
		getR(vec2(-3.0, 12.0)) +
		getR(vec2(-3.0, 13.0)) +
		getR(vec2(-3.0, 14.0)) +
		getR(vec2(-2.0, -14.0)) +
		getR(vec2(-2.0, -13.0)) +
		getR(vec2(-2.0, -12.0)) +
		getR(vec2(-2.0, -11.0)) +
		getR(vec2(-2.0, -7.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-2.0, 7.0)) +
		getR(vec2(-2.0, 11.0)) +
		getR(vec2(-2.0, 12.0)) +
		getR(vec2(-2.0, 13.0)) +
		getR(vec2(-2.0, 14.0)) +
		getR(vec2(-1.0, -14.0)) +
		getR(vec2(-1.0, -13.0)) +
		getR(vec2(-1.0, -12.0)) +
		getR(vec2(-1.0, -11.0)) +
		getR(vec2(-1.0, -7.0)) +
		getR(vec2(-1.0, -4.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 4.0)) +
		getR(vec2(-1.0, 7.0)) +
		getR(vec2(-1.0, 11.0)) +
		getR(vec2(-1.0, 12.0)) +
		getR(vec2(-1.0, 13.0)) +
		getR(vec2(-1.0, 14.0)) +
		getR(vec2(0.0, -14.0)) +
		getR(vec2(0.0, -13.0)) +
		getR(vec2(0.0, -12.0)) +
		getR(vec2(0.0, -11.0)) +
		getR(vec2(0.0, -7.0)) +
		getR(vec2(0.0, -4.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 4.0));
float s12 = 		getR(vec2(0.0, 7.0)) +
		getR(vec2(0.0, 11.0)) +
		getR(vec2(0.0, 12.0)) +
		getR(vec2(0.0, 13.0)) +
		getR(vec2(0.0, 14.0)) +
		getR(vec2(1.0, -14.0)) +
		getR(vec2(1.0, -13.0)) +
		getR(vec2(1.0, -12.0)) +
		getR(vec2(1.0, -11.0)) +
		getR(vec2(1.0, -7.0)) +
		getR(vec2(1.0, -4.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 4.0)) +
		getR(vec2(1.0, 7.0)) +
		getR(vec2(1.0, 11.0)) +
		getR(vec2(1.0, 12.0)) +
		getR(vec2(1.0, 13.0)) +
		getR(vec2(1.0, 14.0)) +
		getR(vec2(2.0, -14.0)) +
		getR(vec2(2.0, -13.0)) +
		getR(vec2(2.0, -12.0)) +
		getR(vec2(2.0, -11.0)) +
		getR(vec2(2.0, -7.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(2.0, 7.0)) +
		getR(vec2(2.0, 11.0)) +
		getR(vec2(2.0, 12.0)) +
		getR(vec2(2.0, 13.0)) +
		getR(vec2(2.0, 14.0)) +
		getR(vec2(3.0, -14.0)) +
		getR(vec2(3.0, -13.0)) +
		getR(vec2(3.0, -12.0)) +
		getR(vec2(3.0, -11.0)) +
		getR(vec2(3.0, -6.0)) +
		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(3.0, 6.0)) +
		getR(vec2(3.0, 11.0)) +
		getR(vec2(3.0, 12.0)) +
		getR(vec2(3.0, 13.0)) +
		getR(vec2(3.0, 14.0)) +
		getR(vec2(4.0, -13.0)) +
		getR(vec2(4.0, -12.0)) +
		getR(vec2(4.0, -11.0)) +
		getR(vec2(4.0, -6.0)) +
		getR(vec2(4.0, -1.0)) +
		getR(vec2(4.0, 0.0)) +
		getR(vec2(4.0, 1.0)) +
		getR(vec2(4.0, 6.0)) +
		getR(vec2(4.0, 11.0)) +
		getR(vec2(4.0, 12.0)) +
		getR(vec2(4.0, 13.0)) +
		getR(vec2(5.0, -13.0)) +
		getR(vec2(5.0, -12.0)) +
		getR(vec2(5.0, -11.0)) +
		getR(vec2(5.0, -10.0)) +
		getR(vec2(5.0, -5.0)) +
		getR(vec2(5.0, 5.0));
float s13 = 		getR(vec2(5.0, 10.0)) +
		getR(vec2(5.0, 11.0)) +
		getR(vec2(5.0, 12.0)) +
		getR(vec2(5.0, 13.0)) +
		getR(vec2(6.0, -13.0)) +
		getR(vec2(6.0, -12.0)) +
		getR(vec2(6.0, -11.0)) +
		getR(vec2(6.0, -10.0)) +
		getR(vec2(6.0, -4.0)) +
		getR(vec2(6.0, -3.0)) +
		getR(vec2(6.0, 3.0)) +
		getR(vec2(6.0, 4.0)) +
		getR(vec2(6.0, 10.0)) +
		getR(vec2(6.0, 11.0)) +
		getR(vec2(6.0, 12.0)) +
		getR(vec2(6.0, 13.0)) +
		getR(vec2(7.0, -12.0)) +
		getR(vec2(7.0, -11.0)) +
		getR(vec2(7.0, -10.0)) +
		getR(vec2(7.0, -9.0)) +
		getR(vec2(7.0, -2.0)) +
		getR(vec2(7.0, -1.0)) +
		getR(vec2(7.0, 0.0)) +
		getR(vec2(7.0, 1.0)) +
		getR(vec2(7.0, 2.0)) +
		getR(vec2(7.0, 9.0)) +
		getR(vec2(7.0, 10.0)) +
		getR(vec2(7.0, 11.0)) +
		getR(vec2(7.0, 12.0)) +
		getR(vec2(8.0, -12.0)) +
		getR(vec2(8.0, -11.0)) +
		getR(vec2(8.0, -10.0)) +
		getR(vec2(8.0, -9.0)) +
		getR(vec2(8.0, -8.0)) +
		getR(vec2(8.0, 8.0)) +
		getR(vec2(8.0, 9.0)) +
		getR(vec2(8.0, 10.0)) +
		getR(vec2(8.0, 11.0)) +
		getR(vec2(8.0, 12.0)) +
		getR(vec2(9.0, -11.0)) +
		getR(vec2(9.0, -10.0)) +
		getR(vec2(9.0, -9.0)) +
		getR(vec2(9.0, -8.0)) +
		getR(vec2(9.0, -7.0)) +
		getR(vec2(9.0, 7.0)) +
		getR(vec2(9.0, 8.0)) +
		getR(vec2(9.0, 9.0)) +
		getR(vec2(9.0, 10.0)) +
		getR(vec2(9.0, 11.0)) +
		getR(vec2(10.0, -10.0)) +
		getR(vec2(10.0, -9.0)) +
		getR(vec2(10.0, -8.0)) +
		getR(vec2(10.0, -7.0)) +
		getR(vec2(10.0, -6.0)) +
		getR(vec2(10.0, -5.0)) +
		getR(vec2(10.0, 5.0)) +
		getR(vec2(10.0, 6.0)) +
		getR(vec2(10.0, 7.0)) +
		getR(vec2(10.0, 8.0)) +
		getR(vec2(10.0, 9.0)) +
		getR(vec2(10.0, 10.0));
float s14 = 		getR(vec2(11.0, -9.0)) +
		getR(vec2(11.0, -8.0)) +
		getR(vec2(11.0, -7.0)) +
		getR(vec2(11.0, -6.0)) +
		getR(vec2(11.0, -5.0)) +
		getR(vec2(11.0, -4.0)) +
		getR(vec2(11.0, -3.0)) +
		getR(vec2(11.0, -2.0)) +
		getR(vec2(11.0, -1.0)) +
		getR(vec2(11.0, 0.0)) +
		getR(vec2(11.0, 1.0)) +
		getR(vec2(11.0, 2.0)) +
		getR(vec2(11.0, 3.0)) +
		getR(vec2(11.0, 4.0)) +
		getR(vec2(11.0, 5.0)) +
		getR(vec2(11.0, 6.0)) +
		getR(vec2(11.0, 7.0)) +
		getR(vec2(11.0, 8.0)) +
		getR(vec2(11.0, 9.0)) +
		getR(vec2(12.0, -8.0)) +
		getR(vec2(12.0, -7.0)) +
		getR(vec2(12.0, -6.0)) +
		getR(vec2(12.0, -5.0)) +
		getR(vec2(12.0, -4.0)) +
		getR(vec2(12.0, -3.0)) +
		getR(vec2(12.0, -2.0)) +
		getR(vec2(12.0, -1.0)) +
		getR(vec2(12.0, 0.0)) +
		getR(vec2(12.0, 1.0)) +
		getR(vec2(12.0, 2.0)) +
		getR(vec2(12.0, 3.0)) +
		getR(vec2(12.0, 4.0)) +
		getR(vec2(12.0, 5.0)) +
		getR(vec2(12.0, 6.0)) +
		getR(vec2(12.0, 7.0)) +
		getR(vec2(12.0, 8.0)) +
		getR(vec2(13.0, -6.0)) +
		getR(vec2(13.0, -5.0)) +
		getR(vec2(13.0, -4.0)) +
		getR(vec2(13.0, -3.0)) +
		getR(vec2(13.0, -2.0)) +
		getR(vec2(13.0, -1.0)) +
		getR(vec2(13.0, 0.0)) +
		getR(vec2(13.0, 1.0)) +
		getR(vec2(13.0, 2.0)) +
		getR(vec2(13.0, 3.0)) +
		getR(vec2(13.0, 4.0)) +
		getR(vec2(13.0, 5.0)) +
		getR(vec2(13.0, 6.0)) +
		getR(vec2(14.0, -3.0)) +
		getR(vec2(14.0, -2.0)) +
		getR(vec2(14.0, -1.0)) +
		getR(vec2(14.0, 0.0)) +
		getR(vec2(14.0, 1.0)) +
		getR(vec2(14.0, 2.0)) +
		getR(vec2(14.0, 3.0));   /*NEWLINE*/ int sum_5 = int(s9 + s10 + s11 + s12 + s13 + s14); //EDGE_0

	if(sum_5 >= 165 && sum_5 <= 235) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_5 >= 320) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	//if(sum_5 >= 316 && sum_5 <= 316) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }	


	//EDGE_2

}
