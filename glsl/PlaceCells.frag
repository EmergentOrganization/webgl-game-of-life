#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D state;
uniform sampler2D render;
uniform vec2 scale;
uniform float x;
uniform float y;
uniform float size;
uniform float value;

void main() {

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);

	if( (int(gl_FragCoord.x) > int(x)) && (int(gl_FragCoord.x) < int(x+size)) && (int(gl_FragCoord.y) > int(y)) && (int(gl_FragCoord.y) < int(y+size)) ) { gl_FragColor = vec4(value, 1.0, 0.0, 1.0); }

    /*
	unsigned int i = get_global_id(0);
	unsigned int j = get_global_id(1);
	unsigned int my_id = i + ySize*j;
	unsigned int mouse_id = mx + ySize*my;

	int a_out = a[my_id];

	if((i >= mx && i <= mx+bs) && (j >= my && j <= my+bs)) {a_out = 1;}	

	a[my_id] = a_out; 
	*/
    
}
