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

    /*cR = getR(vec2(-1.0, -1.0)) +
    getR(vec2(-1.0,  0.0)) +
    getR(vec2(-1.0,  1.0)) +
    getR(vec2( 0.0, -1.0)) +
    getR(vec2( 0.0,  1.0)) +
    getR(vec2( 1.0, -1.0)) +
    getR(vec2( 1.0,  0.0)) +
    getR(vec2( 1.0,  1.0));

    cG = getG(vec2(-1.0, -1.0)) +
    getG(vec2(-1.0,  0.0)) +
    getG(vec2(-1.0,  1.0)) +
    getG(vec2( 0.0, -1.0)) +
    getG(vec2( 0.0,  1.0)) +
    getG(vec2( 1.0, -1.0)) +
    getG(vec2( 1.0,  0.0)) +
    getG(vec2( 1.0,  1.0));

    cB = getB(vec2(-1.0, -1.0)) +
    getB(vec2(-1.0,  0.0)) +
    getB(vec2(-1.0,  1.0)) +
    getB(vec2( 0.0, -1.0)) +
    getB(vec2( 0.0,  1.0)) +
    getB(vec2( 1.0, -1.0)) +
    getB(vec2( 1.0,  0.0)) +
    getB(vec2( 1.0,  1.0));*/


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

    gl_FragColor = vec4(cR*0.95+cRt*0.001, cG*0.95+cGt*0.001, cB*0.95+cBt*0.001, 1.0);


}
