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



	
	float cgolsum =
        getR(vec2(-1.0, -1.0)) +
        getR(vec2(-1.0,  0.0)) +
        getR(vec2(-1.0,  1.0)) +
        getR(vec2( 0.0, -1.0)) +
        getR(vec2( 0.0,  1.0)) +
        getR(vec2( 1.0, -1.0)) +
        getR(vec2( 1.0,  0.0)) +
        getR(vec2( 1.0,  1.0));


	int cgol = int(cgolsum);

  


	//EDGE_1
float s0 = 
 		
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
float s1 = 		getR(vec2(-5.0, 8.0)) +
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
float s2 = 		getR(vec2(1.0, -5.0)) +
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
float s3 = 		getR(vec2(7.0, -1.0)) +
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
		getR(vec2(14.0, 1.0));   /*NEWLINE*/ int sum_0 = int(s0 + s1 + s2 + s3); //EDGE_0


	if(cgol >= 0 && cgol <= 2) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
	if(cgol >= 6 && cgol <= 7) {gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}
    if(cgol >= 4 && cgol <= 4) {gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
    
	//if(sum_0 >= 37 && sum_0 <= 43) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
	
	if(sum_0 >= 78 && sum_0 <= 85) { gl_FragColor = vec4(1.0, 0.8, 0.2, 1.0); }	
	if(sum_0 >= 37 && sum_0 <= 37) { gl_FragColor = vec4(1.0, 0.6, 0.3, 1.0); }	
	if(sum_0 >= 24 && sum_0 <= 24) { gl_FragColor = vec4(1.0, 0.6, 0.3, 1.0); }	
	if(sum_0 >= 112 && sum_0 <= 124) { gl_FragColor = vec4(1.0, 0.75, 0.0, 1.0); }
	if(sum_0 >= 145) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }

	if(sum_0 >= 69 && sum_0 <= 77) { gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
    




}
