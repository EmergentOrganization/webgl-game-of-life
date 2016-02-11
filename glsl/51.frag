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



	



	//EDGE_1
float s0 = 
 		
		getG(vec2(-14.0, -1.0)) +
		getG(vec2(-14.0, 0.0)) +
		getG(vec2(-14.0, 1.0)) +
		getG(vec2(-13.0, -4.0)) +
		getG(vec2(-13.0, -3.0)) +
		getG(vec2(-13.0, -2.0)) +
		getG(vec2(-13.0, 2.0)) +
		getG(vec2(-13.0, 3.0)) +
		getG(vec2(-13.0, 4.0)) +
		getG(vec2(-12.0, -6.0)) +
		getG(vec2(-12.0, -5.0)) +
		getG(vec2(-12.0, 5.0)) +
		getG(vec2(-12.0, 6.0)) +
		getG(vec2(-11.0, -8.0)) +
		getG(vec2(-11.0, -7.0)) +
		getG(vec2(-11.0, 7.0)) +
		getG(vec2(-11.0, 8.0)) +
		getG(vec2(-10.0, -9.0)) +
		getG(vec2(-10.0, -1.0)) +
		getG(vec2(-10.0, 0.0)) +
		getG(vec2(-10.0, 1.0)) +
		getG(vec2(-10.0, 9.0)) +
		getG(vec2(-9.0, -10.0)) +
		getG(vec2(-9.0, -4.0)) +
		getG(vec2(-9.0, -3.0)) +
		getG(vec2(-9.0, -2.0)) +
		getG(vec2(-9.0, 2.0)) +
		getG(vec2(-9.0, 3.0)) +
		getG(vec2(-9.0, 4.0)) +
		getG(vec2(-9.0, 10.0)) +
		getG(vec2(-8.0, -11.0)) +
		getG(vec2(-8.0, -6.0)) +
		getG(vec2(-8.0, -5.0)) +
		getG(vec2(-8.0, 5.0)) +
		getG(vec2(-8.0, 6.0)) +
		getG(vec2(-8.0, 11.0)) +
		getG(vec2(-7.0, -11.0)) +
		getG(vec2(-7.0, -7.0)) +
		getG(vec2(-7.0, -2.0)) +
		getG(vec2(-7.0, -1.0)) +
		getG(vec2(-7.0, 0.0)) +
		getG(vec2(-7.0, 1.0)) +
		getG(vec2(-7.0, 2.0)) +
		getG(vec2(-7.0, 7.0)) +
		getG(vec2(-7.0, 11.0)) +
		getG(vec2(-6.0, -12.0)) +
		getG(vec2(-6.0, -8.0)) +
		getG(vec2(-6.0, -4.0)) +
		getG(vec2(-6.0, -3.0)) +
		getG(vec2(-6.0, 3.0)) +
		getG(vec2(-6.0, 4.0)) +
		getG(vec2(-6.0, 8.0)) +
		getG(vec2(-6.0, 12.0)) +
		getG(vec2(-5.0, -12.0)) +
		getG(vec2(-5.0, -8.0)) +
		getG(vec2(-5.0, -5.0)) +
		getG(vec2(-5.0, -1.0)) +
		getG(vec2(-5.0, 0.0)) +
		getG(vec2(-5.0, 1.0)) +
		getG(vec2(-5.0, 5.0));
float s1 = 		getG(vec2(-5.0, 8.0)) +
		getG(vec2(-5.0, 12.0)) +
		getG(vec2(-4.0, -13.0)) +
		getG(vec2(-4.0, -9.0)) +
		getG(vec2(-4.0, -6.0)) +
		getG(vec2(-4.0, -3.0)) +
		getG(vec2(-4.0, -2.0)) +
		getG(vec2(-4.0, 2.0)) +
		getG(vec2(-4.0, 3.0)) +
		getG(vec2(-4.0, 6.0)) +
		getG(vec2(-4.0, 9.0)) +
		getG(vec2(-4.0, 13.0)) +
		getG(vec2(-3.0, -13.0)) +
		getG(vec2(-3.0, -9.0)) +
		getG(vec2(-3.0, -6.0)) +
		getG(vec2(-3.0, -4.0)) +
		getG(vec2(-3.0, -1.0)) +
		getG(vec2(-3.0, 0.0)) +
		getG(vec2(-3.0, 1.0)) +
		getG(vec2(-3.0, 4.0)) +
		getG(vec2(-3.0, 6.0)) +
		getG(vec2(-3.0, 9.0)) +
		getG(vec2(-3.0, 13.0)) +
		getG(vec2(-2.0, -13.0)) +
		getG(vec2(-2.0, -9.0)) +
		getG(vec2(-2.0, -7.0)) +
		getG(vec2(-2.0, -4.0)) +
		getG(vec2(-2.0, -2.0)) +
		getG(vec2(-2.0, 2.0)) +
		getG(vec2(-2.0, 4.0)) +
		getG(vec2(-2.0, 7.0)) +
		getG(vec2(-2.0, 9.0)) +
		getG(vec2(-2.0, 13.0)) +
		getG(vec2(-1.0, -14.0)) +
		getG(vec2(-1.0, -10.0)) +
		getG(vec2(-1.0, -7.0)) +
		getG(vec2(-1.0, -5.0)) +
		getG(vec2(-1.0, -3.0)) +
		getG(vec2(-1.0, -1.0)) +
		getG(vec2(-1.0, 0.0)) +
		getG(vec2(-1.0, 1.0)) +
		getG(vec2(-1.0, 3.0)) +
		getG(vec2(-1.0, 5.0)) +
		getG(vec2(-1.0, 7.0)) +
		getG(vec2(-1.0, 10.0)) +
		getG(vec2(-1.0, 14.0)) +
		getG(vec2(0.0, -14.0)) +
		getG(vec2(0.0, -10.0)) +
		getG(vec2(0.0, -7.0)) +
		getG(vec2(0.0, -5.0)) +
		getG(vec2(0.0, -3.0)) +
		getG(vec2(0.0, -1.0)) +
		getG(vec2(0.0, 1.0)) +
		getG(vec2(0.0, 3.0)) +
		getG(vec2(0.0, 5.0)) +
		getG(vec2(0.0, 7.0)) +
		getG(vec2(0.0, 10.0)) +
		getG(vec2(0.0, 14.0)) +
		getG(vec2(1.0, -14.0)) +
		getG(vec2(1.0, -10.0)) +
		getG(vec2(1.0, -7.0));
float s2 = 		getG(vec2(1.0, -5.0)) +
		getG(vec2(1.0, -3.0)) +
		getG(vec2(1.0, -1.0)) +
		getG(vec2(1.0, 0.0)) +
		getG(vec2(1.0, 1.0)) +
		getG(vec2(1.0, 3.0)) +
		getG(vec2(1.0, 5.0)) +
		getG(vec2(1.0, 7.0)) +
		getG(vec2(1.0, 10.0)) +
		getG(vec2(1.0, 14.0)) +
		getG(vec2(2.0, -13.0)) +
		getG(vec2(2.0, -9.0)) +
		getG(vec2(2.0, -7.0)) +
		getG(vec2(2.0, -4.0)) +
		getG(vec2(2.0, -2.0)) +
		getG(vec2(2.0, 2.0)) +
		getG(vec2(2.0, 4.0)) +
		getG(vec2(2.0, 7.0)) +
		getG(vec2(2.0, 9.0)) +
		getG(vec2(2.0, 13.0)) +
		getG(vec2(3.0, -13.0)) +
		getG(vec2(3.0, -9.0)) +
		getG(vec2(3.0, -6.0)) +
		getG(vec2(3.0, -4.0)) +
		getG(vec2(3.0, -1.0)) +
		getG(vec2(3.0, 0.0)) +
		getG(vec2(3.0, 1.0)) +
		getG(vec2(3.0, 4.0)) +
		getG(vec2(3.0, 6.0)) +
		getG(vec2(3.0, 9.0)) +
		getG(vec2(3.0, 13.0)) +
		getG(vec2(4.0, -13.0)) +
		getG(vec2(4.0, -9.0)) +
		getG(vec2(4.0, -6.0)) +
		getG(vec2(4.0, -3.0)) +
		getG(vec2(4.0, -2.0)) +
		getG(vec2(4.0, 2.0)) +
		getG(vec2(4.0, 3.0)) +
		getG(vec2(4.0, 6.0)) +
		getG(vec2(4.0, 9.0)) +
		getG(vec2(4.0, 13.0)) +
		getG(vec2(5.0, -12.0)) +
		getG(vec2(5.0, -8.0)) +
		getG(vec2(5.0, -5.0)) +
		getG(vec2(5.0, -1.0)) +
		getG(vec2(5.0, 0.0)) +
		getG(vec2(5.0, 1.0)) +
		getG(vec2(5.0, 5.0)) +
		getG(vec2(5.0, 8.0)) +
		getG(vec2(5.0, 12.0)) +
		getG(vec2(6.0, -12.0)) +
		getG(vec2(6.0, -8.0)) +
		getG(vec2(6.0, -4.0)) +
		getG(vec2(6.0, -3.0)) +
		getG(vec2(6.0, 3.0)) +
		getG(vec2(6.0, 4.0)) +
		getG(vec2(6.0, 8.0)) +
		getG(vec2(6.0, 12.0)) +
		getG(vec2(7.0, -11.0)) +
		getG(vec2(7.0, -7.0)) +
		getG(vec2(7.0, -2.0));
float s3 = 		getG(vec2(7.0, -1.0)) +
		getG(vec2(7.0, 0.0)) +
		getG(vec2(7.0, 1.0)) +
		getG(vec2(7.0, 2.0)) +
		getG(vec2(7.0, 7.0)) +
		getG(vec2(7.0, 11.0)) +
		getG(vec2(8.0, -11.0)) +
		getG(vec2(8.0, -6.0)) +
		getG(vec2(8.0, -5.0)) +
		getG(vec2(8.0, 5.0)) +
		getG(vec2(8.0, 6.0)) +
		getG(vec2(8.0, 11.0)) +
		getG(vec2(9.0, -10.0)) +
		getG(vec2(9.0, -4.0)) +
		getG(vec2(9.0, -3.0)) +
		getG(vec2(9.0, -2.0)) +
		getG(vec2(9.0, 2.0)) +
		getG(vec2(9.0, 3.0)) +
		getG(vec2(9.0, 4.0)) +
		getG(vec2(9.0, 10.0)) +
		getG(vec2(10.0, -9.0)) +
		getG(vec2(10.0, -1.0)) +
		getG(vec2(10.0, 0.0)) +
		getG(vec2(10.0, 1.0)) +
		getG(vec2(10.0, 9.0)) +
		getG(vec2(11.0, -8.0)) +
		getG(vec2(11.0, -7.0)) +
		getG(vec2(11.0, 7.0)) +
		getG(vec2(11.0, 8.0)) +
		getG(vec2(12.0, -6.0)) +
		getG(vec2(12.0, -5.0)) +
		getG(vec2(12.0, 5.0)) +
		getG(vec2(12.0, 6.0)) +
		getG(vec2(13.0, -4.0)) +
		getG(vec2(13.0, -3.0)) +
		getG(vec2(13.0, -2.0)) +
		getG(vec2(13.0, 2.0)) +
		getG(vec2(13.0, 3.0)) +
		getG(vec2(13.0, 4.0)) +
		getG(vec2(14.0, -1.0)) +
		getG(vec2(14.0, 0.0)) +
		getG(vec2(14.0, 1.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1 + s2 + s3); //EDGE_0

	//restore last frame's data (current, a[my_id])

	if(sum_0 >= 165) { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); }
	if(sum_0 >= 175) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	if(sum_0 >= 66 && sum_0 <= 68) { gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); }	
	if(sum_0 >= 104 && sum_0 <= 150) { gl_FragColor = vec4(0.7, 1.0, 0.4, 1.0); }
	if(sum_0 >= 114 && sum_0 <= 170) { gl_FragColor = vec4(0.2, 1.0, 0.7, 1.0); }	

	if(sum_0 >= 0 && sum_0 <= 25) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	if(sum_0 >= 81 && sum_0 <= 104) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	if(sum_0 >= 88 && sum_0 <= 92) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	if(sum_0 >= 95 && sum_0 <= 104) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }	
	

	//EDGE_2

}
