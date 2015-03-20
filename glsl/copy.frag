precision mediump float;

uniform sampler2D state;
uniform sampler2D render;
uniform vec2 scale;

void main() {

	gl_FragColor = texture2D(state, gl_FragCoord.xy / scale);
    gl_FragColor = texture2D(render, gl_FragCoord.xy / scale);

}
