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
 		
		getR(vec2(-15.0, 0.0)) +
		getR(vec2(-14.0, -1.0)) +
		getR(vec2(-14.0, 1.0)) +
		getR(vec2(-13.0, -2.0)) +
		getR(vec2(-13.0, 2.0)) +
		getR(vec2(-12.0, -3.0)) +
		getR(vec2(-12.0, 3.0)) +
		getR(vec2(-11.0, -4.0)) +
		getR(vec2(-11.0, 4.0)) +
		getR(vec2(-10.0, -5.0)) +
		getR(vec2(-10.0, 5.0)) +
		getR(vec2(-9.0, -6.0)) +
		getR(vec2(-9.0, 6.0)) +
		getR(vec2(-8.0, -7.0)) +
		getR(vec2(-8.0, 7.0)) +
		getR(vec2(-7.0, -8.0)) +
		getR(vec2(-7.0, 8.0)) +
		getR(vec2(-6.0, -9.0)) +
		getR(vec2(-6.0, 9.0)) +
		getR(vec2(-5.0, -10.0)) +
		getR(vec2(-5.0, 10.0)) +
		getR(vec2(-4.0, -11.0)) +
		getR(vec2(-4.0, 11.0)) +
		getR(vec2(-3.0, -12.0)) +
		getR(vec2(-3.0, 12.0)) +
		getR(vec2(-2.0, -13.0)) +
		getR(vec2(-2.0, 13.0)) +
		getR(vec2(-1.0, -14.0)) +
		getR(vec2(-1.0, 14.0)) +
		getR(vec2(0.0, -15.0)) +
		getR(vec2(0.0, 15.0)) +
		getR(vec2(1.0, -14.0)) +
		getR(vec2(1.0, 14.0)) +
		getR(vec2(2.0, -13.0)) +
		getR(vec2(2.0, 13.0)) +
		getR(vec2(3.0, -12.0)) +
		getR(vec2(3.0, 12.0)) +
		getR(vec2(4.0, -11.0)) +
		getR(vec2(4.0, 11.0)) +
		getR(vec2(5.0, -10.0)) +
		getR(vec2(5.0, 10.0)) +
		getR(vec2(6.0, -9.0)) +
		getR(vec2(6.0, 9.0)) +
		getR(vec2(7.0, -8.0)) +
		getR(vec2(7.0, 8.0)) +
		getR(vec2(8.0, -7.0)) +
		getR(vec2(8.0, 7.0)) +
		getR(vec2(9.0, -6.0)) +
		getR(vec2(9.0, 6.0)) +
		getR(vec2(10.0, -5.0)) +
		getR(vec2(10.0, 5.0)) +
		getR(vec2(11.0, -4.0)) +
		getR(vec2(11.0, 4.0)) +
		getR(vec2(12.0, -3.0)) +
		getR(vec2(12.0, 3.0)) +
		getR(vec2(13.0, -2.0)) +
		getR(vec2(13.0, 2.0)) +
		getR(vec2(14.0, -1.0)) +
		getR(vec2(14.0, 1.0)) +
		getR(vec2(15.0, 0.0));   /*NEWLINE*/ int sum_0 = int(s0); //EDGE_0





	//restore last frame's data (current, a[my_id])

	if(sum_0 >= upper) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); };
    if(sum_0 == birth) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	
	//EDGE_2


}
