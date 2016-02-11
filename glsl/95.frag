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
		get(vec2(-7.0, -3.0)) +
		get(vec2(-7.0, 0.0)) +
		get(vec2(-7.0, 3.0)) +
		get(vec2(-5.0, -5.0)) +
		get(vec2(-5.0, -2.0)) +
		get(vec2(-5.0, -1.0)) +
		get(vec2(-5.0, 0.0)) +
		get(vec2(-5.0, 1.0)) +
		get(vec2(-5.0, 2.0)) +
		get(vec2(-5.0, 5.0)) +
		get(vec2(-4.0, -3.0)) +
		get(vec2(-4.0, 3.0)) +
		get(vec2(-3.0, -7.0)) +
		get(vec2(-3.0, -4.0)) +
		get(vec2(-3.0, 4.0)) +
		get(vec2(-3.0, 7.0)) +
		get(vec2(-2.0, -5.0)) +
		get(vec2(-2.0, -1.0)) +
		get(vec2(-2.0, 0.0)) +
		get(vec2(-2.0, 1.0)) +
		get(vec2(-2.0, 5.0)) +
		get(vec2(-1.0, -5.0)) +
		get(vec2(-1.0, -2.0)) +
		get(vec2(-1.0, -1.0)) +
		get(vec2(-1.0, 0.0)) +
		get(vec2(-1.0, 1.0)) +
		get(vec2(-1.0, 2.0)) +
		get(vec2(-1.0, 5.0)) +
		get(vec2(0.0, -7.0)) +
		get(vec2(0.0, -5.0)) +
		get(vec2(0.0, -2.0)) +
		get(vec2(0.0, -1.0)) +
		get(vec2(0.0, 1.0)) +
		get(vec2(0.0, 2.0)) +
		get(vec2(0.0, 5.0)) +
		get(vec2(0.0, 7.0)) +
		get(vec2(1.0, -5.0)) +
		get(vec2(1.0, -2.0)) +
		get(vec2(1.0, -1.0)) +
		get(vec2(1.0, 0.0)) +
		get(vec2(1.0, 1.0)) +
		get(vec2(1.0, 2.0)) +
		get(vec2(1.0, 5.0)) +
		get(vec2(2.0, -5.0)) +
		get(vec2(2.0, -1.0)) +
		get(vec2(2.0, 0.0)) +
		get(vec2(2.0, 1.0)) +
		get(vec2(2.0, 5.0)) +
		get(vec2(3.0, -7.0)) +
		get(vec2(3.0, -4.0)) +
		get(vec2(3.0, 4.0)) +
		get(vec2(3.0, 7.0)) +
		get(vec2(4.0, -3.0)) +
		get(vec2(4.0, 3.0)) +
		get(vec2(5.0, -5.0)) +
		get(vec2(5.0, -2.0)) +
		get(vec2(5.0, -1.0)) +
		get(vec2(5.0, 0.0)) +
		get(vec2(5.0, 1.0)) +
		get(vec2(5.0, 2.0)) +
		get(vec2(5.0, 5.0)) +
		get(vec2(7.0, -3.0)) +
		get(vec2(7.0, 0.0)) +
		get(vec2(7.0, 3.0));

	int sum_one = s1;

	if(sum_one >= 39) 		{gl_FragColor = vec4(0.0, 0.1, 0.1, 1.0);}
	if(sum_one >= 21 && sum_one <= 32) 		{gl_FragColor = vec4(1.0, 0.8, 0.0, 1.0);}
	if(sum_one >= 26 && sum_one <= 30) 		{gl_FragColor = vec4(1.0, 0.2, 0.0, 1.0);}
	if(sum_one <= 20) 		{gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}



}
