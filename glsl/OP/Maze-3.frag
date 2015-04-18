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



	


	int upper = 1;
    int birth = 1;
	
	

	//EDGE_1
float s0 = 
 		
		getR(vec2(-29.0, 0.0)) +
		getR(vec2(-28.0, -1.0)) +
		getR(vec2(-28.0, 1.0)) +
		getR(vec2(-27.0, -2.0)) +
		getR(vec2(-27.0, 2.0)) +
		getR(vec2(-26.0, -3.0)) +
		getR(vec2(-26.0, 3.0)) +
		getR(vec2(-25.0, -4.0)) +
		getR(vec2(-25.0, 4.0)) +
		getR(vec2(-24.0, -5.0)) +
		getR(vec2(-24.0, 5.0)) +
		getR(vec2(-23.0, -6.0)) +
		getR(vec2(-23.0, 6.0)) +
		getR(vec2(-22.0, -7.0)) +
		getR(vec2(-22.0, 7.0)) +
		getR(vec2(-21.0, -8.0)) +
		getR(vec2(-21.0, 8.0)) +
		getR(vec2(-20.0, -9.0)) +
		getR(vec2(-20.0, 9.0)) +
		getR(vec2(-19.0, -10.0)) +
		getR(vec2(-19.0, 10.0)) +
		getR(vec2(-18.0, -11.0)) +
		getR(vec2(-18.0, 11.0)) +
		getR(vec2(-17.0, -12.0)) +
		getR(vec2(-17.0, 12.0)) +
		getR(vec2(-16.0, -13.0)) +
		getR(vec2(-16.0, 13.0)) +
		getR(vec2(-15.0, -14.0)) +
		getR(vec2(-15.0, 14.0)) +
		getR(vec2(-14.0, -15.0)) +
		getR(vec2(-14.0, 15.0)) +
		getR(vec2(-13.0, -16.0)) +
		getR(vec2(-13.0, 16.0)) +
		getR(vec2(-12.0, -17.0)) +
		getR(vec2(-12.0, 17.0)) +
		getR(vec2(-11.0, -18.0)) +
		getR(vec2(-11.0, 18.0)) +
		getR(vec2(-10.0, -19.0)) +
		getR(vec2(-10.0, 19.0)) +
		getR(vec2(-9.0, -20.0)) +
		getR(vec2(-9.0, 20.0)) +
		getR(vec2(-8.0, -21.0)) +
		getR(vec2(-8.0, 21.0)) +
		getR(vec2(-7.0, -22.0)) +
		getR(vec2(-7.0, 22.0)) +
		getR(vec2(-6.0, -23.0)) +
		getR(vec2(-6.0, 23.0)) +
		getR(vec2(-5.0, -24.0)) +
		getR(vec2(-5.0, 24.0)) +
		getR(vec2(-4.0, -25.0)) +
		getR(vec2(-4.0, 25.0)) +
		getR(vec2(-3.0, -26.0)) +
		getR(vec2(-3.0, 26.0)) +
		getR(vec2(-2.0, -27.0)) +
		getR(vec2(-2.0, 27.0)) +
		getR(vec2(-1.0, -28.0)) +
		getR(vec2(-1.0, 28.0)) +
		getR(vec2(0.0, -29.0)) +
		getR(vec2(0.0, 29.0)) +
		getR(vec2(1.0, -28.0));
float s1 = 		getR(vec2(1.0, 28.0)) +
		getR(vec2(2.0, -27.0)) +
		getR(vec2(2.0, 27.0)) +
		getR(vec2(3.0, -26.0)) +
		getR(vec2(3.0, 26.0)) +
		getR(vec2(4.0, -25.0)) +
		getR(vec2(4.0, 25.0)) +
		getR(vec2(5.0, -24.0)) +
		getR(vec2(5.0, 24.0)) +
		getR(vec2(6.0, -23.0)) +
		getR(vec2(6.0, 23.0)) +
		getR(vec2(7.0, -22.0)) +
		getR(vec2(7.0, 22.0)) +
		getR(vec2(8.0, -21.0)) +
		getR(vec2(8.0, 21.0)) +
		getR(vec2(9.0, -20.0)) +
		getR(vec2(9.0, 20.0)) +
		getR(vec2(10.0, -19.0)) +
		getR(vec2(10.0, 19.0)) +
		getR(vec2(11.0, -18.0)) +
		getR(vec2(11.0, 18.0)) +
		getR(vec2(12.0, -17.0)) +
		getR(vec2(12.0, 17.0)) +
		getR(vec2(13.0, -16.0)) +
		getR(vec2(13.0, 16.0)) +
		getR(vec2(14.0, -15.0)) +
		getR(vec2(14.0, 15.0)) +
		getR(vec2(15.0, -14.0)) +
		getR(vec2(15.0, 14.0)) +
		getR(vec2(16.0, -13.0)) +
		getR(vec2(16.0, 13.0)) +
		getR(vec2(17.0, -12.0)) +
		getR(vec2(17.0, 12.0)) +
		getR(vec2(18.0, -11.0)) +
		getR(vec2(18.0, 11.0)) +
		getR(vec2(19.0, -10.0)) +
		getR(vec2(19.0, 10.0)) +
		getR(vec2(20.0, -9.0)) +
		getR(vec2(20.0, 9.0)) +
		getR(vec2(21.0, -8.0)) +
		getR(vec2(21.0, 8.0)) +
		getR(vec2(22.0, -7.0)) +
		getR(vec2(22.0, 7.0)) +
		getR(vec2(23.0, -6.0)) +
		getR(vec2(23.0, 6.0)) +
		getR(vec2(24.0, -5.0)) +
		getR(vec2(24.0, 5.0)) +
		getR(vec2(25.0, -4.0)) +
		getR(vec2(25.0, 4.0)) +
		getR(vec2(26.0, -3.0)) +
		getR(vec2(26.0, 3.0)) +
		getR(vec2(27.0, -2.0)) +
		getR(vec2(27.0, 2.0)) +
		getR(vec2(28.0, -1.0)) +
		getR(vec2(28.0, 1.0)) +
		getR(vec2(29.0, 0.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1); //EDGE_0






	//restore last frame's data (current, a[my_id])

	if(sum_0 >= upper) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); };
    if(sum_0 == birth) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	
	//EDGE_2


}
