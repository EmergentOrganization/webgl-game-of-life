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
	
	//set to last frame's colour
    gl_FragColor = vec4(cR, cG, cB, 1.0);

	float sum = 0.0;

	if(cR > 0.0) {sum -= 1.0;}

	int nSize = int(birth1*2.0 - 1.0);
	int nHalf = int(birth1/2.0);

	for(int i = 0; i < nSize; i++) {
		for(int j = 0; j < nSize; j++) {
			sum += getR( vec2(float(i-nHalf), float(j-nHalf)) );
		}
	}

	int sum0 = int(sum);

    if(sum0 >= int(death1) && sum0 <= int(death1R)) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
    if(sum0 >= int(birth2) && sum0 <= int(birth2R)) {gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}
    if(sum0 >= int(birth3) && sum0 <= int(birth3R)) {gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}
    if(sum0 >= int(death2) && sum0 <= int(death2R)) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}

}





