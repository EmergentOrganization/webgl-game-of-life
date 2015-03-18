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
		get(vec2(-6.0, -1.0)) +
		get(vec2(-6.0, 0.0)) +
		get(vec2(-6.0, 1.0)) +
		get(vec2(-5.0, -3.0)) +
		get(vec2(-5.0, -2.0)) +
		get(vec2(-5.0, 2.0)) +
		get(vec2(-5.0, 3.0)) +
		get(vec2(-4.0, -4.0)) +
		get(vec2(-4.0, 4.0)) +
		get(vec2(-3.0, -5.0)) +
		get(vec2(-3.0, -2.0)) +
		get(vec2(-3.0, -1.0)) +
		get(vec2(-3.0, 0.0)) +
		get(vec2(-3.0, 1.0)) +
		get(vec2(-3.0, 2.0)) +
		get(vec2(-3.0, 5.0)) +
		get(vec2(-2.0, -5.0)) +
		get(vec2(-2.0, -3.0)) +
		get(vec2(-2.0, 3.0)) +
		get(vec2(-2.0, 5.0)) +
		get(vec2(-1.0, -6.0)) +
		get(vec2(-1.0, -3.0)) +
		get(vec2(-1.0, -1.0)) +
		get(vec2(-1.0, 0.0)) +
		get(vec2(-1.0, 1.0)) +
		get(vec2(-1.0, 3.0)) +
		get(vec2(-1.0, 6.0)) +
		get(vec2(0.0, -6.0)) +
		get(vec2(0.0, -3.0)) +
		get(vec2(0.0, -1.0)) +
		get(vec2(0.0, 1.0)) +
		get(vec2(0.0, 3.0)) +
		get(vec2(0.0, 6.0)) +
		get(vec2(1.0, -6.0)) +
		get(vec2(1.0, -3.0)) +
		get(vec2(1.0, -1.0)) +
		get(vec2(1.0, 0.0)) +
		get(vec2(1.0, 1.0)) +
		get(vec2(1.0, 3.0)) +
		get(vec2(1.0, 6.0)) +
		get(vec2(2.0, -5.0)) +
		get(vec2(2.0, -3.0)) +
		get(vec2(2.0, 3.0)) +
		get(vec2(2.0, 5.0)) +
		get(vec2(3.0, -5.0)) +
		get(vec2(3.0, -2.0)) +
		get(vec2(3.0, -1.0)) +
		get(vec2(3.0, 0.0)) +
		get(vec2(3.0, 1.0)) +
		get(vec2(3.0, 2.0)) +
		get(vec2(3.0, 5.0)) +
		get(vec2(4.0, -4.0)) +
		get(vec2(4.0, 4.0)) +
		get(vec2(5.0, -3.0)) +
		get(vec2(5.0, -2.0)) +
		get(vec2(5.0, 2.0)) +
		get(vec2(5.0, 3.0)) +
		get(vec2(6.0, -1.0)) +
		get(vec2(6.0, 0.0)) +
		get(vec2(6.0, 1.0));





	int s2 =
		get(vec2(-20.0, -2.0)) +
		get(vec2(-20.0, -1.0)) +
		get(vec2(-20.0, 0.0)) +
		get(vec2(-20.0, 1.0)) +
		get(vec2(-20.0, 2.0)) +
		get(vec2(-19.0, -5.0)) +
		get(vec2(-19.0, -4.0)) +
		get(vec2(-19.0, -3.0)) +
		get(vec2(-19.0, 3.0)) +
		get(vec2(-19.0, 4.0)) +
		get(vec2(-19.0, 5.0)) +
		get(vec2(-18.0, -8.0)) +
		get(vec2(-18.0, -7.0)) +
		get(vec2(-18.0, -6.0)) +
		get(vec2(-18.0, 6.0)) +
		get(vec2(-18.0, 7.0)) +
		get(vec2(-18.0, 8.0)) +
		get(vec2(-17.0, -10.0)) +
		get(vec2(-17.0, -9.0)) +
		get(vec2(-17.0, 9.0)) +
		get(vec2(-17.0, 10.0)) +
		get(vec2(-16.0, -12.0)) +
		get(vec2(-16.0, -11.0)) +
		get(vec2(-16.0, 11.0)) +
		get(vec2(-16.0, 12.0)) +
		get(vec2(-15.0, -13.0)) +
		get(vec2(-15.0, -2.0)) +
		get(vec2(-15.0, -1.0)) +
		get(vec2(-15.0, 0.0)) +
		get(vec2(-15.0, 1.0)) +
		get(vec2(-15.0, 2.0)) +
		get(vec2(-15.0, 13.0)) +
		get(vec2(-14.0, -14.0)) +
		get(vec2(-14.0, -5.0)) +
		get(vec2(-14.0, -4.0)) +
		get(vec2(-14.0, -3.0)) +
		get(vec2(-14.0, 3.0)) +
		get(vec2(-14.0, 4.0)) +
		get(vec2(-14.0, 5.0)) +
		get(vec2(-14.0, 14.0)) +
		get(vec2(-13.0, -15.0)) +
		get(vec2(-13.0, -7.0)) +
		get(vec2(-13.0, -6.0)) +
		get(vec2(-13.0, 6.0)) +
		get(vec2(-13.0, 7.0)) +
		get(vec2(-13.0, 15.0)) +
		get(vec2(-12.0, -16.0)) +
		get(vec2(-12.0, -9.0)) +
		get(vec2(-12.0, -8.0)) +
		get(vec2(-12.0, 8.0)) +
		get(vec2(-12.0, 9.0)) +
		get(vec2(-12.0, 16.0)) +
		get(vec2(-11.0, -16.0)) +
		get(vec2(-11.0, -10.0)) +
		get(vec2(-11.0, -3.0)) +
		get(vec2(-11.0, -2.0)) +
		get(vec2(-11.0, -1.0)) +
		get(vec2(-11.0, 0.0)) +
		get(vec2(-11.0, 1.0)) +
		get(vec2(-11.0, 2.0)) +
		get(vec2(-11.0, 3.0)) +
		get(vec2(-11.0, 10.0)) +
		get(vec2(-11.0, 16.0)) +
		get(vec2(-10.0, -17.0)) +
		get(vec2(-10.0, -11.0)) +
		get(vec2(-10.0, -5.0)) +
		get(vec2(-10.0, -4.0)) +
		get(vec2(-10.0, -3.0)) +
		get(vec2(-10.0, -2.0)) +
		get(vec2(-10.0, 2.0)) +
		get(vec2(-10.0, 3.0)) +
		get(vec2(-10.0, 4.0)) +
		get(vec2(-10.0, 5.0)) +
		get(vec2(-10.0, 11.0)) +
		get(vec2(-10.0, 17.0)) +
		get(vec2(-9.0, -17.0)) +
		get(vec2(-9.0, -12.0)) +
		get(vec2(-9.0, -7.0)) +
		get(vec2(-9.0, -6.0)) +
		get(vec2(-9.0, -5.0)) +
		get(vec2(-9.0, 5.0)) +
		get(vec2(-9.0, 6.0)) +
		get(vec2(-9.0, 7.0)) +
		get(vec2(-9.0, 12.0)) +
		get(vec2(-9.0, 17.0)) +
		get(vec2(-8.0, -18.0)) +
		get(vec2(-8.0, -12.0)) +
		get(vec2(-8.0, -8.0)) +
		get(vec2(-8.0, -7.0)) +
		get(vec2(-8.0, 7.0)) +
		get(vec2(-8.0, 8.0)) +
		get(vec2(-8.0, 12.0)) +
		get(vec2(-8.0, 18.0)) +
		get(vec2(-7.0, -18.0)) +
		get(vec2(-7.0, -13.0)) +
		get(vec2(-7.0, -9.0)) +
		get(vec2(-7.0, -8.0)) +
		get(vec2(-7.0, -1.0)) +
		get(vec2(-7.0, 0.0)) +
		get(vec2(-7.0, 1.0)) +
		get(vec2(-7.0, 8.0)) +
		get(vec2(-7.0, 9.0)) +
		get(vec2(-7.0, 13.0)) +
		get(vec2(-7.0, 18.0)) +
		get(vec2(-6.0, -18.0)) +
		get(vec2(-6.0, -13.0)) +
		get(vec2(-6.0, -9.0)) +
		get(vec2(-6.0, -3.0)) +
		get(vec2(-6.0, -2.0)) +
		get(vec2(-6.0, -1.0)) +
		get(vec2(-6.0, 0.0)) +
		get(vec2(-6.0, 1.0)) +
		get(vec2(-6.0, 2.0)) +
		get(vec2(-6.0, 3.0)) +
		get(vec2(-6.0, 9.0)) +
		get(vec2(-6.0, 13.0)) +
		get(vec2(-6.0, 18.0)) +
		get(vec2(-5.0, -19.0)) +
		get(vec2(-5.0, -14.0)) +
		get(vec2(-5.0, -10.0)) +
		get(vec2(-5.0, -9.0)) +
		get(vec2(-5.0, -5.0)) +
		get(vec2(-5.0, -4.0)) +
		get(vec2(-5.0, -3.0)) +
		get(vec2(-5.0, -2.0)) +
		get(vec2(-5.0, 2.0)) +
		get(vec2(-5.0, 3.0)) +
		get(vec2(-5.0, 4.0)) +
		get(vec2(-5.0, 5.0)) +
		get(vec2(-5.0, 9.0)) +
		get(vec2(-5.0, 10.0)) +
		get(vec2(-5.0, 14.0)) +
		get(vec2(-5.0, 19.0)) +
		get(vec2(-4.0, -19.0)) +
		get(vec2(-4.0, -14.0)) +
		get(vec2(-4.0, -10.0)) +
		get(vec2(-4.0, -5.0)) +
		get(vec2(-4.0, -4.0)) +
		get(vec2(-4.0, 4.0)) +
		get(vec2(-4.0, 5.0)) +
		get(vec2(-4.0, 10.0)) +
		get(vec2(-4.0, 14.0)) +
		get(vec2(-4.0, 19.0)) +
		get(vec2(-3.0, -19.0)) +
		get(vec2(-3.0, -14.0)) +
		get(vec2(-3.0, -11.0)) +
		get(vec2(-3.0, -10.0)) +
		get(vec2(-3.0, -6.0)) +
		get(vec2(-3.0, -5.0)) +
		get(vec2(-3.0, 5.0)) +
		get(vec2(-3.0, 6.0)) +
		get(vec2(-3.0, 10.0)) +
		get(vec2(-3.0, 11.0));

	int s3 =
		get(vec2(-3.0, 14.0)) +
		get(vec2(-3.0, 19.0)) +
		get(vec2(-2.0, -20.0)) +
		get(vec2(-2.0, -15.0)) +
		get(vec2(-2.0, -11.0)) +
		get(vec2(-2.0, -10.0)) +
		get(vec2(-2.0, -6.0)) +
		get(vec2(-2.0, -5.0)) +
		get(vec2(-2.0, -2.0)) +
		get(vec2(-2.0, -1.0)) +
		get(vec2(-2.0, 0.0)) +
		get(vec2(-2.0, 1.0)) +
		get(vec2(-2.0, 2.0)) +
		get(vec2(-2.0, 5.0)) +
		get(vec2(-2.0, 6.0)) +
		get(vec2(-2.0, 10.0)) +
		get(vec2(-2.0, 11.0)) +
		get(vec2(-2.0, 15.0)) +
		get(vec2(-2.0, 20.0)) +
		get(vec2(-1.0, -20.0)) +
		get(vec2(-1.0, -15.0)) +
		get(vec2(-1.0, -11.0)) +
		get(vec2(-1.0, -7.0)) +
		get(vec2(-1.0, -6.0)) +
		get(vec2(-1.0, -2.0)) +
		get(vec2(-1.0, -1.0)) +
		get(vec2(-1.0, 0.0)) +
		get(vec2(-1.0, 1.0)) +
		get(vec2(-1.0, 2.0)) +
		get(vec2(-1.0, 6.0)) +
		get(vec2(-1.0, 7.0)) +
		get(vec2(-1.0, 11.0)) +
		get(vec2(-1.0, 15.0)) +
		get(vec2(-1.0, 20.0)) +
		get(vec2(0.0, -20.0)) +
		get(vec2(0.0, -15.0)) +
		get(vec2(0.0, -11.0)) +
		get(vec2(0.0, -7.0)) +
		get(vec2(0.0, -6.0)) +
		get(vec2(0.0, -2.0)) +
		get(vec2(0.0, -1.0)) +
		get(vec2(0.0, 1.0)) +
		get(vec2(0.0, 2.0)) +
		get(vec2(0.0, 6.0)) +
		get(vec2(0.0, 7.0)) +
		get(vec2(0.0, 11.0)) +
		get(vec2(0.0, 15.0)) +
		get(vec2(0.0, 20.0)) +
		get(vec2(1.0, -20.0)) +
		get(vec2(1.0, -15.0)) +
		get(vec2(1.0, -11.0)) +
		get(vec2(1.0, -7.0)) +
		get(vec2(1.0, -6.0)) +
		get(vec2(1.0, -2.0)) +
		get(vec2(1.0, -1.0)) +
		get(vec2(1.0, 0.0)) +
		get(vec2(1.0, 1.0)) +
		get(vec2(1.0, 2.0)) +
		get(vec2(1.0, 6.0)) +
		get(vec2(1.0, 7.0)) +
		get(vec2(1.0, 11.0)) +
		get(vec2(1.0, 15.0)) +
		get(vec2(1.0, 20.0)) +
		get(vec2(2.0, -20.0)) +
		get(vec2(2.0, -15.0)) +
		get(vec2(2.0, -11.0)) +
		get(vec2(2.0, -10.0)) +
		get(vec2(2.0, -6.0)) +
		get(vec2(2.0, -5.0)) +
		get(vec2(2.0, -2.0)) +
		get(vec2(2.0, -1.0)) +
		get(vec2(2.0, 0.0)) +
		get(vec2(2.0, 1.0)) +
		get(vec2(2.0, 2.0)) +
		get(vec2(2.0, 5.0)) +
		get(vec2(2.0, 6.0)) +
		get(vec2(2.0, 10.0)) +
		get(vec2(2.0, 11.0)) +
		get(vec2(2.0, 15.0)) +
		get(vec2(2.0, 20.0)) +
		get(vec2(3.0, -19.0)) +
		get(vec2(3.0, -14.0)) +
		get(vec2(3.0, -11.0)) +
		get(vec2(3.0, -10.0)) +
		get(vec2(3.0, -6.0)) +
		get(vec2(3.0, -5.0)) +
		get(vec2(3.0, 5.0)) +
		get(vec2(3.0, 6.0)) +
		get(vec2(3.0, 10.0)) +
		get(vec2(3.0, 11.0)) +
		get(vec2(3.0, 14.0)) +
		get(vec2(3.0, 19.0)) +
		get(vec2(4.0, -19.0)) +
		get(vec2(4.0, -14.0)) +
		get(vec2(4.0, -10.0)) +
		get(vec2(4.0, -5.0)) +
		get(vec2(4.0, -4.0)) +
		get(vec2(4.0, 4.0)) +
		get(vec2(4.0, 5.0)) +
		get(vec2(4.0, 10.0)) +
		get(vec2(4.0, 14.0)) +
		get(vec2(4.0, 19.0)) +
		get(vec2(5.0, -19.0)) +
		get(vec2(5.0, -14.0)) +
		get(vec2(5.0, -10.0)) +
		get(vec2(5.0, -9.0)) +
		get(vec2(5.0, -5.0)) +
		get(vec2(5.0, -4.0)) +
		get(vec2(5.0, -3.0)) +
		get(vec2(5.0, -2.0)) +
		get(vec2(5.0, 2.0)) +
		get(vec2(5.0, 3.0)) +
		get(vec2(5.0, 4.0)) +
		get(vec2(5.0, 5.0)) +
		get(vec2(5.0, 9.0)) +
		get(vec2(5.0, 10.0)) +
		get(vec2(5.0, 14.0)) +
		get(vec2(5.0, 19.0)) +
		get(vec2(6.0, -18.0)) +
		get(vec2(6.0, -13.0)) +
		get(vec2(6.0, -9.0)) +
		get(vec2(6.0, -3.0)) +
		get(vec2(6.0, -2.0)) +
		get(vec2(6.0, -1.0)) +
		get(vec2(6.0, 0.0)) +
		get(vec2(6.0, 1.0)) +
		get(vec2(6.0, 2.0)) +
		get(vec2(6.0, 3.0)) +
		get(vec2(6.0, 9.0)) +
		get(vec2(6.0, 13.0)) +
		get(vec2(6.0, 18.0)) +
		get(vec2(7.0, -18.0)) +
		get(vec2(7.0, -13.0)) +
		get(vec2(7.0, -9.0)) +
		get(vec2(7.0, -8.0)) +
		get(vec2(7.0, -1.0)) +
		get(vec2(7.0, 0.0)) +
		get(vec2(7.0, 1.0)) +
		get(vec2(7.0, 8.0)) +
		get(vec2(7.0, 9.0)) +
		get(vec2(7.0, 13.0)) +
		get(vec2(7.0, 18.0)) +
		get(vec2(8.0, -18.0)) +
		get(vec2(8.0, -12.0)) +
		get(vec2(8.0, -8.0)) +
		get(vec2(8.0, -7.0)) +
		get(vec2(8.0, 7.0)) +
		get(vec2(8.0, 8.0)) +
		get(vec2(8.0, 12.0)) +
		get(vec2(8.0, 18.0)) +
		get(vec2(9.0, -17.0)) +
		get(vec2(9.0, -12.0)) +
		get(vec2(9.0, -7.0));

	int s4 =
		get(vec2(9.0, -6.0)) +
		get(vec2(9.0, -5.0)) +
		get(vec2(9.0, 5.0)) +
		get(vec2(9.0, 6.0)) +
		get(vec2(9.0, 7.0)) +
		get(vec2(9.0, 12.0)) +
		get(vec2(9.0, 17.0)) +
		get(vec2(10.0, -17.0)) +
		get(vec2(10.0, -11.0)) +
		get(vec2(10.0, -5.0)) +
		get(vec2(10.0, -4.0)) +
		get(vec2(10.0, -3.0)) +
		get(vec2(10.0, -2.0)) +
		get(vec2(10.0, 2.0)) +
		get(vec2(10.0, 3.0)) +
		get(vec2(10.0, 4.0)) +
		get(vec2(10.0, 5.0)) +
		get(vec2(10.0, 11.0)) +
		get(vec2(10.0, 17.0)) +
		get(vec2(11.0, -16.0)) +
		get(vec2(11.0, -10.0)) +
		get(vec2(11.0, -3.0)) +
		get(vec2(11.0, -2.0)) +
		get(vec2(11.0, -1.0)) +
		get(vec2(11.0, 0.0)) +
		get(vec2(11.0, 1.0)) +
		get(vec2(11.0, 2.0)) +
		get(vec2(11.0, 3.0)) +
		get(vec2(11.0, 10.0)) +
		get(vec2(11.0, 16.0)) +
		get(vec2(12.0, -16.0)) +
		get(vec2(12.0, -9.0)) +
		get(vec2(12.0, -8.0)) +
		get(vec2(12.0, 8.0)) +
		get(vec2(12.0, 9.0)) +
		get(vec2(12.0, 16.0)) +
		get(vec2(13.0, -15.0)) +
		get(vec2(13.0, -7.0)) +
		get(vec2(13.0, -6.0)) +
		get(vec2(13.0, 6.0)) +
		get(vec2(13.0, 7.0)) +
		get(vec2(13.0, 15.0)) +
		get(vec2(14.0, -14.0)) +
		get(vec2(14.0, -5.0)) +
		get(vec2(14.0, -4.0)) +
		get(vec2(14.0, -3.0)) +
		get(vec2(14.0, 3.0)) +
		get(vec2(14.0, 4.0)) +
		get(vec2(14.0, 5.0)) +
		get(vec2(14.0, 14.0)) +
		get(vec2(15.0, -13.0)) +
		get(vec2(15.0, -2.0)) +
		get(vec2(15.0, -1.0)) +
		get(vec2(15.0, 0.0)) +
		get(vec2(15.0, 1.0)) +
		get(vec2(15.0, 2.0)) +
		get(vec2(15.0, 13.0)) +
		get(vec2(16.0, -12.0)) +
		get(vec2(16.0, -11.0)) +
		get(vec2(16.0, 11.0)) +
		get(vec2(16.0, 12.0)) +
		get(vec2(17.0, -10.0)) +
		get(vec2(17.0, -9.0)) +
		get(vec2(17.0, 9.0)) +
		get(vec2(17.0, 10.0)) +
		get(vec2(18.0, -8.0)) +
		get(vec2(18.0, -7.0)) +
		get(vec2(18.0, -6.0)) +
		get(vec2(18.0, 6.0)) +
		get(vec2(18.0, 7.0)) +
		get(vec2(18.0, 8.0)) +
		get(vec2(19.0, -5.0)) +
		get(vec2(19.0, -4.0)) +
		get(vec2(19.0, -3.0)) +
		get(vec2(19.0, 3.0)) +
		get(vec2(19.0, 4.0)) +
		get(vec2(19.0, 5.0)) +
		get(vec2(20.0, -2.0)) +
		get(vec2(20.0, -1.0)) +
		get(vec2(20.0, 0.0)) +
		get(vec2(20.0, 1.0)) +
		get(vec2(20.0, 2.0));



	int sum_one = s1;
	int sum_two = s2 + s3 + s4;


	if(sum_one >= 29 && sum_one <= 34) 		{gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);}

	if(sum_one >= 16 && sum_one <= 26) 		{gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}



	if(sum_two >= 100 && sum_two <= 103) 	{gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);}

	if(sum_two >= 70 && sum_two <= 75) 		{gl_FragColor = vec4(0.0, 1.0, 1.0, 1.0);}
	if(sum_two >= 105 && sum_two <= 135) 	{gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);}
	if(sum_two >= 219) 						{gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);}



}
