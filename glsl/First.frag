precision mediump float;

uniform sampler2D state;
uniform vec2 scale;

uniform float birth1;
uniform float birth1R;
uniform float birth2;
uniform float birth2R;
uniform float birth3;
uniform float birth3R;
uniform float birth4;
uniform float birth4R;

uniform float death1;
uniform float death1R;
uniform float death2;
uniform float death2R;
uniform float death3;
uniform float death3R;
uniform float death4;
uniform float death4R;


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

    float cRt = 0.0;
    float cGt = 0.0;
    float cBt = 0.0;

	float cRa = 0.0;
	float cGa = 0.0;
	float cBa = 0.0;

    cRa = getR(vec2(-1.0, -1.0)) +
    getR(vec2(-1.0,  0.0)) +
    getR(vec2(-1.0,  1.0)) +
    getR(vec2( 0.0, -1.0)) +
    getR(vec2( 0.0,  1.0)) +
    getR(vec2( 1.0, -1.0)) +
    getR(vec2( 1.0,  0.0)) +
    getR(vec2( 1.0,  1.0));

    cGa = getG(vec2(-1.0, -1.0)) +
    getG(vec2(-1.0,  0.0)) +
    getG(vec2(-1.0,  1.0)) +
    getG(vec2( 0.0, -1.0)) +
    getG(vec2( 0.0,  1.0)) +
    getG(vec2( 1.0, -1.0)) +
    getG(vec2( 1.0,  0.0)) +
    getG(vec2( 1.0,  1.0));

    cBa = getB(vec2(-1.0, -1.0)) +
    getB(vec2(-1.0,  0.0)) +
    getB(vec2(-1.0,  1.0)) +
    getB(vec2( 0.0, -1.0)) +
    getB(vec2( 0.0,  1.0)) +
    getB(vec2( 1.0, -1.0)) +
    getB(vec2( 1.0,  0.0)) +
    getB(vec2( 1.0,  1.0));


	cRt = getR(vec2(-7.0, -3.0)) +
		getR(vec2(-7.0, 0.0)) +
		getR(vec2(-7.0, 3.0)) +
		getR(vec2(-5.0, -5.0)) +
		getR(vec2(-5.0, -2.0)) +
		getR(vec2(-5.0, -1.0)) +
		getR(vec2(-5.0, 0.0)) +
		getR(vec2(-5.0, 1.0)) +
		getR(vec2(-5.0, 2.0)) +
		getR(vec2(-5.0, 5.0)) +
		getR(vec2(-4.0, -3.0)) +
		getR(vec2(-4.0, 3.0)) +
		getR(vec2(-3.0, -7.0)) +
		getR(vec2(-3.0, -4.0)) +
		getR(vec2(-3.0, 4.0)) +
		getR(vec2(-3.0, 7.0)) +
		getR(vec2(-2.0, -5.0)) +
		getR(vec2(-2.0, -1.0)) +
		getR(vec2(-2.0, 0.0)) +
		getR(vec2(-2.0, 1.0)) +
		getR(vec2(-2.0, 5.0)) +
		getR(vec2(-1.0, -5.0)) +
		getR(vec2(-1.0, -2.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 2.0)) +
		getR(vec2(-1.0, 5.0)) +
		getR(vec2(0.0, -7.0)) +
		getR(vec2(0.0, -5.0)) +
		getR(vec2(0.0, -2.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 2.0)) +
		getR(vec2(0.0, 5.0)) +
		getR(vec2(0.0, 7.0)) +
		getR(vec2(1.0, -5.0)) +
		getR(vec2(1.0, -2.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 2.0)) +
		getR(vec2(1.0, 5.0)) +
		getR(vec2(2.0, -5.0)) +
		getR(vec2(2.0, -1.0)) +
		getR(vec2(2.0, 0.0)) +
		getR(vec2(2.0, 1.0)) +
		getR(vec2(2.0, 5.0)) +
		getR(vec2(3.0, -7.0)) +
		getR(vec2(3.0, -4.0)) +
		getR(vec2(3.0, 4.0)) +
		getR(vec2(3.0, 7.0)) +
		getR(vec2(4.0, -3.0)) +
		getR(vec2(4.0, 3.0)) +
		getR(vec2(5.0, -5.0)) +
		getR(vec2(5.0, -2.0)) +
		getR(vec2(5.0, -1.0)) +
		getR(vec2(5.0, 0.0)) +
		getR(vec2(5.0, 1.0)) +
		getR(vec2(5.0, 2.0)) +
		getR(vec2(5.0, 5.0)) +
		getR(vec2(7.0, -3.0)) +
		getR(vec2(7.0, 0.0)) +
		getR(vec2(7.0, 3.0));

    cGt = getG(vec2(-7.0, -3.0)) +
		getG(vec2(-7.0, 0.0)) +
		getG(vec2(-7.0, 3.0)) +
		getG(vec2(-5.0, -5.0)) +
		getG(vec2(-5.0, -2.0)) +
		getG(vec2(-5.0, -1.0)) +
		getG(vec2(-5.0, 0.0)) +
		getG(vec2(-5.0, 1.0)) +
		getG(vec2(-5.0, 2.0)) +
		getG(vec2(-5.0, 5.0)) +
		getG(vec2(-4.0, -3.0)) +
		getG(vec2(-4.0, 3.0)) +
		getG(vec2(-3.0, -7.0)) +
		getG(vec2(-3.0, -4.0)) +
		getG(vec2(-3.0, 4.0)) +
		getG(vec2(-3.0, 7.0)) +
		getG(vec2(-2.0, -5.0)) +
		getG(vec2(-2.0, -1.0)) +
		getG(vec2(-2.0, 0.0)) +
		getG(vec2(-2.0, 1.0)) +
		getG(vec2(-2.0, 5.0)) +
		getG(vec2(-1.0, -5.0)) +
		getG(vec2(-1.0, -2.0)) +
		getG(vec2(-1.0, -1.0)) +
		getG(vec2(-1.0, 0.0)) +
		getG(vec2(-1.0, 1.0)) +
		getG(vec2(-1.0, 2.0)) +
		getG(vec2(-1.0, 5.0)) +
		getG(vec2(0.0, -7.0)) +
		getG(vec2(0.0, -5.0)) +
		getG(vec2(0.0, -2.0)) +
		getG(vec2(0.0, -1.0)) +
		getG(vec2(0.0, 1.0)) +
		getG(vec2(0.0, 2.0)) +
		getG(vec2(0.0, 5.0)) +
		getG(vec2(0.0, 7.0)) +
		getG(vec2(1.0, -5.0)) +
		getG(vec2(1.0, -2.0)) +
		getG(vec2(1.0, -1.0)) +
		getG(vec2(1.0, 0.0)) +
		getG(vec2(1.0, 1.0)) +
		getG(vec2(1.0, 2.0)) +
		getG(vec2(1.0, 5.0)) +
		getG(vec2(2.0, -5.0)) +
		getG(vec2(2.0, -1.0)) +
		getG(vec2(2.0, 0.0)) +
		getG(vec2(2.0, 1.0)) +
		getG(vec2(2.0, 5.0)) +
		getG(vec2(3.0, -7.0)) +
		getG(vec2(3.0, -4.0)) +
		getG(vec2(3.0, 4.0)) +
		getG(vec2(3.0, 7.0)) +
		getG(vec2(4.0, -3.0)) +
		getG(vec2(4.0, 3.0)) +
		getG(vec2(5.0, -5.0)) +
		getG(vec2(5.0, -2.0)) +
		getG(vec2(5.0, -1.0)) +
		getG(vec2(5.0, 0.0)) +
		getG(vec2(5.0, 1.0)) +
		getG(vec2(5.0, 2.0)) +
		getG(vec2(5.0, 5.0)) +
		getG(vec2(7.0, -3.0)) +
		getG(vec2(7.0, 0.0)) +
		getG(vec2(7.0, 3.0));

    cBt = getB(vec2(-7.0, -3.0)) +
		getB(vec2(-7.0, 0.0)) +
		getB(vec2(-7.0, 3.0)) +
		getB(vec2(-5.0, -5.0)) +
		getB(vec2(-5.0, -2.0)) +
		getB(vec2(-5.0, -1.0)) +
		getB(vec2(-5.0, 0.0)) +
		getB(vec2(-5.0, 1.0)) +
		getB(vec2(-5.0, 2.0)) +
		getB(vec2(-5.0, 5.0)) +
		getB(vec2(-4.0, -3.0)) +
		getB(vec2(-4.0, 3.0)) +
		getB(vec2(-3.0, -7.0)) +
		getB(vec2(-3.0, -4.0)) +
		getB(vec2(-3.0, 4.0)) +
		getB(vec2(-3.0, 7.0)) +
		getB(vec2(-2.0, -5.0)) +
		getB(vec2(-2.0, -1.0)) +
		getB(vec2(-2.0, 0.0)) +
		getB(vec2(-2.0, 1.0)) +
		getB(vec2(-2.0, 5.0)) +
		getB(vec2(-1.0, -5.0)) +
		getB(vec2(-1.0, -2.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 2.0)) +
		getB(vec2(-1.0, 5.0)) +
		getB(vec2(0.0, -7.0)) +
		getB(vec2(0.0, -5.0)) +
		getB(vec2(0.0, -2.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 2.0)) +
		getB(vec2(0.0, 5.0)) +
		getB(vec2(0.0, 7.0)) +
		getB(vec2(1.0, -5.0)) +
		getB(vec2(1.0, -2.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 2.0)) +
		getB(vec2(1.0, 5.0)) +
		getB(vec2(2.0, -5.0)) +
		getB(vec2(2.0, -1.0)) +
		getB(vec2(2.0, 0.0)) +
		getB(vec2(2.0, 1.0)) +
		getB(vec2(2.0, 5.0)) +
		getB(vec2(3.0, -7.0)) +
		getB(vec2(3.0, -4.0)) +
		getB(vec2(3.0, 4.0)) +
		getB(vec2(3.0, 7.0)) +
		getB(vec2(4.0, -3.0)) +
		getB(vec2(4.0, 3.0)) +
		getB(vec2(5.0, -5.0)) +
		getB(vec2(5.0, -2.0)) +
		getB(vec2(5.0, -1.0)) +
		getB(vec2(5.0, 0.0)) +
		getB(vec2(5.0, 1.0)) +
		getB(vec2(5.0, 2.0)) +
		getB(vec2(5.0, 5.0)) +
		getB(vec2(7.0, -3.0)) +
		getB(vec2(7.0, 0.0)) +
		getB(vec2(7.0, 3.0));



/*
float sRf0 = 
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
float sRf1 = 		getR(vec2(-5.0, 8.0)) +
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
float sRf2 = 		getR(vec2(1.0, -5.0)) +
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
float sRf3 = 		getR(vec2(7.0, -1.0)) +
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
		getR(vec2(14.0, 1.0));  

	float cRf = sRf0 + sRf1 + sRf2 + sRf3;











float sGf0 = 
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
float sGf1 = 		getG(vec2(-5.0, 8.0)) +
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
float sGf2 = 		getG(vec2(1.0, -5.0)) +
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
float sGf3 = 		getG(vec2(7.0, -1.0)) +
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
		getG(vec2(14.0, 1.0));  

	float cGf = sGf0 + sGf1 + sGf2 + sGf3;















float sBf0 = 
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
float sBf1 = 		getB(vec2(-5.0, 8.0)) +
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
float sBf2 = 		getB(vec2(1.0, -5.0)) +
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
float sBf3 = 		getB(vec2(7.0, -1.0)) +
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
		getB(vec2(14.0, 1.0));  

	float cBf = sBf0 + sBf1 + sBf2 + sBf3;*/

	float cRf = 0.0;
	float cGf = 0.0;
	float cBf = 0.0;

	//if(birth1 == 1.0) {
	//	cR = (cRa / cGa)*0.66;
	//	cG = (cGa / cBa)*0.66;
	//	cB = (cBa / cRa)*0.66;
	//}

	if(birth1 == 1.0) {
		cR = (((cRt/64.0) / ((cBa/8.0)+(cGa/16.0))*1.37)*0.66)-(cRa/24.0);
		cG = (((cGt/64.0) / ((cRa/8.0)+(cBa/16.0))*1.37)*0.66)-(cGa/24.0);
		cB = (((cBt/64.0) / ((cGa/8.0)+(cRa/16.0))*1.37)*0.66)-(cBa/24.0);
	}

	if(birth1 == 2.0) {
		cR =  ((cRa/24.0) - (cBt/192.0)) * ((cGa+cGt) * 0.9);
		cG =  ((cGa/24.0) - (cRt/192.0)) * ((cBa+cBt) * 0.9);
		cB =  ((cBa/24.0) - (cGt/192.0)) * ((cRa+cRt) * 0.9);
	}

	if(birth1 == 3.0) {
		cR = cR*(cRa / cBa);
		cG = cG*(cGa / cRa);
		cB = cB*(cBa / cGa);
	}

	if(birth1 == 4.0) {
		cR = (cR*(cRt*0.1))-0.2;
		cG = (cG*(cGt*0.1))-0.2;
		cB = (cB*(cBt*0.1))-0.2;

		cR = (cR*(cRa*0.25))-0.2;
		cG = (cG*(cGa*0.25))-0.2;
		cB = (cB*(cBa*0.25))-0.2;
	}

	if(birth1 == 5.0) {
		cR = cR*0.5 + ((cRa/8.0) - (cBt/128.0)) ;
		cG = cG*0.5 + ((cGa/8.0) - (cRt/128.0)) ;
		cB = cB*0.5 + ((cBa/8.0) - (cGt/128.0)) ;
	}



	if(birth1 == 6.0) {
		cR = cR*0.4 + ((cRa/8.0) - (cBt/128.0)) + cR*(cRt*0.18) - cR*(cRa / cBa) + ((cRa/24.0) - (cBt/192.0)) * ((cGa+cGt) * 0.2);
		cG = cG*0.4 + ((cGa/8.0) - (cRt/128.0)) + cG*(cGt*0.18) - cG*(cGa / cRa) + ((cGa/24.0) - (cRt/192.0)) * ((cBa+cBt) * 0.2);
		cB = cB*0.4 + ((cBa/8.0) - (cGt/128.0)) + cB*(cBt*0.18) - cB*(cBa / cGa) + ((cBa/24.0) - (cGt/192.0)) * ((cRa+cRt) * 0.2);
	}

	if(birth1 == 7.0) {
		cR = cR*0.9 + (cGa) * cR*(cRa / cBa) + ((cRa/4.0) - (cBt/32.0)) * (cGa+cGt);
		cG = cG*0.9 + (cBa) * cG*(cGa / cRa) + ((cGa/4.0) - (cRt/32.0)) * (cBa+cBt);
		cB = cB*0.9 + (cRa) * cB*(cBa / cGa) + ((cBa/4.0) - (cGt/32.0)) * (cRa+cRt);
	}

	if(birth1 == 8.0) {
		cR = cR * 0.5 + cGa * (cRa / cBa) + ((cRa/4.0) - (cBt/32.0)) * (cGa+cGt);
		cG = cG * 0.5 + cBa * (cGa / cRa) + ((cGa/4.0) - (cRt/32.0)) * (cBa+cBt);
		cB = cB * 0.5 + cRa * (cBa / cGa) + ((cBa/4.0) - (cGt/32.0)) * (cRa+cRt);
	}

	if(birth1 == 9.0) {
		cR = cR * 0.5 + cGa * (cRa / cBa) + ((cRa/4.0) - (cGt/32.0)) * (cGa+cGt);
		cG = cG * 0.5 + cBa * (cGa / cRa) + ((cGa/4.0) - (cBt/32.0)) * (cBa+cBt);
		cB = cB * 0.5 + cRa * (cBa / cGa) + ((cBa/4.0) - (cRt/32.0)) * (cRa+cRt);
	}

	if(birth1 == 10.0) {
		cR = cR * 0.5 + cGa * (cRa / cBa) + ((cRa/64.0) - (cGt/182.0)) * (cGa+cGt);
		cG = cG * 0.5 + cBa * (cGa / cRa) + ((cGa/64.0) - (cBt/182.0)) * (cBa+cBt);
		cB = cB * 0.5 + cRa * (cBa / cGa) + ((cBa/64.0) - (cRt/182.0)) * (cRa+cRt);
	}

	if(birth1 == 11.0) {
		cR = cR * 0.5 + cGa * (cRa / cBa) + ((cRa/16.0) - (cGt/64.0)) * (cGa+cGt);
		cG = cG * 0.5 + cBa * (cGa / cRa) + ((cGa/16.0) - (cBt/64.0)) * (cBa+cBt);
		cB = cB * 0.5 + cRa * (cBa / cGa) + ((cBa/16.0) - (cRt/64.0)) * (cRa+cRt);
	}

	if(birth1 == 12.0) {
		cR = cR * 0.1 + cGa * ((cRa/12.0) - (cGt/96.0)) * (cBa+cBt);
		cG = cG * 0.1 + cBa * ((cGa/12.0) - (cBt/96.0)) * (cRa+cRt);
		cB = cB * 0.1 + cRa * ((cBa/12.0) - (cRt/96.0)) * (cGa+cGt);
	}


	if(birth1 == 13.0) {
		cR = cR * 0.9 + ((cRa/12.0) - (cGt/96.0)) * (cGa+cGt);
		cG = cG * 0.9 + ((cGa/12.0) - (cBt/96.0)) * (cBa+cBt);
		cB = cB * 0.9 + ((cBa/12.0) - (cRt/96.0)) * (cRa+cRt);
	}

	if(birth1 == 14.0) {
		cR = cR * 0.75 + (cRa/8.0)-(cRt/80.0);
		cG = cG * 0.75 + (cGa/8.0)-(cGt/80.0);
		cB = cB * 0.75 + (cBa/8.0)-(cBt/80.0);
	}

	if(birth1 == 15.0) {


		cR = cR * 0.95 + (cRa/8.0)-(cRt/60.0) - 0.05;
		cG = cG * 0.95 + (cGa/8.0)-(cGt/60.0) - 0.05;
		cB = cB * 0.95 + (cBa/8.0)-(cBt/60.0) - 0.05;

		//if(cR + cG + cB < 1.0) {cR = 0.0;cG = 0.0;cB = 0.0;}


	}


	if(birth1 == 16.0) {

		cR = (cR*(cRt*0.08));
		cG = (cG*(cGt*0.08));
		cB = (cB*(cBt*0.08));

		cR = (cR*(cRa*0.15));
		cG = (cG*(cGa*0.15));
		cB = (cB*(cBa*0.15));


		/*

		float cR_big = (cR*(cRt*0.02));
		float cG_big = (cG*(cGt*0.02));
		float cB_big = (cB*(cBt*0.02));

		float cR_sml = (cR*(cRa*0.15));
		float cG_sml = (cG*(cGa*0.15));
		float cB_sml = (cB*(cBa*0.15));

		cR = cR_big * cR_sml;
		cG = cG_big * cG_sml;
		cB = cB_big * cB_sml;

		if(cR >= 0.9 && cG >= 0.9 && cB >= 0.9) {
			cR = 1.0/cR;
			cG = 1.0/cG;
			cB = 1.0/cB;
		}*/

		if(cR >= 1.0) { cR = 1.0/cR; }
		if(cG >= 1.0) { cG = 1.0/cG; }
		if(cB >= 1.0) { cB = 1.0/cB; }


	}

	if(birth1 == 17.0) {


		float cR_big = (cR*(cRt*0.02));
		float cG_big = (cG*(cGt*0.02));
		float cB_big = (cB*(cBt*0.02));

		float cR_sml = (cR*(cRa*0.35));
		float cG_sml = (cG*(cGa*0.35));
		float cB_sml = (cB*(cBa*0.35));

		cR = cR_sml-cR_big;
		cG = cG_sml-cG_big;
		cB = cB_sml-cB_big;



	}

	if(birth1 == 18.0) {
		float cR_big = (cR*(cRt*0.04));
		float cG_big = (cG*(cGt*0.04));
		float cB_big = (cB*(cBt*0.04));

		float cR_sml = (cR*(cRa*0.35));
		float cG_sml = (cG*(cGa*0.35));
		float cB_sml = (cB*(cBa*0.35));

		cR = 1.0 - (1.0/cR_sml)*0.35;
		cG = 1.0 - (1.0/cG_sml)*0.35;
		cB = 1.0 - (1.0/cB_sml)*0.35;

	}


	if(birth1 == 19.0) {

		cR = (cR*(cRt*0.8));
		cG = (cG*(cGt*0.8));
		cB = (cB*(cBt*0.8));

		cR = (cR*(cRa*0.15));
		cG = (cG*(cGa*0.15));
		cB = (cB*(cBa*0.15));

		//if(cR >= 1.0) { cR = 1.0/cR; }
		//if(cG >= 1.0) { cG = 1.0/cG; }
		//if(cB >= 1.0) { cB = 1.0/cB; }

		if(cR + cG >= 1.96) { cR = 2.0/(cR+cG); cG = 2.0/(cR+cG); }
		if(cG + cB >= 1.96) { cG = 2.0/(cG+cB); cB = 2.0/(cG+cB); }
		if(cB + cR >= 1.96) { cB = 2.0/(cB+cR); cR = 2.0/(cB+cR); }
	}

	if(birth1 == 20.0) {

		cR = (cR*(cRt*0.2));
		cG = (cG*(cGt*0.2));
		cB = (cB*(cBt*0.2));

		cR = (cR*(cRa*0.08));
		cG = (cG*(cGa*0.08));
		cB = (cB*(cBa*0.08));

		//if(cR >= 1.0) { cR = 1.0; }
		//if(cG >= 1.0) { cG = 1.0; }
		//if(cB >= 1.0) { cB = 1.0; }

		if(cR + cG >= 1.7) { cR = (cR*2.0)/(cR+cG); cG = (cR*2.0)/(cG+cR); }
		if(cG + cB >= 1.7) { cG = (cG*2.0)/(cG+cB); cB = (cG*2.0)/(cB+cG); }
		if(cB + cR >= 1.7) { cB = (cB*2.0)/(cB+cR); cR = (cB*2.0)/(cR+cB); }
	}

	if(birth1 == 21.0) {

		cR = 1.0-(1.0/(cR*(cRt*0.1)));
		cG = 1.0-(1.0/(cG*(cGt*0.1)));
		cB = 1.0-(1.0/(cB*(cBt*0.1)));

		//if(cR >= 1.0) { cR = 1.0; }
		//if(cG >= 1.0) { cG = 1.0; }
		//if(cB >= 1.0) { cB = 1.0; }

		cR = (1.0/(cR*(cRa*0.5)));
		cG = (1.0/(cG*(cGa*0.5)));
		cB = (1.0/(cB*(cBa*0.5)));


	}


	if(birth1 == 22.0) {


		cR = (cR*(cRa*0.15));
		cG = (cG*(cGa*0.15));
		cB = (cB*(cBa*0.15));

		cR = (cR*(cRt*0.08));
		cG = (cG*(cGt*0.08));
		cB = (cB*(cBt*0.08));

		if(cR >= 1.0) { cR = 1.0/cR; }
		if(cG >= 1.0) { cG = 1.0/cG; }
		if(cB >= 1.0) { cB = 1.0/cB; }


		cR = cR * 0.95 + (cRa/8.0)-(cRt/60.0) - 0.05;
		cG = cG * 0.95 + (cGa/8.0)-(cGt/60.0) - 0.05;
		cB = cB * 0.95 + (cBa/8.0)-(cBt/60.0) - 0.05;


	}
	


	/*if(birth1 == 23.0) {


		cR += cRf*0.0037;
		cG += cGf*0.0037;
		cB += cBf*0.0037;
		cR = cR * 0.95 + (cRa/12.0)-(cRt/50.0) - 0.05;
		cG = cG * 0.95 + (cGa/12.0)-(cGt/50.0) - 0.05;
		cB = cB * 0.95 + (cBa/12.0)-(cBt/50.0) - 0.05;

		//cR = cR * 0.8 + ((cRa/16.0) - (cRt/80.0));
		//cG = cG * 0.8 + ((cGa/16.0) - (cGt/80.0));
		//cB = cB * 0.8 + ((cBa/16.0) - (cBt/80.0));
		//cR += cRf*0.003;
		//cG += cGf*0.003;
		//cB += cBf*0.003;

	}*/

	/*if(birth1 == 24.0) {

		cR = (cR*(cRt*0.08));
		cG = (cG*(cGt*0.08));
		cB = (cB*(cBt*0.08));
		cR += cRf*0.003;
		cG += cGf*0.003;
		cB += cBf*0.003;

		cR = (cR*(cRa*0.08));
		cG = (cG*(cGa*0.08));
		cB = (cB*(cBa*0.08));

		cR += cRf*0.0035;
		cG += cGf*0.0035;
		cB += cBf*0.0035;

		if(cR >= 1.0) { cR = 1.0/cR; }
		if(cG >= 1.0) { cG = 1.0/cG; }
		if(cB >= 1.0) { cB = 1.0/cB; }
		
		

	}*/

	/*if(birth1 == 25.0) {


		cR = (cR*(cRf*0.01));
		cG = (cG*(cGf*0.01));
		cB = (cB*(cBf*0.01));

		cR = (cR*(cRt*0.012));
		cG = (cG*(cGt*0.012));
		cB = (cB*(cBt*0.012));

		cR += (cRa*0.12);
		cG += (cGa*0.12);
		cB += (cBa*0.12);


		if(cR >= 1.0) { cR = 1.0/cR; }
		if(cG >= 1.0) { cG = 1.0/cG; }
		if(cB >= 1.0) { cB = 1.0/cB; }

		
		if(cR + cG >= 1.96) { cR = 2.0/(cR+cG); cG = 2.0/(cR+cG); }
		if(cG + cB >= 1.96) { cG = 2.0/(cG+cB); cB = 2.0/(cG+cB); }
		if(cB + cR >= 1.96) { cB = 2.0/(cB+cR); cR = 2.0/(cB+cR); }


	}*/

	/*if(birth1 == 26.0) {

		cR = cR * 1.15 + (cRt/40.0)-(cRf/130.0) - 0.15;
		cG = cG * 1.15 + (cGt/40.0)-(cGf/130.0) - 0.15;
		cB = cB * 1.15 + (cBt/40.0)-(cBf/130.0) - 0.15;
		
	}*/


	/*if(birth1 == 27.0) {

		float cR_huge = (cR*(cRf*0.017));
		float cG_huge = (cG*(cGf*0.017));
		float cB_huge = (cB*(cBf*0.017));

		float cR_big = (cR*(cRt*0.01));
		float cG_big = (cG*(cGt*0.01));
		float cB_big = (cB*(cBt*0.01));

		float cR_sml = (cR*(cRa*0.15));
		float cG_sml = (cG*(cGa*0.15));
		float cB_sml = (cB*(cBa*0.15));

		cR = cR*0.3+((cR_sml+cR_huge+cR_big)/4.0);
		cG = cG*0.3+((cG_sml+cG_huge+cG_big)/4.0);
		cB = cB*0.3+((cB_sml+cB_huge+cB_big)/4.0);



	}*/

	if(birth1 == 28.0) {

		cR += cR*(cRa*0.12);
		cG += cG*(cGa*0.12);
		cB += cB*(cBa*0.12);


		if(cR+cG >= 1.66) { cR = 2.0/(cR+cG); }
		if(cG+cB >= 1.66) { cG = 2.0/(cG+cB); }
		if(cB+cR >= 1.66) { cB = 2.0/(cB+cR); }

		//if(cR >= 1.0) { cR = 1.0/cR; }
		//if(cG >= 1.0) { cG = 1.0/cG; }
		//if(cB >= 1.0) { cB = 1.0/cB; }

		
	}

	if(birth1 == 29.0) {

		cR = (((cRt+(cR*17.0))/80.0)-cR)+0.5;
		cG = (((cGt+(cG*17.0))/80.0)-cG)+0.5;
		cB = (((cBt+(cB*17.0))/80.0)-cB)+0.5;
		
	}


	gl_FragColor = vec4(cR, cG, cB, 1.0);

}
