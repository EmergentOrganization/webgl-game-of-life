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

void main() {

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);

	if( (gl_FragCoord.x > x) && (gl_FragCoord.x < x+w) && (gl_FragCoord.y > y) && (gl_FragCoord.y < y+h) ) { 
		//if(mod(gl_FragCoord.x, 128.0) < 64.0 && mod(gl_FragCoord.y, 128.0) < 64.0) {
			gl_FragColor = vec4(floor(gl_FragCoord.x/64.0)/(h/64.0), g, b, 1.0);
		//}
		if(mod(gl_FragCoord.x, 128.0) > 64.0 && mod(gl_FragCoord.y, 128.0) > 64.0) {
			gl_FragColor = vec4(floor(gl_FragCoord.y/64.0)/(h/64.0), g, b, 1.0);
		}
	}	

}
