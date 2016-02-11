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
		getB(vec2(6.0, 1.0));   /*NEWLINE*/ int sum_0 = int(s0); //EDGE_0

	



































	
	//EDGE_1
float s1 = 
 		
		getB(vec2(-20.0, -2.0)) +
		getB(vec2(-20.0, -1.0)) +
		getB(vec2(-20.0, 0.0)) +
		getB(vec2(-20.0, 1.0)) +
		getB(vec2(-20.0, 2.0)) +
		getB(vec2(-19.0, -5.0)) +
		getB(vec2(-19.0, -4.0)) +
		getB(vec2(-19.0, -3.0)) +
		getB(vec2(-19.0, 3.0)) +
		getB(vec2(-19.0, 4.0)) +
		getB(vec2(-19.0, 5.0)) +
		getB(vec2(-18.0, -8.0)) +
		getB(vec2(-18.0, -7.0)) +
		getB(vec2(-18.0, -6.0)) +
		getB(vec2(-18.0, 6.0)) +
		getB(vec2(-18.0, 7.0)) +
		getB(vec2(-18.0, 8.0)) +
		getB(vec2(-17.0, -10.0)) +
		getB(vec2(-17.0, -9.0)) +
		getB(vec2(-17.0, 9.0)) +
		getB(vec2(-17.0, 10.0)) +
		getB(vec2(-16.0, -12.0)) +
		getB(vec2(-16.0, -11.0)) +
		getB(vec2(-16.0, 11.0)) +
		getB(vec2(-16.0, 12.0)) +
		getB(vec2(-15.0, -13.0)) +
		getB(vec2(-15.0, -2.0)) +
		getB(vec2(-15.0, -1.0)) +
		getB(vec2(-15.0, 0.0)) +
		getB(vec2(-15.0, 1.0)) +
		getB(vec2(-15.0, 2.0)) +
		getB(vec2(-15.0, 13.0)) +
		getB(vec2(-14.0, -14.0)) +
		getB(vec2(-14.0, -5.0)) +
		getB(vec2(-14.0, -4.0)) +
		getB(vec2(-14.0, -3.0)) +
		getB(vec2(-14.0, 3.0)) +
		getB(vec2(-14.0, 4.0)) +
		getB(vec2(-14.0, 5.0)) +
		getB(vec2(-14.0, 14.0)) +
		getB(vec2(-13.0, -15.0)) +
		getB(vec2(-13.0, -7.0)) +
		getB(vec2(-13.0, -6.0)) +
		getB(vec2(-13.0, 6.0)) +
		getB(vec2(-13.0, 7.0)) +
		getB(vec2(-13.0, 15.0)) +
		getB(vec2(-12.0, -16.0)) +
		getB(vec2(-12.0, -9.0)) +
		getB(vec2(-12.0, -8.0)) +
		getB(vec2(-12.0, 8.0)) +
		getB(vec2(-12.0, 9.0)) +
		getB(vec2(-12.0, 16.0)) +
		getB(vec2(-11.0, -16.0)) +
		getB(vec2(-11.0, -10.0)) +
		getB(vec2(-11.0, -3.0)) +
		getB(vec2(-11.0, -2.0)) +
		getB(vec2(-11.0, -1.0)) +
		getB(vec2(-11.0, 0.0)) +
		getB(vec2(-11.0, 1.0)) +
		getB(vec2(-11.0, 2.0));
float s2 = 		getB(vec2(-11.0, 3.0)) +
		getB(vec2(-11.0, 10.0)) +
		getB(vec2(-11.0, 16.0)) +
		getB(vec2(-10.0, -17.0)) +
		getB(vec2(-10.0, -11.0)) +
		getB(vec2(-10.0, -5.0)) +
		getB(vec2(-10.0, -4.0)) +
		getB(vec2(-10.0, -3.0)) +
		getB(vec2(-10.0, -2.0)) +
		getB(vec2(-10.0, 2.0)) +
		getB(vec2(-10.0, 3.0)) +
		getB(vec2(-10.0, 4.0)) +
		getB(vec2(-10.0, 5.0)) +
		getB(vec2(-10.0, 11.0)) +
		getB(vec2(-10.0, 17.0)) +
		getB(vec2(-9.0, -17.0)) +
		getB(vec2(-9.0, -12.0)) +
		getB(vec2(-9.0, -7.0)) +
		getB(vec2(-9.0, -6.0)) +
		getB(vec2(-9.0, -5.0)) +
		getB(vec2(-9.0, 5.0)) +
		getB(vec2(-9.0, 6.0)) +
		getB(vec2(-9.0, 7.0)) +
		getB(vec2(-9.0, 12.0)) +
		getB(vec2(-9.0, 17.0)) +
		getB(vec2(-8.0, -18.0)) +
		getB(vec2(-8.0, -12.0)) +
		getB(vec2(-8.0, -8.0)) +
		getB(vec2(-8.0, -7.0)) +
		getB(vec2(-8.0, 7.0)) +
		getB(vec2(-8.0, 8.0)) +
		getB(vec2(-8.0, 12.0)) +
		getB(vec2(-8.0, 18.0)) +
		getB(vec2(-7.0, -18.0)) +
		getB(vec2(-7.0, -13.0)) +
		getB(vec2(-7.0, -9.0)) +
		getB(vec2(-7.0, -8.0)) +
		getB(vec2(-7.0, -1.0)) +
		getB(vec2(-7.0, 0.0)) +
		getB(vec2(-7.0, 1.0)) +
		getB(vec2(-7.0, 8.0)) +
		getB(vec2(-7.0, 9.0)) +
		getB(vec2(-7.0, 13.0)) +
		getB(vec2(-7.0, 18.0)) +
		getB(vec2(-6.0, -18.0)) +
		getB(vec2(-6.0, -13.0)) +
		getB(vec2(-6.0, -9.0)) +
		getB(vec2(-6.0, -3.0)) +
		getB(vec2(-6.0, -2.0)) +
		getB(vec2(-6.0, -1.0)) +
		getB(vec2(-6.0, 0.0)) +
		getB(vec2(-6.0, 1.0)) +
		getB(vec2(-6.0, 2.0)) +
		getB(vec2(-6.0, 3.0)) +
		getB(vec2(-6.0, 9.0)) +
		getB(vec2(-6.0, 13.0)) +
		getB(vec2(-6.0, 18.0)) +
		getB(vec2(-5.0, -19.0)) +
		getB(vec2(-5.0, -14.0)) +
		getB(vec2(-5.0, -10.0)) +
		getB(vec2(-5.0, -9.0));
float s3 = 		getB(vec2(-5.0, -5.0)) +
		getB(vec2(-5.0, -4.0)) +
		getB(vec2(-5.0, -3.0)) +
		getB(vec2(-5.0, -2.0)) +
		getB(vec2(-5.0, 2.0)) +
		getB(vec2(-5.0, 3.0)) +
		getB(vec2(-5.0, 4.0)) +
		getB(vec2(-5.0, 5.0)) +
		getB(vec2(-5.0, 9.0)) +
		getB(vec2(-5.0, 10.0)) +
		getB(vec2(-5.0, 14.0)) +
		getB(vec2(-5.0, 19.0)) +
		getB(vec2(-4.0, -19.0)) +
		getB(vec2(-4.0, -14.0)) +
		getB(vec2(-4.0, -10.0)) +
		getB(vec2(-4.0, -5.0)) +
		getB(vec2(-4.0, -4.0)) +
		getB(vec2(-4.0, 4.0)) +
		getB(vec2(-4.0, 5.0)) +
		getB(vec2(-4.0, 10.0)) +
		getB(vec2(-4.0, 14.0)) +
		getB(vec2(-4.0, 19.0)) +
		getB(vec2(-3.0, -19.0)) +
		getB(vec2(-3.0, -14.0)) +
		getB(vec2(-3.0, -11.0)) +
		getB(vec2(-3.0, -10.0)) +
		getB(vec2(-3.0, -6.0)) +
		getB(vec2(-3.0, -5.0)) +
		getB(vec2(-3.0, 5.0)) +
		getB(vec2(-3.0, 6.0)) +
		getB(vec2(-3.0, 10.0)) +
		getB(vec2(-3.0, 11.0)) +
		getB(vec2(-3.0, 14.0)) +
		getB(vec2(-3.0, 19.0)) +
		getB(vec2(-2.0, -20.0)) +
		getB(vec2(-2.0, -15.0)) +
		getB(vec2(-2.0, -11.0)) +
		getB(vec2(-2.0, -10.0)) +
		getB(vec2(-2.0, -6.0)) +
		getB(vec2(-2.0, -5.0)) +
		getB(vec2(-2.0, -2.0)) +
		getB(vec2(-2.0, -1.0)) +
		getB(vec2(-2.0, 0.0)) +
		getB(vec2(-2.0, 1.0)) +
		getB(vec2(-2.0, 2.0)) +
		getB(vec2(-2.0, 5.0)) +
		getB(vec2(-2.0, 6.0)) +
		getB(vec2(-2.0, 10.0)) +
		getB(vec2(-2.0, 11.0)) +
		getB(vec2(-2.0, 15.0)) +
		getB(vec2(-2.0, 20.0)) +
		getB(vec2(-1.0, -20.0)) +
		getB(vec2(-1.0, -15.0)) +
		getB(vec2(-1.0, -11.0)) +
		getB(vec2(-1.0, -7.0)) +
		getB(vec2(-1.0, -6.0)) +
		getB(vec2(-1.0, -2.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 2.0));
float s4 = 		getB(vec2(-1.0, 6.0)) +
		getB(vec2(-1.0, 7.0)) +
		getB(vec2(-1.0, 11.0)) +
		getB(vec2(-1.0, 15.0)) +
		getB(vec2(-1.0, 20.0)) +
		getB(vec2(0.0, -20.0)) +
		getB(vec2(0.0, -15.0)) +
		getB(vec2(0.0, -11.0)) +
		getB(vec2(0.0, -7.0)) +
		getB(vec2(0.0, -6.0)) +
		getB(vec2(0.0, -2.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 2.0)) +
		getB(vec2(0.0, 6.0)) +
		getB(vec2(0.0, 7.0)) +
		getB(vec2(0.0, 11.0)) +
		getB(vec2(0.0, 15.0)) +
		getB(vec2(0.0, 20.0)) +
		getB(vec2(1.0, -20.0)) +
		getB(vec2(1.0, -15.0)) +
		getB(vec2(1.0, -11.0)) +
		getB(vec2(1.0, -7.0)) +
		getB(vec2(1.0, -6.0)) +
		getB(vec2(1.0, -2.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 2.0)) +
		getB(vec2(1.0, 6.0)) +
		getB(vec2(1.0, 7.0)) +
		getB(vec2(1.0, 11.0)) +
		getB(vec2(1.0, 15.0)) +
		getB(vec2(1.0, 20.0)) +
		getB(vec2(2.0, -20.0)) +
		getB(vec2(2.0, -15.0)) +
		getB(vec2(2.0, -11.0)) +
		getB(vec2(2.0, -10.0)) +
		getB(vec2(2.0, -6.0)) +
		getB(vec2(2.0, -5.0)) +
		getB(vec2(2.0, -2.0)) +
		getB(vec2(2.0, -1.0)) +
		getB(vec2(2.0, 0.0)) +
		getB(vec2(2.0, 1.0)) +
		getB(vec2(2.0, 2.0)) +
		getB(vec2(2.0, 5.0)) +
		getB(vec2(2.0, 6.0)) +
		getB(vec2(2.0, 10.0)) +
		getB(vec2(2.0, 11.0)) +
		getB(vec2(2.0, 15.0)) +
		getB(vec2(2.0, 20.0)) +
		getB(vec2(3.0, -19.0)) +
		getB(vec2(3.0, -14.0)) +
		getB(vec2(3.0, -11.0)) +
		getB(vec2(3.0, -10.0)) +
		getB(vec2(3.0, -6.0)) +
		getB(vec2(3.0, -5.0)) +
		getB(vec2(3.0, 5.0)) +
		getB(vec2(3.0, 6.0)) +
		getB(vec2(3.0, 10.0)) +
		getB(vec2(3.0, 11.0));
float s5 = 		getB(vec2(3.0, 14.0)) +
		getB(vec2(3.0, 19.0)) +
		getB(vec2(4.0, -19.0)) +
		getB(vec2(4.0, -14.0)) +
		getB(vec2(4.0, -10.0)) +
		getB(vec2(4.0, -5.0)) +
		getB(vec2(4.0, -4.0)) +
		getB(vec2(4.0, 4.0)) +
		getB(vec2(4.0, 5.0)) +
		getB(vec2(4.0, 10.0)) +
		getB(vec2(4.0, 14.0)) +
		getB(vec2(4.0, 19.0)) +
		getB(vec2(5.0, -19.0)) +
		getB(vec2(5.0, -14.0)) +
		getB(vec2(5.0, -10.0)) +
		getB(vec2(5.0, -9.0)) +
		getB(vec2(5.0, -5.0)) +
		getB(vec2(5.0, -4.0)) +
		getB(vec2(5.0, -3.0)) +
		getB(vec2(5.0, -2.0)) +
		getB(vec2(5.0, 2.0)) +
		getB(vec2(5.0, 3.0)) +
		getB(vec2(5.0, 4.0)) +
		getB(vec2(5.0, 5.0)) +
		getB(vec2(5.0, 9.0)) +
		getB(vec2(5.0, 10.0)) +
		getB(vec2(5.0, 14.0)) +
		getB(vec2(5.0, 19.0)) +
		getB(vec2(6.0, -18.0)) +
		getB(vec2(6.0, -13.0)) +
		getB(vec2(6.0, -9.0)) +
		getB(vec2(6.0, -3.0)) +
		getB(vec2(6.0, -2.0)) +
		getB(vec2(6.0, -1.0)) +
		getB(vec2(6.0, 0.0)) +
		getB(vec2(6.0, 1.0)) +
		getB(vec2(6.0, 2.0)) +
		getB(vec2(6.0, 3.0)) +
		getB(vec2(6.0, 9.0)) +
		getB(vec2(6.0, 13.0)) +
		getB(vec2(6.0, 18.0)) +
		getB(vec2(7.0, -18.0)) +
		getB(vec2(7.0, -13.0)) +
		getB(vec2(7.0, -9.0)) +
		getB(vec2(7.0, -8.0)) +
		getB(vec2(7.0, -1.0)) +
		getB(vec2(7.0, 0.0)) +
		getB(vec2(7.0, 1.0)) +
		getB(vec2(7.0, 8.0)) +
		getB(vec2(7.0, 9.0)) +
		getB(vec2(7.0, 13.0)) +
		getB(vec2(7.0, 18.0)) +
		getB(vec2(8.0, -18.0)) +
		getB(vec2(8.0, -12.0)) +
		getB(vec2(8.0, -8.0)) +
		getB(vec2(8.0, -7.0)) +
		getB(vec2(8.0, 7.0)) +
		getB(vec2(8.0, 8.0)) +
		getB(vec2(8.0, 12.0)) +
		getB(vec2(8.0, 18.0)) +
		getB(vec2(9.0, -17.0));
float s6 = 		getB(vec2(9.0, -12.0)) +
		getB(vec2(9.0, -7.0)) +
		getB(vec2(9.0, -6.0)) +
		getB(vec2(9.0, -5.0)) +
		getB(vec2(9.0, 5.0)) +
		getB(vec2(9.0, 6.0)) +
		getB(vec2(9.0, 7.0)) +
		getB(vec2(9.0, 12.0)) +
		getB(vec2(9.0, 17.0)) +
		getB(vec2(10.0, -17.0)) +
		getB(vec2(10.0, -11.0)) +
		getB(vec2(10.0, -5.0)) +
		getB(vec2(10.0, -4.0)) +
		getB(vec2(10.0, -3.0)) +
		getB(vec2(10.0, -2.0)) +
		getB(vec2(10.0, 2.0)) +
		getB(vec2(10.0, 3.0)) +
		getB(vec2(10.0, 4.0)) +
		getB(vec2(10.0, 5.0)) +
		getB(vec2(10.0, 11.0)) +
		getB(vec2(10.0, 17.0)) +
		getB(vec2(11.0, -16.0)) +
		getB(vec2(11.0, -10.0)) +
		getB(vec2(11.0, -3.0)) +
		getB(vec2(11.0, -2.0)) +
		getB(vec2(11.0, -1.0)) +
		getB(vec2(11.0, 0.0)) +
		getB(vec2(11.0, 1.0)) +
		getB(vec2(11.0, 2.0)) +
		getB(vec2(11.0, 3.0)) +
		getB(vec2(11.0, 10.0)) +
		getB(vec2(11.0, 16.0)) +
		getB(vec2(12.0, -16.0)) +
		getB(vec2(12.0, -9.0)) +
		getB(vec2(12.0, -8.0)) +
		getB(vec2(12.0, 8.0)) +
		getB(vec2(12.0, 9.0)) +
		getB(vec2(12.0, 16.0)) +
		getB(vec2(13.0, -15.0)) +
		getB(vec2(13.0, -7.0)) +
		getB(vec2(13.0, -6.0)) +
		getB(vec2(13.0, 6.0)) +
		getB(vec2(13.0, 7.0)) +
		getB(vec2(13.0, 15.0)) +
		getB(vec2(14.0, -14.0)) +
		getB(vec2(14.0, -5.0)) +
		getB(vec2(14.0, -4.0)) +
		getB(vec2(14.0, -3.0)) +
		getB(vec2(14.0, 3.0)) +
		getB(vec2(14.0, 4.0)) +
		getB(vec2(14.0, 5.0)) +
		getB(vec2(14.0, 14.0)) +
		getB(vec2(15.0, -13.0)) +
		getB(vec2(15.0, -2.0)) +
		getB(vec2(15.0, -1.0)) +
		getB(vec2(15.0, 0.0)) +
		getB(vec2(15.0, 1.0)) +
		getB(vec2(15.0, 2.0)) +
		getB(vec2(15.0, 13.0)) +
		getB(vec2(16.0, -12.0)) +
		getB(vec2(16.0, -11.0));
float s7 = 		getB(vec2(16.0, 11.0)) +
		getB(vec2(16.0, 12.0)) +
		getB(vec2(17.0, -10.0)) +
		getB(vec2(17.0, -9.0)) +
		getB(vec2(17.0, 9.0)) +
		getB(vec2(17.0, 10.0)) +
		getB(vec2(18.0, -8.0)) +
		getB(vec2(18.0, -7.0)) +
		getB(vec2(18.0, -6.0)) +
		getB(vec2(18.0, 6.0)) +
		getB(vec2(18.0, 7.0)) +
		getB(vec2(18.0, 8.0)) +
		getB(vec2(19.0, -5.0)) +
		getB(vec2(19.0, -4.0)) +
		getB(vec2(19.0, -3.0)) +
		getB(vec2(19.0, 3.0)) +
		getB(vec2(19.0, 4.0)) +
		getB(vec2(19.0, 5.0)) +
		getB(vec2(20.0, -2.0)) +
		getB(vec2(20.0, -1.0)) +
		getB(vec2(20.0, 0.0)) +
		getB(vec2(20.0, 1.0)) +
		getB(vec2(20.0, 2.0));   /*NEWLINE*/ int sum_1 = int(s1 + s2 + s3 + s4 + s5 + s6 + s7); //EDGE_0






//:0,999,0,
//:188,289,1,
//:124,146,1,
//:50,57,1,
//:17,17,1,

	

	if(sum_0 >= 25 && sum_0 <= 43) 	{ gl_FragColor = vec4(0.2, 0.4, 1.0, 1.0); } 
	//if(sum_0 >= 34 && sum_0 <= 38) 	{ gl_FragColor = vec4(0.6, 1.0, 1.0, 1.0); } 
	if(sum_0 > 43) 					{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 < 24) 					{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }


	if(sum_1 >= 228 && sum_1 <= 320) 	{ gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0); }
	//if(sum_1 >= 248 && sum_1 <= 280) 	{ gl_FragColor = vec4(0.0, 0.3, 1.0, 1.0); }
	//if(sum_1 >= 268 && sum_1 <= 290) 	{ gl_FragColor = vec4(0.6, 0.3, 1.0, 1.0); }
	if(sum_1 >= 63 && sum_1 <= 64) 		{ gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0); }
	if(sum_1 == 40) 					{ gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); }
	//if(sum_1 >= 380) 					{ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	//EDGE_2

}
