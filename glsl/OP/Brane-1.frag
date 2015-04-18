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
 		
		getR(vec2(-10.0, 0.0)) +
		getR(vec2(-7.0, -7.0)) +
		getR(vec2(-7.0, -3.0)) +
		getR(vec2(-7.0, 0.0)) +
		getR(vec2(-7.0, 3.0)) +
		getR(vec2(-7.0, 7.0)) +
		getR(vec2(-5.0, -5.0)) +
		getR(vec2(-5.0, -1.0)) +
		getR(vec2(-5.0, 0.0)) +
		getR(vec2(-5.0, 1.0)) +
		getR(vec2(-5.0, 5.0)) +
		getR(vec2(-4.0, -3.0)) +
		getR(vec2(-4.0, -2.0)) +
		getR(vec2(-4.0, -1.0)) +
		getR(vec2(-4.0, 0.0)) +
		getR(vec2(-4.0, 1.0)) +
		getR(vec2(-4.0, 2.0)) +
		getR(vec2(-4.0, 3.0)) +
		getR(vec2(-3.0, -7.0)) +
		getR(vec2(-3.0, -4.0)) +
		getR(vec2(-3.0, -3.0)) +
		getR(vec2(-3.0, -2.0)) +
		getR(vec2(-3.0, -1.0)) +
		getR(vec2(-3.0, 0.0)) +
		getR(vec2(-3.0, 1.0)) +
		getR(vec2(-3.0, 2.0)) +
		getR(vec2(-3.0, 3.0)) +
		getR(vec2(-3.0, 4.0)) +
		getR(vec2(-3.0, 7.0)) +
		getR(vec2(-2.0, -4.0)) +
		getR(vec2(-2.0, -3.0)) +
		getR(vec2(-2.0, -2.0)) +
		getR(vec2(-2.0, -1.0)) +
		getR(vec2(-2.0, 0.0)) +
		getR(vec2(-2.0, 1.0)) +
		getR(vec2(-2.0, 2.0)) +
		getR(vec2(-2.0, 3.0)) +
		getR(vec2(-2.0, 4.0)) +
		getR(vec2(-1.0, -5.0)) +
		getR(vec2(-1.0, -4.0)) +
		getR(vec2(-1.0, -3.0)) +
		getR(vec2(-1.0, -2.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 2.0)) +
		getR(vec2(-1.0, 3.0)) +
		getR(vec2(-1.0, 4.0)) +
		getR(vec2(-1.0, 5.0)) +
		getR(vec2(0.0, -10.0)) +
		getR(vec2(0.0, -7.0)) +
		getR(vec2(0.0, -5.0)) +
		getR(vec2(0.0, -4.0)) +
		getR(vec2(0.0, -3.0)) +
		getR(vec2(0.0, -2.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 2.0)) +
		getR(vec2(0.0, 3.0)) +
		getR(vec2(0.0, 4.0));
float s1 = 		getR(vec2(0.0, 5.0)) +
		getR(vec2(0.0, 7.0)) +
		getR(vec2(0.0, 10.0)) +
		getR(vec2(1.0, -5.0)) +
		getR(vec2(1.0, -4.0)) +
		getR(vec2(1.0, -3.0)) +
		getR(vec2(1.0, -2.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 2.0)) +
		getR(vec2(1.0, 3.0)) +
		getR(vec2(1.0, 4.0)) +
		getR(vec2(1.0, 5.0)) +
		getR(vec2(2.0, -4.0)) +
		getR(vec2(2.0, -3.0)) +
		getR(vec2(2.0, -2.0)) +
		getR(vec2(2.0, -1.0)) +
		getR(vec2(2.0, 0.0)) +
		getR(vec2(2.0, 1.0)) +
		getR(vec2(2.0, 2.0)) +
		getR(vec2(2.0, 3.0)) +
		getR(vec2(2.0, 4.0)) +
		getR(vec2(3.0, -7.0)) +
		getR(vec2(3.0, -4.0)) +
		getR(vec2(3.0, -3.0)) +
		getR(vec2(3.0, -2.0)) +
		getR(vec2(3.0, -1.0)) +
		getR(vec2(3.0, 0.0)) +
		getR(vec2(3.0, 1.0)) +
		getR(vec2(3.0, 2.0)) +
		getR(vec2(3.0, 3.0)) +
		getR(vec2(3.0, 4.0)) +
		getR(vec2(3.0, 7.0)) +
		getR(vec2(4.0, -3.0)) +
		getR(vec2(4.0, -2.0)) +
		getR(vec2(4.0, -1.0)) +
		getR(vec2(4.0, 0.0)) +
		getR(vec2(4.0, 1.0)) +
		getR(vec2(4.0, 2.0)) +
		getR(vec2(4.0, 3.0)) +
		getR(vec2(5.0, -5.0)) +
		getR(vec2(5.0, -1.0)) +
		getR(vec2(5.0, 0.0)) +
		getR(vec2(5.0, 1.0)) +
		getR(vec2(5.0, 5.0)) +
		getR(vec2(7.0, -7.0)) +
		getR(vec2(7.0, -3.0)) +
		getR(vec2(7.0, 0.0)) +
		getR(vec2(7.0, 3.0)) +
		getR(vec2(7.0, 7.0)) +
		getR(vec2(10.0, 0.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1); //EDGE_0


//:51,899,0,:34,39,1,:15,29,0,:15,15,1,
//:38,899,0,:29,35,1,:6,29,0,:1,1,1,:25,26,1,:54,48,1,
//:38,899,0,:29,35,1,:17,29,0,:1,5,1,:33,38,1,:61,71,1,
//:33,899,0,:2,3,1,:33,38,1,:0,0,0,:0,0,0,:0,0,0,
//:33,899,0,:2,3,1,:33,38,1,:0,13,0,:1,1,1,:0,0,0,
//:999,999,0,:84,111,1,:28,28,1,:0,0,0,:0,0,0,:0,0,0,


	//restore last frame's data (current, a[my_id])

	if(sum_0 >= 60 && sum_0 <= 111) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	if(sum_0 >= 1 && sum_0 <= 1) { gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); }
	
	//EDGE_2


}
