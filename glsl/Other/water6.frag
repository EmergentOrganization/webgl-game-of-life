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

	//get current colour states
	float r = getR(vec2(0, 0), state);
    float g = getG(vec2(0, 0), state);
    float b = getB(vec2(0, 0), state);
	
//Reference Coords are upside down

// 1 	water falls down vertically

	if(b != 0.0) {
		b = 0.0;
	}
	if(getB(vec2(0, -1), state) != 0.0) {
		//if()
		b = 1.0;
	}

// 2 	water becomes solid on blocks

	if(b != 0.0 && getR(vec2(0, 1), state) >= 0.9) {
		g = 1.0;
		b = 0.0;
	}
// 3 	water becomes solid on solids

	if(b != 0.0 && getG(vec2(0, 1), state) != 0.0) {
		g = 1.0;
		b = 0.0;
	}

/*
// 4b 	solids with 5/8 non-water/non-solid moore spaces move horizontally into empty cell, else stay still

	int moore_count = 0;
	int moore_count2 = 0;
	int moore_count3 = 0;

	int elem = 0;
	int elem1 = 0;
	int elem2 = 0;






	//add the cell
		//check left and right cells' moore neigbourhoods
		//add green cell


	// ############################ r g b raw assessment
	if(r == 0.0 && g == 0.0 && b == 0.0) {
		if(getG(vec2(-1.0, 0.0), state) != 0.0) {

			if(getR(vec2(-1.0, 1.0), state) >= 0.9 || (getG(vec2(-1.0, 1.0), state) == 0.0 && getB(vec2(-1.0, 1.0), state) == 0.0)){	moore_count2 += 1; }
			if(getR(vec2(0.0, 0.0), state) >= 0.9 || (getG(vec2(0.0, 0.0), state) == 0.0 && getB(vec2(0.0, 0.0), state) == 0.0)){	moore_count2 += 1; }
			if(getR(vec2(0.0, 1.0), state) >= 0.9 || (getG(vec2(0.0, 1.0), state) == 0.0 && getB(vec2(0.0, 1.0), state) == 0.0)){	moore_count2 += 1; }
			if(getR(vec2(-1.0, -1.0), state) >= 0.9 || (getG(vec2(-1.0, -1.0), state) == 0.0 && getB(vec2(-1.0, -1.0), state) == 0.0)){	moore_count2 += 1; }
			if(getR(vec2(-2.0, 0.0), state) >= 0.9 || (getG(vec2(-2.0, 0.0), state) == 0.0 && getB(vec2(-2.0, 0.0), state) == 0.0)){	moore_count2 += 1; }
			if(getR(vec2(-2.0, -1.0), state) >= 0.9 || (getG(vec2(-2.0, -1.0), state) == 0.0 && getB(vec2(-2.0, -1.0), state) == 0.0)){	moore_count2 += 1; }
			if(getR(vec2(0.0, -1.0), state) >= 0.9 || (getG(vec2(0.0, -1.0), state) == 0.0 && getB(vec2(0.0, -1.0), state) == 0.0)){	moore_count2 += 1; }
			if(getR(vec2(-2.0, 1.0), state) >= 0.9 || (getG(vec2(-2.0, 1.0), state) == 0.0 && getB(vec2(-2.0, 1.0), state) == 0.0)){	moore_count2 += 1; }
	
			if(moore_count2 == 5) {
				//if the other choice cell is R/G/B
				//if(getR(vec2(1.0, 0.0), state) != 0.0 || getG(vec2(1.0, 0.0), state) != 0.0 || getB(vec2(1.0, 0.0), state) != 0.0) {	

				if(getR(vec2(-1.0, 0.0), state) >= 0.9 || getG(vec2(-1.0, 0.0), state) != 0.0 || getB(vec2(-1.0, 0.0), state) != 0.0){	elem1 += 1; }
				//if(getR(vec2(0.0, 0.0), state) != 0.0 || getG(vec2(0.0, 0.0), state) != 0.0 || getB(vec2(0.0, 0.0), state) != 0.0){	elem1 += 1; }
				//if(getR(vec2(1.0, 0.0), state) == 0.0 && getG(vec2(1.0, 0.0), state) == 0.0 && getB(vec2(1.0, 0.0), state) == 0.0){	elem1 += 1; }

			}// else { r = 0.0; }
		}

		if(getG(vec2(1.0, 0.0), state) != 0.0) {

			if(getR(vec2(1.0, 1.0), state) >= 0.9 || (getG(vec2(1.0, 1.0), state) == 0.0 && getB(vec2(1.0, 1.0), state) == 0.0)){	moore_count3 += 1; }
			if(getR(vec2(2.0, 0.0), state) >= 0.9 || (getG(vec2(2.0, 0.0), state) == 0.0 && getB(vec2(2.0, 0.0), state) == 0.0)){	moore_count3 += 1; }
			if(getR(vec2(2.0, 1.0), state) >= 0.9 || (getG(vec2(2.0, 1.0), state) == 0.0 && getB(vec2(2.0, 1.0), state) == 0.0)){	moore_count3 += 1; }
			if(getR(vec2(1.0, -1.0), state) >= 0.9 || (getG(vec2(1.0, -1.0), state) == 0.0 && getB(vec2(1.0, -1.0), state) == 0.0)){	moore_count3 += 1; }
			if(getR(vec2(0.0, 0.0), state) >= 0.9 || (getG(vec2(0.0, 0.0), state) == 0.0 && getB(vec2(0.0, 0.0), state) == 0.0)){	moore_count3 += 1; }
			if(getR(vec2(0.0, -1.0), state) >= 0.9 || (getG(vec2(0.0, -1.0), state) == 0.0 && getB(vec2(0.0, -1.0), state) == 0.0)){	moore_count3 += 1; }
			if(getR(vec2(2.0, -1.0), state) >= 0.9 || (getG(vec2(2.0, -1.0), state) == 0.0 && getB(vec2(2.0, -1.0), state) == 0.0)){	moore_count3 += 1; }
			if(getR(vec2(0.0, 1.0), state) >= 0.9 || (getG(vec2(0.0, 1.0), state) == 0.0 && getB(vec2(0.0, 1.0), state) == 0.0)){	moore_count3 += 1; }
	
			if(moore_count3 == 5) {
				//if the other choice cell is R/G/B
				//if(getR(vec2(1.0, 0.0), state) != 0.0 || getG(vec2(1.0, 0.0), state) != 0.0 || getB(vec2(1.0, 0.0), state) != 0.0) {	

				//if(getR(vec2(-1.0, 0.0), state) == 0.0 && getG(vec2(-1.0, 0.0), state) == 0.0 && getB(vec2(-1.0, 0.0), state) == 0.0){	elem2 += 1; }
				//if(getR(vec2(0.0, 0.0), state) != 0.0 || getG(vec2(0.0, 0.0), state) != 0.0 || getB(vec2(0.0, 0.0), state) != 0.0){	elem2 += 1; }
				if(getR(vec2(1.0, 0.0), state) >= 0.9 || getG(vec2(1.0, 0.0), state) != 0.0 || getB(vec2(1.0, 0.0), state) != 0.0){	elem2 += 1; }

			}// else { r = 0.0; }
		}

		if(elem2 == 1 || elem1 == 1){
			g = 1.0;
			//g = 0.6;
			//b = 0.6;
		}// else { r = 0.2; }


	}


	






	//empty the cell
	if(g != 0.0) {
		//count reds and blacks, (not greens, not blues)
		if(getR(vec2(0.0, 1.0), state) >= 0.9 || (getG(vec2(0.0, 1.0), state) == 0.0 && getB(vec2(0.0, 1.0), state) == 0.0)){	moore_count += 1; }
		if(getR(vec2(1.0, 0.0), state) >= 0.9 || (getG(vec2(1.0, 0.0), state) == 0.0 && getB(vec2(1.0, 0.0), state) == 0.0)){	moore_count += 1; }
		if(getR(vec2(1.0, 1.0), state) >= 0.9 || (getG(vec2(1.0, 1.0), state) == 0.0 && getB(vec2(1.0, 1.0), state) == 0.0)){	moore_count += 1; }
		if(getR(vec2(0.0, -1.0), state) >= 0.9 || (getG(vec2(0.0, -1.0), state) == 0.0 && getB(vec2(0.0, -1.0), state) == 0.0)){	moore_count += 1; }
		if(getR(vec2(-1.0, 0.0), state) >= 0.9 || (getG(vec2(-1.0, 0.0), state) == 0.0 && getB(vec2(-1.0, 0.0), state) == 0.0)){	moore_count += 1; }
		if(getR(vec2(-1.0, -1.0), state) >= 0.9 || (getG(vec2(-1.0, -1.0), state) == 0.0 && getB(vec2(-1.0, -1.0), state) == 0.0)){	moore_count += 1; }
		if(getR(vec2(1.0, -1.0), state) >= 0.9 || (getG(vec2(1.0, -1.0), state) == 0.0 && getB(vec2(1.0, -1.0), state) == 0.0)){	moore_count += 1; }
		if(getR(vec2(-1.0, 1.0), state) >= 0.9 || (getG(vec2(-1.0, 1.0), state) == 0.0 && getB(vec2(-1.0, 1.0), state) == 0.0)){	moore_count += 1; }
	
		if(moore_count == 5) { 

			if(getR(vec2(-1.0, 0.0), state) >= 0.9 || getG(vec2(-1.0, 0.0), state) != 0.0 || getB(vec2(-1.0, 0.0), state) != 0.0){	elem += 1; }
			//if(getR(vec2(0.0, 0.0), state) != 0.0 || getG(vec2(0.0, 0.0), state) != 0.0 || getB(vec2(0.0, 0.0), state) != 0.0){	elem += 1; }
			if(getR(vec2(1.0, 0.0), state) >= 0.9 || getG(vec2(1.0, 0.0), state) != 0.0 || getB(vec2(1.0, 0.0), state) != 0.0){	elem += 1; }

			if(elem == 1) {
				g = 0.0; 
			} else { g = 1.0; }
		} else {g = 1.0;}

	} 

*/


// 5 	solids with no solids or blocks below become water

	if(g != 0.0 && getR(vec2(0.0, 1.0), state) == 0.0 && getG(vec2(0.0, 1.0), state) == 0.0 && getB(vec2(0.0, 1.0), state) == 0.0) {
		b = 1.0;
		g = 0.0;
	}

//6 red override
	if(r >= 0.9){
		g = 0.0;
		b = 0.0;
	}

	if(r < 0.9) {r = 0.0;}

//7 Two-high splitter
	/*int elem_split = 0;
	int elem_split2 = 0;

	if( getG(vec2(0.0, 0.0), state) != 0.0 && getG(vec2(0.0, 1.0), state) != 0.0) {
		if(getR(vec2(-1.0, 0.0), state) >= 0.9 || getG(vec2(-1.0, 0.0), state) != 0.0 || getB(vec2(-1.0, 0.0), state) != 0.0){	elem_split += 1; }
		if(getR(vec2(1.0, 0.0), state) >= 0.9 || getG(vec2(1.0, 0.0), state) != 0.0 || getB(vec2(1.0, 0.0), state) != 0.0){	elem_split += 1; }

		if(elem_split == 0) {
			g = 0.0;
		}	
	}

	if(getR(vec2(0.0, 0.0), state) == 0.0 && getG(vec2(0.0, 0.0), state) != 0.0 && getB(vec2(0.0, 0.0), state) == 0.0){	
		if(getR(vec2(-1.0, 0.0), state) == 0.0 || getG(vec2(-1.0, 0.0), state) == 0.0 || getB(vec2(-1.0, 0.0), state) == 0.0){	elem_split2 += 1; }
		if(getR(vec2(1.0, 0.0), state) == 0.0 || getG(vec2(1.0, 0.0), state) == 0.0 || getB(vec2(1.0, 0.0), state) == 0.0){	elem_split2 += 1; }
	}
	
	if(elem_split2 == 1) {
		b = 1.0;
	}*/


	//write colour states
	gl_FragColor = vec4(r, g, b, 1.0);



}
