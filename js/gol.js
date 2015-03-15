/**
 * Game of Life simulation and display.
 * @param {HTMLCanvasElement} canvas Render target
 * @param {number} [scale] Size of each cell in pixels (power of 2)
 */
function GOL(canvas, scale) {
    var igloo = this.igloo = new Igloo(canvas);
    var gl = igloo.gl;
    if (gl == null) {
        alert('Could not initialize WebGL!');
        throw new Error('No WebGL');
    }
    scale = this.scale = scale || 1;
    var w = canvas.width, h = canvas.height;
	this.canvas = canvas;
    this.viewsize = new Float32Array([w, h]);
    this.statesize = new Float32Array([w / scale, h / scale]);
    this.timer = null;
    this.lasttick = GOL.now();
    this.fps = 0;
	this.export_image = null;
	this.export_images = new Array();
	this.gen = 0;
	this.render_frame = 0;
	this.recordnow = false;

	this.player_x = w/2+12;
	this.player_y = h/2+12;

	this.p_move_x = 0;
	this.p_move_y = 0;
	
	this.p_move_L = 0;
	this.p_move_R = 0;
	this.p_move_U = 0;
	this.p_move_D = 0;

	this.bullets = new Array();
	
	this.bullet_x = this.statesize[0]/2;
	this.bullet_y = this.statesize[1]/2;
	this.bullet_exists = false;
	this.bullet_life = 0;
	this.bullet_size = 9;
	this.bullet_val = 0;

	this.l_click = false;
	this.r_click = false;
	this.mouse_x = 0
	this.mouse_y = 0

	


    gl.disable(gl.DEPTH_TEST);
    this.programs = {
        copy: igloo.program('glsl/quad.vert', 'glsl/copy.frag'),
        gol:  igloo.program('glsl/quad.vert', 'glsl/gol.frag'),
        evo:  igloo.program('glsl/quad.vert', 'glsl/evo.frag'),
        orbw:  igloo.program('glsl/quad.vert', 'glsl/orbwave.frag'),
        MiniAtomConway:  igloo.program('glsl/quad.vert', 'glsl/MiniAtomConway.frag'),
        MicroFeeders:  igloo.program('glsl/quad.vert', 'glsl/MicroFeeders-2.frag'),
        ManyRings:  igloo.program('glsl/quad.vert', 'glsl/ManyRings.frag'),
        Microbes:  igloo.program('glsl/quad.vert', 'glsl/EF741-2.frag'),
        Tether:  igloo.program('glsl/quad.vert', 'glsl/Tether.frag'),
        Feed12:  igloo.program('glsl/quad.vert', 'glsl/Feeders12.frag'),
        MiniAtom:  igloo.program('glsl/quad.vert', 'glsl/MiniAtom-1.frag'),
        AtomSmall:  igloo.program('glsl/quad.vert', 'glsl/AtomSmall.frag'),
        ShiftCells:  igloo.program('glsl/quad.vert', 'glsl/ShiftCells.frag'),
        PlaceCells:  igloo.program('glsl/quad.vert', 'glsl/PlaceCells.frag')
    };
    this.buffers = {
        quad: igloo.array(Igloo.QUAD2)
    };
    this.textures = {
        front: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        back: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        rend: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        rendback: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1])
    };
    this.framebuffers = {
        step: igloo.framebuffer()
    };
    this.setRandom();

}


GOL.prototype.exportImage = function(gl, texture, width, height) {
    // Create a framebuffer backed by the texture
    var framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    // Read the contents of the framebuffer
    var data = new Uint8Array(width * height * 4);
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);

    gl.deleteFramebuffer(framebuffer);

    // Create a 2D canvas to store the result 
    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext('2d');

    // Copy the pixels to a 2D canvas
    var imageData = context.createImageData(width, height);
    imageData.data.set(data);
    context.putImageData(imageData, 0, 0);

    var img = new Image();
    img.src = canvas.toDataURL("image/png");

	//document.write('<img src="'+img.src+'"/> <img src="'+img.src+'"/>');

    return img.src;
};


GOL.prototype.imageDump = function() {



	var s = "";
	for (var i = 0; i < gol.export_images.length; i++) {
		s = s + '<img src="'+gol.export_images[i]+'"/>';
	}
	var newWindow = window.open();
	newWindow.document.write(s);
	newWindow.document.close();
	gol.export_images = new Array()



	/*var a = window.document.createElement('a');
	a.href = window.URL.createObjectURL(new Blob(s, {type: 'html'}));
	a.download = 'indexTest.html';

	// Append anchor to body.
	document.body.appendChild(a)
	a.click();

	// Remove anchor from body
	document.body.removeChild(a)*/



};

/**
 * @returns {number} The epoch in integer seconds
 */
GOL.now = function() {
    return Math.floor(Date.now() / 1000);
};


/**
 * Compact a simulation state into a bit array.
 * @param {Object} state Array-like state object
 * @returns {ArrayBuffer} Compacted bit array
 */
GOL.compact = function(state) {
    var compact = new Uint8Array(state.length / 8);
    for (var i = 0; i < state.length; i++) {
        var ii = Math.floor(i / 8),
            shift = i % 8,
            bit = state[i] ? 1 : 0;
        compact[ii] |= bit << shift;
    }
    return compact.buffer;
};

/**
 * Expand a simulation state from a bit array.
 * @param {ArrayBuffer} compact Compacted bit array
 * @returns {Object} Array-like state object
 */
GOL.expand = function(buffer) {
    var compact = new Uint8Array(buffer),
        state = new Uint8Array(compact.length * 8);
    for (var i = 0; i < state.length; i++) {
        var ii = Math.floor(i / 8),
            shift = i % 8;
        state[i] = (compact[ii] >> shift) & 1;
    }
    return state;
};

/**
 * Set the entire simulation state at once.
 * @param {Object} state Boolean array-like
 * @returns {GOL} this
 */
GOL.prototype.set = function(state) {
    var gl = this.igloo.gl;
    var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);
    for (var i = 0; i < state.length; i++) {
        var ii = i * 4;
        rgba[ii + 0] = rgba[ii + 1] = rgba[ii + 2] = state[i] ? 255 : 0;
        rgba[ii + 3] = 255;
    }
    this.textures.front.subset(rgba, 0, 0, this.statesize[0], this.statesize[1]);
    return this;
};

/**
 * Fill the entire state with random values.
 * @param {number} [p] Chance of a cell being alive (0.0 to 1.0)
 * @returns {GOL} this
 */
GOL.prototype.setRandom = function(p) {
    var gl = this.igloo.gl, size = this.statesize[0] * this.statesize[1];
    p = p == null ? 0.37 : p;
    var rand = new Uint8Array(size);
    for (var i = 0; i < size; i++) {
        rand[i] = Math.random() < p ? 1 : 0;
    }
    this.set(rand);
    return this;
};

/**
 * Clear the simulation state to empty.
 * @returns {GOL} this
 */
GOL.prototype.setEmpty = function() {
    this.set(new Uint8Array(this.statesize[0] * this.statesize[1]));
    return this;
};

/**
 * Swap the texture buffers.
 * @returns {GOL} this
 */
GOL.prototype.swap = function() {
    var tmp = this.textures.front;
    this.textures.front = this.textures.back;
    this.textures.back = tmp;
    return this;
};


GOL.prototype.swap_rend = function() {

    //this.textures.rend = this.textures.front;

	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.rend);
    this.textures.front.bind(1);
    this.textures.rend.bind(0);

	this.programs.copy.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('render', 1)
        .uniform('scale', this.viewsize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};


/**
 * Step the Game of Life state on the GPU without rendering anything.
 * @returns {GOL} this
 */
GOL.prototype.step = function() {
    if (GOL.now() != this.lasttick) {
        $('.fps').text(this.fps + ' FPS');
        this.lasttick = GOL.now();
        this.fps = 0;
    } else {
        this.fps++;
    }
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.back);
    this.textures.front.bind(0);
    gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.Microbes.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);
    this.swap();
    return this;
};



GOL.prototype.place_cell_rend = function(x, y, size, value) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.rend);
    this.textures.rend.bind(0);
    gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCells.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('x', x - size/2)
        .uniform('y', y - size/2)
        .uniform('size', size)
        .uniform('value', value)
        .draw(gl.TRIANGLE_STRIP, 4);
    //this.swap();
    return this;
};

GOL.prototype.place_cell_world = function(x, y, size, value) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.front);
    this.textures.front.bind(0);
    gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCells.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('x', x - (size/2))
        .uniform('y', y - (size/2))
        .uniform('size', size)
        .uniform('value', value)
        .draw(gl.TRIANGLE_STRIP, 4);
    
	//this.swap_rend();
    return this;
};




GOL.prototype.shift = function() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.back);
    this.textures.front.bind(0);
    gl.viewport(0, 0, this.statesize[0], this.statesize[1]);

	this.p_move_x =  this.p_move_L + this.p_move_R;
	this.p_move_y = this.p_move_U + this.p_move_D;

    this.programs.ShiftCells.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('mx', this.p_move_x)
        .uniform('my', this.p_move_y)
        .draw(gl.TRIANGLE_STRIP, 4);

    this.swap();

    return this;
};


/**
 * Render the Game of Life state stored on the GPU.
 * @returns {GOL} this
 */
GOL.prototype.draw = function() {
    var gl = this.igloo.gl;
    this.igloo.defaultFramebuffer.bind();
    this.textures.front.bind(0);
    this.textures.rend.bind(1);
    gl.viewport(0, 0, this.viewsize[0], this.viewsize[1]);
    this.programs.copy.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('render', 1)
        .uniform('scale', this.viewsize)
        .draw(gl.TRIANGLE_STRIP, 4);
    return this;
};


/**
 * Set the state at a specific position.
 * @param {number} x
 * @param {number} y
 * @param {boolean} state True/false for live/dead
 * @returns {GOL} this
 */
GOL.prototype.placeBoth = function(x, y, size, valRend, valWorld) {
	gol.place_cell_rend(x,y,size,valRend);
	gol.place_cell_world(x,y,size,valWorld);
    return this;
};

GOL.prototype.create_bullet = function() {
	this.bullet_x = (this.statesize[0]/2) + ((gol.mouse_x - this.statesize[0]/2)/4);
	this.bullet_y = (this.statesize[1]/2) + ((gol.mouse_y - this.statesize[1]/2)/4);
	this.bullet_exists = true;
	gol.bullet_size = 23;
	gol.bullet_life = 0;
	gol.bullet_val = 0;
    return this;
};

GOL.prototype.animate_bullets = function(bullets) {
	if(gol.bullet_exists) {
		gol.bullet_x += (gol.mouse_x - this.statesize[0]/2)/80;
		gol.bullet_y += (gol.mouse_y - this.statesize[1]/2)/80;
		gol.bullet_life += 1;

		if(gol.bullet_size >= 10) {gol.bullet_size -= 1; } else { gol.bullet_val = 1;}

		if(gol.bullet_life >= 60) {	
			gol.bullet_life = 0;
			gol.bullet_size = 45;
			gol.bullet_val = 1;
			gol.bullet_exists = false;
		}

		gol.RunBullet(this);
	}

	

    /*for (var i = 0; i < bullets.length; i++) {
		bullets[i].next_step();
    }*/
	
    return this;
};

/**
 * @returns {Object} Boolean array-like of the simulation state
 */
GOL.prototype.get = function() {
    var gl = this.igloo.gl, w = this.statesize[0], h = this.statesize[1];
    this.framebuffers.step.attach(this.textures.front);
    var rgba = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    var state = new Uint8Array(w * h);
    for (var i = 0; i < w * h; i++) {
        state[i] = rgba[i * 4] > 128 ? 1 : 0;
    }
    return state;
};

/**
 * Run the simulation automatically on a timer.
 * @returns {GOL} this
 */
GOL.prototype.start = function(canvas) {
    if (this.timer == null) {
        this.timer = setInterval(function(){
			
			for (var i = 0; i < 1; i++) {
				gol.shift();
				gol.step();

				if(gol.l_click) {/*gol.place_cell_world(gol.mouse_x, gol.mouse_y, 33, 0);*/ gol.create_bullet();} //interacting
				if(gol.r_click) {gol.place_cell_world(gol.mouse_x, gol.mouse_y, 17, 1);} //interacting

				gol.animate_bullets();
				gol.swap_rend();
				gol.RunPlayer(gol); //noninteracting
				
			}
        	
			gol.draw();	

			if (gol.recordnow === true) {
				gol.gen += 1;
				if((gol.gen > 600 && gol.gen % 100 === 0) || (gol.gen < 600 && gol.gen % 10 === 0) || (gol.gen < 30)){
					gol.export_image = gol.exportImage(gol.igloo.gl, gol.textures.front.texture, gol.canvas.width, gol.canvas.height);
					gol.export_images.push(gol.export_image);
					gol.render_frame += 1;

					if(gol.render_frame % 60 === 0)	{
						alert("Download");
						gol.imageDump();
					}
				}
			}
        }, 16.7);
    }
    return this;
};

/**
 * Stop animating the simulation.
 * @returns {GOL} this
 */
GOL.prototype.stop = function() {
    clearInterval(this.timer);
    this.timer = null;
    return this;
};

/**
 * Toggle the animation state.
 * @returns {GOL} this
 */
GOL.prototype.toggle = function() {
    if (this.timer == null) {
        this.start();
    } else {
        this.stop();
    }
};

/**
 * Find simulation coordinates for event.
 * This is a workaround for Firefox bug #69787 and jQuery bug #8523.
 * @returns {Array} target-relative offset
 */
GOL.prototype.eventCoord = function(event) {
    var $target = $(event.target),
        offset = $target.offset(),
        border = 1,
        x = event.pageX - offset.left - border,
        y = $target.height() - (event.pageY - offset.top - border);
    return [Math.floor(x / this.scale), Math.floor(y / this.scale)];
};






function addGUI() { 
    var gui = new dat.GUI(),
        cont = new myConfig();

    gui.add(cont, 'testBool').name('TestMenu');
    gui.add(cont, 'testInt').name('TestMenu');
    gui.add(cont, 'testInt', 0, 20).step(1).name('TestMenu').onFinishChange(testFoo);

	function testFoo() {
        alert("TEST GUI Response");
    }
	
}

function myConfig() {
	this.testInt = 0;
	this.testBool = false;
}






/**
 * Manages the user interface for a simulation.
 */
function Controller(gol) {
    this.gol = gol;
    var _this = this,
        $canvas = $(gol.igloo.canvas);
    this.drag = null;

	addGUI()

	$canvas.on('mousedown', function(event) {
		switch (event.which) {
			case 1:
				gol.l_click = true;
				break;
			case 3:
				gol.r_click = true;
				break;
		}
    });
    $canvas.on('mouseup', function(event) {
		switch (event.which) {
			case 1:
				gol.l_click = false;
				break;
			case 3:
				gol.r_click = false;
				break;
		}
    });

	$canvas.on('mousemove', function(event) {
        var pos = gol.eventCoord(event);
        gol.mouse_x = pos[0];
		gol.mouse_y = pos[1];
    });	

    $(document).on('keydown', function(event) {
		switch (event.which) {
		    case 87: /* W */
				if (gol.p_move_y < 2){ gol.p_move_U = 2; }
		        break;
		    case 65: /* A */
		        if (gol.p_move_x > -2){ gol.p_move_L = -2; }
		        break;
		    case 83: /* S */
		        if (gol.p_move_y > -2){ gol.p_move_D = -2; }
		        break;
		    case 68: /* D */
		        if (gol.p_move_x < 2){ gol.p_move_R = 2; }
		        break;
		};
    });

    $canvas.on('contextmenu', function(event) {
        event.preventDefault();
        return false;
    });
    $(document).on('keyup', function(event) {
        switch (event.which) {
        case 82: /* r */
            gol.setRandom();
            gol.draw();
            break;
        case 46: /* [delete] */
            gol.setEmpty();
            gol.draw();
            break;
        case 32: /* [space] */
            gol.toggle();
            break;
		
		
		case 87: /* W */
		    gol.p_move_U = 0;
		    break;
		case 65: /* A */
		    gol.p_move_L = 0;
		    break;
		case 83: /* S */
		    gol.p_move_D = 0;
		    break;
		case 68: /* D */
		    gol.p_move_R = 0;
		    break;
        };
    });
}


/**
 * Player controller
 */
GOL.prototype.RunPlayer = function(gol) {
	//alert("Player Test");
    this.gol = gol;
    var _this = this,
        $canvas = $(gol.igloo.canvas);

	gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, 13, 1)

	return this;
}

GOL.prototype.RunBullet = function(gol) {
	//alert("Player Test");
    this.gol = gol;
    var _this = this,
        $canvas = $(gol.igloo.canvas);

	gol.placeBoth(gol.bullet_x, gol.bullet_y, gol.bullet_size, 1, gol.bullet_val);

	return this;
}




/* Initialize everything. */
var gol = null, controller = null, player = null;
$(document).ready(function() {
    var $canvas = $('#life');
    gol = new GOL($canvas[0]).draw().start($canvas[0]);
    controller = new Controller(gol); //GUI
});

/* Don't scroll on spacebar. */
$(window).on('keydown', function(event) {
    return !(event.keyCode === 32);
});
