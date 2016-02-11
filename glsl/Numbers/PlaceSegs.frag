precision mediump float;

uniform sampler2D state;
uniform sampler2D render;

uniform vec2 scale;

uniform float x;
uniform float y;
uniform float w;
uniform float h;

uniform float r;
uniform float g;
uniform float b;

uniform float birth1;

void main() {

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);

	if( (gl_FragCoord.x > x) && (gl_FragCoord.x < x+w) && (gl_FragCoord.y > y) && (gl_FragCoord.y < y+h) ) { 
		//if(mod(gl_FragCoord.x, 128.0) < 64.0 && mod(gl_FragCoord.y, 128.0) < 64.0) {
			gl_FragColor = vec4(floor(gl_FragCoord.x/64.0)/(h/64.0), g, b, 1.0 );
		//}
		/*if(mod(gl_FragCoord.x, 128.0) > 64.0 && mod(gl_FragCoord.y, 128.0) > 64.0) {
			//gl_FragColor = vec4(floor(gl_FragCoord.y/64.0)/(h/64.0), g, b, 1.0);
		}*/

		int seednum = 1;
		float divs = 32.0;

		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

		float cR = 0.0;
		float cG = 0.0;
		float cB = 0.0;

		//if(mod(gl_FragCoord.x, w/(divs)) > w/(divs*2.0)) {
			//cR = 1.0;
		//}

		//if(mod(gl_FragCoord.y, h/(divs*0.5)) > h/(divs*1.0)) {
			//cG = 1.0;
		//}

		/*float thiscellnum = ((w) * gl_FragCoord.y) + mod(gl_FragCoord.x, w);
		if(thiscellnum >= 65536.0 && thiscellnum <= 65536.0 + w/64.0) {cR = cG = cB = 1.0;}
		if(thiscellnum >= 65536.0 + w && thiscellnum <= 65536.0 + w/64.0 +w) {cR = cG = cB = 1.0;}*/


		/*float thiscellnum = ((w) * gl_FragCoord.y) + mod(gl_FragCoord.x, w);

		for(int i = 0; i < 8; ++i) {
			if(thiscellnum >= 65536.0+(w*float(i)) && thiscellnum <= 65536.0+(w/64.0)+(w*float(i))) {cR = cG = cB = 1.0;}
		}*/

		/*float thiscellnum = ((w) * gl_FragCoord.y) + mod(gl_FragCoord.x, w);

		float boxnum = birth1;
		float boxindex = birth1*(w/(divs*2.0)) + ((w*8.0) * floor(birth1/64.0));//(boxnum*8.0)+(h*boxnum);// * ((w*h)/(32.0*64.0));

		for(int i = 1; i < 9; ++i) {
			if(thiscellnum >= boxindex+(w*float(i)) - (w/2.0) && thiscellnum <= boxindex+(w/64.0)+(w*float(i)) - (w/2.0)) {cR = cG = cB = 1.0;}
		}*/



		/*float thiscellnum = ((w) * gl_FragCoord.y) + mod(gl_FragCoord.x, w);

		for(int j = 0; j < 1700; j+=2) {

			float boxnum = float(j);
			float boxindex = boxnum*(w/(divs*2.0)) + ((w*8.0) * floor(boxnum/64.0));

			for(int i = 0; i < 8; ++i) {
				if(thiscellnum >= boxindex+(w*float(i)) - (w/2.0) && thiscellnum <= boxindex+(w/64.0)+(w*float(i)) - (w/2.0)) {
					if(i == 0) {cR = 1.0;}
					if(i == 7) {cG = 1.0;}
					cB = 1.0;
				}
			}

		}*/



		/*float thiscellnum = ((w) * gl_FragCoord.y) + mod(gl_FragCoord.x, w) - w;

		for(int j = 0; j < 1700; j+=3) {

			float boxnum = float(j);
			float boxindex = boxnum*(w/(divs*2.0)) + ((w*8.0) * floor(boxnum/64.0));

			for(int i = 0; i < 8; ++i) {
				if(thiscellnum >= boxindex+(w*float(i)) - (w/2.0) && thiscellnum <= boxindex+(w/64.0)+(w*float(i)) - (w/2.0)) {
					if(i == 0) {cR = 1.0;}
					if(i == 7) {cG = 1.0;}
					cB = 1.0;
				}
			}

		}*/



		/*float thiscellnum = ((w) * gl_FragCoord.y) + mod(gl_FragCoord.x, w) - w;

		for(int j = 0; j < 2048; j+=1) {

			float boxnum = float(j);
			float boxindex = boxnum*(w/(divs*2.0)) + ((w*7.0) * floor(boxnum/64.0));

			for(int i = 0; i < 8; ++i) {
				if(thiscellnum >= boxindex+(w*float(i)) - (w/2.0) && thiscellnum <= boxindex+(w/64.0)+(w*float(i)) - (w/2.0)) {
					if(i == 0) {cR = 1.0;}
					if(i == 7) {cG = 1.0;}
					cB = 1.0;
				}
			}

		}*/






		float seed = birth1;

		float thiscellnum = ((w) * gl_FragCoord.y) + mod(gl_FragCoord.x, w) - w;

		for(int j = 0; j < 2048; j+=1) {

			if(seed == float(j)) { 
				float boxnum = float(j);
				float boxindex = boxnum*(w/(divs*2.0)) + ((w*7.0) * floor(boxnum/64.0));

				for(int i = 0; i < 8; ++i) {
					if(thiscellnum >= boxindex+(w*float(i)) - (w/2.0) && thiscellnum <= boxindex+(w/64.0)+(w*float(i)) - (w/2.0)) {
						if(i == 0) {cR = 1.0;}
						if(i == 7) {cG = 1.0;}
						cB = 1.0;
					}
				}
			}

		}

		gl_FragColor = vec4(cR, cG, cB, 1.0);
		
	}	

}
