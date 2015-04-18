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
 		
		getR(vec2(-48.0, -6.0)) +
		getR(vec2(-48.0, -2.0)) +
		getR(vec2(-48.0, 2.0)) +
		getR(vec2(-48.0, 6.0)) +
		getR(vec2(-46.0, -12.0)) +
		getR(vec2(-46.0, 12.0)) +
		getR(vec2(-44.0, -18.0)) +
		getR(vec2(-44.0, 18.0)) +
		getR(vec2(-42.0, -24.0)) +
		getR(vec2(-42.0, 24.0)) +
		getR(vec2(-40.0, -5.0)) +
		getR(vec2(-40.0, -4.0)) +
		getR(vec2(-40.0, -3.0)) +
		getR(vec2(-40.0, 3.0)) +
		getR(vec2(-40.0, 4.0)) +
		getR(vec2(-40.0, 5.0)) +
		getR(vec2(-39.0, -8.0)) +
		getR(vec2(-39.0, -7.0)) +
		getR(vec2(-39.0, -6.0)) +
		getR(vec2(-39.0, -5.0)) +
		getR(vec2(-39.0, -4.0)) +
		getR(vec2(-39.0, -3.0)) +
		getR(vec2(-39.0, -2.0)) +
		getR(vec2(-39.0, -1.0)) +
		getR(vec2(-39.0, 1.0)) +
		getR(vec2(-39.0, 2.0)) +
		getR(vec2(-39.0, 3.0)) +
		getR(vec2(-39.0, 4.0)) +
		getR(vec2(-39.0, 5.0)) +
		getR(vec2(-39.0, 6.0)) +
		getR(vec2(-39.0, 7.0)) +
		getR(vec2(-39.0, 8.0)) +
		getR(vec2(-38.0, -8.0)) +
		getR(vec2(-38.0, -7.0)) +
		getR(vec2(-38.0, -6.0)) +
		getR(vec2(-38.0, -5.0)) +
		getR(vec2(-38.0, -4.0)) +
		getR(vec2(-38.0, -3.0)) +
		getR(vec2(-38.0, -2.0)) +
		getR(vec2(-38.0, 2.0)) +
		getR(vec2(-38.0, 3.0)) +
		getR(vec2(-38.0, 4.0)) +
		getR(vec2(-38.0, 5.0)) +
		getR(vec2(-38.0, 6.0)) +
		getR(vec2(-38.0, 7.0)) +
		getR(vec2(-38.0, 8.0)) +
		getR(vec2(-37.0, -8.0)) +
		getR(vec2(-37.0, -7.0)) +
		getR(vec2(-37.0, -6.0)) +
		getR(vec2(-37.0, -5.0)) +
		getR(vec2(-37.0, -4.0)) +
		getR(vec2(-37.0, -3.0)) +
		getR(vec2(-37.0, 3.0)) +
		getR(vec2(-37.0, 4.0)) +
		getR(vec2(-37.0, 5.0)) +
		getR(vec2(-37.0, 6.0)) +
		getR(vec2(-37.0, 7.0)) +
		getR(vec2(-37.0, 8.0)) +
		getR(vec2(-36.0, -30.0)) +
		getR(vec2(-36.0, -7.0));
float s1 = 		getR(vec2(-36.0, -6.0)) +
		getR(vec2(-36.0, -5.0)) +
		getR(vec2(-36.0, -4.0)) +
		getR(vec2(-36.0, 4.0)) +
		getR(vec2(-36.0, 5.0)) +
		getR(vec2(-36.0, 6.0)) +
		getR(vec2(-36.0, 7.0)) +
		getR(vec2(-36.0, 30.0)) +
		getR(vec2(-35.0, -7.0)) +
		getR(vec2(-35.0, -6.0)) +
		getR(vec2(-35.0, -5.0)) +
		getR(vec2(-35.0, -4.0)) +
		getR(vec2(-35.0, 4.0)) +
		getR(vec2(-35.0, 5.0)) +
		getR(vec2(-35.0, 6.0)) +
		getR(vec2(-35.0, 7.0)) +
		getR(vec2(-34.0, -6.0)) +
		getR(vec2(-34.0, -5.0)) +
		getR(vec2(-34.0, -4.0)) +
		getR(vec2(-34.0, 4.0)) +
		getR(vec2(-34.0, 5.0)) +
		getR(vec2(-34.0, 6.0)) +
		getR(vec2(-33.0, -6.0)) +
		getR(vec2(-33.0, -5.0)) +
		getR(vec2(-33.0, 5.0)) +
		getR(vec2(-33.0, 6.0)) +
		getR(vec2(-32.0, -7.0)) +
		getR(vec2(-32.0, -6.0)) +
		getR(vec2(-32.0, -5.0)) +
		getR(vec2(-32.0, -4.0)) +
		getR(vec2(-32.0, 4.0)) +
		getR(vec2(-32.0, 5.0)) +
		getR(vec2(-32.0, 6.0)) +
		getR(vec2(-32.0, 7.0)) +
		getR(vec2(-31.0, -8.0)) +
		getR(vec2(-31.0, 8.0)) +
		getR(vec2(-30.0, -36.0)) +
		getR(vec2(-30.0, 36.0)) +
		getR(vec2(-24.0, -42.0)) +
		getR(vec2(-24.0, -3.0)) +
		getR(vec2(-24.0, -2.0)) +
		getR(vec2(-24.0, -1.0)) +
		getR(vec2(-24.0, 1.0)) +
		getR(vec2(-24.0, 2.0)) +
		getR(vec2(-24.0, 3.0)) +
		getR(vec2(-24.0, 42.0)) +
		getR(vec2(-23.0, -6.0)) +
		getR(vec2(-23.0, -5.0)) +
		getR(vec2(-23.0, -4.0)) +
		getR(vec2(-23.0, -3.0)) +
		getR(vec2(-23.0, 3.0)) +
		getR(vec2(-23.0, 4.0)) +
		getR(vec2(-23.0, 5.0)) +
		getR(vec2(-23.0, 6.0)) +
		getR(vec2(-22.0, -9.0)) +
		getR(vec2(-22.0, -8.0)) +
		getR(vec2(-22.0, -6.0)) +
		getR(vec2(-22.0, -5.0)) +
		getR(vec2(-22.0, -4.0)) +
		getR(vec2(-22.0, 4.0)) +
		getR(vec2(-22.0, 5.0));
float s2 = 		getR(vec2(-22.0, 6.0)) +
		getR(vec2(-22.0, 8.0)) +
		getR(vec2(-22.0, 9.0)) +
		getR(vec2(-21.0, -12.0)) +
		getR(vec2(-21.0, -11.0)) +
		getR(vec2(-21.0, -10.0)) +
		getR(vec2(-21.0, -9.0)) +
		getR(vec2(-21.0, 9.0)) +
		getR(vec2(-21.0, 10.0)) +
		getR(vec2(-21.0, 11.0)) +
		getR(vec2(-21.0, 12.0)) +
		getR(vec2(-20.0, -13.0)) +
		getR(vec2(-20.0, -12.0)) +
		getR(vec2(-20.0, -11.0)) +
		getR(vec2(-20.0, -10.0)) +
		getR(vec2(-20.0, 10.0)) +
		getR(vec2(-20.0, 11.0)) +
		getR(vec2(-20.0, 12.0)) +
		getR(vec2(-20.0, 13.0)) +
		getR(vec2(-19.0, -14.0)) +
		getR(vec2(-19.0, -13.0)) +
		getR(vec2(-19.0, -12.0)) +
		getR(vec2(-19.0, -11.0)) +
		getR(vec2(-19.0, -10.0)) +
		getR(vec2(-19.0, 10.0)) +
		getR(vec2(-19.0, 11.0)) +
		getR(vec2(-19.0, 12.0)) +
		getR(vec2(-19.0, 13.0)) +
		getR(vec2(-19.0, 14.0)) +
		getR(vec2(-18.0, -44.0)) +
		getR(vec2(-18.0, -15.0)) +
		getR(vec2(-18.0, -14.0)) +
		getR(vec2(-18.0, -13.0)) +
		getR(vec2(-18.0, -12.0)) +
		getR(vec2(-18.0, -11.0)) +
		getR(vec2(-18.0, -10.0)) +
		getR(vec2(-18.0, 10.0)) +
		getR(vec2(-18.0, 11.0)) +
		getR(vec2(-18.0, 12.0)) +
		getR(vec2(-18.0, 13.0)) +
		getR(vec2(-18.0, 14.0)) +
		getR(vec2(-18.0, 15.0)) +
		getR(vec2(-18.0, 44.0)) +
		getR(vec2(-17.0, -15.0)) +
		getR(vec2(-17.0, -14.0)) +
		getR(vec2(-17.0, -13.0)) +
		getR(vec2(-17.0, -12.0)) +
		getR(vec2(-17.0, -11.0)) +
		getR(vec2(-17.0, 11.0)) +
		getR(vec2(-17.0, 12.0)) +
		getR(vec2(-17.0, 13.0)) +
		getR(vec2(-17.0, 14.0)) +
		getR(vec2(-17.0, 15.0)) +
		getR(vec2(-16.0, -12.0)) +
		getR(vec2(-16.0, -11.0)) +
		getR(vec2(-16.0, -2.0)) +
		getR(vec2(-16.0, 2.0)) +
		getR(vec2(-16.0, 11.0)) +
		getR(vec2(-16.0, 12.0)) +
		getR(vec2(-15.0, -18.0)) +
		getR(vec2(-15.0, -17.0));
float s3 = 		getR(vec2(-15.0, 17.0)) +
		getR(vec2(-15.0, 18.0)) +
		getR(vec2(-14.0, -19.0)) +
		getR(vec2(-14.0, -18.0)) +
		getR(vec2(-14.0, -17.0)) +
		getR(vec2(-14.0, -8.0)) +
		getR(vec2(-14.0, 8.0)) +
		getR(vec2(-14.0, 17.0)) +
		getR(vec2(-14.0, 18.0)) +
		getR(vec2(-14.0, 19.0)) +
		getR(vec2(-13.0, -20.0)) +
		getR(vec2(-13.0, -19.0)) +
		getR(vec2(-13.0, -18.0)) +
		getR(vec2(-13.0, -17.0)) +
		getR(vec2(-13.0, 17.0)) +
		getR(vec2(-13.0, 18.0)) +
		getR(vec2(-13.0, 19.0)) +
		getR(vec2(-13.0, 20.0)) +
		getR(vec2(-12.0, -46.0)) +
		getR(vec2(-12.0, -21.0)) +
		getR(vec2(-12.0, -20.0)) +
		getR(vec2(-12.0, -19.0)) +
		getR(vec2(-12.0, -18.0)) +
		getR(vec2(-12.0, -17.0)) +
		getR(vec2(-12.0, -16.0)) +
		getR(vec2(-12.0, 16.0)) +
		getR(vec2(-12.0, 17.0)) +
		getR(vec2(-12.0, 18.0)) +
		getR(vec2(-12.0, 19.0)) +
		getR(vec2(-12.0, 20.0)) +
		getR(vec2(-12.0, 21.0)) +
		getR(vec2(-12.0, 46.0)) +
		getR(vec2(-11.0, -21.0)) +
		getR(vec2(-11.0, -20.0)) +
		getR(vec2(-11.0, -19.0)) +
		getR(vec2(-11.0, -18.0)) +
		getR(vec2(-11.0, -17.0)) +
		getR(vec2(-11.0, -16.0)) +
		getR(vec2(-11.0, 16.0)) +
		getR(vec2(-11.0, 17.0)) +
		getR(vec2(-11.0, 18.0)) +
		getR(vec2(-11.0, 19.0)) +
		getR(vec2(-11.0, 20.0)) +
		getR(vec2(-11.0, 21.0)) +
		getR(vec2(-10.0, -21.0)) +
		getR(vec2(-10.0, -20.0)) +
		getR(vec2(-10.0, -19.0)) +
		getR(vec2(-10.0, -18.0)) +
		getR(vec2(-10.0, 18.0)) +
		getR(vec2(-10.0, 19.0)) +
		getR(vec2(-10.0, 20.0)) +
		getR(vec2(-10.0, 21.0)) +
		getR(vec2(-9.0, -22.0)) +
		getR(vec2(-9.0, -21.0)) +
		getR(vec2(-9.0, 21.0)) +
		getR(vec2(-9.0, 22.0)) +
		getR(vec2(-8.0, -39.0)) +
		getR(vec2(-8.0, -38.0)) +
		getR(vec2(-8.0, -37.0)) +
		getR(vec2(-8.0, -31.0)) +
		getR(vec2(-8.0, -22.0));
float s4 = 		getR(vec2(-8.0, -14.0)) +
		getR(vec2(-8.0, -5.0)) +
		getR(vec2(-8.0, -4.0)) +
		getR(vec2(-8.0, -2.0)) +
		getR(vec2(-8.0, -1.0)) +
		getR(vec2(-8.0, 1.0)) +
		getR(vec2(-8.0, 2.0)) +
		getR(vec2(-8.0, 4.0)) +
		getR(vec2(-8.0, 5.0)) +
		getR(vec2(-8.0, 14.0)) +
		getR(vec2(-8.0, 22.0)) +
		getR(vec2(-8.0, 31.0)) +
		getR(vec2(-8.0, 37.0)) +
		getR(vec2(-8.0, 38.0)) +
		getR(vec2(-8.0, 39.0)) +
		getR(vec2(-7.0, -39.0)) +
		getR(vec2(-7.0, -38.0)) +
		getR(vec2(-7.0, -37.0)) +
		getR(vec2(-7.0, -36.0)) +
		getR(vec2(-7.0, -35.0)) +
		getR(vec2(-7.0, -32.0)) +
		getR(vec2(-7.0, -5.0)) +
		getR(vec2(-7.0, -4.0)) +
		getR(vec2(-7.0, 4.0)) +
		getR(vec2(-7.0, 5.0)) +
		getR(vec2(-7.0, 32.0)) +
		getR(vec2(-7.0, 35.0)) +
		getR(vec2(-7.0, 36.0)) +
		getR(vec2(-7.0, 37.0)) +
		getR(vec2(-7.0, 38.0)) +
		getR(vec2(-7.0, 39.0)) +
		getR(vec2(-6.0, -48.0)) +
		getR(vec2(-6.0, -39.0)) +
		getR(vec2(-6.0, -38.0)) +
		getR(vec2(-6.0, -37.0)) +
		getR(vec2(-6.0, -36.0)) +
		getR(vec2(-6.0, -35.0)) +
		getR(vec2(-6.0, -34.0)) +
		getR(vec2(-6.0, -33.0)) +
		getR(vec2(-6.0, -32.0)) +
		getR(vec2(-6.0, -23.0)) +
		getR(vec2(-6.0, -22.0)) +
		getR(vec2(-6.0, 22.0)) +
		getR(vec2(-6.0, 23.0)) +
		getR(vec2(-6.0, 32.0)) +
		getR(vec2(-6.0, 33.0)) +
		getR(vec2(-6.0, 34.0)) +
		getR(vec2(-6.0, 35.0)) +
		getR(vec2(-6.0, 36.0)) +
		getR(vec2(-6.0, 37.0)) +
		getR(vec2(-6.0, 38.0)) +
		getR(vec2(-6.0, 39.0)) +
		getR(vec2(-6.0, 48.0)) +
		getR(vec2(-5.0, -40.0)) +
		getR(vec2(-5.0, -39.0)) +
		getR(vec2(-5.0, -38.0)) +
		getR(vec2(-5.0, -37.0)) +
		getR(vec2(-5.0, -36.0)) +
		getR(vec2(-5.0, -35.0)) +
		getR(vec2(-5.0, -34.0)) +
		getR(vec2(-5.0, -33.0));
float s5 = 		getR(vec2(-5.0, -32.0)) +
		getR(vec2(-5.0, -23.0)) +
		getR(vec2(-5.0, -22.0)) +
		getR(vec2(-5.0, -8.0)) +
		getR(vec2(-5.0, -7.0)) +
		getR(vec2(-5.0, 7.0)) +
		getR(vec2(-5.0, 8.0)) +
		getR(vec2(-5.0, 22.0)) +
		getR(vec2(-5.0, 23.0)) +
		getR(vec2(-5.0, 32.0)) +
		getR(vec2(-5.0, 33.0)) +
		getR(vec2(-5.0, 34.0)) +
		getR(vec2(-5.0, 35.0)) +
		getR(vec2(-5.0, 36.0)) +
		getR(vec2(-5.0, 37.0)) +
		getR(vec2(-5.0, 38.0)) +
		getR(vec2(-5.0, 39.0)) +
		getR(vec2(-5.0, 40.0)) +
		getR(vec2(-4.0, -40.0)) +
		getR(vec2(-4.0, -39.0)) +
		getR(vec2(-4.0, -38.0)) +
		getR(vec2(-4.0, -37.0)) +
		getR(vec2(-4.0, -36.0)) +
		getR(vec2(-4.0, -35.0)) +
		getR(vec2(-4.0, -34.0)) +
		getR(vec2(-4.0, -32.0)) +
		getR(vec2(-4.0, -23.0)) +
		getR(vec2(-4.0, -22.0)) +
		getR(vec2(-4.0, -8.0)) +
		getR(vec2(-4.0, -7.0)) +
		getR(vec2(-4.0, 7.0)) +
		getR(vec2(-4.0, 8.0)) +
		getR(vec2(-4.0, 22.0)) +
		getR(vec2(-4.0, 23.0)) +
		getR(vec2(-4.0, 32.0)) +
		getR(vec2(-4.0, 34.0)) +
		getR(vec2(-4.0, 35.0)) +
		getR(vec2(-4.0, 36.0)) +
		getR(vec2(-4.0, 37.0)) +
		getR(vec2(-4.0, 38.0)) +
		getR(vec2(-4.0, 39.0)) +
		getR(vec2(-4.0, 40.0)) +
		getR(vec2(-3.0, -40.0)) +
		getR(vec2(-3.0, -39.0)) +
		getR(vec2(-3.0, -38.0)) +
		getR(vec2(-3.0, -37.0)) +
		getR(vec2(-3.0, -24.0)) +
		getR(vec2(-3.0, -23.0)) +
		getR(vec2(-3.0, 23.0)) +
		getR(vec2(-3.0, 24.0)) +
		getR(vec2(-3.0, 37.0)) +
		getR(vec2(-3.0, 38.0)) +
		getR(vec2(-3.0, 39.0)) +
		getR(vec2(-3.0, 40.0)) +
		getR(vec2(-2.0, -48.0)) +
		getR(vec2(-2.0, -39.0)) +
		getR(vec2(-2.0, -38.0)) +
		getR(vec2(-2.0, -24.0)) +
		getR(vec2(-2.0, -16.0)) +
		getR(vec2(-2.0, -8.0)) +
		getR(vec2(-2.0, 8.0));
float s6 = 		getR(vec2(-2.0, 16.0)) +
		getR(vec2(-2.0, 24.0)) +
		getR(vec2(-2.0, 38.0)) +
		getR(vec2(-2.0, 39.0)) +
		getR(vec2(-2.0, 48.0)) +
		getR(vec2(-1.0, -39.0)) +
		getR(vec2(-1.0, -24.0)) +
		getR(vec2(-1.0, -8.0)) +
		getR(vec2(-1.0, 8.0)) +
		getR(vec2(-1.0, 24.0)) +
		getR(vec2(-1.0, 39.0)) +
		getR(vec2(1.0, -39.0)) +
		getR(vec2(1.0, -24.0)) +
		getR(vec2(1.0, -8.0)) +
		getR(vec2(1.0, 8.0)) +
		getR(vec2(1.0, 24.0)) +
		getR(vec2(1.0, 39.0)) +
		getR(vec2(2.0, -48.0)) +
		getR(vec2(2.0, -39.0)) +
		getR(vec2(2.0, -38.0)) +
		getR(vec2(2.0, -24.0)) +
		getR(vec2(2.0, -16.0)) +
		getR(vec2(2.0, -8.0)) +
		getR(vec2(2.0, 8.0)) +
		getR(vec2(2.0, 16.0)) +
		getR(vec2(2.0, 24.0)) +
		getR(vec2(2.0, 38.0)) +
		getR(vec2(2.0, 39.0)) +
		getR(vec2(2.0, 48.0)) +
		getR(vec2(3.0, -40.0)) +
		getR(vec2(3.0, -39.0)) +
		getR(vec2(3.0, -38.0)) +
		getR(vec2(3.0, -37.0)) +
		getR(vec2(3.0, -24.0)) +
		getR(vec2(3.0, -23.0)) +
		getR(vec2(3.0, 23.0)) +
		getR(vec2(3.0, 24.0)) +
		getR(vec2(3.0, 37.0)) +
		getR(vec2(3.0, 38.0)) +
		getR(vec2(3.0, 39.0)) +
		getR(vec2(3.0, 40.0)) +
		getR(vec2(4.0, -40.0)) +
		getR(vec2(4.0, -39.0)) +
		getR(vec2(4.0, -38.0)) +
		getR(vec2(4.0, -37.0)) +
		getR(vec2(4.0, -36.0)) +
		getR(vec2(4.0, -35.0)) +
		getR(vec2(4.0, -34.0)) +
		getR(vec2(4.0, -32.0)) +
		getR(vec2(4.0, -23.0)) +
		getR(vec2(4.0, -22.0)) +
		getR(vec2(4.0, -8.0)) +
		getR(vec2(4.0, -7.0)) +
		getR(vec2(4.0, 7.0)) +
		getR(vec2(4.0, 8.0)) +
		getR(vec2(4.0, 22.0)) +
		getR(vec2(4.0, 23.0)) +
		getR(vec2(4.0, 32.0)) +
		getR(vec2(4.0, 34.0)) +
		getR(vec2(4.0, 35.0)) +
		getR(vec2(4.0, 36.0));
float s7 = 		getR(vec2(4.0, 37.0)) +
		getR(vec2(4.0, 38.0)) +
		getR(vec2(4.0, 39.0)) +
		getR(vec2(4.0, 40.0)) +
		getR(vec2(5.0, -40.0)) +
		getR(vec2(5.0, -39.0)) +
		getR(vec2(5.0, -38.0)) +
		getR(vec2(5.0, -37.0)) +
		getR(vec2(5.0, -36.0)) +
		getR(vec2(5.0, -35.0)) +
		getR(vec2(5.0, -34.0)) +
		getR(vec2(5.0, -33.0)) +
		getR(vec2(5.0, -32.0)) +
		getR(vec2(5.0, -23.0)) +
		getR(vec2(5.0, -22.0)) +
		getR(vec2(5.0, -8.0)) +
		getR(vec2(5.0, -7.0)) +
		getR(vec2(5.0, 7.0)) +
		getR(vec2(5.0, 8.0)) +
		getR(vec2(5.0, 22.0)) +
		getR(vec2(5.0, 23.0)) +
		getR(vec2(5.0, 32.0)) +
		getR(vec2(5.0, 33.0)) +
		getR(vec2(5.0, 34.0)) +
		getR(vec2(5.0, 35.0)) +
		getR(vec2(5.0, 36.0)) +
		getR(vec2(5.0, 37.0)) +
		getR(vec2(5.0, 38.0)) +
		getR(vec2(5.0, 39.0)) +
		getR(vec2(5.0, 40.0)) +
		getR(vec2(6.0, -48.0)) +
		getR(vec2(6.0, -39.0)) +
		getR(vec2(6.0, -38.0)) +
		getR(vec2(6.0, -37.0)) +
		getR(vec2(6.0, -36.0)) +
		getR(vec2(6.0, -35.0)) +
		getR(vec2(6.0, -34.0)) +
		getR(vec2(6.0, -33.0)) +
		getR(vec2(6.0, -32.0)) +
		getR(vec2(6.0, -23.0)) +
		getR(vec2(6.0, -22.0)) +
		getR(vec2(6.0, 22.0)) +
		getR(vec2(6.0, 23.0)) +
		getR(vec2(6.0, 32.0)) +
		getR(vec2(6.0, 33.0)) +
		getR(vec2(6.0, 34.0)) +
		getR(vec2(6.0, 35.0)) +
		getR(vec2(6.0, 36.0)) +
		getR(vec2(6.0, 37.0)) +
		getR(vec2(6.0, 38.0)) +
		getR(vec2(6.0, 39.0)) +
		getR(vec2(6.0, 48.0)) +
		getR(vec2(7.0, -39.0)) +
		getR(vec2(7.0, -38.0)) +
		getR(vec2(7.0, -37.0)) +
		getR(vec2(7.0, -36.0)) +
		getR(vec2(7.0, -35.0)) +
		getR(vec2(7.0, -32.0)) +
		getR(vec2(7.0, -5.0)) +
		getR(vec2(7.0, -4.0)) +
		getR(vec2(7.0, 4.0));
float s8 = 		getR(vec2(7.0, 5.0)) +
		getR(vec2(7.0, 32.0)) +
		getR(vec2(7.0, 35.0)) +
		getR(vec2(7.0, 36.0)) +
		getR(vec2(7.0, 37.0)) +
		getR(vec2(7.0, 38.0)) +
		getR(vec2(7.0, 39.0)) +
		getR(vec2(8.0, -39.0)) +
		getR(vec2(8.0, -38.0)) +
		getR(vec2(8.0, -37.0)) +
		getR(vec2(8.0, -31.0)) +
		getR(vec2(8.0, -22.0)) +
		getR(vec2(8.0, -14.0)) +
		getR(vec2(8.0, -5.0)) +
		getR(vec2(8.0, -4.0)) +
		getR(vec2(8.0, -2.0)) +
		getR(vec2(8.0, -1.0)) +
		getR(vec2(8.0, 1.0)) +
		getR(vec2(8.0, 2.0)) +
		getR(vec2(8.0, 4.0)) +
		getR(vec2(8.0, 5.0)) +
		getR(vec2(8.0, 14.0)) +
		getR(vec2(8.0, 22.0)) +
		getR(vec2(8.0, 31.0)) +
		getR(vec2(8.0, 37.0)) +
		getR(vec2(8.0, 38.0)) +
		getR(vec2(8.0, 39.0)) +
		getR(vec2(9.0, -22.0)) +
		getR(vec2(9.0, -21.0)) +
		getR(vec2(9.0, 21.0)) +
		getR(vec2(9.0, 22.0)) +
		getR(vec2(10.0, -21.0)) +
		getR(vec2(10.0, -20.0)) +
		getR(vec2(10.0, -19.0)) +
		getR(vec2(10.0, -18.0)) +
		getR(vec2(10.0, 18.0)) +
		getR(vec2(10.0, 19.0)) +
		getR(vec2(10.0, 20.0)) +
		getR(vec2(10.0, 21.0)) +
		getR(vec2(11.0, -21.0)) +
		getR(vec2(11.0, -20.0)) +
		getR(vec2(11.0, -19.0)) +
		getR(vec2(11.0, -18.0)) +
		getR(vec2(11.0, -17.0)) +
		getR(vec2(11.0, -16.0)) +
		getR(vec2(11.0, 16.0)) +
		getR(vec2(11.0, 17.0)) +
		getR(vec2(11.0, 18.0)) +
		getR(vec2(11.0, 19.0)) +
		getR(vec2(11.0, 20.0)) +
		getR(vec2(11.0, 21.0)) +
		getR(vec2(12.0, -46.0)) +
		getR(vec2(12.0, -21.0)) +
		getR(vec2(12.0, -20.0)) +
		getR(vec2(12.0, -19.0)) +
		getR(vec2(12.0, -18.0)) +
		getR(vec2(12.0, -17.0)) +
		getR(vec2(12.0, -16.0)) +
		getR(vec2(12.0, 16.0)) +
		getR(vec2(12.0, 17.0)) +
		getR(vec2(12.0, 18.0));
float s9 = 		getR(vec2(12.0, 19.0)) +
		getR(vec2(12.0, 20.0)) +
		getR(vec2(12.0, 21.0)) +
		getR(vec2(12.0, 46.0)) +
		getR(vec2(13.0, -20.0)) +
		getR(vec2(13.0, -19.0)) +
		getR(vec2(13.0, -18.0)) +
		getR(vec2(13.0, -17.0)) +
		getR(vec2(13.0, 17.0)) +
		getR(vec2(13.0, 18.0)) +
		getR(vec2(13.0, 19.0)) +
		getR(vec2(13.0, 20.0)) +
		getR(vec2(14.0, -19.0)) +
		getR(vec2(14.0, -18.0)) +
		getR(vec2(14.0, -17.0)) +
		getR(vec2(14.0, -8.0)) +
		getR(vec2(14.0, 8.0)) +
		getR(vec2(14.0, 17.0)) +
		getR(vec2(14.0, 18.0)) +
		getR(vec2(14.0, 19.0)) +
		getR(vec2(15.0, -18.0)) +
		getR(vec2(15.0, -17.0)) +
		getR(vec2(15.0, 17.0)) +
		getR(vec2(15.0, 18.0)) +
		getR(vec2(16.0, -12.0)) +
		getR(vec2(16.0, -11.0)) +
		getR(vec2(16.0, -2.0)) +
		getR(vec2(16.0, 2.0)) +
		getR(vec2(16.0, 11.0)) +
		getR(vec2(16.0, 12.0)) +
		getR(vec2(17.0, -15.0)) +
		getR(vec2(17.0, -14.0)) +
		getR(vec2(17.0, -13.0)) +
		getR(vec2(17.0, -12.0)) +
		getR(vec2(17.0, -11.0)) +
		getR(vec2(17.0, 11.0)) +
		getR(vec2(17.0, 12.0)) +
		getR(vec2(17.0, 13.0)) +
		getR(vec2(17.0, 14.0)) +
		getR(vec2(17.0, 15.0)) +
		getR(vec2(18.0, -44.0)) +
		getR(vec2(18.0, -15.0)) +
		getR(vec2(18.0, -14.0)) +
		getR(vec2(18.0, -13.0)) +
		getR(vec2(18.0, -12.0)) +
		getR(vec2(18.0, -11.0)) +
		getR(vec2(18.0, -10.0)) +
		getR(vec2(18.0, 10.0)) +
		getR(vec2(18.0, 11.0)) +
		getR(vec2(18.0, 12.0)) +
		getR(vec2(18.0, 13.0)) +
		getR(vec2(18.0, 14.0)) +
		getR(vec2(18.0, 15.0)) +
		getR(vec2(18.0, 44.0)) +
		getR(vec2(19.0, -14.0)) +
		getR(vec2(19.0, -13.0)) +
		getR(vec2(19.0, -12.0)) +
		getR(vec2(19.0, -11.0)) +
		getR(vec2(19.0, -10.0)) +
		getR(vec2(19.0, 10.0)) +
		getR(vec2(19.0, 11.0));
float s10 = 		getR(vec2(19.0, 12.0)) +
		getR(vec2(19.0, 13.0)) +
		getR(vec2(19.0, 14.0)) +
		getR(vec2(20.0, -13.0)) +
		getR(vec2(20.0, -12.0)) +
		getR(vec2(20.0, -11.0)) +
		getR(vec2(20.0, -10.0)) +
		getR(vec2(20.0, 10.0)) +
		getR(vec2(20.0, 11.0)) +
		getR(vec2(20.0, 12.0)) +
		getR(vec2(20.0, 13.0)) +
		getR(vec2(21.0, -12.0)) +
		getR(vec2(21.0, -11.0)) +
		getR(vec2(21.0, -10.0)) +
		getR(vec2(21.0, -9.0)) +
		getR(vec2(21.0, 9.0)) +
		getR(vec2(21.0, 10.0)) +
		getR(vec2(21.0, 11.0)) +
		getR(vec2(21.0, 12.0)) +
		getR(vec2(22.0, -9.0)) +
		getR(vec2(22.0, -8.0)) +
		getR(vec2(22.0, -6.0)) +
		getR(vec2(22.0, -5.0)) +
		getR(vec2(22.0, -4.0)) +
		getR(vec2(22.0, 4.0)) +
		getR(vec2(22.0, 5.0)) +
		getR(vec2(22.0, 6.0)) +
		getR(vec2(22.0, 8.0)) +
		getR(vec2(22.0, 9.0)) +
		getR(vec2(23.0, -6.0)) +
		getR(vec2(23.0, -5.0)) +
		getR(vec2(23.0, -4.0)) +
		getR(vec2(23.0, -3.0)) +
		getR(vec2(23.0, 3.0)) +
		getR(vec2(23.0, 4.0)) +
		getR(vec2(23.0, 5.0)) +
		getR(vec2(23.0, 6.0)) +
		getR(vec2(24.0, -42.0)) +
		getR(vec2(24.0, -3.0)) +
		getR(vec2(24.0, -2.0)) +
		getR(vec2(24.0, -1.0)) +
		getR(vec2(24.0, 1.0)) +
		getR(vec2(24.0, 2.0)) +
		getR(vec2(24.0, 3.0)) +
		getR(vec2(24.0, 42.0)) +
		getR(vec2(30.0, -36.0)) +
		getR(vec2(30.0, 36.0)) +
		getR(vec2(31.0, -8.0)) +
		getR(vec2(31.0, 8.0)) +
		getR(vec2(32.0, -7.0)) +
		getR(vec2(32.0, -6.0)) +
		getR(vec2(32.0, -5.0)) +
		getR(vec2(32.0, -4.0)) +
		getR(vec2(32.0, 4.0)) +
		getR(vec2(32.0, 5.0)) +
		getR(vec2(32.0, 6.0)) +
		getR(vec2(32.0, 7.0)) +
		getR(vec2(33.0, -6.0)) +
		getR(vec2(33.0, -5.0)) +
		getR(vec2(33.0, 5.0)) +
		getR(vec2(33.0, 6.0));
float s11 = 		getR(vec2(34.0, -6.0)) +
		getR(vec2(34.0, -5.0)) +
		getR(vec2(34.0, -4.0)) +
		getR(vec2(34.0, 4.0)) +
		getR(vec2(34.0, 5.0)) +
		getR(vec2(34.0, 6.0)) +
		getR(vec2(35.0, -7.0)) +
		getR(vec2(35.0, -6.0)) +
		getR(vec2(35.0, -5.0)) +
		getR(vec2(35.0, -4.0)) +
		getR(vec2(35.0, 4.0)) +
		getR(vec2(35.0, 5.0)) +
		getR(vec2(35.0, 6.0)) +
		getR(vec2(35.0, 7.0)) +
		getR(vec2(36.0, -30.0)) +
		getR(vec2(36.0, -7.0)) +
		getR(vec2(36.0, -6.0)) +
		getR(vec2(36.0, -5.0)) +
		getR(vec2(36.0, -4.0)) +
		getR(vec2(36.0, 4.0)) +
		getR(vec2(36.0, 5.0)) +
		getR(vec2(36.0, 6.0)) +
		getR(vec2(36.0, 7.0)) +
		getR(vec2(36.0, 30.0)) +
		getR(vec2(37.0, -8.0)) +
		getR(vec2(37.0, -7.0)) +
		getR(vec2(37.0, -6.0)) +
		getR(vec2(37.0, -5.0)) +
		getR(vec2(37.0, -4.0)) +
		getR(vec2(37.0, -3.0)) +
		getR(vec2(37.0, 3.0)) +
		getR(vec2(37.0, 4.0)) +
		getR(vec2(37.0, 5.0)) +
		getR(vec2(37.0, 6.0)) +
		getR(vec2(37.0, 7.0)) +
		getR(vec2(37.0, 8.0)) +
		getR(vec2(38.0, -8.0)) +
		getR(vec2(38.0, -7.0)) +
		getR(vec2(38.0, -6.0)) +
		getR(vec2(38.0, -5.0)) +
		getR(vec2(38.0, -4.0)) +
		getR(vec2(38.0, -3.0)) +
		getR(vec2(38.0, -2.0)) +
		getR(vec2(38.0, 2.0)) +
		getR(vec2(38.0, 3.0)) +
		getR(vec2(38.0, 4.0)) +
		getR(vec2(38.0, 5.0)) +
		getR(vec2(38.0, 6.0)) +
		getR(vec2(38.0, 7.0)) +
		getR(vec2(38.0, 8.0)) +
		getR(vec2(39.0, -8.0)) +
		getR(vec2(39.0, -7.0)) +
		getR(vec2(39.0, -6.0)) +
		getR(vec2(39.0, -5.0)) +
		getR(vec2(39.0, -4.0)) +
		getR(vec2(39.0, -3.0)) +
		getR(vec2(39.0, -2.0)) +
		getR(vec2(39.0, -1.0)) +
		getR(vec2(39.0, 1.0)) +
		getR(vec2(39.0, 2.0)) +
		getR(vec2(39.0, 3.0));
float s12 = 		getR(vec2(39.0, 4.0)) +
		getR(vec2(39.0, 5.0)) +
		getR(vec2(39.0, 6.0)) +
		getR(vec2(39.0, 7.0)) +
		getR(vec2(39.0, 8.0)) +
		getR(vec2(40.0, -5.0)) +
		getR(vec2(40.0, -4.0)) +
		getR(vec2(40.0, -3.0)) +
		getR(vec2(40.0, 3.0)) +
		getR(vec2(40.0, 4.0)) +
		getR(vec2(40.0, 5.0)) +
		getR(vec2(42.0, -24.0)) +
		getR(vec2(42.0, 24.0)) +
		getR(vec2(44.0, -18.0)) +
		getR(vec2(44.0, 18.0)) +
		getR(vec2(46.0, -12.0)) +
		getR(vec2(46.0, 12.0)) +
		getR(vec2(48.0, -6.0)) +
		getR(vec2(48.0, -2.0)) +
		getR(vec2(48.0, 2.0)) +
		getR(vec2(48.0, 6.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10 + s11 + s12); //EDGE_0

	//restore last frame's data (current, a[my_id])
	if(sum_0 >= 74) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	/*if(sum_0 == 29) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 31) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 41) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 43) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 59) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	

	if(sum_0 == 16) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 25) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 36) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 49) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 64) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }*/
	
	if(sum_0 == 29) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 31) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 41) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 43) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 59) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	
	if(sum_0 == 16) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 25) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 36) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 49) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == 64) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	//EDGE_2

}
