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
	float getx = 1.5/(rad_dist_ratio/center_dist)/10.0;
	float gety = 1.5/(rad_dist_ratio/center_dist)/10.0;

	float R = 0.0;
	float G = 0.0;
	float B = 0.0;

	float R0 = 0.0;
	float G0 = 0.0;
	float B0 = 0.0;
	float R1 = 0.0;
	float G1 = 0.0;
	float B1 = 0.0;

	if(center_dist > center_radius+28.0 && center_dist < (center_radius+16.0)*1.6) {

		R1 = (getR(vec2(getx, gety), render) + getR(vec2(getx, gety), render) + getR(vec2(getx, gety), render) + getR(vec2(getx, gety), render) + getR(vec2(getx, gety), render))/5.0;
		G1 = (getG(vec2(getx, gety), render) + getG(vec2(getx, gety), render) + getG(vec2(getx, gety), render) + getG(vec2(getx, gety), render) + getG(vec2(getx, gety), render))/5.0;
		B1 = (getB(vec2(getx, gety), render) + getB(vec2(getx, gety), render) + getB(vec2(getx, gety), render) + getB(vec2(getx, gety), render) + getB(vec2(getx, gety), render))/5.0;

		R = R1;
		G = G1; //(G0+G1)/2.0;
		B = B1;

		float bright = 0.5;

		gl_FragColor = vec4(R*bright, G*bright, B*bright,  1.0);
	}

	if(center_dist > (center_radius+16.0)*1.6 && center_dist < ((center_radius+16.0)*1.7)) {
		gl_FragColor = vec4(value, g, b, 1.0); 
	}
	

}
