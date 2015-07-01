precision mediump float;

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {

    float current = float(get(vec2(0.0, 0.0)));
	
    gl_FragColor = vec4(current, current, current, 1.0);
    

	int s1 = 
		get(vec2(-6.0, 0.0)) +
		get(vec2(-5.0, -2.0)) +
		get(vec2(-5.0, -1.0)) +
		get(vec2(-5.0, 0.0)) +
		get(vec2(-5.0, 1.0)) +
		get(vec2(-5.0, 2.0)) +
		get(vec2(-4.0, -4.0)) +
		get(vec2(-4.0, -3.0)) +
		get(vec2(-4.0, -2.0)) +
		get(vec2(-4.0, -1.0)) +
		get(vec2(-4.0, 1.0)) +
		get(vec2(-4.0, 2.0)) +
		get(vec2(-4.0, 3.0)) +
		get(vec2(-4.0, 4.0)) +
		get(vec2(-3.0, -4.0)) +
		get(vec2(-3.0, -3.0)) +
		get(vec2(-3.0, -2.0)) +
		get(vec2(-3.0, 0.0)) +
		get(vec2(-3.0, 2.0)) +
		get(vec2(-3.0, 3.0)) +
		get(vec2(-3.0, 4.0)) +
		get(vec2(-2.0, -5.0)) +
		get(vec2(-2.0, -4.0)) +
		get(vec2(-2.0, -3.0)) +
		get(vec2(-2.0, 3.0)) +
		get(vec2(-2.0, 4.0)) +
		get(vec2(-2.0, 5.0)) +
		get(vec2(-1.0, -5.0)) +
		get(vec2(-1.0, -4.0)) +
		get(vec2(-1.0, 4.0)) +
		get(vec2(-1.0, 5.0)) +
		get(vec2(0.0, -6.0)) +
		get(vec2(0.0, -5.0)) +
		get(vec2(0.0, -3.0)) +
		get(vec2(0.0, 3.0)) +
		get(vec2(0.0, 5.0)) +
		get(vec2(0.0, 6.0)) +
		get(vec2(1.0, -5.0)) +
		get(vec2(1.0, -4.0)) +
		get(vec2(1.0, 4.0)) +
		get(vec2(1.0, 5.0)) +
		get(vec2(2.0, -5.0)) +
		get(vec2(2.0, -4.0)) +
		get(vec2(2.0, -3.0)) +
		get(vec2(2.0, 3.0)) +
		get(vec2(2.0, 4.0)) +
		get(vec2(2.0, 5.0)) +
		get(vec2(3.0, -4.0)) +
		get(vec2(3.0, -3.0)) +
		get(vec2(3.0, -2.0)) +
		get(vec2(3.0, 0.0)) +
		get(vec2(3.0, 2.0)) +
		get(vec2(3.0, 3.0)) +
		get(vec2(3.0, 4.0)) +
		get(vec2(4.0, -4.0)) +
		get(vec2(4.0, -3.0)) +
		get(vec2(4.0, -2.0)) +
		get(vec2(4.0, -1.0)) +
		get(vec2(4.0, 1.0)) +
		get(vec2(4.0, 2.0)) +
		get(vec2(4.0, 3.0)) +
		get(vec2(4.0, 4.0)) +
		get(vec2(5.0, -2.0)) +
		get(vec2(5.0, -1.0)) +
		get(vec2(5.0, 0.0)) +
		get(vec2(5.0, 1.0)) +
		get(vec2(5.0, 2.0)) +
		get(vec2(6.0, 0.0));

	int sum_one = s1;

	if(sum_one >= 34) 						{gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
	if(sum_one >= 25 && sum_one <= 31) 		{gl_FragColor = vec4(1.0, 0.2, 0.0, 1.0);}
	if(sum_one >= 27 && sum_one <= 29) 		{gl_FragColor = vec4(1.0, 0.0, 0.6, 1.0);}
	if(sum_one >= 0 && sum_one <= 16) 		{gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}



}
