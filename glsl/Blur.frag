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

float getAll(vec2 offset) {
	if((texture2D(state, (gl_FragCoord.xy + offset) / scale).r) > 0.0 || (texture2D(state, (gl_FragCoord.xy + offset) / scale).g) > 0.0 || (texture2D(state, (gl_FragCoord.xy + offset) / scale).b) > 0.0) {
		return 1.0;
	} else {return 0.0;}
}

void main() {

    float cR = getR(vec2(0.0, 0.0));
    float cG = getG(vec2(0.0, 0.0));
    float cB = getB(vec2(0.0, 0.0));
    float cAll = getAll(vec2(0.0, 0.0));
	
    gl_FragColor = vec4(cR, cG, cB, 1.0);

	float cAll_count = 
    getAll(vec2( 1.0,  0.0)) +
    getAll(vec2(-1.0,  0.0)) +
    getAll(vec2( 0.0, -1.0)) +
    getAll(vec2( 0.0,  1.0)) +
    getAll(vec2( 1.0, -1.0)) +
    getAll(vec2(-1.0,  1.0)) +
	getAll(vec2(-1.0, -1.0)) +
    getAll(vec2( 1.0,  1.0));


	if(cAll_count <= 2.0) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
	if(cAll_count >= 5.0) {gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);}

	

	

}





