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

	if( (int(gl_FragCoord.x) > int(x)) && (int(gl_FragCoord.x) < int(x+w)) && (int(gl_FragCoord.y) > int(y)) && (int(gl_FragCoord.y) < int(y+h)) ) { 
		int centerx = int(abs(abs(x+w)-abs(x)));
		int centery = int(abs(abs(y+h)-abs(y)));
		float dist = float(centerx*centerx + centery*centery);
		int idist = int(sqrt(dist));
		if(idist > 0 && idist <= 8) {
			gl_FragColor = vec4(value, g, b, 1.0); 
		} else {gl_FragColor = vec4(0, 0, 0, 1); }
	}

		

    
}
