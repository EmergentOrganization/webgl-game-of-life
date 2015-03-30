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

void main() {

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);

	if( gl_FragCoord.x > x && gl_FragCoord.x < x+w && gl_FragCoord.y > y && gl_FragCoord.y < y+h) { 
		float centerx = abs(abs(x+w)-abs(x));
		float centery = abs(abs(y+h)-abs(y));
		float dist = sqrt(centerx*centerx + centery*centery);
		if(abs(dist) > float(0) && abs(dist) <= float(20)) {
    		gl_FragColor = vec4(value, g, b, 1.0);
		} else {gl_FragColor = vec4(0, 0, 0, 1); }
	}


}
