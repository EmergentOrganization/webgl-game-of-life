#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform vec2 scale;

int get(vec2 offset) {
    return int(texture2D(state, (gl_FragCoord.xy + offset) / scale).r);
}

void main() {

    float current = float(get(vec2(0.0, 0.0)));
    gl_FragColor = vec4(current, current, current, 1.0);
    

	int s1 =
		get(vec2(-14.0, -1.0)) +
        get(vec2(-14.0, 0.0)) +
        get(vec2(-14.0, 1.0)) +
        get(vec2(-13.0, -4.0)) +
        get(vec2(-13.0, -3.0)) +
        get(vec2(-13.0, -2.0)) +
        get(vec2(-13.0, 2.0)) +
        get(vec2(-13.0, 3.0)) +
        get(vec2(-13.0, 4.0)) +
        get(vec2(-12.0, -6.0)) +
        get(vec2(-12.0, -5.0)) +
        get(vec2(-12.0, 5.0)) +
        get(vec2(-12.0, 6.0)) +
        get(vec2(-11.0, -8.0)) +
        get(vec2(-11.0, -7.0)) +
        get(vec2(-11.0, 7.0)) +
        get(vec2(-11.0, 8.0)) +
        get(vec2(-10.0, -9.0)) +
        get(vec2(-10.0, -1.0)) +
        get(vec2(-10.0, 0.0)) +
        get(vec2(-10.0, 1.0)) +
        get(vec2(-10.0, 9.0)) +
        get(vec2(-9.0, -10.0)) +
        get(vec2(-9.0, -4.0)) +
        get(vec2(-9.0, -3.0)) +
        get(vec2(-9.0, -2.0)) +
        get(vec2(-9.0, 2.0)) +
        get(vec2(-9.0, 3.0)) +
        get(vec2(-9.0, 4.0)) +
        get(vec2(-9.0, 10.0)) +
        get(vec2(-8.0, -11.0)) +
        get(vec2(-8.0, -6.0)) +
        get(vec2(-8.0, -5.0)) +
        get(vec2(-8.0, 5.0)) +
        get(vec2(-8.0, 6.0)) +
        get(vec2(-8.0, 11.0)) +
        get(vec2(-7.0, -11.0)) +
        get(vec2(-7.0, -7.0)) +
        get(vec2(-7.0, -2.0)) +
        get(vec2(-7.0, -1.0)) +
        get(vec2(-7.0, 0.0)) +
        get(vec2(-7.0, 1.0)) +
        get(vec2(-7.0, 2.0)) +
        get(vec2(-7.0, 7.0)) +
        get(vec2(-7.0, 11.0)) +
        get(vec2(-6.0, -12.0)) +
        get(vec2(-6.0, -8.0)) +
        get(vec2(-6.0, -4.0)) +
        get(vec2(-6.0, -3.0)) +
        get(vec2(-6.0, 3.0)) +
        get(vec2(-6.0, 4.0)) +
        get(vec2(-6.0, 8.0)) +
        get(vec2(-6.0, 12.0)) +
        get(vec2(-5.0, -12.0)) +
        get(vec2(-5.0, -8.0)) +
        get(vec2(-5.0, -5.0)) +
        get(vec2(-5.0, -1.0)) +
        get(vec2(-5.0, 0.0)) +
        get(vec2(-5.0, 1.0)) +
        get(vec2(-5.0, 5.0)) +
        get(vec2(-5.0, 8.0)) +
        get(vec2(-5.0, 12.0)) +
        get(vec2(-4.0, -13.0)) +
        get(vec2(-4.0, -9.0)) +
        get(vec2(-4.0, -6.0)) +
        get(vec2(-4.0, -3.0)) +
        get(vec2(-4.0, -2.0)) +
        get(vec2(-4.0, 2.0)) +
        get(vec2(-4.0, 3.0)) +
        get(vec2(-4.0, 6.0)) +
        get(vec2(-4.0, 9.0)) +
        get(vec2(-4.0, 13.0)) +
        get(vec2(-3.0, -13.0)) +
        get(vec2(-3.0, -9.0)) +
        get(vec2(-3.0, -6.0)) +
        get(vec2(-3.0, -4.0)) +
        get(vec2(-3.0, -1.0)) +
        get(vec2(-3.0, 0.0)) +
        get(vec2(-3.0, 1.0)) +
        get(vec2(-3.0, 4.0)) +
        get(vec2(-3.0, 6.0)) +
        get(vec2(-3.0, 9.0)) +
        get(vec2(-3.0, 13.0)) +
        get(vec2(-2.0, -13.0)) +
        get(vec2(-2.0, -9.0)) +
        get(vec2(-2.0, -7.0)) +
        get(vec2(-2.0, -4.0)) +
        get(vec2(-2.0, -2.0)) +
        get(vec2(-2.0, 2.0)) +
        get(vec2(-2.0, 4.0)) +
        get(vec2(-2.0, 7.0)) +
        get(vec2(-2.0, 9.0)) +
        get(vec2(-2.0, 13.0)) +
        get(vec2(-1.0, -14.0)) +
        get(vec2(-1.0, -10.0)) +
        get(vec2(-1.0, -7.0)) +
        get(vec2(-1.0, -5.0)) +
        get(vec2(-1.0, -3.0)) +
        get(vec2(-1.0, -1.0)) +
        get(vec2(-1.0, 0.0)) +
        get(vec2(-1.0, 1.0)) +
        get(vec2(-1.0, 3.0)) +
        get(vec2(-1.0, 5.0)) +
        get(vec2(-1.0, 7.0)) +
        get(vec2(-1.0, 10.0)) +
        get(vec2(-1.0, 14.0)) +
        get(vec2(0.0, -14.0)) +
        get(vec2(0.0, -10.0)) +
        get(vec2(0.0, -7.0)) +
        get(vec2(0.0, -5.0)) +
        get(vec2(0.0, -3.0)) +
        get(vec2(0.0, -1.0)) +
        get(vec2(0.0, 1.0)) +
        get(vec2(0.0, 3.0)) +
        get(vec2(0.0, 5.0)) +
        get(vec2(0.0, 7.0)) +
        get(vec2(0.0, 10.0)) +
        get(vec2(0.0, 14.0)) +
        get(vec2(1.0, -14.0)) +
        get(vec2(1.0, -10.0)) +
        get(vec2(1.0, -7.0)) +
        get(vec2(1.0, -5.0)) +
        get(vec2(1.0, -3.0)) +
        get(vec2(1.0, -1.0)) +
        get(vec2(1.0, 0.0)) +
        get(vec2(1.0, 1.0)) +
        get(vec2(1.0, 3.0)) +
        get(vec2(1.0, 5.0)) +
        get(vec2(1.0, 7.0)) +
        get(vec2(1.0, 10.0)) +
        get(vec2(1.0, 14.0)) +
        get(vec2(2.0, -13.0)) +
        get(vec2(2.0, -9.0)) +
        get(vec2(2.0, -7.0)) +
        get(vec2(2.0, -4.0)) +
        get(vec2(2.0, -2.0)) +
        get(vec2(2.0, 2.0)) +
        get(vec2(2.0, 4.0)) +
        get(vec2(2.0, 7.0)) +
        get(vec2(2.0, 9.0)) +
        get(vec2(2.0, 13.0)) +
        get(vec2(3.0, -13.0)) +
        get(vec2(3.0, -9.0)) +
        get(vec2(3.0, -6.0)) +
        get(vec2(3.0, -4.0)) +
        get(vec2(3.0, -1.0)) +
        get(vec2(3.0, 0.0)) +
        get(vec2(3.0, 1.0)) +
        get(vec2(3.0, 4.0)) +
        get(vec2(3.0, 6.0)) +
        get(vec2(3.0, 9.0)) +
        get(vec2(3.0, 13.0)) +
        get(vec2(4.0, -13.0)) +
        get(vec2(4.0, -9.0)) +
        get(vec2(4.0, -6.0)) +
        get(vec2(4.0, -3.0));

	int s2 =
        get(vec2(4.0, -2.0)) +
        get(vec2(4.0, 2.0)) +
        get(vec2(4.0, 3.0)) +
        get(vec2(4.0, 6.0)) +
        get(vec2(4.0, 9.0)) +
        get(vec2(4.0, 13.0)) +
        get(vec2(5.0, -12.0)) +
        get(vec2(5.0, -8.0)) +
        get(vec2(5.0, -5.0)) +
        get(vec2(5.0, -1.0)) +
        get(vec2(5.0, 0.0)) +
        get(vec2(5.0, 1.0)) +
        get(vec2(5.0, 5.0)) +
        get(vec2(5.0, 8.0)) +
        get(vec2(5.0, 12.0)) +
        get(vec2(6.0, -12.0)) +
        get(vec2(6.0, -8.0)) +
        get(vec2(6.0, -4.0)) +
        get(vec2(6.0, -3.0)) +
        get(vec2(6.0, 3.0)) +
        get(vec2(6.0, 4.0)) +
        get(vec2(6.0, 8.0)) +
        get(vec2(6.0, 12.0)) +
        get(vec2(7.0, -11.0)) +
        get(vec2(7.0, -7.0)) +
        get(vec2(7.0, -2.0)) +
        get(vec2(7.0, -1.0)) +
        get(vec2(7.0, 0.0)) +
        get(vec2(7.0, 1.0)) +
        get(vec2(7.0, 2.0)) +
        get(vec2(7.0, 7.0)) +
        get(vec2(7.0, 11.0)) +
        get(vec2(8.0, -11.0)) +
        get(vec2(8.0, -6.0)) +
        get(vec2(8.0, -5.0)) +
        get(vec2(8.0, 5.0)) +
        get(vec2(8.0, 6.0)) +
        get(vec2(8.0, 11.0)) +
        get(vec2(9.0, -10.0)) +
        get(vec2(9.0, -4.0)) +
        get(vec2(9.0, -3.0)) +
        get(vec2(9.0, -2.0)) +
        get(vec2(9.0, 2.0)) +
        get(vec2(9.0, 3.0)) +
        get(vec2(9.0, 4.0)) +
        get(vec2(9.0, 10.0)) +
        get(vec2(10.0, -9.0)) +
        get(vec2(10.0, -1.0)) +
        get(vec2(10.0, 0.0)) +
        get(vec2(10.0, 1.0)) +
        get(vec2(10.0, 9.0)) +
        get(vec2(11.0, -8.0)) +
        get(vec2(11.0, -7.0)) +
        get(vec2(11.0, 7.0)) +
        get(vec2(11.0, 8.0)) +
        get(vec2(12.0, -6.0)) +
        get(vec2(12.0, -5.0)) +
        get(vec2(12.0, 5.0)) +
        get(vec2(12.0, 6.0)) +
        get(vec2(13.0, -4.0)) +
        get(vec2(13.0, -3.0)) +
        get(vec2(13.0, -2.0)) +
        get(vec2(13.0, 2.0)) +
        get(vec2(13.0, 3.0)) +
        get(vec2(13.0, 4.0)) +
        get(vec2(14.0, -1.0)) +
        get(vec2(14.0, 0.0)) +
        get(vec2(14.0, 1.0));



	int sum_one = s1 + s2;


	if(sum_one >= 123 && sum_one <= 145) 	{gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);}
	if(sum_one >= 113 && sum_one <= 119) 	{gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);}
	if(sum_one >= 85 && sum_one <= 86) 		{gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}
	if(sum_one >= 64 && sum_one <= 67) 		{gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}

	if(sum_one >= 35 && sum_one <= 41) 		{gl_FragColor = vec4(0.0, 0.6, 0.6, 1.0);}
	if(sum_one >= 54 && sum_one <= 64) 		{gl_FragColor = vec4(0.0, 0.6, 0.6, 1.0);}
	//if(sum_one >= 11 && sum_one <= 17) 		{gl_FragColor = vec4(0.0, 0.1, 0.2, 1.0);}
	if(sum_one >= 87 && sum_one <= 89) 		{gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);}
	if(sum_one >= 147) 						{gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);}





}
