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

	//if( (gl_FragCoord.x > x) && (gl_FragCoord.x < x+w) && (gl_FragCoord.y > y) && (gl_FragCoord.y < y+h) ) { 
		float centerx = w / 2.0;
		float centery = h / 2.0;
		if(sqrt(((gl_FragCoord.x-(x+centerx))*(gl_FragCoord.x-(x+centerx))) + ((gl_FragCoord.y-(y+centery))*(gl_FragCoord.y-(y+centery)))) <= sqrt((centerx*centerx)+(centery*centery))) {
			gl_FragColor = vec4(value, g, b, 1.0); 
		}
	//}





	/*vec2 center = vec2(0.5, 0.5);
	float radius = 0.5;

	float distanceFromCenter = 0.6;// distance(center, gl_FragCoord);
    float checkForPresenceWithinCircle = step(distanceFromCenter, radius);

    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0) * checkForPresenceWithinCircle; */




    /*
	unsigned int i = get_global_id(0);
	unsigned int j = get_global_id(1);
	unsigned int my_id = i + ySize*j;
	unsigned int mouse_id = mx + ySize*my;

	int a_out = a[my_id];

	if((i >= mx && i <= mx+bs) && (j >= my && j <= my+bs)) {
		a_out = 1;
	}	

	a[my_id] = a_out; 
	*/
    
}
