precision mediump float;

uniform sampler2D state;
uniform vec2 scale;

uniform float birth1;
uniform float birth1R;
uniform float birth2;
uniform float birth2R;
uniform float birth3;
uniform float birth3R;
uniform float birth4;
uniform float birth4R;

uniform float death1;
uniform float death1R;
uniform float death2;
uniform float death2R;
uniform float death3;
uniform float death3R;
uniform float death4;
uniform float death4R;


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

    float cR_fin = cR;
    float cG_fin = cG;
    float cB_fin = cB;


    float cR_moore = 
	getR(vec2(-1.0, -1.0)) +
    getR(vec2(-1.0,  0.0)) +
    getR(vec2(-1.0,  1.0)) +
    getR(vec2( 0.0, -1.0)) +
    getR(vec2( 0.0,  1.0)) +
    getR(vec2( 1.0, -1.0)) +
    getR(vec2( 1.0,  0.0)) +
    getR(vec2( 1.0,  1.0));

    float cG_moore = 
	getG(vec2(-1.0, -1.0)) +
    getG(vec2(-1.0,  0.0)) +
    getG(vec2(-1.0,  1.0)) +
    getG(vec2( 0.0, -1.0)) +
    getG(vec2( 0.0,  1.0)) +
    getG(vec2( 1.0, -1.0)) +
    getG(vec2( 1.0,  0.0)) +
    getG(vec2( 1.0,  1.0));

    float cB_moore = 
	getB(vec2(-1.0, -1.0)) +
    getB(vec2(-1.0,  0.0)) +
    getB(vec2(-1.0,  1.0)) +
    getB(vec2( 0.0, -1.0)) +
    getB(vec2( 0.0,  1.0)) +
    getB(vec2( 1.0, -1.0)) +
    getB(vec2( 1.0,  0.0)) +
    getB(vec2( 1.0,  1.0));




    float cR_neu =
    getR(vec2(-1.0,  0.0)) +
    getR(vec2( 0.0, -1.0)) +
    getR(vec2( 0.0,  1.0)) +
    getR(vec2( 1.0,  0.0));

    float cG_neu =
    getG(vec2(-1.0,  0.0)) +
    getG(vec2( 0.0, -1.0)) +
    getG(vec2( 0.0,  1.0)) +
    getG(vec2( 1.0,  0.0));

    float cB_neu =
    getB(vec2(-1.0,  0.0)) +
    getB(vec2( 0.0, -1.0)) +
    getB(vec2( 0.0,  1.0)) +
    getB(vec2( 1.0,  0.0));


    float cR_neu_cent =
	getR(vec2(0.0, 0.0)) +
	getR(vec2(0.0, 0.0)) +
	getR(vec2(0.0, 0.0)) +
	getR(vec2(0.0, 0.0)) +
    getR(vec2(-1.0,  0.0)) +
    getR(vec2( 0.0, -1.0)) +
    getR(vec2( 0.0,  1.0)) +
    getR(vec2( 1.0,  0.0));

    float cG_neu_cent =
	getG(vec2(0.0, 0.0)) +
	getG(vec2(0.0, 0.0)) +
	getG(vec2(0.0, 0.0)) +
	getG(vec2(0.0, 0.0)) +
    getG(vec2(-1.0,  0.0)) +
    getG(vec2( 0.0, -1.0)) +
    getG(vec2( 0.0,  1.0)) +
    getG(vec2( 1.0,  0.0));

    float cB_neu_cent =
	getB(vec2(0.0, 0.0)) +
	getB(vec2(0.0, 0.0)) +
	getB(vec2(0.0, 0.0)) +
	getB(vec2(0.0, 0.0)) +
    getB(vec2(-1.0,  0.0)) +
    getB(vec2( 0.0, -1.0)) +
    getB(vec2( 0.0,  1.0)) +
    getB(vec2( 1.0,  0.0));


    float cR_moore_cent = 
	getR(vec2(0.0, 0.0)) +
	getR(vec2(0.0, 0.0)) +
	getR(vec2(0.0, 0.0)) +
	getR(vec2(0.0, 0.0)) +

    getR(vec2( 1.0,  0.0)) +
    getR(vec2(-1.0,  0.0)) +
    getR(vec2( 0.0, -1.0)) +
    getR(vec2( 0.0,  1.0)) +
    getR(vec2( 1.0,  0.0)) +
    getR(vec2(-1.0,  0.0)) +
    getR(vec2( 0.0, -1.0)) +
    getR(vec2( 0.0,  1.0)) +

    getR(vec2( 2.0,  0.0)) +
    getR(vec2(-2.0,  0.0)) +
    getR(vec2( 0.0, -2.0)) +
    getR(vec2( 0.0,  2.0)) +

    getR(vec2( 1.0, -1.0)) +
    getR(vec2(-1.0,  1.0)) +
	getR(vec2(-1.0, -1.0)) +
    getR(vec2( 1.0,  1.0));



    float cG_moore_cent = 
	getG(vec2(0.0, 0.0)) +
	getG(vec2(0.0, 0.0)) +
	getG(vec2(0.0, 0.0)) +
	getG(vec2(0.0, 0.0)) +

    getG(vec2( 1.0,  0.0)) +
    getG(vec2(-1.0,  0.0)) +
    getG(vec2( 0.0, -1.0)) +
    getG(vec2( 0.0,  1.0)) +
    getG(vec2( 1.0,  0.0)) +
    getG(vec2(-1.0,  0.0)) +
    getG(vec2( 0.0, -1.0)) +
    getG(vec2( 0.0,  1.0)) +

    getG(vec2( 2.0,  0.0)) +
    getG(vec2(-2.0,  0.0)) +
    getG(vec2( 0.0, -2.0)) +
    getG(vec2( 0.0,  2.0)) +

    getG(vec2( 1.0, -1.0)) +
    getG(vec2(-1.0,  1.0)) +
	getG(vec2(-1.0, -1.0)) +
    getG(vec2( 1.0,  1.0));



    float cB_moore_cent = 
	getB(vec2(0.0, 0.0)) +
	getB(vec2(0.0, 0.0)) +
	getB(vec2(0.0, 0.0)) +
	getB(vec2(0.0, 0.0)) +

    getB(vec2( 1.0,  0.0)) +
    getB(vec2(-1.0,  0.0)) +
    getB(vec2( 0.0, -1.0)) +
    getB(vec2( 0.0,  1.0)) +
    getB(vec2( 1.0,  0.0)) +
    getB(vec2(-1.0,  0.0)) +
    getB(vec2( 0.0, -1.0)) +
    getB(vec2( 0.0,  1.0)) +

    getB(vec2( 2.0,  0.0)) +
    getB(vec2(-2.0,  0.0)) +
    getB(vec2( 0.0, -2.0)) +
    getB(vec2( 0.0,  2.0)) +

    getB(vec2( 1.0, -1.0)) +
    getB(vec2(-1.0,  1.0)) +
	getB(vec2(-1.0, -1.0)) +
    getB(vec2( 1.0,  1.0));



	float cRt = getR(vec2(-7.0, -3.0)) +
		getR(vec2(-7.0, 0.0)) +
		getR(vec2(-7.0, 3.0)) +
		getR(vec2(-5.0, -5.0)) +
		getR(vec2(-5.0, -2.0)) +
		getR(vec2(-5.0, -1.0)) +
		getR(vec2(-5.0, 0.0)) +
		getR(vec2(-5.0, 1.0)) +
		getR(vec2(-5.0, 2.0)) +
		getR(vec2(-5.0, 5.0)) +
		getR(vec2(-4.0, -3.0)) +
		getR(vec2(-4.0, 3.0)) +
		getR(vec2(-3.0, -7.0)) +
		getR(vec2(-3.0, -4.0)) +
		getR(vec2(-3.0, 4.0)) +
		getR(vec2(-3.0, 7.0)) +
		getR(vec2(-2.0, -5.0)) +
		getR(vec2(-2.0, -1.0)) +
		getR(vec2(-2.0, 0.0)) +
		getR(vec2(-2.0, 1.0)) +
		getR(vec2(-2.0, 5.0)) +
		getR(vec2(-1.0, -5.0)) +
		getR(vec2(-1.0, -2.0)) +
		getR(vec2(-1.0, -1.0)) +
		getR(vec2(-1.0, 0.0)) +
		getR(vec2(-1.0, 1.0)) +
		getR(vec2(-1.0, 2.0)) +
		getR(vec2(-1.0, 5.0)) +
		getR(vec2(0.0, -7.0)) +
		getR(vec2(0.0, -5.0)) +
		getR(vec2(0.0, -2.0)) +
		getR(vec2(0.0, -1.0)) +
		getR(vec2(0.0, 1.0)) +
		getR(vec2(0.0, 2.0)) +
		getR(vec2(0.0, 5.0)) +
		getR(vec2(0.0, 7.0)) +
		getR(vec2(1.0, -5.0)) +
		getR(vec2(1.0, -2.0)) +
		getR(vec2(1.0, -1.0)) +
		getR(vec2(1.0, 0.0)) +
		getR(vec2(1.0, 1.0)) +
		getR(vec2(1.0, 2.0)) +
		getR(vec2(1.0, 5.0)) +
		getR(vec2(2.0, -5.0)) +
		getR(vec2(2.0, -1.0)) +
		getR(vec2(2.0, 0.0)) +
		getR(vec2(2.0, 1.0)) +
		getR(vec2(2.0, 5.0)) +
		getR(vec2(3.0, -7.0)) +
		getR(vec2(3.0, -4.0)) +
		getR(vec2(3.0, 4.0)) +
		getR(vec2(3.0, 7.0)) +
		getR(vec2(4.0, -3.0)) +
		getR(vec2(4.0, 3.0)) +
		getR(vec2(5.0, -5.0)) +
		getR(vec2(5.0, -2.0)) +
		getR(vec2(5.0, -1.0)) +
		getR(vec2(5.0, 0.0)) +
		getR(vec2(5.0, 1.0)) +
		getR(vec2(5.0, 2.0)) +
		getR(vec2(5.0, 5.0)) +
		getR(vec2(7.0, -3.0)) +
		getR(vec2(7.0, 0.0)) +
		getR(vec2(7.0, 3.0));

   float cGt = getG(vec2(-7.0, -3.0)) +
		getG(vec2(-7.0, 0.0)) +
		getG(vec2(-7.0, 3.0)) +
		getG(vec2(-5.0, -5.0)) +
		getG(vec2(-5.0, -2.0)) +
		getG(vec2(-5.0, -1.0)) +
		getG(vec2(-5.0, 0.0)) +
		getG(vec2(-5.0, 1.0)) +
		getG(vec2(-5.0, 2.0)) +
		getG(vec2(-5.0, 5.0)) +
		getG(vec2(-4.0, -3.0)) +
		getG(vec2(-4.0, 3.0)) +
		getG(vec2(-3.0, -7.0)) +
		getG(vec2(-3.0, -4.0)) +
		getG(vec2(-3.0, 4.0)) +
		getG(vec2(-3.0, 7.0)) +
		getG(vec2(-2.0, -5.0)) +
		getG(vec2(-2.0, -1.0)) +
		getG(vec2(-2.0, 0.0)) +
		getG(vec2(-2.0, 1.0)) +
		getG(vec2(-2.0, 5.0)) +
		getG(vec2(-1.0, -5.0)) +
		getG(vec2(-1.0, -2.0)) +
		getG(vec2(-1.0, -1.0)) +
		getG(vec2(-1.0, 0.0)) +
		getG(vec2(-1.0, 1.0)) +
		getG(vec2(-1.0, 2.0)) +
		getG(vec2(-1.0, 5.0)) +
		getG(vec2(0.0, -7.0)) +
		getG(vec2(0.0, -5.0)) +
		getG(vec2(0.0, -2.0)) +
		getG(vec2(0.0, -1.0)) +
		getG(vec2(0.0, 1.0)) +
		getG(vec2(0.0, 2.0)) +
		getG(vec2(0.0, 5.0)) +
		getG(vec2(0.0, 7.0)) +
		getG(vec2(1.0, -5.0)) +
		getG(vec2(1.0, -2.0)) +
		getG(vec2(1.0, -1.0)) +
		getG(vec2(1.0, 0.0)) +
		getG(vec2(1.0, 1.0)) +
		getG(vec2(1.0, 2.0)) +
		getG(vec2(1.0, 5.0)) +
		getG(vec2(2.0, -5.0)) +
		getG(vec2(2.0, -1.0)) +
		getG(vec2(2.0, 0.0)) +
		getG(vec2(2.0, 1.0)) +
		getG(vec2(2.0, 5.0)) +
		getG(vec2(3.0, -7.0)) +
		getG(vec2(3.0, -4.0)) +
		getG(vec2(3.0, 4.0)) +
		getG(vec2(3.0, 7.0)) +
		getG(vec2(4.0, -3.0)) +
		getG(vec2(4.0, 3.0)) +
		getG(vec2(5.0, -5.0)) +
		getG(vec2(5.0, -2.0)) +
		getG(vec2(5.0, -1.0)) +
		getG(vec2(5.0, 0.0)) +
		getG(vec2(5.0, 1.0)) +
		getG(vec2(5.0, 2.0)) +
		getG(vec2(5.0, 5.0)) +
		getG(vec2(7.0, -3.0)) +
		getG(vec2(7.0, 0.0)) +
		getG(vec2(7.0, 3.0));

   float cBt = getB(vec2(-7.0, -3.0)) +
		getB(vec2(-7.0, 0.0)) +
		getB(vec2(-7.0, 3.0)) +
		getB(vec2(-5.0, -5.0)) +
		getB(vec2(-5.0, -2.0)) +
		getB(vec2(-5.0, -1.0)) +
		getB(vec2(-5.0, 0.0)) +
		getB(vec2(-5.0, 1.0)) +
		getB(vec2(-5.0, 2.0)) +
		getB(vec2(-5.0, 5.0)) +
		getB(vec2(-4.0, -3.0)) +
		getB(vec2(-4.0, 3.0)) +
		getB(vec2(-3.0, -7.0)) +
		getB(vec2(-3.0, -4.0)) +
		getB(vec2(-3.0, 4.0)) +
		getB(vec2(-3.0, 7.0)) +
		getB(vec2(-2.0, -5.0)) +
		getB(vec2(-2.0, -1.0)) +
		getB(vec2(-2.0, 0.0)) +
		getB(vec2(-2.0, 1.0)) +
		getB(vec2(-2.0, 5.0)) +
		getB(vec2(-1.0, -5.0)) +
		getB(vec2(-1.0, -2.0)) +
		getB(vec2(-1.0, -1.0)) +
		getB(vec2(-1.0, 0.0)) +
		getB(vec2(-1.0, 1.0)) +
		getB(vec2(-1.0, 2.0)) +
		getB(vec2(-1.0, 5.0)) +
		getB(vec2(0.0, -7.0)) +
		getB(vec2(0.0, -5.0)) +
		getB(vec2(0.0, -2.0)) +
		getB(vec2(0.0, -1.0)) +
		getB(vec2(0.0, 1.0)) +
		getB(vec2(0.0, 2.0)) +
		getB(vec2(0.0, 5.0)) +
		getB(vec2(0.0, 7.0)) +
		getB(vec2(1.0, -5.0)) +
		getB(vec2(1.0, -2.0)) +
		getB(vec2(1.0, -1.0)) +
		getB(vec2(1.0, 0.0)) +
		getB(vec2(1.0, 1.0)) +
		getB(vec2(1.0, 2.0)) +
		getB(vec2(1.0, 5.0)) +
		getB(vec2(2.0, -5.0)) +
		getB(vec2(2.0, -1.0)) +
		getB(vec2(2.0, 0.0)) +
		getB(vec2(2.0, 1.0)) +
		getB(vec2(2.0, 5.0)) +
		getB(vec2(3.0, -7.0)) +
		getB(vec2(3.0, -4.0)) +
		getB(vec2(3.0, 4.0)) +
		getB(vec2(3.0, 7.0)) +
		getB(vec2(4.0, -3.0)) +
		getB(vec2(4.0, 3.0)) +
		getB(vec2(5.0, -5.0)) +
		getB(vec2(5.0, -2.0)) +
		getB(vec2(5.0, -1.0)) +
		getB(vec2(5.0, 0.0)) +
		getB(vec2(5.0, 1.0)) +
		getB(vec2(5.0, 2.0)) +
		getB(vec2(5.0, 5.0)) +
		getB(vec2(7.0, -3.0)) +
		getB(vec2(7.0, 0.0)) +
		getB(vec2(7.0, 3.0));


	if(birth1 == 1.0) {
		cR_fin = (cR_moore_cent / 20.0);
		cG_fin = (cG_moore_cent / 20.0);
		cB_fin = (cB_moore_cent / 20.0);
	}

	if(birth1 == 2.0) {
		cR_fin = ((cR_moore_cent/20.0)-cR)+0.5;
		cG_fin = ((cG_moore_cent/20.0)-cG)+0.5;
		cB_fin = ((cB_moore_cent/20.0)-cB)+0.5;

		/*if(cR_fin > 0.51) {cR_fin = cR;}
		if(cG_fin > 0.51) {cG_fin = cG;}
		if(cB_fin > 0.51) {cB_fin = cB;}
		if(cR_fin < 0.49) {cR_fin = cR;}
		if(cG_fin < 0.49) {cG_fin = cG;}
		if(cB_fin < 0.49) {cB_fin = cB;}*/
	}

	if(birth1 == 3.0) {
		cR_fin = ((cR_neu_cent/8.0)-cR)+0.5;
		cG_fin = ((cG_neu_cent/8.0)-cG)+0.5;
		cB_fin = ((cB_neu_cent/8.0)-cB)+0.5;
	}

	if(birth1 == 4.0) {
		cR_fin = ((cR_moore_cent/20.0)-cR)+0.5;
		cG_fin = ((cG_moore_cent/20.0)-cG)+0.5;
		cB_fin = ((cB_moore_cent/20.0)-cB)+0.5;

		if(cR_fin > 0.52 || cR_fin < 0.48) {cR_fin = cR;}
		if(cG_fin > 0.52 || cG_fin < 0.48) {cG_fin = cG;}
		if(cB_fin > 0.52 || cB_fin < 0.48) {cB_fin = cB;}
	}

	if(birth1 == 5.0) {
		cR_fin = ((cR_moore_cent/20.0)-cR)+0.5;
		cG_fin = ((cG_moore_cent/20.0)-cG)+0.5;
		cB_fin = ((cB_moore_cent/20.0)-cB)+0.5;

		float chanavg = (cR_fin+cG_fin+cB_fin) / 3.0;

		if(chanavg > 0.48 && chanavg < 0.52) {cR_fin = 0.0; cG_fin = 0.0; cB_fin = 0.0;} 
	}

	if(birth1 == 6.0) {
		cR_fin = (((cRt+cR*17.0)/80.0)-cR)+0.5;
		cG_fin = (((cGt+cG*17.0)/80.0)-cG)+0.5;
		cB_fin = (((cBt+cB*17.0)/80.0)-cB)+0.5;
	}

	if(birth1 == 7.0) {
		cR_fin = sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0));
		cG_fin = sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0));
		cB_fin = sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0));
	}

	if(birth1 == 8.0) {
		cR_fin = sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0));
		cG_fin = sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0));
		cB_fin = sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0));
	}

	if(birth1 == 9.0) {
		
		cB_fin = cG_fin = cR_fin = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
				  					sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
				  					sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

	}


	if(birth1 == 10.0) {
		cB_fin = cG_fin = cR_fin = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
									sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
									sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;
	}

	if(birth1 == 11.0) {

		float cAll1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
								   	sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
								   	sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		float cAll2 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
									sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
									sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		cB_fin = cG_fin = cR_fin = sqrt(cAll1 * cAll2);
	}


	if(birth1 == 12.0) {
		float cR_fin1 = sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0));
		float cG_fin1 = sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0));
		float cB_fin1 = sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0));

		if(cR_fin1 > 0.4 && cR_fin1 < 0.6) {cR_fin = 1.0;} else {cR_fin = 0.0;}
		if(cG_fin1 > 0.4 && cG_fin1 < 0.6) {cG_fin = 1.0;} else {cG_fin = 0.0;}
		if(cB_fin1 > 0.4 && cB_fin1 < 0.6) {cB_fin = 1.0;} else {cB_fin = 0.0;}
	}

	
	if(birth1 == 13.0) {
		
		float cR_fin1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		if(cR_fin1 > 0.2 && cR_fin1 < 0.8) {cB_fin = cG_fin = cR_fin = 0.0;} else {cB_fin = cG_fin = cR_fin = 1.0;}
	}
	
	if(birth1 == 14.0) {

		float cR_fin1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		cB_fin = cG_fin = cR_fin = 0.0;

		if(abs(cR_fin1-0.5) < 0.3) {

			cR_fin = 1.0-(abs(cR_fin1-0.5)*3.0);
			cG_fin = 1.0-(abs(cR_fin1-0.5)*3.0);
			cB_fin = 1.0-(abs(cR_fin1-0.5)*3.0);
		}
			

	}


	if(birth1 == 15.0) {

		float cR_fin1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		cB_fin = cG_fin = cR_fin = 0.0;

		/*if(abs(cR_fin1-0.5) < 0.05) 			{cB_fin = cG_fin = cR_fin = 1.0;}
		else */if(abs(cR_fin1-0.5) < 0.1) 		{cR_fin = 1.0;}
		else if(abs(cR_fin1-0.5) < 0.225) 		{cG_fin = 1.0;}
		else if(abs(cR_fin1-0.5) < 0.3) 		{cB_fin = 1.0;}

	}


	if(birth1 == 16.0) {
		
		float cR_fin1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		cB_fin = cG_fin = cR_fin = 0.0;

		if(abs(cR_fin1-0.5) < 0.3) {
			cR_fin = 1.0-(abs(cR_fin1-0.5)*2.0);
			cG_fin = 1.0-(abs(cR_fin1-0.5)*4.0);
			cB_fin = 1.0-(abs(cR_fin1-0.5)*8.0);
		}
			
	}

	if(birth1 == 17.0) {
		float cR_fin1 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		cB_fin = cG_fin = cR_fin = 0.0;

		if(abs(cR_fin1-0.5) < 0.3) {

			cR_fin = 1.0-(abs(cR_fin1-0.5)*3.0);
			cG_fin = 1.0-(abs(cR_fin1-0.5)*3.0);
			cB_fin = 1.0-(abs(cR_fin1-0.5)*3.0);
		}
			

	}


	if(birth1 == 18.0) {
		float cR_fin1 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		cB_fin = cG_fin = cR_fin = 0.0;

		/*if(abs(cR_fin1-0.5) < 0.05) 			{cB_fin = cG_fin = cR_fin = 1.0;}
		else*/ if(abs(cR_fin1-0.5) < 0.1) 		{cR_fin = 1.0;}
		else if(abs(cR_fin1-0.5) < 0.225) 		{cG_fin = 1.0;}
		else if(abs(cR_fin1-0.5) < 0.3) 		{cB_fin = 1.0;}

	}


	if(birth1 == 19.0) {
		
		float cR_fin1 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		cB_fin = cG_fin = cR_fin = 0.0;

		if(abs(cR_fin1-0.5) < 0.3) {
			cR_fin = 1.0-(abs(cR_fin1-0.5)*2.0);
			cG_fin = 1.0-(abs(cR_fin1-0.5)*4.0);
			cB_fin = 1.0-(abs(cR_fin1-0.5)*8.0);
		}
			
	}



	if(birth1 == 20.0) {
		cB_fin = cG_fin = cR_fin = 0.0;

		float cR_finA1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		float cR_fin1 = 0.0;
		float cG_fin1 = 0.0;
		float cB_fin1 = 0.0;

		if(abs(cR_finA1-0.5) < 0.1) 				{cR_fin1 = 1.0;}
		else if(abs(cR_finA1-0.5) < 0.175) 		{cG_fin1 = 1.0;}
		else if(abs(cR_finA1-0.5) < 0.25) 		{cB_fin1 = 1.0;}
			
		float cR_finA2 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		float cR_fin2 = 0.0;
		float cG_fin2 = 0.0;
		float cB_fin2 = 0.0;

		if(abs(cR_finA2-0.5) < 0.1) 				{cR_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.25) 		{cG_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.3) 		{cB_fin2 = 1.0;}

			
		float cR_finA3 = (sqrt(((((cR_neu_cent)/8.0)-cR)+1.0)+((((cR_neu_cent)/8.0)-cR)-1.0)) + 
						 sqrt(((((cG_neu_cent)/8.0)-cG)+1.0)+((((cG_neu_cent)/8.0)-cG)-1.0)) + 
						 sqrt(((((cB_neu_cent)/8.0)-cB)+1.0)+((((cB_neu_cent)/8.0)-cB)-1.0))) / 3.0;

		float cR_fin3 = 0.0;
		float cG_fin3 = 0.0;
		float cB_fin3 = 0.0;

		if(abs(cR_finA3-0.5) < 0.1) 			{cR_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.25) 		{cG_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.3) 		{cB_fin3 = 1.0;}

		cR_fin = (cR_fin1 + cR_fin2);
		cG_fin = (cG_fin1 + cG_fin2);
		//cB_fin = (cB_fin1 + cB_fin2);

		/*float cR_finf1 = (cR_fin1 + cR_fin2 + cR_fin3)/3.0;
		float cG_finf2 = (cG_fin1 + cG_fin2 + cG_fin3)/3.0;

		if((cR_finf1+cG_finf2)/2.0 > 0.2) {cB_fin = cG_fin = cR_fin = 1.0;}

		/*cR_fin = sqrt(cR_fin1*cR_fin1 + cR_fin2*cR_fin2);
		cG_fin = sqrt(cG_fin1*cG_fin1 + cG_fin2*cG_fin2);
		cB_fin = sqrt(cB_fin1*cB_fin1 + cB_fin2*cB_fin2);*/

		/*if(cR_fin < 1.0 || cG_fin < 1.0) {
			cR_fin = 0.0;
			cG_fin = 0.0;
		}*/

	}


	if(birth1 == 21.0) {
		cB_fin = cG_fin = cR_fin = 0.0;

		float cR_finA1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		float cR_fin1 = 0.0;
		float cG_fin1 = 0.0;
		float cB_fin1 = 0.0;

		if(abs(cR_finA1-0.5) < 0.1) 				{cR_fin1 = 1.0;}
		else if(abs(cR_finA1-0.5) < 0.175) 		{cG_fin1 = 1.0;}
		else if(abs(cR_finA1-0.5) < 0.25) 		{cB_fin1 = 1.0;}
			
		float cR_finA2 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		float cR_fin2 = 0.0;
		float cG_fin2 = 0.0;
		float cB_fin2 = 0.0;

		if(abs(cR_finA2-0.5) < 0.1) 				{cR_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.25) 		{cG_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.3) 		{cB_fin2 = 1.0;}

			
		float cR_finA3 = (sqrt(((((cR_neu_cent)/8.0)-cR)+1.0)+((((cR_neu_cent)/8.0)-cR)-1.0)) + 
						 sqrt(((((cG_neu_cent)/8.0)-cG)+1.0)+((((cG_neu_cent)/8.0)-cG)-1.0)) + 
						 sqrt(((((cB_neu_cent)/8.0)-cB)+1.0)+((((cB_neu_cent)/8.0)-cB)-1.0))) / 3.0;

		float cR_fin3 = 0.0;
		float cG_fin3 = 0.0;
		float cB_fin3 = 0.0;

		if(abs(cR_finA3-0.5) < 0.1) 			{cR_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.25) 		{cG_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.3) 		{cB_fin3 = 1.0;}

		cR_fin = (cR_fin1 + cR_fin2);
		cG_fin = (cG_fin1 + cG_fin2);
		//cB_fin = (cB_fin1 + cB_fin2);

		
		if(cR_fin >= 1.0 || cG_fin >= 1.0) {
			cB_fin = 1.0;
			cG_fin = 0.0;
			cR_fin = 1.0;
		} else {
			cR_fin = cR;
			cG_fin = cG;
			cB_fin = cB;
		 }

	}



	if(birth1 == 22.0) {
		
		float cR_fin1 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		cB_fin = cG_fin = cR_fin = 0.0;

		if(abs(cR_fin1-0.5) < 0.3) {
			cR_fin = cR;
			cG_fin = cG;
			cB_fin = cB;
		}
			
	}

	if(birth1 == 23.0) {
		cB_fin = cG_fin = cR_fin = 0.0;

		float cR_finA1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		float cR_fin1 = 0.0;
		float cG_fin1 = 0.0;
		float cB_fin1 = 0.0;

		if(abs(cR_finA1-0.5) < 0.1) 				{cR_fin1 = 1.0;}
		else if(abs(cR_finA1-0.5) < 0.175) 		{cG_fin1 = 1.0;}
		else if(abs(cR_finA1-0.5) < 0.25) 		{cB_fin1 = 1.0;}
			
		float cR_finA2 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		float cR_fin2 = 0.0;
		float cG_fin2 = 0.0;
		float cB_fin2 = 0.0;

		if(abs(cR_finA2-0.5) < 0.1) 				{cR_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.25) 		{cG_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.3) 		{cB_fin2 = 1.0;}

			
		float cR_finA3 = (sqrt(((((cR_neu_cent)/8.0)-cR)+1.0)+((((cR_neu_cent)/8.0)-cR)-1.0)) + 
						 sqrt(((((cG_neu_cent)/8.0)-cG)+1.0)+((((cG_neu_cent)/8.0)-cG)-1.0)) + 
						 sqrt(((((cB_neu_cent)/8.0)-cB)+1.0)+((((cB_neu_cent)/8.0)-cB)-1.0))) / 3.0;

		float cR_fin3 = 0.0;
		float cG_fin3 = 0.0;
		float cB_fin3 = 0.0;

		if(abs(cR_finA3-0.5) < 0.1) 			{cR_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.25) 		{cG_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.3) 		{cB_fin3 = 1.0;}

		cR_fin = (cR_fin1 + cR_fin2);
		cG_fin = (cG_fin1 + cG_fin2);
		//cB_fin = (cB_fin1 + cB_fin2);

		
		if(cR_fin >= 1.0 || cG_fin >= 1.0) {
			cB_fin = 0.32;
			cG_fin = 0.0;
			cR_fin = 0.32;
		} else {
			cR_fin = cR;
			cG_fin = cG;
			cB_fin = cB;
		 }

	}

	if(birth1 == 24.0) {
		cB_fin = cG_fin = cR_fin = 0.0;
			
		float cR_finA2 = (sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0)) + 
						 sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0)) + 
						 sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0))) / 3.0;

		float cR_fin2 = 0.0;
		float cG_fin2 = 0.0;
		float cB_fin2 = 0.0;

		if(abs(cR_finA2-0.5) < 0.1) 				{cR_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.25) 		{cG_fin2 = 1.0;}
		else if(abs(cR_finA2-0.5) < 0.3) 		{cB_fin2 = 1.0;}

			
		float cR_finA3 = (sqrt(((((cR_neu_cent)/8.0)-cR)+1.0)+((((cR_neu_cent)/8.0)-cR)-1.0)) + 
						 sqrt(((((cG_neu_cent)/8.0)-cG)+1.0)+((((cG_neu_cent)/8.0)-cG)-1.0)) + 
						 sqrt(((((cB_neu_cent)/8.0)-cB)+1.0)+((((cB_neu_cent)/8.0)-cB)-1.0))) / 3.0;

		float cR_fin3 = 0.0;
		float cG_fin3 = 0.0;
		float cB_fin3 = 0.0;

		if(abs(cR_finA3-0.5) < 0.1) 			{cR_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.25) 		{cG_fin3 = 1.0;}
		else if(abs(cR_finA3-0.5) < 0.3) 		{cB_fin3 = 1.0;}

		cR_fin = (cR_fin3 + cR_fin2);
		cG_fin = (cG_fin3 + cG_fin2);
		//cB_fin = (cB_fin1 + cB_fin2);

		
		if(cR_fin >= 1.0 || cG_fin >= 1.0) {
			cB_fin = 1.0;
			cG_fin = 0.0;
			cR_fin = 1.0;
		} else {
			cR_fin = cR;
			cG_fin = cG;
			cB_fin = cB;
		 }

	}


	if(birth1 == 25.0) {
		float cR_fin1 = sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0));
		float cG_fin1 = sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0));
		float cB_fin1 = sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0));

		cB_fin = cG_fin = cR_fin = 1.0;

		if(abs(cR_fin1-0.5) < 0.1) 			{cR_fin = 0.0;}
		else if(abs(cR_fin1-0.5) < 0.25) 	{cR_fin = 0.0;}
		else if(abs(cR_fin1-0.5) < 0.3) 	{cR_fin = 0.0;}
		else { 		
			//cR_fin = cR; 
			//cR_fin = (cR_moore_cent / 20.0);
			//cR_fin = ((cRt)/63.0);
		}

		if(abs(cG_fin1-0.5) < 0.1) 			{cG_fin = 0.0;}
		else if(abs(cG_fin1-0.5) < 0.25) 	{cG_fin = 0.0;}
		else if(abs(cG_fin1-0.5) < 0.3) 	{cG_fin = 0.0;}
		else { 
			//cG_fin = cG; 
			//cG_fin = (cG_moore_cent / 20.0);
			//cG_fin = ((cGt)/63.0);
		}

		if(abs(cB_fin1-0.5) < 0.1) 			{cB_fin = 0.0;}
		else if(abs(cB_fin1-0.5) < 0.25) 	{cB_fin = 0.0;}
		else if(abs(cB_fin1-0.5) < 0.3) 	{cB_fin = 0.0;}
		else { 		
			//cB_fin = cB; 
			//cB_fin = (cB_moore_cent / 20.0);
			//cB_fin = ((cBt)/63.0);
		}

		if(cB_fin == 0.0 || cG_fin == 0.0 || cR_fin == 0.0 ) {cB_fin = cG_fin = cR_fin = 0.0;} else {
			cR_fin = cR; 
			cG_fin = cG; 
			cB_fin = cB; 
		}
	}



	if(birth1 == 26.0) {
		cR_fin = sqrt(((((cR_moore_cent)/20.0)-cR)+1.0)+((((cR_moore_cent)/20.0)-cR)-1.0));
		cG_fin = sqrt(((((cG_moore_cent)/20.0)-cG)+1.0)+((((cG_moore_cent)/20.0)-cG)-1.0));
		cB_fin = sqrt(((((cB_moore_cent)/20.0)-cB)+1.0)+((((cB_moore_cent)/20.0)-cB)-1.0));

		float cAll_fin = 0.0;
		
		if(abs(cR_fin-0.5) < 0.1) 			{cAll_fin = 1.0;}
		else if(abs(cR_fin-0.5) < 0.25) 	{cAll_fin = 1.0;}
		else if(abs(cR_fin-0.5) < 0.3) 		{cAll_fin = 1.0;}

		if(abs(cG_fin-0.5) < 0.1) 			{cAll_fin = 1.0;}
		else if(abs(cG_fin-0.5) < 0.25) 	{cAll_fin = 1.0;}
		else if(abs(cG_fin-0.5) < 0.3) 		{cAll_fin = 1.0;}

		if(abs(cB_fin-0.5) < 0.1) 			{cAll_fin = 1.0;}
		else if(abs(cB_fin-0.5) < 0.25) 	{cAll_fin = 1.0;}
		else if(abs(cB_fin-0.5) < 0.3) 		{cAll_fin = 1.0;}

		cB_fin = cG_fin = cR_fin = cAll_fin;
	}


	if(birth1 == 27.0) {
		cR_fin = sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0));
		cG_fin = sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0));
		cB_fin = sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0));

		float cAll_fin = 0.0;
		
		if(abs(cR_fin-0.5) < 0.1) 			{cR_fin = cR;}
		else if(abs(cR_fin-0.5) < 0.15) 	{cR_fin = cR;}
		else if(abs(cR_fin-0.5) < 0.2) 		{cR_fin = cR;}
		else {cR_fin = 0.0;}

		if(abs(cG_fin-0.5) < 0.1) 			{cG_fin = cG;}
		else if(abs(cG_fin-0.5) < 0.15) 	{cG_fin = cG;}
		else if(abs(cG_fin-0.5) < 0.2) 		{cG_fin = cG;}
		else {cG_fin = 0.0;}

		if(abs(cB_fin-0.5) < 0.1) 			{cB_fin = cB;}
		else if(abs(cB_fin-0.5) < 0.15) 	{cB_fin = cB;}
		else if(abs(cB_fin-0.5) < 0.2) 		{cB_fin = cB;}
		else {cB_fin = 0.0;}


		if(cB_fin > 0.0 || cG_fin > 0.0 || cR_fin > 0.0 ) {cB_fin = cG_fin = cR_fin = 1.0;}

		//cB_fin = cG_fin = cR_fin = cAll_fin;

	}

	if(birth1 == 28.0) {

		float cR_fin1 = (sqrt(((((cRt+cR*17.0)/80.0)-cR)+1.0)+((((cRt+cR*17.0)/80.0)-cR)-1.0)) +
						 sqrt(((((cGt+cG*17.0)/80.0)-cG)+1.0)+((((cGt+cG*17.0)/80.0)-cG)-1.0)) + 
						 sqrt(((((cBt+cB*17.0)/80.0)-cB)+1.0)+((((cBt+cB*17.0)/80.0)-cB)-1.0)) ) / 3.0;

		//cB_fin = cG_fin = cR_fin = 0.0;

		if(abs(cR_fin1-0.5) < 0.1) 				{cR_fin = 1.0;}
		else if(abs(cR_fin1-0.5) < 0.225) 		{cG_fin = 1.0;}
		else if(abs(cR_fin1-0.5) < 0.3) 		{cB_fin = 1.0;}
		else {
			cR_fin = cR;
			cG_fin = cG;
			cB_fin = cB;
		}

	}




	if(birth1 == 29.0) {
		cR_fin = sqrt(((((cR_neu_cent)/8.0)-cR)+1.0)+((((cR_neu_cent)/8.0)-cR)-1.0));
		cG_fin = sqrt(((((cG_neu_cent)/8.0)-cG)+1.0)+((((cG_neu_cent)/8.0)-cG)-1.0));
		cB_fin = sqrt(((((cB_neu_cent)/8.0)-cB)+1.0)+((((cB_neu_cent)/8.0)-cB)-1.0));

		float cAll_fin = 0.0;
		
		if(abs(cR_fin-0.5) < 0.1) 			{cAll_fin = 1.0;}
		else if(abs(cR_fin-0.5) < 0.25) 	{cAll_fin = 1.0;}
		else if(abs(cR_fin-0.5) < 0.3) 		{cAll_fin = 1.0;}

		if(abs(cG_fin-0.5) < 0.1) 			{cAll_fin = 1.0;}
		else if(abs(cG_fin-0.5) < 0.25) 	{cAll_fin = 1.0;}
		else if(abs(cG_fin-0.5) < 0.3) 		{cAll_fin = 1.0;}

		if(abs(cB_fin-0.5) < 0.1) 			{cAll_fin = 1.0;}
		else if(abs(cB_fin-0.5) < 0.25) 	{cAll_fin = 1.0;}
		else if(abs(cB_fin-0.5) < 0.3) 		{cAll_fin = 1.0;}

		cB_fin = cG_fin = cR_fin = cAll_fin;
	}


	gl_FragColor = vec4(cR_fin, cG_fin, cB_fin, 1.0);

}
