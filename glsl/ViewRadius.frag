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

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);

	float centerx = w / 2.0;
	float centery = h / 2.0;

	float center_dist = sqrt(((gl_FragCoord.x-(x+centerx))*(gl_FragCoord.x-(x+centerx))) + ((gl_FragCoord.y-(y+centery))*(gl_FragCoord.y-(y+centery))));
	float center_radius = sqrt((centerx*centerx)+(centery*centery));

	float dist_to_rad = center_dist-center_radius; 						//distance to radius (player circle) boarder
	float rad_dist_ratio = dist_to_rad/center_dist; 	//radius multiplied by (ratio of dist_to_rad to full dist to center)





	//float getx = 0.0;//gl_FragCoord.x;
	//float gety = 0.0;//gl_FragCoord.y;	


	//float getx = (1.0/(rad_dist_ratio/5.0));
	//float gety = (1.0/(rad_dist_ratio/5.0));

	//float getx = 1.0/(rad_dist_ratio/center_dist);
	//float gety = 1.0/(rad_dist_ratio/center_dist);

	float getx = 2.1/(rad_dist_ratio/center_dist)/10.0;
	float gety = 2.1/(rad_dist_ratio/center_dist)/10.0;

	//float getx = (center_radius - (center_radius*rad_dist_ratio));
	//float gety = (center_radius - (center_radius*rad_dist_ratio));


	if(center_dist > center_radius && center_dist < (center_radius+16.0)*1.5) {
		//gl_FragColor = vec4(value, g, b, 1.0); 
		
		float R = (getR(vec2(getx, gety)) + getR(vec2(getx+1.0, gety)) + getR(vec2(getx, gety+1.0)) + getR(vec2(getx-1.0, gety)) + getR(vec2(getx, gety-1.0)))/5.0;
		float G = (getG(vec2(getx, gety)) + getG(vec2(getx+1.0, gety)) + getG(vec2(getx, gety+1.0)) + getG(vec2(getx-1.0, gety)) + getG(vec2(getx, gety-1.0)))/5.0;
		float B = (getB(vec2(getx, gety)) + getB(vec2(getx+1.0, gety)) + getB(vec2(getx, gety+1.0)) + getB(vec2(getx-1.0, gety)) + getB(vec2(getx, gety-1.0)))/5.0;

		//float R = getR(vec2(getx, gety))*1.0;
		//float G = getG(vec2(getx, gety))*1.0;
		//float B = getB(vec2(getx, gety))*1.0;

		gl_FragColor = vec4(R, G, B,  1.0);
	}

	if(center_dist > (center_radius+16.0)*1.5 && center_dist < ((center_radius+16.0)*1.6)) {
		gl_FragColor = vec4(value, g, b, 1.0); 
	}


	/*if(center_dist > center_radius) {
		float col = 0.02+rad_dist_ratio;
		gl_FragColor = vec4(getR(vec2(0.0, 0.0))*col, getG(vec2(0.0, 0.0))*col, getB(vec2(0.0, 0.0))*col, 1.0); 
	}*/
	

}
