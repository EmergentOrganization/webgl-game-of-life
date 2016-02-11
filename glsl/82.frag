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

	float current = float(getB(vec2(0.0, 0.0)));
    gl_FragColor = vec4(current, current, current, 1.0);

    float sum =
        getB(vec2(-1.0, -1.0)) +
        getB(vec2(-1.0,  0.0)) +
        getB(vec2(-1.0,  1.0)) +
        getB(vec2( 0.0, -1.0)) +
        getB(vec2( 0.0,  1.0)) +
        getB(vec2( 1.0, -1.0)) +
        getB(vec2( 1.0,  0.0)) +
        getB(vec2( 1.0,  1.0));


	int s1 = int(sum);

    if(s1 <= 1) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
    if(s1 == 3) {gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0);}
    if(s1 >= 4) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}

 	sum =
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
		getB(vec2(-1.0, 3.0)) +
		getB(vec2(-1.0, 6.0)) +
		getB(vec2(0.0, -6.0)) +
		getB(vec2(0.0, -3.0)) +
		getB(vec2(0.0, 3.0)) +
		getB(vec2(0.0, 6.0)) +
		getB(vec2(1.0, -6.0)) +
		getB(vec2(1.0, -3.0)) +
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
		getB(vec2(6.0, 1.0));

	
	s1 = int(sum);

	float col = (sum-21.0) / (9.0);

    if(s1 >= 21 && s1 <= 30) {gl_FragColor = vec4(col, 1.0-(col/1.3), 1.0, 1.0);}
    if(s1 >= 48) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
}
