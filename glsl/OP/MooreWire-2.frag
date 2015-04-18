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



	


	
	int upper = 6;
    int birth = 2;
    int lower = 1;

    //2 y, 5&6 x

	//EDGE_1
float s0 = 
 		
		getR(vec2(0.0, -1.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, -1.0));   /*NEWLINE*/ int sum_0 = int(s0); //EDGE_0

	//restore last frame's data (current, a[my_id])

    /*if(sum_0 >= upper) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 <= lower) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == birth) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }*/ //Most, but 2 CGoL

	/*if(sum_0 == birth) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 <= lower) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= upper) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }*/ //least, but only one CGoL

    /*if(sum_0 >= upper) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	if(sum_0 == birth) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 <= lower) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }*/ //mid, 2 CGoL, does full screen clear each round

    if(sum_0 <= lower) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
    if(sum_0 >= birth && sum_0 <= birth+1) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= upper) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); } //best so far
	
	



	//EDGE_2


}
