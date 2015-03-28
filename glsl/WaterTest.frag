precision mediump float;

uniform sampler2D state;
uniform vec2 scale;

float getR(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).r);
}

float getG(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).g);
}

float getB(vec2 offset, sampler2D tex) {
	return (texture2D(tex, (gl_FragCoord.xy + offset) / scale).b);
}

void main() {


	float liq_norm_max = float(0.6);
	float requested_fill = float(0);


	//current state
	float r = getR(vec2(0, 0), state);
    float g = getG(vec2(0, 0), state);
    float b = getB(vec2(0, 0), state);
	
	//Get the liquid fill values
	float liq_this  = getB(vec2(0, 0), state);
	float blk_this 	= getR(vec2(0, 0), state);

	float liq_below = getB(vec2(0, -1), state);
	float liq_above = getB(vec2(0, 1), state);
	float liq_left  = getB(vec2(-1, 0), state);
	float liq_right = getB(vec2(1, 0), state);

	float blk_below = getR(vec2(0, -1), state);
	float blk_above = getR(vec2(0, 1), state);
	float blk_left  = getR(vec2(-1, 0), state);
	float blk_right = getR(vec2(1, 0), state);


	float blk_left_2  = getR(vec2(-2, 0), state);
	float blk_right_2 = getR(vec2(2, 0), state);
	float liq_left_2  = getB(vec2(-2, 0), state);
	float liq_right_2 = getB(vec2(2, 0), state);

	//Diag Blocks
	float R_br = getR(vec2(1, -1), state);
	float R_bl =  getR(vec2(-1, -1), state);
	float R_tr = getR(vec2(1, 1), state);
	float R_tl =  getR(vec2(-1, -1), state);

	
	float B_br = getB(vec2(1, -1), state);
	float B_bl =  getB(vec2(-1, -1), state);
	float B_tr = getB(vec2(1, 1), state);
	float B_tl =  getB(vec2(-1, 1), state);


	
	
	float liq_this_final = float(0);



	if(blk_this == float(0) && liq_this > float(0)) {

		if(liq_below == float(0) && blk_below == float(0)) {
			liq_this_final = float(0);
		}
		if(liq_above != float(0) && liq_this != float(0)) {
			liq_this_final += liq_above - liq_this;
		}
		if(liq_below != float(0) && liq_this != float(0)) {
			liq_this_final -= liq_this - liq_below;
		}
		
		if(liq_this > float(0) && (blk_below != float(0) || liq_below > liq_this)) {
			if(liq_right < liq_this && liq_left < liq_this && blk_right == float(0) && blk_left == float(0)) {
				liq_this_final += liq_this / float(3);
			} else if(liq_left < liq_this && blk_left == float(0)) {
				liq_this_final += liq_this / float(2);
			} else if(liq_right < liq_this && blk_right == float(0)) {
				liq_this_final += liq_this / float(2);
			}	
		}



	}

	if(blk_this == float(0)) {

		if(R_bl != float(0) || B_bl > liq_left) {
			if(liq_left > liq_this && liq_left_2 < liq_left) {
				liq_this_final += liq_this + liq_left/float(3);
			} else if (liq_left > liq_this && (liq_left_2 >= liq_left || blk_left_2 != float(0))) {
				liq_this_final += liq_this + liq_left/float(2);				
			}
		}

		if(R_br != float(0) || B_br > liq_right) {
			if(liq_right > liq_this && liq_right_2 < liq_right) {
				liq_this_final += liq_this + liq_right/float(3);
			} else if (liq_right > liq_this && (liq_right_2 >= liq_right || blk_right_2 != float(0))) {
				liq_this_final += liq_this + liq_right/float(2);				
			}
		}



		/*if(blk_below != float(0)){
			if(R_tr == float(0) && R_tl == float(0)) {
				liq_this_final += liq_this/float(3);
			} else if(R_tr == float(0)) {
				liq_this_final += liq_this/float(2);
			} else if(R_tl == float(0)) {
				liq_this_final += liq_this/float(2);
			}
		}*/

	}

	//dissipates quickly
	/*if(blk_this == float(0)) {

		if(R_bl != float(0) || B_bl > liq_left) {
			if(liq_left/float(3) > liq_this && liq_left_2 < liq_left/float(3)) {
				liq_this_final += liq_this + liq_left/float(3);
			} else if (liq_left/float(2) > liq_this && (liq_left_2/float(2) >= liq_left || blk_left_2 != float(0))) {
				liq_this_final += liq_this + liq_left/float(2);				
			}
		}

		if(R_br != float(0) || B_br > liq_right) {
			if(liq_right/float(3) > liq_this && liq_right_2 < liq_right/float(3)) {
				liq_this_final += liq_this + liq_right/float(3);
			} else if (liq_right/float(2) > liq_this && (liq_right_2/float(2) >= liq_right || blk_right_2 != float(0))) {
				liq_this_final += liq_this + liq_right/float(2);				
			}
		}

	}*/

	if(blk_this == float(0) && liq_this == float(0)) {

		if(liq_above > float(0)) {
			liq_this_final = liq_above;
		}

	}

	b = liq_this_final;
	if(b > float(0)) {g = float(0.5);} else {g = float(0);}
	//if(b > float(0) && b < float(0.01)) {g = float(1); b = float(0);}
	
	gl_FragColor = vec4(r, g, b, 1.0);





	/**************************************************/

}
