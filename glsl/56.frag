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
 		
		getB(vec2(-14.0, -3.0)) +
		getB(vec2(-14.0, -2.0)) +
		getB(vec2(-14.0, -1.0)) +
		getB(vec2(-14.0, 0.0)) +
		getB(vec2(-14.0, 1.0)) +
		getB(vec2(-14.0, 2.0)) +
		getB(vec2(-14.0, 3.0)) +
		getB(vec2(-13.0, -6.0)) +
		getB(vec2(-13.0, -5.0)) +
		getB(vec2(-13.0, -4.0)) +
		getB(vec2(-13.0, -3.0)) +
		getB(vec2(-13.0, -2.0)) +
		getB(vec2(-13.0, -1.0)) +
		getB(vec2(-13.0, 0.0)) +
		getB(vec2(-13.0, 1.0)) +
		getB(vec2(-13.0, 2.0)) +
		getB(vec2(-13.0, 3.0)) +
		getB(vec2(-13.0, 4.0)) +
		getB(vec2(-13.0, 5.0)) +
		getB(vec2(-13.0, 6.0)) +
		getB(vec2(-12.0, -8.0)) +
		getB(vec2(-12.0, -7.0)) +
		getB(vec2(-12.0, -6.0)) +
		getB(vec2(-12.0, -5.0)) +
		getB(vec2(-12.0, -4.0)) +
		getB(vec2(-12.0, -3.0)) +
		getB(vec2(-12.0, -2.0)) +
		getB(vec2(-12.0, -1.0)) +
		getB(vec2(-12.0, 0.0)) +
		getB(vec2(-12.0, 1.0)) +
		getB(vec2(-12.0, 2.0)) +
		getB(vec2(-12.0, 3.0)) +
		getB(vec2(-12.0, 4.0)) +
		getB(vec2(-12.0, 5.0)) +
		getB(vec2(-12.0, 6.0)) +
		getB(vec2(-12.0, 7.0)) +
		getB(vec2(-12.0, 8.0)) +
		getB(vec2(-11.0, -9.0)) +
		getB(vec2(-11.0, -8.0)) +
		getB(vec2(-11.0, -7.0)) +
		getB(vec2(-11.0, -6.0)) +
		getB(vec2(-11.0, -5.0)) +
		getB(vec2(-11.0, -4.0)) +
		getB(vec2(-11.0, -3.0)) +
		getB(vec2(-11.0, -2.0)) +
		getB(vec2(-11.0, -1.0)) +
		getB(vec2(-11.0, 0.0)) +
		getB(vec2(-11.0, 1.0)) +
		getB(vec2(-11.0, 2.0)) +
		getB(vec2(-11.0, 3.0)) +
		getB(vec2(-11.0, 4.0)) +
		getB(vec2(-11.0, 5.0)) +
		getB(vec2(-11.0, 6.0)) +
		getB(vec2(-11.0, 7.0)) +
		getB(vec2(-11.0, 8.0)) +
		getB(vec2(-11.0, 9.0)) +
		getB(vec2(-10.0, -10.0)) +
		getB(vec2(-10.0, -9.0)) +
		getB(vec2(-10.0, -8.0)) +
		getB(vec2(-10.0, -7.0));
float s1 = 		getB(vec2(-10.0, -6.0)) +
		getB(vec2(-10.0, -5.0)) +
		getB(vec2(-10.0, 5.0)) +
		getB(vec2(-10.0, 6.0)) +
		getB(vec2(-10.0, 7.0)) +
		getB(vec2(-10.0, 8.0)) +
		getB(vec2(-10.0, 9.0)) +
		getB(vec2(-10.0, 10.0)) +
		getB(vec2(-9.0, -11.0)) +
		getB(vec2(-9.0, -10.0)) +
		getB(vec2(-9.0, -9.0)) +
		getB(vec2(-9.0, -8.0)) +
		getB(vec2(-9.0, -7.0)) +
		getB(vec2(-9.0, 7.0)) +
		getB(vec2(-9.0, 8.0)) +
		getB(vec2(-9.0, 9.0)) +
		getB(vec2(-9.0, 10.0)) +
		getB(vec2(-9.0, 11.0)) +
		getB(vec2(-8.0, -12.0)) +
		getB(vec2(-8.0, -11.0)) +
		getB(vec2(-8.0, -10.0)) +
		getB(vec2(-8.0, -9.0)) +
		getB(vec2(-8.0, -8.0)) +
		getB(vec2(-8.0, 8.0)) +
		getB(vec2(-8.0, 9.0)) +
		getB(vec2(-8.0, 10.0)) +
		getB(vec2(-8.0, 11.0)) +
		getB(vec2(-8.0, 12.0)) +
		getB(vec2(-7.0, -12.0)) +
		getB(vec2(-7.0, -11.0)) +
		getB(vec2(-7.0, -10.0)) +
		getB(vec2(-7.0, -9.0)) +
		getB(vec2(-7.0, -2.0)) +
		getB(vec2(-7.0, -1.0)) +
		getB(vec2(-7.0, 0.0)) +
		getB(vec2(-7.0, 1.0)) +
		getB(vec2(-7.0, 2.0)) +
		getB(vec2(-7.0, 9.0)) +
		getB(vec2(-7.0, 10.0)) +
		getB(vec2(-7.0, 11.0)) +
		getB(vec2(-7.0, 12.0)) +
		getB(vec2(-6.0, -13.0)) +
		getB(vec2(-6.0, -12.0)) +
		getB(vec2(-6.0, -11.0)) +
		getB(vec2(-6.0, -10.0)) +
		getB(vec2(-6.0, -4.0)) +
		getB(vec2(-6.0, -3.0)) +
		getB(vec2(-6.0, 3.0)) +
		getB(vec2(-6.0, 4.0)) +
		getB(vec2(-6.0, 10.0)) +
		getB(vec2(-6.0, 11.0)) +
		getB(vec2(-6.0, 12.0)) +
		getB(vec2(-6.0, 13.0)) +
		getB(vec2(-5.0, -13.0)) +
		getB(vec2(-5.0, -12.0)) +
		getB(vec2(-5.0, -11.0)) +
		getB(vec2(-5.0, -10.0)) +
		getB(vec2(-5.0, -5.0)) +
		getB(vec2(-5.0, 5.0)) +
		getB(vec2(-5.0, 10.0)) +
		getB(vec2(-5.0, 11.0));
float s2 = 		getB(vec2(-5.0, 12.0)) +
		getB(vec2(-5.0, 13.0)) +
		getB(vec2(-4.0, -13.0)) +
		getB(vec2(-4.0, -12.0)) +
		getB(vec2(-4.0, -11.0)) +
		getB(vec2(-4.0, -6.0)) +
		getB(vec2(-4.0, -1.0)) +
		getB(vec2(-4.0, 0.0)) +
		getB(vec2(-4.0, 1.0)) +
		getB(vec2(-4.0, 6.0)) +
		getB(vec2(-4.0, 11.0)) +
		getB(vec2(-4.0, 12.0)) +
		getB(vec2(-4.0, 13.0)) +
		getB(vec2(-3.0, -14.0)) +
		getB(vec2(-3.0, -13.0)) +
		getB(vec2(-3.0, -12.0)) +
		getB(vec2(-3.0, -11.0)) +
		getB(vec2(-3.0, -6.0)) +
		getB(vec2(-3.0, -2.0)) +
		getB(vec2(-3.0, 2.0)) +
		getB(vec2(-3.0, 6.0)) +
		getB(vec2(-3.0, 11.0)) +
		getB(vec2(-3.0, 12.0)) +
		getB(vec2(-3.0, 13.0)) +
		getB(vec2(-3.0, 14.0)) +
		getB(vec2(-2.0, -14.0)) +
		getB(vec2(-2.0, -13.0)) +
		getB(vec2(-2.0, -12.0)) +
		getB(vec2(-2.0, -11.0)) +
		getB(vec2(-2.0, -7.0)) +
		getB(vec2(-2.0, -3.0)) +
		getB(vec2(-2.0, 3.0)) +
		getB(vec2(-2.0, 7.0)) +
		getB(vec2(-2.0, 11.0)) +
		getB(vec2(-2.0, 12.0)) +
		getB(vec2(-2.0, 13.0)) +
		getB(vec2(-2.0, 14.0)) +
		getB(vec2(-1.0, -14.0)) +
		getB(vec2(-1.0, -13.0)) +
		getB(vec2(-1.0, -12.0)) +
		getB(vec2(-1.0, -11.0)) +
		getB(vec2(-1.0, -7.0)) +
		getB(vec2(-1.0, -4.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 4.0)) +
		getB(vec2(-1.0, 7.0)) +
		getB(vec2(-1.0, 11.0)) +
		getB(vec2(-1.0, 12.0)) +
		getB(vec2(-1.0, 13.0)) +
		getB(vec2(-1.0, 14.0)) +
		getB(vec2(0.0, -14.0)) +
		getB(vec2(0.0, -13.0)) +
		getB(vec2(0.0, -12.0)) +
		getB(vec2(0.0, -11.0)) +
		getB(vec2(0.0, -7.0)) +
		getB(vec2(0.0, -4.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 4.0));
float s3 = 		getB(vec2(0.0, 7.0)) +
		getB(vec2(0.0, 11.0)) +
		getB(vec2(0.0, 12.0)) +
		getB(vec2(0.0, 13.0)) +
		getB(vec2(0.0, 14.0)) +
		getB(vec2(1.0, -14.0)) +
		getB(vec2(1.0, -13.0)) +
		getB(vec2(1.0, -12.0)) +
		getB(vec2(1.0, -11.0)) +
		getB(vec2(1.0, -7.0)) +
		getB(vec2(1.0, -4.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 4.0)) +
		getB(vec2(1.0, 7.0)) +
		getB(vec2(1.0, 11.0)) +
		getB(vec2(1.0, 12.0)) +
		getB(vec2(1.0, 13.0)) +
		getB(vec2(1.0, 14.0)) +
		getB(vec2(2.0, -14.0)) +
		getB(vec2(2.0, -13.0)) +
		getB(vec2(2.0, -12.0)) +
		getB(vec2(2.0, -11.0)) +
		getB(vec2(2.0, -7.0)) +
		getB(vec2(2.0, -3.0)) +
		getB(vec2(2.0, 3.0)) +
		getB(vec2(2.0, 7.0)) +
		getB(vec2(2.0, 11.0)) +
		getB(vec2(2.0, 12.0)) +
		getB(vec2(2.0, 13.0)) +
		getB(vec2(2.0, 14.0)) +
		getB(vec2(3.0, -14.0)) +
		getB(vec2(3.0, -13.0)) +
		getB(vec2(3.0, -12.0)) +
		getB(vec2(3.0, -11.0)) +
		getB(vec2(3.0, -6.0)) +
		getB(vec2(3.0, -2.0)) +
		getB(vec2(3.0, 2.0)) +
		getB(vec2(3.0, 6.0)) +
		getB(vec2(3.0, 11.0)) +
		getB(vec2(3.0, 12.0)) +
		getB(vec2(3.0, 13.0)) +
		getB(vec2(3.0, 14.0)) +
		getB(vec2(4.0, -13.0)) +
		getB(vec2(4.0, -12.0)) +
		getB(vec2(4.0, -11.0)) +
		getB(vec2(4.0, -6.0)) +
		getB(vec2(4.0, -1.0)) +
		getB(vec2(4.0, 0.0)) +
		getB(vec2(4.0, 1.0)) +
		getB(vec2(4.0, 6.0)) +
		getB(vec2(4.0, 11.0)) +
		getB(vec2(4.0, 12.0)) +
		getB(vec2(4.0, 13.0)) +
		getB(vec2(5.0, -13.0)) +
		getB(vec2(5.0, -12.0)) +
		getB(vec2(5.0, -11.0)) +
		getB(vec2(5.0, -10.0)) +
		getB(vec2(5.0, -5.0)) +
		getB(vec2(5.0, 5.0));
float s4 = 		getB(vec2(5.0, 10.0)) +
		getB(vec2(5.0, 11.0)) +
		getB(vec2(5.0, 12.0)) +
		getB(vec2(5.0, 13.0)) +
		getB(vec2(6.0, -13.0)) +
		getB(vec2(6.0, -12.0)) +
		getB(vec2(6.0, -11.0)) +
		getB(vec2(6.0, -10.0)) +
		getB(vec2(6.0, -4.0)) +
		getB(vec2(6.0, -3.0)) +
		getB(vec2(6.0, 3.0)) +
		getB(vec2(6.0, 4.0)) +
		getB(vec2(6.0, 10.0)) +
		getB(vec2(6.0, 11.0)) +
		getB(vec2(6.0, 12.0)) +
		getB(vec2(6.0, 13.0)) +
		getB(vec2(7.0, -12.0)) +
		getB(vec2(7.0, -11.0)) +
		getB(vec2(7.0, -10.0)) +
		getB(vec2(7.0, -9.0)) +
		getB(vec2(7.0, -2.0)) +
		getB(vec2(7.0, -1.0)) +
		getB(vec2(7.0, 0.0)) +
		getB(vec2(7.0, 1.0)) +
		getB(vec2(7.0, 2.0)) +
		getB(vec2(7.0, 9.0)) +
		getB(vec2(7.0, 10.0)) +
		getB(vec2(7.0, 11.0)) +
		getB(vec2(7.0, 12.0)) +
		getB(vec2(8.0, -12.0)) +
		getB(vec2(8.0, -11.0)) +
		getB(vec2(8.0, -10.0)) +
		getB(vec2(8.0, -9.0)) +
		getB(vec2(8.0, -8.0)) +
		getB(vec2(8.0, 8.0)) +
		getB(vec2(8.0, 9.0)) +
		getB(vec2(8.0, 10.0)) +
		getB(vec2(8.0, 11.0)) +
		getB(vec2(8.0, 12.0)) +
		getB(vec2(9.0, -11.0)) +
		getB(vec2(9.0, -10.0)) +
		getB(vec2(9.0, -9.0)) +
		getB(vec2(9.0, -8.0)) +
		getB(vec2(9.0, -7.0)) +
		getB(vec2(9.0, 7.0)) +
		getB(vec2(9.0, 8.0)) +
		getB(vec2(9.0, 9.0)) +
		getB(vec2(9.0, 10.0)) +
		getB(vec2(9.0, 11.0)) +
		getB(vec2(10.0, -10.0)) +
		getB(vec2(10.0, -9.0)) +
		getB(vec2(10.0, -8.0)) +
		getB(vec2(10.0, -7.0)) +
		getB(vec2(10.0, -6.0)) +
		getB(vec2(10.0, -5.0)) +
		getB(vec2(10.0, 5.0)) +
		getB(vec2(10.0, 6.0)) +
		getB(vec2(10.0, 7.0)) +
		getB(vec2(10.0, 8.0)) +
		getB(vec2(10.0, 9.0)) +
		getB(vec2(10.0, 10.0));
float s5 = 		getB(vec2(11.0, -9.0)) +
		getB(vec2(11.0, -8.0)) +
		getB(vec2(11.0, -7.0)) +
		getB(vec2(11.0, -6.0)) +
		getB(vec2(11.0, -5.0)) +
		getB(vec2(11.0, -4.0)) +
		getB(vec2(11.0, -3.0)) +
		getB(vec2(11.0, -2.0)) +
		getB(vec2(11.0, -1.0)) +
		getB(vec2(11.0, 0.0)) +
		getB(vec2(11.0, 1.0)) +
		getB(vec2(11.0, 2.0)) +
		getB(vec2(11.0, 3.0)) +
		getB(vec2(11.0, 4.0)) +
		getB(vec2(11.0, 5.0)) +
		getB(vec2(11.0, 6.0)) +
		getB(vec2(11.0, 7.0)) +
		getB(vec2(11.0, 8.0)) +
		getB(vec2(11.0, 9.0)) +
		getB(vec2(12.0, -8.0)) +
		getB(vec2(12.0, -7.0)) +
		getB(vec2(12.0, -6.0)) +
		getB(vec2(12.0, -5.0)) +
		getB(vec2(12.0, -4.0)) +
		getB(vec2(12.0, -3.0)) +
		getB(vec2(12.0, -2.0)) +
		getB(vec2(12.0, -1.0)) +
		getB(vec2(12.0, 0.0)) +
		getB(vec2(12.0, 1.0)) +
		getB(vec2(12.0, 2.0)) +
		getB(vec2(12.0, 3.0)) +
		getB(vec2(12.0, 4.0)) +
		getB(vec2(12.0, 5.0)) +
		getB(vec2(12.0, 6.0)) +
		getB(vec2(12.0, 7.0)) +
		getB(vec2(12.0, 8.0)) +
		getB(vec2(13.0, -6.0)) +
		getB(vec2(13.0, -5.0)) +
		getB(vec2(13.0, -4.0)) +
		getB(vec2(13.0, -3.0)) +
		getB(vec2(13.0, -2.0)) +
		getB(vec2(13.0, -1.0)) +
		getB(vec2(13.0, 0.0)) +
		getB(vec2(13.0, 1.0)) +
		getB(vec2(13.0, 2.0)) +
		getB(vec2(13.0, 3.0)) +
		getB(vec2(13.0, 4.0)) +
		getB(vec2(13.0, 5.0)) +
		getB(vec2(13.0, 6.0)) +
		getB(vec2(14.0, -3.0)) +
		getB(vec2(14.0, -2.0)) +
		getB(vec2(14.0, -1.0)) +
		getB(vec2(14.0, 0.0)) +
		getB(vec2(14.0, 1.0)) +
		getB(vec2(14.0, 2.0)) +
		getB(vec2(14.0, 3.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1 + s2 + s3 + s4 + s5); //EDGE_0








































	//int  gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); 


	if(sum_0 >= 125 && sum_0 <= 210) 	{ gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); }	

	if(sum_0 >= 211) 					{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 50 && sum_0 <= 124) 	{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	
	if(sum_0 >= 65 && sum_0 <= 68) 		{ gl_FragColor = vec4(0.0, 0.6, 1.0, 1.0); }

	//EDGE_2
	








































	//EDGE_1
float s6 = 
 		
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
float s7 = 		getB(vec2(-5.0, 8.0)) +
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
float s8 = 		getB(vec2(1.0, -5.0)) +
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
float s9 = 		getB(vec2(7.0, -1.0)) +
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
		getB(vec2(14.0, 1.0));   /*NEWLINE*/ int sum_1 = int(s6 + s7 + s8 + s9); //EDGE_0

//Get gliders to be birthed from wave's crystal form

	////restore last frame's data (current, a[my_id])

	//if(sum_1 >= 91 && sum_1 <= 145) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	
	if(sum_1 <= 20) 					{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_1 >= 30) 					{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_1 >= 90) 					{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_1 >= 40 && sum_1 <= 43) 		{ gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); }
	if(sum_1 >= 93 && sum_1 <= 155) 	{ gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); }
	

	



	//EDGE_1
float s10 = 
 		
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
		getB(vec2(3.0, 1.0));   /*NEWLINE*/ int sum_2 = int(s10); //EDGE_0

	if(sum_2 >= 12 && sum_2 <= 19) { gl_FragColor = vec4(0.7, 0.3, 1.0, 1.0); }	
	if(sum_2 >= 15 && sum_2 <= 17) { gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }	


	//EDGE_2

}
