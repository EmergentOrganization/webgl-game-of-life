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


	float liq_norm_max = 0.6;
	float requested_fill = 0.0;
	float liq_this_final = 0.0;


	//current state
	float r = getR(vec2(0, 0), state);
    float g = getG(vec2(0, 0), state);
    float b = getB(vec2(0, 0), state);
	
	//Get the liquid fill values
	float liq_this  = getB(vec2(0, 0), state);
	float blk_this 	= getR(vec2(0, 0), state);
	float sol_this 	= getG(vec2(0, 0), state);

	float liq_below = getB(vec2(0, -1), state);
	float liq_above = getB(vec2(0, 1), state);
	float liq_left  = getB(vec2(-1, 0), state);
	float liq_right = getB(vec2(1, 0), state);

	float blk_below = getR(vec2(0, -1), state);
	float blk_above = getR(vec2(0, 1), state);
	float blk_left  = getR(vec2(-1, 0), state);
	float blk_right = getR(vec2(1, 0), state);

	float sol_below = getG(vec2(0, -1), state);
	float sol_above = getG(vec2(0, 1), state);
	float sol_left  = getG(vec2(-1, 0), state);
	float sol_right = getG(vec2(1, 0), state);



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

	float G_br = getG(vec2(1, -1), state);
	float G_bl =  getG(vec2(-1, -1), state);
	float G_tr = getG(vec2(1, 1), state);
	float G_tl =  getG(vec2(-1, 1), state);


	//blocks overwrite solids
	if(blk_this != 0.0) {g = 0.0;}


	//if i am not a block and I am liquid
	if(blk_this == 0.0 && liq_this > 0.0) {

		//if liquid below, maintain cell
		if(liq_below != 0.0) {
			//liq_this_final = liq_this;
		}

		//if no liquid above, empty this cell
		if(liq_above == 0.0) {
			liq_this_final = 0.0;
		}

		//if block or solid below, become solid
		if(blk_below != 0.0 || sol_below != 0.0) {
			g = liq_this;
		}


	}

	


	if(blk_this == 0.0) {
		//if liquid above and not solid, fall
		if(liq_above != 0.0 && sol_this == 0.0 && liq_this == 0.0) {
			liq_this_final = liq_above;
		}

		//if there is no red or green below me, become blue
		if(sol_this != 0.0 && blk_below == 0.0 && sol_below == 0.0) {
			liq_this_final = sol_this;
			g=0.0;
		}

	}

	
	/*if(G_tl != 0.0 && blk_left != 0.0) {
		if(sol_this == 0.0 && blk_this == 0.0 && liq_this == 0.0) {
			g = G_tl;
		}
	}	
	if(R_br == 0.0 && G_br == 0.0 && B_br == 0.0) {
		if(blk_right == 0.0 && sol_this != 0.0) {
			g = 0.0;
		}
	}

	if(G_tr != 0.0 && blk_right != 0.0) {
		if(sol_this == 0.0 && blk_this == 0.0 && liq_this == 0.0) {
			g = G_tr;
		}
	}	
	if(R_bl == 0.0 && G_bl == 0.0 && B_bl == 0.0) {
		if(blk_left == 0.0 && sol_this != 0.0) {
			g = 0.0;
		}
	}*/

	/*if(sol_left != 0.0) {
		liq_this_final = sol_left;
	}
	if(sol_this != 0.0 && sol_right == 0.0) {
		//liq_this_final = 0.0;
		g = 0.0;
	}	

	if(sol_right != 0.0) {
		liq_this_final = sol_right;
	}
	if(sol_this != 0.0 && sol_left == 0.0) {
		//liq_this_final = 0.0;
		g = 0.0;
	}*/







	//if apex of solid spire, split & erase self
	//if 1 below apex of solid spire, delete
	
	if(sol_above == 0.0 && sol_below != 0.0 && ((G_br == 0.0 || G_bl == 0.0) && (sol_left == 0.0 || sol_right == 0.0))) {
		g = 0.0;
	}	

	//if(sol_below != 0.0 && sol_this != 0.0 && ((G_tr != 0.0 || G_tl != 0.0) && (sol_left == 0.0 || sol_right == 0.0))) {
	//	g = 0.0;
	//}

	if(liq_above != 0.0 && liq_this != 0.0 && (sol_below != 0.0 || blk_below != 0.0)) { g = 0.0;}

	if(liq_this == 0.0 && (liq_left == 0.0 || liq_right == 0.0) && (G_bl != 0.0 || G_br != 0.0)) {
		liq_this_final = 1.0;
	}







	//lock in final liquid state
	b = liq_this_final;
	
	gl_FragColor = vec4(r, g, b, 1.0);



}
