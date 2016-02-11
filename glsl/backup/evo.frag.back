precision mediump float;

uniform sampler2D state;
uniform vec2 scale;
uniform float birth1;

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

    float cR = getR(vec2(mod(gl_FragCoord.x*gl_FragCoord.x, birth1), mod(gl_FragCoord.y*gl_FragCoord.y, birth1)));
    float cG = getG(vec2(mod(gl_FragCoord.x*gl_FragCoord.x, birth1), mod(gl_FragCoord.y*gl_FragCoord.y, birth1)));
    float cB = getB(vec2(mod(gl_FragCoord.x*gl_FragCoord.x, birth1), mod(gl_FragCoord.y*gl_FragCoord.y, birth1)));
	
	//set to last frame's colour
    gl_FragColor = vec4(cR, cG, cB, 1.0);

   // if (getB(gl_FragCoord.x*gl_FragCoord.x+gl_FragCoord.y*gl_FragCoord.y) == 0.0) { gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); }


}
