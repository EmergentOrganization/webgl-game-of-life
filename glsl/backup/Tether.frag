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

    int s3 =
        get(vec2(-3.0, -1.0)) +
        get(vec2(-3.0, 0.0)) +
        get(vec2(-3.0, 1.0)) +
        get(vec2(-2.0, -2.0)) +
        get(vec2(-2.0, 2.0)) +
        get(vec2(-1.0, -3.0)) +
        get(vec2(-1.0, -1.0)) +
        get(vec2(-1.0, 0.0)) +
        get(vec2(-1.0, 1.0)) +
        get(vec2(-1.0, 3.0)) +
        get(vec2(0.0, -3.0)) +
        get(vec2(0.0, -1.0)) +
        get(vec2(0.0, 1.0)) +
        get(vec2(0.0, 3.0)) +
        get(vec2(1.0, -3.0)) +
        get(vec2(1.0, -1.0)) +
        get(vec2(1.0, 0.0)) +
        get(vec2(1.0, 1.0)) +
        get(vec2(1.0, 3.0)) +
        get(vec2(2.0, -2.0)) +
        get(vec2(2.0, 2.0)) +
        get(vec2(3.0, -1.0)) +
        get(vec2(3.0, 0.0)) +
        get(vec2(3.0, 1.0));



    int sum_one = s1 + s2;
    int sum_two = s3;


    if(sum_one >= 31)         				{gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);}
    if(sum_one >= 40 && sum_one <= 42)      {gl_FragColor = vec4(1.0, 0.8, 1.0, 1.0);}

    if(sum_two >= 13 && sum_two <= 19)      {gl_FragColor = vec4(1.0, 0.2, 0.0, 1.0);}    
    if(sum_two >= 9 && sum_two <= 9)        {gl_FragColor = vec4(1.0, 0.7, 0.0, 1.0);}  


}
