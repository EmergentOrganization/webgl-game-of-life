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
        get(vec2(-14.0, -3.0)) +
        get(vec2(-14.0, -2.0)) +
        get(vec2(-14.0, -1.0)) +
        get(vec2(-14.0, 0.0)) +
        get(vec2(-14.0, 1.0)) +
        get(vec2(-14.0, 2.0)) +
        get(vec2(-14.0, 3.0)) +
        get(vec2(-13.0, -6.0)) +
        get(vec2(-13.0, -5.0)) +
        get(vec2(-13.0, -4.0)) +
        get(vec2(-13.0, -3.0)) +
        get(vec2(-13.0, -2.0)) +
        get(vec2(-13.0, -1.0)) +
        get(vec2(-13.0, 0.0)) +
        get(vec2(-13.0, 1.0)) +
        get(vec2(-13.0, 2.0)) +
        get(vec2(-13.0, 3.0)) +
        get(vec2(-13.0, 4.0)) +
        get(vec2(-13.0, 5.0)) +
        get(vec2(-13.0, 6.0)) +
        get(vec2(-12.0, -8.0)) +
        get(vec2(-12.0, -7.0)) +
        get(vec2(-12.0, -6.0)) +
        get(vec2(-12.0, -5.0)) +
        get(vec2(-12.0, -4.0)) +
        get(vec2(-12.0, -3.0)) +
        get(vec2(-12.0, -2.0)) +
        get(vec2(-12.0, -1.0)) +
        get(vec2(-12.0, 0.0)) +
        get(vec2(-12.0, 1.0)) +
        get(vec2(-12.0, 2.0)) +
        get(vec2(-12.0, 3.0)) +
        get(vec2(-12.0, 4.0)) +
        get(vec2(-12.0, 5.0)) +
        get(vec2(-12.0, 6.0)) +
        get(vec2(-12.0, 7.0)) +
        get(vec2(-12.0, 8.0)) +
        get(vec2(-11.0, -9.0)) +
        get(vec2(-11.0, -8.0)) +
        get(vec2(-11.0, -7.0)) +
        get(vec2(-11.0, -6.0)) +
        get(vec2(-11.0, -5.0)) +
        get(vec2(-11.0, -4.0)) +
        get(vec2(-11.0, -3.0)) +
        get(vec2(-11.0, -2.0)) +
        get(vec2(-11.0, -1.0)) +
        get(vec2(-11.0, 0.0)) +
        get(vec2(-11.0, 1.0)) +
        get(vec2(-11.0, 2.0)) +
        get(vec2(-11.0, 3.0)) +
        get(vec2(-11.0, 4.0)) +
        get(vec2(-11.0, 5.0)) +
        get(vec2(-11.0, 6.0)) +
        get(vec2(-11.0, 7.0)) +
        get(vec2(-11.0, 8.0)) +
        get(vec2(-11.0, 9.0)) +
        get(vec2(-10.0, -10.0)) +
        get(vec2(-10.0, -9.0)) +
        get(vec2(-10.0, -8.0)) +
        get(vec2(-10.0, -7.0)) +
        get(vec2(-10.0, -6.0)) +
        get(vec2(-10.0, -5.0)) +
        get(vec2(-10.0, 5.0)) +
        get(vec2(-10.0, 6.0)) +
        get(vec2(-10.0, 7.0)) +
        get(vec2(-10.0, 8.0)) +
        get(vec2(-10.0, 9.0)) +
        get(vec2(-10.0, 10.0)) +
        get(vec2(-9.0, -11.0)) +
        get(vec2(-9.0, -10.0)) +
        get(vec2(-9.0, -9.0)) +
        get(vec2(-9.0, -8.0)) +
        get(vec2(-9.0, -7.0)) +
        get(vec2(-9.0, 7.0)) +
        get(vec2(-9.0, 8.0)) +
        get(vec2(-9.0, 9.0)) +
        get(vec2(-9.0, 10.0)) +
        get(vec2(-9.0, 11.0)) +
        get(vec2(-8.0, -12.0)) +
        get(vec2(-8.0, -11.0)) +
        get(vec2(-8.0, -10.0)) +
        get(vec2(-8.0, -9.0)) +
        get(vec2(-8.0, -8.0)) +
        get(vec2(-8.0, 8.0)) +
        get(vec2(-8.0, 9.0)) +
        get(vec2(-8.0, 10.0)) +
        get(vec2(-8.0, 11.0)) +
        get(vec2(-8.0, 12.0)) +
        get(vec2(-7.0, -12.0)) +
        get(vec2(-7.0, -11.0)) +
        get(vec2(-7.0, -10.0)) +
        get(vec2(-7.0, -9.0)) +
        get(vec2(-7.0, -2.0)) +
        get(vec2(-7.0, -1.0)) +
        get(vec2(-7.0, 0.0)) +
        get(vec2(-7.0, 1.0)) +
        get(vec2(-7.0, 2.0)) +
        get(vec2(-7.0, 9.0)) +
        get(vec2(-7.0, 10.0)) +
        get(vec2(-7.0, 11.0)) +
        get(vec2(-7.0, 12.0)) +
        get(vec2(-6.0, -13.0)) +
        get(vec2(-6.0, -12.0)) +
        get(vec2(-6.0, -11.0)) +
        get(vec2(-6.0, -10.0)) +
        get(vec2(-6.0, -4.0)) +
        get(vec2(-6.0, -3.0)) +
        get(vec2(-6.0, 3.0)) +
        get(vec2(-6.0, 4.0)) +
        get(vec2(-6.0, 10.0)) +
        get(vec2(-6.0, 11.0)) +
        get(vec2(-6.0, 12.0)) +
        get(vec2(-6.0, 13.0)) +
        get(vec2(-5.0, -13.0)) +
        get(vec2(-5.0, -12.0)) +
        get(vec2(-5.0, -11.0)) +
        get(vec2(-5.0, -10.0)) +
        get(vec2(-5.0, -5.0)) +
        get(vec2(-5.0, 5.0)) +
        get(vec2(-5.0, 10.0)) +
        get(vec2(-5.0, 11.0)) +
        get(vec2(-5.0, 12.0)) +
        get(vec2(-5.0, 13.0)) +
        get(vec2(-4.0, -13.0)) +
        get(vec2(-4.0, -12.0)) +
        get(vec2(-4.0, -11.0)) +
        get(vec2(-4.0, -6.0)) +
        get(vec2(-4.0, -1.0)) +
        get(vec2(-4.0, 0.0)) +
        get(vec2(-4.0, 1.0)) +
        get(vec2(-4.0, 6.0)) +
        get(vec2(-4.0, 11.0)) +
        get(vec2(-4.0, 12.0)) +
        get(vec2(-4.0, 13.0)) +
        get(vec2(-3.0, -14.0)) +
        get(vec2(-3.0, -13.0));

	int s2 = 
        get(vec2(-3.0, -12.0)) +
        get(vec2(-3.0, -11.0)) +
        get(vec2(-3.0, -6.0)) +
        get(vec2(-3.0, -2.0)) +
        get(vec2(-3.0, 2.0)) +
        get(vec2(-3.0, 6.0)) +
        get(vec2(-3.0, 11.0)) +
        get(vec2(-3.0, 12.0)) +
        get(vec2(-3.0, 13.0)) +
        get(vec2(-3.0, 14.0)) +
        get(vec2(-2.0, -14.0)) +
        get(vec2(-2.0, -13.0)) +
        get(vec2(-2.0, -12.0)) +
        get(vec2(-2.0, -11.0)) +
        get(vec2(-2.0, -7.0)) +
        get(vec2(-2.0, -3.0)) +
        get(vec2(-2.0, 3.0)) +
        get(vec2(-2.0, 7.0)) +
        get(vec2(-2.0, 11.0)) +
        get(vec2(-2.0, 12.0)) +
        get(vec2(-2.0, 13.0)) +
        get(vec2(-2.0, 14.0)) +
        get(vec2(-1.0, -14.0)) +
        get(vec2(-1.0, -13.0)) +
        get(vec2(-1.0, -12.0)) +
        get(vec2(-1.0, -11.0)) +
        get(vec2(-1.0, -7.0)) +
        get(vec2(-1.0, -4.0)) +
        get(vec2(-1.0, -1.0)) +
        get(vec2(-1.0, 0.0)) +
        get(vec2(-1.0, 1.0)) +
        get(vec2(-1.0, 4.0)) +
        get(vec2(-1.0, 7.0)) +
        get(vec2(-1.0, 11.0)) +
        get(vec2(-1.0, 12.0)) +
		get(vec2(-1.0, 13.0)) + //crash
        get(vec2(-1.0, 14.0)) +
        get(vec2(0.0, -14.0)) +
        get(vec2(0.0, -13.0)) +
        get(vec2(0.0, -12.0)) +
        get(vec2(0.0, -11.0)) +
        get(vec2(0.0, -7.0)) +
        get(vec2(0.0, -4.0)) +
        get(vec2(0.0, -1.0)) +
        get(vec2(0.0, 1.0)) +
        get(vec2(0.0, 4.0)) +
        get(vec2(0.0, 7.0)) +
        get(vec2(0.0, 11.0)) +
        get(vec2(0.0, 12.0)) +
        get(vec2(0.0, 13.0)) +
        get(vec2(0.0, 14.0)) +
        get(vec2(1.0, -14.0)) +
        get(vec2(1.0, -13.0)) +
        get(vec2(1.0, -12.0)) +
        get(vec2(1.0, -11.0)) +
        get(vec2(1.0, -7.0)) +
        get(vec2(1.0, -4.0)) +
        get(vec2(1.0, -1.0)) +
        get(vec2(1.0, 0.0)) +
        get(vec2(1.0, 1.0)) +
        get(vec2(1.0, 4.0)) +
        get(vec2(1.0, 7.0)) +
        get(vec2(1.0, 11.0)) +
        get(vec2(1.0, 12.0)) +
        get(vec2(1.0, 13.0)) +
        get(vec2(1.0, 14.0)) +
        get(vec2(2.0, -14.0)) +
        get(vec2(2.0, -13.0)) +
        get(vec2(2.0, -12.0)) +
        get(vec2(2.0, -11.0)) +
        get(vec2(2.0, -7.0)) +
        get(vec2(2.0, -3.0)) +
        get(vec2(2.0, 3.0)) +
        get(vec2(2.0, 7.0)) +
        get(vec2(2.0, 11.0)) +
        get(vec2(2.0, 12.0)) +
        get(vec2(2.0, 13.0)) +
        get(vec2(2.0, 14.0)) +
        get(vec2(3.0, -14.0)) +
        get(vec2(3.0, -13.0)) +
        get(vec2(3.0, -12.0)) +
        get(vec2(3.0, -11.0)) +
        get(vec2(3.0, -6.0)) +
        get(vec2(3.0, -2.0)) +
        get(vec2(3.0, 2.0)) +
        get(vec2(3.0, 6.0)) +
        get(vec2(3.0, 11.0)) +
        get(vec2(3.0, 12.0)) +
        get(vec2(3.0, 13.0)) +
        get(vec2(3.0, 14.0)) +
        get(vec2(4.0, -13.0)) +
        get(vec2(4.0, -12.0)) +
        get(vec2(4.0, -11.0)) +
        get(vec2(4.0, -6.0)) +
        get(vec2(4.0, -1.0)) +
        get(vec2(4.0, 0.0));

	int s3 =
        get(vec2(4.0, 1.0)) +
        get(vec2(4.0, 6.0)) +
        get(vec2(4.0, 11.0)) +
        get(vec2(4.0, 12.0)) +
        get(vec2(4.0, 13.0)) +
        get(vec2(5.0, -13.0)) +
        get(vec2(5.0, -12.0)) +
        get(vec2(5.0, -11.0)) +
        get(vec2(5.0, -10.0)) +
        get(vec2(5.0, -5.0)) +
        get(vec2(5.0, 5.0)) +
        get(vec2(5.0, 10.0)) +
        get(vec2(5.0, 11.0)) +
        get(vec2(5.0, 12.0)) +
        get(vec2(5.0, 13.0)) +
        get(vec2(6.0, -13.0)) +
        get(vec2(6.0, -12.0)) +
        get(vec2(6.0, -11.0)) +
        get(vec2(6.0, -10.0)) +
        get(vec2(6.0, -4.0)) +
        get(vec2(6.0, -3.0)) +
        get(vec2(6.0, 3.0)) +
        get(vec2(6.0, 4.0)) +
        get(vec2(6.0, 10.0)) +
        get(vec2(6.0, 11.0)) +
        get(vec2(6.0, 12.0)) +
        get(vec2(6.0, 13.0)) +
        get(vec2(7.0, -12.0)) +
        get(vec2(7.0, -11.0)) +
        get(vec2(7.0, -10.0)) +
        get(vec2(7.0, -9.0)) +
        get(vec2(7.0, -2.0)) +
        get(vec2(7.0, -1.0)) +
        get(vec2(7.0, 0.0)) +
        get(vec2(7.0, 1.0)) +
        get(vec2(7.0, 2.0)) +
        get(vec2(7.0, 9.0)) +
        get(vec2(7.0, 10.0)) +
        get(vec2(7.0, 11.0)) +
        get(vec2(7.0, 12.0)) +
        get(vec2(8.0, -12.0)) +
        get(vec2(8.0, -11.0)) +
        get(vec2(8.0, -10.0)) +
        get(vec2(8.0, -9.0)) +
        get(vec2(8.0, -8.0)) +
        get(vec2(8.0, 8.0)) +
        get(vec2(8.0, 9.0)) +
        get(vec2(8.0, 10.0)) +
        get(vec2(8.0, 11.0)) +
        get(vec2(8.0, 12.0)) +
        get(vec2(9.0, -11.0)) +
        get(vec2(9.0, -10.0)) +
        get(vec2(9.0, -9.0)) +
        get(vec2(9.0, -8.0)) +
        get(vec2(9.0, -7.0)) +
        get(vec2(9.0, 7.0)) +
        get(vec2(9.0, 8.0)) +
        get(vec2(9.0, 9.0)) +
        get(vec2(9.0, 10.0)) +
        get(vec2(9.0, 11.0)) +
        get(vec2(10.0, -10.0)) +
        get(vec2(10.0, -9.0)) +
        get(vec2(10.0, -8.0)) +
        get(vec2(10.0, -7.0)) +
        get(vec2(10.0, -6.0)) +
        get(vec2(10.0, -5.0)) +
        get(vec2(10.0, 5.0)) +
        get(vec2(10.0, 6.0)) +
        get(vec2(10.0, 7.0)) +
        get(vec2(10.0, 8.0)) +
        get(vec2(10.0, 9.0)) +
        get(vec2(10.0, 10.0)) +
        get(vec2(11.0, -9.0)) +
        get(vec2(11.0, -8.0)) +
        get(vec2(11.0, -7.0)) +
        get(vec2(11.0, -6.0)) +
        get(vec2(11.0, -5.0)) +
        get(vec2(11.0, -4.0)) +
        get(vec2(11.0, -3.0)) +
        get(vec2(11.0, -2.0)) +
        get(vec2(11.0, -1.0)) +
        get(vec2(11.0, 0.0)) +
        get(vec2(11.0, 1.0)) +
        get(vec2(11.0, 2.0)) +
        get(vec2(11.0, 3.0)) +
        get(vec2(11.0, 4.0)) +
        get(vec2(11.0, 5.0)) +
        get(vec2(11.0, 6.0)) +
        get(vec2(11.0, 7.0)) +
        get(vec2(11.0, 8.0)) +
        get(vec2(11.0, 9.0)) +
        get(vec2(12.0, -8.0)) +
        get(vec2(12.0, -7.0)) +
        get(vec2(12.0, -6.0)) +
        get(vec2(12.0, -5.0)) +
        get(vec2(12.0, -4.0)) +
        get(vec2(12.0, -3.0)) +
        get(vec2(12.0, -2.0)) +
        get(vec2(12.0, -1.0)) +
        get(vec2(12.0, 0.0)) +
        get(vec2(12.0, 1.0)) +
        get(vec2(12.0, 2.0)) +
        get(vec2(12.0, 3.0)) +
        get(vec2(12.0, 4.0)) +
        get(vec2(12.0, 5.0)) +
        get(vec2(12.0, 6.0)) +
        get(vec2(12.0, 7.0)) +
        get(vec2(12.0, 8.0)) +
        get(vec2(13.0, -6.0)) +
        get(vec2(13.0, -5.0)) +
        get(vec2(13.0, -4.0)) +
        get(vec2(13.0, -3.0)) +
        get(vec2(13.0, -2.0)) +
        get(vec2(13.0, -1.0)) +
        get(vec2(13.0, 0.0)) +
        get(vec2(13.0, 1.0)) +
        get(vec2(13.0, 2.0)) +
        get(vec2(13.0, 3.0)) +
        get(vec2(13.0, 4.0)) +
        get(vec2(13.0, 5.0)) +
        get(vec2(13.0, 6.0)) +
        get(vec2(14.0, -3.0)) +
        get(vec2(14.0, -2.0)) +
        get(vec2(14.0, -1.0)) +
        get(vec2(14.0, 0.0)) +
        get(vec2(14.0, 1.0)) +
        get(vec2(14.0, 2.0)) +
        get(vec2(14.0, 3.0));

		int sum = s1 + s2 + s3;

	if(sum >= 220) 					{gl_FragColor = vec4(0.0, 0.9, 0.6, 1.0);}
	if(sum >= 180 && sum <= 220) 	{gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}
	if(sum >= 129 && sum <= 137) 	{gl_FragColor = vec4(1.0, 0.4, 0.0, 1.0);}
	if(sum >= 38 && sum <= 118) 	{gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);}
	if(sum >= 52 && sum <= 58) 		{gl_FragColor = vec4(1.0, 0.8, 0.8, 1.0);}

}
