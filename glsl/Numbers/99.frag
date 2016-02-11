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

bool isFilled(vec2 offset) {
	
	if(
		(texture2D(state, (gl_FragCoord.xy + offset) / scale).r) +
		(texture2D(state, (gl_FragCoord.xy + offset) / scale).g) +
		(texture2D(state, (gl_FragCoord.xy + offset) / scale).b) > 0.0
	) {
		return true;
	} else { return false; }

}

void main() {

    float cR = getR(vec2(0.0, 0.0));
    float cG = getG(vec2(0.0, 0.0));
    float cB = getB(vec2(0.0, 0.0));
	
	//set to last frame's colour
    gl_FragColor = vec4(cR, cG, cB, 1.0);

	float colMult = 0.00;

	float sfR = (cR*colMult)+0.01;
	float sfG = (cG*colMult)+0.01;
	float sfB = (cB*colMult)+0.01;

	int sum_F = 0;

	float rLoss = 0.024;
	float gLoss = 0.024;
	float bLoss = 0.024;


	if(isFilled(vec2(0.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(0.0, -4.0)) *rLoss;
	sfG += getG(vec2(0.0, -4.0)) *gLoss;
	sfB += getB(vec2(0.0, -4.0)) *bLoss;
	if(isFilled(vec2(0.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(0.0, 4.0)) *rLoss;
	sfG += getG(vec2(0.0, 4.0)) *gLoss;
	sfB += getB(vec2(0.0, 4.0)) *bLoss;
	if(isFilled(vec2(0.0, -5.0))) {sum_F += 1;}
	sfR += getR(vec2(0.0, -5.0)) *rLoss;
	sfG += getG(vec2(0.0, -5.0)) *gLoss;
	sfB += getB(vec2(0.0, -5.0)) *bLoss;
	if(isFilled(vec2(0.0, 5.0))) {sum_F += 1;}
	sfR += getR(vec2(0.0, 5.0)) *rLoss;
	sfG += getG(vec2(0.0, 5.0)) *gLoss;
	sfB += getB(vec2(0.0, 5.0)) *bLoss;
	if(isFilled(vec2(0.0, -6.0))) {sum_F += 1;}
	sfR += getR(vec2(0.0, -6.0)) *rLoss;
	sfG += getG(vec2(0.0, -6.0)) *gLoss;
	sfB += getB(vec2(0.0, -6.0)) *bLoss;
	if(isFilled(vec2(0.0, 6.0))) {sum_F += 1;}
	sfR += getR(vec2(0.0, 6.0)) *rLoss;
	sfG += getG(vec2(0.0, 6.0)) *gLoss;
	sfB += getB(vec2(0.0, 6.0)) *bLoss;
	if(isFilled(vec2(-1.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(-1.0, -4.0)) *rLoss;
	sfG += getG(vec2(-1.0, -4.0)) *gLoss;
	sfB += getB(vec2(-1.0, -4.0)) *bLoss;
	if(isFilled(vec2(-1.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(-1.0, 4.0)) *rLoss;
	sfG += getG(vec2(-1.0, 4.0)) *gLoss;
	sfB += getB(vec2(-1.0, 4.0)) *bLoss;
	if(isFilled(vec2(1.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(1.0, -4.0)) *rLoss;
	sfG += getG(vec2(1.0, -4.0)) *gLoss;
	sfB += getB(vec2(1.0, -4.0)) *bLoss;
	if(isFilled(vec2(1.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(1.0, 4.0)) *rLoss;
	sfG += getG(vec2(1.0, 4.0)) *gLoss;
	sfB += getB(vec2(1.0, 4.0)) *bLoss;
	if(isFilled(vec2(-1.0, -5.0))) {sum_F += 1;}
	sfR += getR(vec2(-1.0, -5.0)) *rLoss;
	sfG += getG(vec2(-1.0, -5.0)) *gLoss;
	sfB += getB(vec2(-1.0, -5.0)) *bLoss;
	if(isFilled(vec2(-1.0, 5.0))) {sum_F += 1;}
	sfR += getR(vec2(-1.0, 5.0)) *rLoss;
	sfG += getG(vec2(-1.0, 5.0)) *gLoss;
	sfB += getB(vec2(-1.0, 5.0)) *bLoss;
	if(isFilled(vec2(1.0, -5.0))) {sum_F += 1;}
	sfR += getR(vec2(1.0, -5.0)) *rLoss;
	sfG += getG(vec2(1.0, -5.0)) *gLoss;
	sfB += getB(vec2(1.0, -5.0)) *bLoss;
	if(isFilled(vec2(1.0, 5.0))) {sum_F += 1;}
	sfR += getR(vec2(1.0, 5.0)) *rLoss;
	sfG += getG(vec2(1.0, 5.0)) *gLoss;
	sfB += getB(vec2(1.0, 5.0)) *bLoss;
	if(isFilled(vec2(-1.0, -6.0))) {sum_F += 1;}
	sfR += getR(vec2(-1.0, -6.0)) *rLoss;
	sfG += getG(vec2(-1.0, -6.0)) *gLoss;
	sfB += getB(vec2(-1.0, -6.0)) *bLoss;
	if(isFilled(vec2(-1.0, 6.0))) {sum_F += 1;}
	sfR += getR(vec2(-1.0, 6.0)) *rLoss;
	sfG += getG(vec2(-1.0, 6.0)) *gLoss;
	sfB += getB(vec2(-1.0, 6.0)) *bLoss;
	if(isFilled(vec2(1.0, -6.0))) {sum_F += 1;}
	sfR += getR(vec2(1.0, -6.0)) *rLoss;
	sfG += getG(vec2(1.0, -6.0)) *gLoss;
	sfB += getB(vec2(1.0, -6.0)) *bLoss;
	if(isFilled(vec2(1.0, 6.0))) {sum_F += 1;}
	sfR += getR(vec2(1.0, 6.0)) *rLoss;
	sfG += getG(vec2(1.0, 6.0)) *gLoss;
	sfB += getB(vec2(1.0, 6.0)) *bLoss;
	if(isFilled(vec2(-2.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(-2.0, -3.0)) *rLoss;
	sfG += getG(vec2(-2.0, -3.0)) *gLoss;
	sfB += getB(vec2(-2.0, -3.0)) *bLoss;
	if(isFilled(vec2(-2.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(-2.0, 3.0)) *rLoss;
	sfG += getG(vec2(-2.0, 3.0)) *gLoss;
	sfB += getB(vec2(-2.0, 3.0)) *bLoss;
	if(isFilled(vec2(2.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(2.0, -3.0)) *rLoss;
	sfG += getG(vec2(2.0, -3.0)) *gLoss;
	sfB += getB(vec2(2.0, -3.0)) *bLoss;
	if(isFilled(vec2(2.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(2.0, 3.0)) *rLoss;
	sfG += getG(vec2(2.0, 3.0)) *gLoss;
	sfB += getB(vec2(2.0, 3.0)) *bLoss;
	if(isFilled(vec2(-2.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(-2.0, -4.0)) *rLoss;
	sfG += getG(vec2(-2.0, -4.0)) *gLoss;
	sfB += getB(vec2(-2.0, -4.0)) *bLoss;
	if(isFilled(vec2(-2.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(-2.0, 4.0)) *rLoss;
	sfG += getG(vec2(-2.0, 4.0)) *gLoss;
	sfB += getB(vec2(-2.0, 4.0)) *bLoss;
	if(isFilled(vec2(2.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(2.0, -4.0)) *rLoss;
	sfG += getG(vec2(2.0, -4.0)) *gLoss;
	sfB += getB(vec2(2.0, -4.0)) *bLoss;
	if(isFilled(vec2(2.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(2.0, 4.0)) *rLoss;
	sfG += getG(vec2(2.0, 4.0)) *gLoss;
	sfB += getB(vec2(2.0, 4.0)) *bLoss;
	if(isFilled(vec2(-2.0, -5.0))) {sum_F += 1;}
	sfR += getR(vec2(-2.0, -5.0)) *rLoss;
	sfG += getG(vec2(-2.0, -5.0)) *gLoss;
	sfB += getB(vec2(-2.0, -5.0)) *bLoss;
	if(isFilled(vec2(-2.0, 5.0))) {sum_F += 1;}
	sfR += getR(vec2(-2.0, 5.0)) *rLoss;
	sfG += getG(vec2(-2.0, 5.0)) *gLoss;
	sfB += getB(vec2(-2.0, 5.0)) *bLoss;
	if(isFilled(vec2(2.0, -5.0))) {sum_F += 1;}
	sfR += getR(vec2(2.0, -5.0)) *rLoss;
	sfG += getG(vec2(2.0, -5.0)) *gLoss;
	sfB += getB(vec2(2.0, -5.0)) *bLoss;
	if(isFilled(vec2(2.0, 5.0))) {sum_F += 1;}
	sfR += getR(vec2(2.0, 5.0)) *rLoss;
	sfG += getG(vec2(2.0, 5.0)) *gLoss;
	sfB += getB(vec2(2.0, 5.0)) *bLoss;
	if(isFilled(vec2(-3.0, -2.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, -2.0)) *rLoss;
	sfG += getG(vec2(-3.0, -2.0)) *gLoss;
	sfB += getB(vec2(-3.0, -2.0)) *bLoss;
	if(isFilled(vec2(-3.0, 2.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, 2.0)) *rLoss;
	sfG += getG(vec2(-3.0, 2.0)) *gLoss;
	sfB += getB(vec2(-3.0, 2.0)) *bLoss;
	if(isFilled(vec2(3.0, -2.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, -2.0)) *rLoss;
	sfG += getG(vec2(3.0, -2.0)) *gLoss;
	sfB += getB(vec2(3.0, -2.0)) *bLoss;
	if(isFilled(vec2(3.0, 2.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, 2.0)) *rLoss;
	sfG += getG(vec2(3.0, 2.0)) *gLoss;
	sfB += getB(vec2(3.0, 2.0)) *bLoss;
	if(isFilled(vec2(-3.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, -3.0)) *rLoss;
	sfG += getG(vec2(-3.0, -3.0)) *gLoss;
	sfB += getB(vec2(-3.0, -3.0)) *bLoss;
	if(isFilled(vec2(-3.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, 3.0)) *rLoss;
	sfG += getG(vec2(-3.0, 3.0)) *gLoss;
	sfB += getB(vec2(-3.0, 3.0)) *bLoss;
	if(isFilled(vec2(3.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, -3.0)) *rLoss;
	sfG += getG(vec2(3.0, -3.0)) *gLoss;
	sfB += getB(vec2(3.0, -3.0)) *bLoss;
	if(isFilled(vec2(3.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, 3.0)) *rLoss;
	sfG += getG(vec2(3.0, 3.0)) *gLoss;
	sfB += getB(vec2(3.0, 3.0)) *bLoss;
	if(isFilled(vec2(-3.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, -4.0)) *rLoss;
	sfG += getG(vec2(-3.0, -4.0)) *gLoss;
	sfB += getB(vec2(-3.0, -4.0)) *bLoss;
	if(isFilled(vec2(-3.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, 4.0)) *rLoss;
	sfG += getG(vec2(-3.0, 4.0)) *gLoss;
	sfB += getB(vec2(-3.0, 4.0)) *bLoss;
	if(isFilled(vec2(3.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, -4.0)) *rLoss;
	sfG += getG(vec2(3.0, -4.0)) *gLoss;
	sfB += getB(vec2(3.0, -4.0)) *bLoss;
	if(isFilled(vec2(3.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, 4.0)) *rLoss;
	sfG += getG(vec2(3.0, 4.0)) *gLoss;
	sfB += getB(vec2(3.0, 4.0)) *bLoss;
	if(isFilled(vec2(-3.0, -5.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, -5.0)) *rLoss;
	sfG += getG(vec2(-3.0, -5.0)) *gLoss;
	sfB += getB(vec2(-3.0, -5.0)) *bLoss;
	if(isFilled(vec2(-3.0, 5.0))) {sum_F += 1;}
	sfR += getR(vec2(-3.0, 5.0)) *rLoss;
	sfG += getG(vec2(-3.0, 5.0)) *gLoss;
	sfB += getB(vec2(-3.0, 5.0)) *bLoss;
	if(isFilled(vec2(3.0, -5.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, -5.0)) *rLoss;
	sfG += getG(vec2(3.0, -5.0)) *gLoss;
	sfB += getB(vec2(3.0, -5.0)) *bLoss;
	if(isFilled(vec2(3.0, 5.0))) {sum_F += 1;}
	sfR += getR(vec2(3.0, 5.0)) *rLoss;
	sfG += getG(vec2(3.0, 5.0)) *gLoss;
	sfB += getB(vec2(3.0, 5.0)) *bLoss;
	if(isFilled(vec2(-4.0, 0.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, 0.0)) *rLoss;
	sfG += getG(vec2(-4.0, 0.0)) *gLoss;
	sfB += getB(vec2(-4.0, 0.0)) *bLoss;
	if(isFilled(vec2(4.0, 0.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, 0.0)) *rLoss;
	sfG += getG(vec2(4.0, 0.0)) *gLoss;
	sfB += getB(vec2(4.0, 0.0)) *bLoss;
	if(isFilled(vec2(-4.0, -1.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, -1.0)) *rLoss;
	sfG += getG(vec2(-4.0, -1.0)) *gLoss;
	sfB += getB(vec2(-4.0, -1.0)) *bLoss;
	if(isFilled(vec2(-4.0, 1.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, 1.0)) *rLoss;
	sfG += getG(vec2(-4.0, 1.0)) *gLoss;
	sfB += getB(vec2(-4.0, 1.0)) *bLoss;
	if(isFilled(vec2(4.0, -1.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, -1.0)) *rLoss;
	sfG += getG(vec2(4.0, -1.0)) *gLoss;
	sfB += getB(vec2(4.0, -1.0)) *bLoss;
	if(isFilled(vec2(4.0, 1.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, 1.0)) *rLoss;
	sfG += getG(vec2(4.0, 1.0)) *gLoss;
	sfB += getB(vec2(4.0, 1.0)) *bLoss;
	if(isFilled(vec2(-4.0, -2.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, -2.0)) *rLoss;
	sfG += getG(vec2(-4.0, -2.0)) *gLoss;
	sfB += getB(vec2(-4.0, -2.0)) *bLoss;
	if(isFilled(vec2(-4.0, 2.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, 2.0)) *rLoss;
	sfG += getG(vec2(-4.0, 2.0)) *gLoss;
	sfB += getB(vec2(-4.0, 2.0)) *bLoss;
	if(isFilled(vec2(4.0, -2.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, -2.0)) *rLoss;
	sfG += getG(vec2(4.0, -2.0)) *gLoss;
	sfB += getB(vec2(4.0, -2.0)) *bLoss;
	if(isFilled(vec2(4.0, 2.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, 2.0)) *rLoss;
	sfG += getG(vec2(4.0, 2.0)) *gLoss;
	sfB += getB(vec2(4.0, 2.0)) *bLoss;
	if(isFilled(vec2(-4.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, -3.0)) *rLoss;
	sfG += getG(vec2(-4.0, -3.0)) *gLoss;
	sfB += getB(vec2(-4.0, -3.0)) *bLoss;
	if(isFilled(vec2(-4.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, 3.0)) *rLoss;
	sfG += getG(vec2(-4.0, 3.0)) *gLoss;
	sfB += getB(vec2(-4.0, 3.0)) *bLoss;
	if(isFilled(vec2(4.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, -3.0)) *rLoss;
	sfG += getG(vec2(4.0, -3.0)) *gLoss;
	sfB += getB(vec2(4.0, -3.0)) *bLoss;
	if(isFilled(vec2(4.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, 3.0)) *rLoss;
	sfG += getG(vec2(4.0, 3.0)) *gLoss;
	sfB += getB(vec2(4.0, 3.0)) *bLoss;
	if(isFilled(vec2(-4.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, -4.0)) *rLoss;
	sfG += getG(vec2(-4.0, -4.0)) *gLoss;
	sfB += getB(vec2(-4.0, -4.0)) *bLoss;
	if(isFilled(vec2(-4.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(-4.0, 4.0)) *rLoss;
	sfG += getG(vec2(-4.0, 4.0)) *gLoss;
	sfB += getB(vec2(-4.0, 4.0)) *bLoss;
	if(isFilled(vec2(4.0, -4.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, -4.0)) *rLoss;
	sfG += getG(vec2(4.0, -4.0)) *gLoss;
	sfB += getB(vec2(4.0, -4.0)) *bLoss;
	if(isFilled(vec2(4.0, 4.0))) {sum_F += 1;}
	sfR += getR(vec2(4.0, 4.0)) *rLoss;
	sfG += getG(vec2(4.0, 4.0)) *gLoss;
	sfB += getB(vec2(4.0, 4.0)) *bLoss;
	if(isFilled(vec2(-5.0, 0.0))) {sum_F += 1;}
	sfR += getR(vec2(-5.0, 0.0)) *rLoss;
	sfG += getG(vec2(-5.0, 0.0)) *gLoss;
	sfB += getB(vec2(-5.0, 0.0)) *bLoss;
	if(isFilled(vec2(5.0, 0.0))) {sum_F += 1;}
	sfR += getR(vec2(5.0, 0.0)) *rLoss;
	sfG += getG(vec2(5.0, 0.0)) *gLoss;
	sfB += getB(vec2(5.0, 0.0)) *bLoss;
	if(isFilled(vec2(-5.0, -1.0))) {sum_F += 1;}
	sfR += getR(vec2(-5.0, -1.0)) *rLoss;
	sfG += getG(vec2(-5.0, -1.0)) *gLoss;
	sfB += getB(vec2(-5.0, -1.0)) *bLoss;
	if(isFilled(vec2(-5.0, 1.0))) {sum_F += 1;}
	sfR += getR(vec2(-5.0, 1.0)) *rLoss;
	sfG += getG(vec2(-5.0, 1.0)) *gLoss;
	sfB += getB(vec2(-5.0, 1.0)) *bLoss;
	if(isFilled(vec2(5.0, -1.0))) {sum_F += 1;}
	sfR += getR(vec2(5.0, -1.0)) *rLoss;
	sfG += getG(vec2(5.0, -1.0)) *gLoss;
	sfB += getB(vec2(5.0, -1.0)) *bLoss;
	if(isFilled(vec2(5.0, 1.0))) {sum_F += 1;}
	sfR += getR(vec2(5.0, 1.0)) *rLoss;
	sfG += getG(vec2(5.0, 1.0)) *gLoss;
	sfB += getB(vec2(5.0, 1.0)) *bLoss;
	if(isFilled(vec2(-5.0, -2.0))) {sum_F += 1;}
	sfR += getR(vec2(-5.0, -2.0)) *rLoss;
	sfG += getG(vec2(-5.0, -2.0)) *gLoss;
	sfB += getB(vec2(-5.0, -2.0)) *bLoss;
	if(isFilled(vec2(-5.0, 2.0))) {sum_F += 1;}
	sfR += getR(vec2(-5.0, 2.0)) *rLoss;
	sfG += getG(vec2(-5.0, 2.0)) *gLoss;
	sfB += getB(vec2(-5.0, 2.0)) *bLoss;
	if(isFilled(vec2(5.0, -2.0))) {sum_F += 1;}
	sfR += getR(vec2(5.0, -2.0)) *rLoss;
	sfG += getG(vec2(5.0, -2.0)) *gLoss;
	sfB += getB(vec2(5.0, -2.0)) *bLoss;
	if(isFilled(vec2(5.0, 2.0))) {sum_F += 1;}
	sfR += getR(vec2(5.0, 2.0)) *rLoss;
	sfG += getG(vec2(5.0, 2.0)) *gLoss;
	sfB += getB(vec2(5.0, 2.0)) *bLoss;
	if(isFilled(vec2(-5.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(-5.0, -3.0)) *rLoss;
	sfG += getG(vec2(-5.0, -3.0)) *gLoss;
	sfB += getB(vec2(-5.0, -3.0)) *bLoss;
	if(isFilled(vec2(-5.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(-5.0, 3.0)) *rLoss;
	sfG += getG(vec2(-5.0, 3.0)) *gLoss;
	sfB += getB(vec2(-5.0, 3.0)) *bLoss;
	if(isFilled(vec2(5.0, -3.0))) {sum_F += 1;}
	sfR += getR(vec2(5.0, -3.0)) *rLoss;
	sfG += getG(vec2(5.0, -3.0)) *gLoss;
	sfB += getB(vec2(5.0, -3.0)) *bLoss;
	if(isFilled(vec2(5.0, 3.0))) {sum_F += 1;}
	sfR += getR(vec2(5.0, 3.0)) *rLoss;
	sfG += getG(vec2(5.0, 3.0)) *gLoss;
	sfB += getB(vec2(5.0, 3.0)) *bLoss;
	if(isFilled(vec2(-6.0, 0.0))) {sum_F += 1;}
	sfR += getR(vec2(-6.0, 0.0)) *rLoss;
	sfG += getG(vec2(-6.0, 0.0)) *gLoss;
	sfB += getB(vec2(-6.0, 0.0)) *bLoss;
	if(isFilled(vec2(6.0, 0.0))) {sum_F += 1;}
	sfR += getR(vec2(6.0, 0.0)) *rLoss;
	sfG += getG(vec2(6.0, 0.0)) *gLoss;
	sfB += getB(vec2(6.0, 0.0)) *bLoss;
	if(isFilled(vec2(-6.0, -1.0))) {sum_F += 1;}
	sfR += getR(vec2(-6.0, -1.0)) *rLoss;
	sfG += getG(vec2(-6.0, -1.0)) *gLoss;
	sfB += getB(vec2(-6.0, -1.0)) *bLoss;
	if(isFilled(vec2(-6.0, 1.0))) {sum_F += 1;}
	sfR += getR(vec2(-6.0, 1.0)) *rLoss;
	sfG += getG(vec2(-6.0, 1.0)) *gLoss;
	sfB += getB(vec2(-6.0, 1.0)) *bLoss;
	if(isFilled(vec2(6.0, -1.0))) {sum_F += 1;}
	sfR += getR(vec2(6.0, -1.0)) *rLoss;
	sfG += getG(vec2(6.0, -1.0)) *gLoss;
	sfB += getB(vec2(6.0, -1.0)) *bLoss;
	if(isFilled(vec2(6.0, 1.0))) {sum_F += 1;}
	sfR += getR(vec2(6.0, 1.0))*rLoss;
	sfG += getG(vec2(6.0, 1.0))*gLoss;
	sfB += getB(vec2(6.0, 1.0))*bLoss;

	float halfAt = 0.51;//0.50;
	float halfGrowth = 0.05;//0.22;
	float minGrowthVal = 0.09;//0.05;

	if(sfR > 0.0) { sfR += minGrowthVal; }
	if(sfG > 0.0) { sfG += minGrowthVal; }
	if(sfB > 0.0) { sfB += minGrowthVal; }

	float modR = 0.0;
	float modG = 0.0;
	float modB = 0.0;

	if(sfR > (sfG+sfB)*halfAt) { modR += halfGrowth; }
	if(sfG > (sfR+sfB)*halfAt) { modG += halfGrowth; }
	if(sfB > (sfR+sfG)*halfAt) { modB += halfGrowth; }

	sfR += modR;
	sfG += modG;
	sfB += modB;

	if(sum_F >= 44) 					{cR = 0.0; cG = 0.0; cB = 0.0;}
	if(sum_F >= 30 && sum_F <= 41)      {cR = sfR; cG = sfG; cB = sfB;}
	if(sum_F >= 0 && sum_F <= 22) 		{cR = 0.0; cG = 0.0; cB = 0.0;}
	if(sum_F >= 19 && sum_F <= 22) 		{cR = 0.0; cG = 0.0; cB = 0.0;}
	if(sum_F >= 44 && sum_F <= 46) 		{cR = 0.0; cG = 0.0; cB = 0.0;}

    gl_FragColor = vec4(cR, cG, cB, 1.0);

}
