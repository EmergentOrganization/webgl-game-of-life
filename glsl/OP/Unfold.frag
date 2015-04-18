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
float s1 = 		getR(vec2(-10.0, -6.0)) +
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
float s2 = 		getR(vec2(-5.0, 12.0)) +
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
float s3 = 		getR(vec2(0.0, 7.0)) +
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
float s4 = 		getR(vec2(5.0, 10.0)) +
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
float s5 = 		getR(vec2(11.0, -9.0)) +
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
		getR(vec2(14.0, 3.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1 + s2 + s3 + s4 + s5); //EDGE_0



	//restore last frame's data (current, a[my_id])
	if(sum_0 >= 185) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 130 && sum_0 <= 145) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 <= 120) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 65 && sum_0 <= 75) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	

	//EDGE_2

}
