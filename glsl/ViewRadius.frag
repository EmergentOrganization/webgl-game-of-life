precision mediump float;

uniform sampler2D state;
uniform sampler2D render;
uniform vec2 scale;
uniform float x;
uniform float y;
uniform float w;
uniform float h;
uniform float value;
uniform float g;
uniform float b;

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

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);

	float centerx = w / 2.0;
	float centery = h / 2.0;

	float center_dist = sqrt(((gl_FragCoord.x-(x+centerx))*(gl_FragCoord.x-(x+centerx))) + ((gl_FragCoord.y-(y+centery))*(gl_FragCoord.y-(y+centery))));
	float center_radius = sqrt((centerx*centerx)+(centery*centery));

	float dist_to_rad = center_dist-center_radius; 						//distance to radius (player circle) boarder
	float rad_dist_ratio = dist_to_rad/center_dist; 	//radius multiplied by (ratio of dist_to_rad to full dist to center)


				//zoom							//how many wraps around the circle
	//float getx = -1.5/(rad_dist_ratio/center_dist)/10.0;
	//float gety = -1.5/(rad_dist_ratio/center_dist)/10.0;

	/*float offset_distortion_x = 0.0;
	float offset_distortion_y = 4.0;

	float getx = offset_distortion_x/(rad_dist_ratio/center_dist)/4.0;
	float gety = offset_distortion_y/(rad_dist_ratio/center_dist)/4.0;*/

	float R = 0.0;
	float G = 0.0;
	float B = 0.0;

	float R0 = 0.0;
	float G0 = 0.0;
	float B0 = 0.0;
	float R1 = 0.0;
	float G1 = 0.0;
	float B1 = 0.0;
	float R2 = 0.0;
	float G2 = 0.0;
	float B2 = 0.0;
	float R3 = 0.0;
	float G3 = 0.0;
	float B3 = 0.0;


	float R4 = 0.0;
	float G4 = 0.0;
	float B4 = 0.0;
	float R5 = 0.0;
	float G5 = 0.0;
	float B5 = 0.0;
	float R6 = 0.0;
	float G6 = 0.0;
	float B6 = 0.0;
	float R7 = 0.0;
	float G7 = 0.0;
	float B7 = 0.0;

	float mode = 3.0;

	if(center_dist > center_radius+28.0 /*&& center_dist < (center_radius+16.0)*1.6*/) {

		if(mode == 0.0 || mode == 2.0 || mode == 3.0) {
			float offset_distortion_x1 = 4.0;
			float offset_distortion_y1 = 0.0;

			float getx1 = offset_distortion_x1/(rad_dist_ratio/center_dist)/4.0;
			float gety1 = offset_distortion_y1/(rad_dist_ratio/center_dist)/4.0;

			R0 = (getR(vec2(getx1, gety1), render) + getR(vec2(getx1, gety1), render) + getR(vec2(getx1, gety1), render) + getR(vec2(getx1, gety1), render) + getR(vec2(getx1, gety1), render))/5.0;
			G0 = (getG(vec2(getx1, gety1), render) + getG(vec2(getx1, gety1), render) + getG(vec2(getx1, gety1), render) + getG(vec2(getx1, gety1), render) + getG(vec2(getx1, gety1), render))/5.0;
			B0 = (getB(vec2(getx1, gety1), render) + getB(vec2(getx1, gety1), render) + getB(vec2(getx1, gety1), render) + getB(vec2(getx1, gety1), render) + getB(vec2(getx1, gety1), render))/5.0;
		}
		
		if(mode == 0.0 || mode == 1.0 || mode == 3.0) {
			float offset_distortion_x2 = 0.0;
			float offset_distortion_y2 = 4.0;

			float getx2 = offset_distortion_x2/(rad_dist_ratio/center_dist)/4.0;
			float gety2 = offset_distortion_y2/(rad_dist_ratio/center_dist)/4.0;

			R1 = (getR(vec2(getx2, gety2), render) + getR(vec2(getx2, gety2), render) + getR(vec2(getx2, gety2), render) + getR(vec2(getx2, gety2), render) + getR(vec2(getx2, gety2), render))/5.0;
			G1 = (getG(vec2(getx2, gety2), render) + getG(vec2(getx2, gety2), render) + getG(vec2(getx2, gety2), render) + getG(vec2(getx2, gety2), render) + getG(vec2(getx2, gety2), render))/5.0;
			B1 = (getB(vec2(getx2, gety2), render) + getB(vec2(getx2, gety2), render) + getB(vec2(getx2, gety2), render) + getB(vec2(getx2, gety2), render) + getB(vec2(getx2, gety2), render))/5.0;
		}
		
		if(mode == 0.0 || mode == 2.0 || mode == 3.0) {
			float offset_distortion_x3 = -4.0;
			float offset_distortion_y3 = 0.0;

			float getx3 = offset_distortion_x3/(rad_dist_ratio/center_dist)/4.0;
			float gety3 = offset_distortion_y3/(rad_dist_ratio/center_dist)/4.0;

			R2 = (getR(vec2(getx3, gety3), render) + getR(vec2(getx3, gety3), render) + getR(vec2(getx3, gety3), render) + getR(vec2(getx3, gety3), render) + getR(vec2(getx3, gety3), render))/5.0;
			G2 = (getG(vec2(getx3, gety3), render) + getG(vec2(getx3, gety3), render) + getG(vec2(getx3, gety3), render) + getG(vec2(getx3, gety3), render) + getG(vec2(getx3, gety3), render))/5.0;
			B2 = (getB(vec2(getx3, gety3), render) + getB(vec2(getx3, gety3), render) + getB(vec2(getx3, gety3), render) + getB(vec2(getx3, gety3), render) + getB(vec2(getx3, gety3), render))/5.0;
		}
		
		if(mode == 0.0 || mode == 3.0) {
			float offset_distortion_x4 = 0.0;
			float offset_distortion_y4 = -4.0;

			float getx4 = offset_distortion_x4/(rad_dist_ratio/center_dist)/4.0;
			float gety4 = offset_distortion_y4/(rad_dist_ratio/center_dist)/4.0;

			R3 = (getR(vec2(getx4, gety4), render) + getR(vec2(getx4, gety4), render) + getR(vec2(getx4, gety4), render) + getR(vec2(getx4, gety4), render) + getR(vec2(getx4, gety4), render))/5.0;
			G3 = (getG(vec2(getx4, gety4), render) + getG(vec2(getx4, gety4), render) + getG(vec2(getx4, gety4), render) + getG(vec2(getx4, gety4), render) + getG(vec2(getx4, gety4), render))/5.0;
			B3 = (getB(vec2(getx4, gety4), render) + getB(vec2(getx4, gety4), render) + getB(vec2(getx4, gety4), render) + getB(vec2(getx4, gety4), render) + getB(vec2(getx4, gety4), render))/5.0;

			R = (R0+R1+R2+R3)/2.0;
			G = (G0+G1+G2+G3)/2.0;
			B = (B0+B1+B2+B3)/2.0;
		}


		if(mode == 0.0) {
			float offset_distortion_x5 = 1.0;
			float offset_distortion_y5 = 1.0;

			float getx5 = offset_distortion_x5/(rad_dist_ratio/center_dist)/4.0;
			float gety5 = offset_distortion_y5/(rad_dist_ratio/center_dist)/4.0;

			R4 = (getR(vec2(getx5, gety5), render) + getR(vec2(getx5, gety5), render) + getR(vec2(getx5, gety5), render) + getR(vec2(getx5, gety5), render) + getR(vec2(getx5, gety5), render))/5.0;
			G4 = (getG(vec2(getx5, gety5), render) + getG(vec2(getx5, gety5), render) + getG(vec2(getx5, gety5), render) + getG(vec2(getx5, gety5), render) + getG(vec2(getx5, gety5), render))/5.0;
			B4 = (getB(vec2(getx5, gety5), render) + getB(vec2(getx5, gety5), render) + getB(vec2(getx5, gety5), render) + getB(vec2(getx5, gety5), render) + getB(vec2(getx5, gety5), render))/5.0;
		}
		
		if(mode == 0.0) {
			float offset_distortion_x6 = -1.0;
			float offset_distortion_y6 = 1.0;

			float getx6 = offset_distortion_x6/(rad_dist_ratio/center_dist)/4.0;
			float gety6 = offset_distortion_y6/(rad_dist_ratio/center_dist)/4.0;

			R5 = (getR(vec2(getx6, gety6), render) + getR(vec2(getx6, gety6), render) + getR(vec2(getx6, gety6), render) + getR(vec2(getx6, gety6), render) + getR(vec2(getx6, gety6), render))/5.0;
			G5 = (getG(vec2(getx6, gety6), render) + getG(vec2(getx6, gety6), render) + getG(vec2(getx6, gety6), render) + getG(vec2(getx6, gety6), render) + getG(vec2(getx6, gety6), render))/5.0;
			B5 = (getB(vec2(getx6, gety6), render) + getB(vec2(getx6, gety6), render) + getB(vec2(getx6, gety6), render) + getB(vec2(getx6, gety6), render) + getB(vec2(getx6, gety6), render))/5.0;
		}
		
		if(mode == 0.0) {
			float offset_distortion_x7 = -1.0;
			float offset_distortion_y7 = -1.0;

			float getx7 = offset_distortion_x7/(rad_dist_ratio/center_dist)/4.0;
			float gety7 = offset_distortion_y7/(rad_dist_ratio/center_dist)/4.0;

			R6 = (getR(vec2(getx7, gety7), render) + getR(vec2(getx7, gety7), render) + getR(vec2(getx7, gety7), render) + getR(vec2(getx7, gety7), render) + getR(vec2(getx7, gety7), render))/5.0;
			G6 = (getG(vec2(getx7, gety7), render) + getG(vec2(getx7, gety7), render) + getG(vec2(getx7, gety7), render) + getG(vec2(getx7, gety7), render) + getG(vec2(getx7, gety7), render))/5.0;
			B6 = (getB(vec2(getx7, gety7), render) + getB(vec2(getx7, gety7), render) + getB(vec2(getx7, gety7), render) + getB(vec2(getx7, gety7), render) + getB(vec2(getx7, gety7), render))/5.0;
		}
		
		if(mode == 0.0) {
			float offset_distortion_x8 = 1.0;
			float offset_distortion_y8 = -1.0;

			float getx8 = offset_distortion_x8/(rad_dist_ratio/center_dist)/4.0;
			float gety8 = offset_distortion_y8/(rad_dist_ratio/center_dist)/4.0;

			R7 = (getR(vec2(getx8, gety8), render) + getR(vec2(getx8, gety8), render) + getR(vec2(getx8, gety8), render) + getR(vec2(getx8, gety8), render) + getR(vec2(getx8, gety8), render))/5.0;
			G7 = (getG(vec2(getx8, gety8), render) + getG(vec2(getx8, gety8), render) + getG(vec2(getx8, gety8), render) + getG(vec2(getx8, gety8), render) + getG(vec2(getx8, gety8), render))/5.0;
			B7 = (getB(vec2(getx8, gety8), render) + getB(vec2(getx8, gety8), render) + getB(vec2(getx8, gety8), render) + getB(vec2(getx8, gety8), render) + getB(vec2(getx8, gety8), render))/5.0;
		}


		/**/



		if(mode == 0.0) {
			R = ((R0+R1+R2+R3)/8.0)+((R4+R5+R6+R7)/8.0);
			G = ((G0+G1+G2+G3)/8.0)+((G4+G5+G6+G7)/8.0);
			B = ((B0+B1+B2+B3)/8.0)+((B4+B5+B6+B7)/8.0);
		}

		if(mode == 1.0) {
			R = R1;
			G = G1;
			B = B1;
		}

		if(mode == 2.0) {
			R = (R0+R2)/2.0;
			G = (G0+G2)/2.0;
			B = (B0+B2)/2.0;
		}

		if(mode == 3.0) {
			R = ((R0+R1+R2+R3)/4.0);
			G = ((G0+G1+G2+G3)/4.0);
			B = ((B0+B1+B2+B3)/4.0);
		}



		float brightR = ((3.3-(((w*w+h*h)/center_radius)/center_dist))*0.92)-0.05;
		float brightG = 3.0-(((w*w+h*h)/center_radius)/center_dist);
		float brightB = 3.0-(((w*w+h*h)/center_radius)/center_dist);


		//getR(vec2(0.0, 0.0), render);

		gl_FragColor = vec4(R*brightR, G*brightG, B*brightB,  1.0);
	}

	//if(center_dist > (center_radius+16.0)*1.6 && center_dist < ((center_radius+16.0)*1.7)) {
	//	gl_FragColor = vec4(value, g, b, 1.0); 
	//}
	

}
