/**
 * Game of Life simulation and display.
 * @param {HTMLCanvasElement} canvas Render target
 * @param {number} [scale] Size of each cell in pixels (power of 2)
 */
function GOL(canvas, scale) {

	// Core Engine
    var igloo = this.igloo = new Igloo(canvas);
    var gl = igloo.gl;
    if (gl == null) {
        alert('Could not initialize WebGL!');
        throw new Error('No WebGL');
    }
    scale = this.scale = 1;
    var w = canvas.width, h = canvas.height;
	this.canvas = canvas;
    this.viewsize = new Float32Array([w, h]);
    this.statesize = new Float32Array([w / scale, h / scale]);
    this.timer = null;
    this.lasttick = GOL.now();
    this.fps = 0;
	this.fps_target = 33.3; //Determines framerate. 66.6 = 15fps, 33.3 = 30fps, 16.7 = 60fps

	//Record function
	this.export_image = null;
	this.export_images = new Array();
	this.gen = 0;
	this.render_frame = 0;
	this.recordnow = false;

	//Player definition & control
	this.player_size = 13;
	this.player_x = w/scale/2+(this.player_size/2);
	this.player_y = h/scale/2+(this.player_size/2);
	this.p_move_x = 0;
	this.p_move_y = 0;
	this.p_move_L = 0;
	this.p_move_R = 0;
	this.p_move_U = 0;
	this.p_move_D = 0;
	this.p_speed = 2;	

	//User input controls
	this.l_click = false;
	this.r_click = false;
	this.melee_on = false;
	this.mouse_x = 0
	this.mouse_y = 0
	this.space_down = false;

	//Player Stats
	this.p_health_max = 3000;
	this.p_health = this.p_health_max;
	this.p_fuel = 1000;
	this.p_power_max = 1000;
	this.p_power = this.p_power_max;

	//Player projectile offence (OLD, port to array)
	this.can_shoot = true;
	this.bullet_x = this.statesize[0]/2;
	this.bullet_y = this.statesize[1]/2;
	this.bullet_exists = false;
	this.bullet_life = 0;
	this.bullet_size = 12;
	this.bullet_val = 0;
	this.b_targ_x = 0;
	this.b_targ_y = 0;

	this.bullets = new Array();

	//Enemy projectile offence (OLD, port to array)
	this.enm_can_shoot = true;
	this.enm_bullet_x = 0;
	this.enm_bullet_y = 0;
	this.enm_b_start_x = 0;
	this.enm_b_start_y = 0;
	this.enm_bullet_exists = false;
	this.enm_bullet_life = 0;
	this.enm_bullet_life_max = 0;
	this.enm_bullet_size = 33;
	this.enm_bullet_val = 1;
	this.enm_b_targ_x = this.statesize[0]/2;
	this.enm_b_targ_y = this.statesize[1]/2;
	this.enemy_cooldown = 180 + Math.floor(Math.random()*350);


	//CA collision detection
	this.p_hit = new Uint8Array(this.player_size * this.player_size * 4);
	this.hitmod = 1; //ticker for GPU hittest
	this.hitrate = 2; //GPU hittest cooldown

	//Player shield
	this.p_shield_cooldown = 0;
	this.p_shield_size_max = 8;
	this.p_shield_size = this.player_size+2;
	this.p_s_burstsize = 100;
	this.p_s_burstcooldown = 30;

	//Which level?
	this.active_rule = 0;

	//Regen waypoint handling (OLD, port to array)
	this.wp_x=0;
	this.wp_y=0;
	this.wp_jumptime = 0;
	this.wp_jumptime_max = 0;

	//Scorekeeping
	this.game_score = 0;

	//Placeable Barrier object
	this.barriers = new Array();
	this.barrier_size = 18;
	this.place_barrier_cooldown = 0;
	this.barrier_life_max = 900;
	

    gl.disable(gl.DEPTH_TEST); //disables alpha channels? not sure.

	//Load the shaders
	//This causes massive CPU usage spike that crashes or triggers panic decapture.
	//Follow up for chrome fix.
	//
	//	Load these one at a time?
	//	Keep the neighbourhoods CPU-side?
	//

    this.programs = {
        copy: igloo.program('glsl/quad.vert', 'glsl/copy.frag'),
        gol:  igloo.program('glsl/quad.vert', 'glsl/gol.frag'),
        evo:  igloo.program('glsl/quad.vert', 'glsl/evo.frag'),
        orbw:  igloo.program('glsl/quad.vert', 'glsl/orbwave-2.frag'),
        MiniAtomConway:  igloo.program('glsl/quad.vert', 'glsl/MiniAtomConway.frag'),
        MicroFeeders:  igloo.program('glsl/quad.vert', 'glsl/MicroFeeders-1.frag'),
        //ManyRings:  igloo.program('glsl/quad.vert', 'glsl/ManyRings.frag'),
        Microbes:  igloo.program('glsl/quad.vert', 'glsl/EF741-2.frag'),
        Tether:  igloo.program('glsl/quad.vert', 'glsl/Tether.frag'),
        Feeders:  igloo.program('glsl/quad.vert', 'glsl/Feeders12-3.frag'),
        MiniAtom:  igloo.program('glsl/quad.vert', 'glsl/MiniAtom-2.frag'),
        Waves:  igloo.program('glsl/quad.vert', 'glsl/Waves.frag'),
        Dunes:  igloo.program('glsl/quad.vert', 'glsl/Dunes.frag'),
        Sweeper:  igloo.program('glsl/quad.vert', 'glsl/Sweeper.frag'),
        //AtomSmall:  igloo.program('glsl/quad.vert', 'glsl/AtomSmall.frag'),
        ShiftCells:  igloo.program('glsl/quad.vert', 'glsl/ShiftCells.frag'),
        PlaceCells:  igloo.program('glsl/quad.vert', 'glsl/PlaceCells.frag')
    };

	//Rule & seed selection containers
	this.rule_array = new Array(12);
	this.rule_seeds = new Array(12);

	//set the seed strength defaults
	for (var i = 0; i < this.rule_seeds.length; i++){
		this.rule_seeds[i] = 0.37;
	}

	//Define the rules
	this.rule_array[0] = this.programs.MiniAtomConway;
	this.rule_array[1] = this.programs.gol;
	this.rule_array[2] = this.programs.evo;
	this.rule_array[3] = this.programs.Tether;
	this.rule_array[4] = this.programs.MicroFeeders;
	this.rule_array[5] = this.programs.MiniAtom;
	this.rule_array[6] = this.programs.Microbes;
	this.rule_array[7] = this.programs.orbw;
	this.rule_array[8] = this.programs.Feeders;
	this.rule_array[9] = this.programs.Waves;
	this.rule_array[10] = this.programs.Dunes;
	this.rule_array[11] = this.programs.Sweeper;

	//Assign unique seed strengths to rules' indexes
	this.rule_seeds[5] = 0.39;
	this.rule_seeds[6] = 0.34;
	this.rule_seeds[8] = 0.43;
	this.rule_seeds[9] = 0.31;
	this.rule_seeds[10] = 0.31;
	this.rule_seeds[11] = 0.33;


	//Create the quad that displays the texture
    this.buffers = {
        quad: igloo.array(Igloo.QUAD2)
    };

	//Define the textures to be used
    this.textures = {
        front: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        back: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        rend: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1])
    };

	//Bind textures to this so they can be drawn to
    this.framebuffers = {
        step: igloo.framebuffer()
    };

	//Randomise the worldspace
    this.setRandom();

	//clear the CA in an area around the player
	this.place_cell_world(this.statesize[0]/scale/2, this.statesize[1]/scale/2, this.statesize[0]/3, this.statesize[1]/3, 0, 0, 0);
}




/* ************************
//     GPU functions     //
************************ */

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
    p = p == null ? this.rule_seeds[this.active_rule] : p;
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

//Overlays the CA world (front) and Player-world (rend) textures
GOL.prototype.swap_rend = function() {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.rend);

	//Bind both textures
    this.textures.front.bind(1);
    this.textures.rend.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.copy.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('render', 1)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};


/**
 * Step the selected rule without rendering anything.
 * @returns {GOL} this
 */
GOL.prototype.step = function() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.back);
    this.textures.front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.rule_array[this.active_rule].use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);
    this.swap();
    return this;
};


//draw a rectangle only on the rend texture
GOL.prototype.place_cell_rend = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.rend);
    this.textures.rend.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCells.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('x', x - w/2)
        .uniform('y', y - h/2)
        .uniform('w', w)
        .uniform('h', h)
        .uniform('value', r)
        .uniform('g', g)
        .uniform('b', b)
        .draw(gl.TRIANGLE_STRIP, 4);
    return this;
};


//draw a rectangle only on the CA texture (front)
GOL.prototype.place_cell_world = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.front);
    this.textures.front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCells.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('x', x - w/2)
        .uniform('y', y - h/2)
        .uniform('w', w)
        .uniform('h', h)
        .uniform('value', r)
        .uniform('g', g)
        .uniform('b', b)
        .draw(gl.TRIANGLE_STRIP, 4);
    return this;
};



//Offset the 'front' texture by the the player's movements
GOL.prototype.shift = function() {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.back);
    this.textures.front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);

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
 * Render the rend texture stored on the GPU.
 * @returns {GOL} this
 */
GOL.prototype.draw = function() {
    var gl = this.igloo.gl;
    this.igloo.defaultFramebuffer.bind();
    this.textures.front.bind(0);
    this.textures.rend.bind(1);
    gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.copy.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('render', 1)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);
    return this;
};


//Create a square at the location and size in both rend and front textures
GOL.prototype.placeBoth = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_cell_rend(x*gol.scale,y*gol.scale,size*gol.scale,size*gol.scale,valRend,g,b);
	gol.place_cell_world(x,y,size,size,valWorld,g,b);
    return this;
};


/* ************************
//   End GPU functions   //
************************ */


// ---------------------------------------


/* ************************
//   General functions   //
************************ */

/**
 * Run the simulation automatically on a timer.
 * @returns {GOL} this
 */

//    MAIN LOOP

GOL.prototype.start = function(canvas) {
    if (this.timer == null) {
        this.timer = setInterval(function(){
			

			//Once a second, refresh the FPS counter (and temporarily game score)
			if (GOL.now() != this.lasttick) {
				$('.fps').text(this.fps + ' FPS  |  Score: ' + gol.game_score);
				this.lasttick = GOL.now();
				this.fps = 0;
			} else {
				this.fps++;
			}
			

			//Offset the CA texture (front) by player's movements
			gol.shift();
			
			//Compute the next frame(s) of the CA
			for (var i = 0; i < 1; i++) {
				//if((gol.p_move_L + gol.p_move_R != 0) || (gol.p_move_U + gol.p_move_D != 0)) {gol.step();}
				gol.step();
			}
			
        	gol.Deflect();					//CPU Hit tests
			gol.animate_bullets();			//Progress Player Bullet calcs
			gol.enm_animate_bullets();		//Progress Enemy Bullet calcs
			gol.swap_rend();				//Merge the CA and Player texture layers
			gol.run_barrier();				//Progress Barrier calcs
			gol.health_waypoint();			//Progress Waypoint calcs
			gol.RunPlayer();				//Progress Player calcs
			gol.RunEnemy();					//Enemy Bullet timer calcs
			gol.draw();						//Render the final texture to the screen


			//Image Export handler
			if (gol.recordnow === true) {
				gol.gen += 1;
				if((gol.gen > 600 && gol.gen % 100 === 0) || (gol.gen < 600 && gol.gen % 10 === 0) || (gol.gen < 30)){
					gol.export_image = gol.exportImage(gol.igloo.gl, gol.textures.rend.texture, gol.canvas.width, gol.canvas.height);
					gol.export_images.push(gol.export_image);
					gol.render_frame += 1;

					if(gol.render_frame % 60 === 0)	{
						alert("Download");
						gol.imageDump();
					}
				}
			}

        }, this.fps_target);     //Determines framerate. 66.6 = 15fps, 33.3 = 30fps, 16.7 = 60fps
    }
    return this;
};


//Capture the data from the given texture, and return a base64 png image
GOL.prototype.exportImage = function(gl, texture, width, height) {

	// Does this need to be done each time?
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

	// Turn the image data int a base64-encoded PNG 
    var img = new Image();
    img.src = canvas.toDataURL("image/png");

    return img.src;
};

//Export saved PNG images to a new tab for viewing.
GOL.prototype.imageDump = function() {

	//Write a html document containing the images
	var s = "";
	for (var i = 0; i < gol.export_images.length; i++) {
		s = s + '<img src="'+gol.export_images[i]+'"/>';
	}
	
	//open a new tab and display the images
	var newWindow = window.open();
	newWindow.document.write(s);
	newWindow.document.close();

	//Clear the images from memory
	gol.export_images = new Array()


	//unused test function for prompting the user to download the images
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


//Builds the menu & event handlers
function addGUI() { 
    var gui = new dat.GUI(),
        cont = new myConfig();

    gui.add(cont, 'testBool').name('Enable 60fps').onFinishChange(fpsChange);
    gui.add(cont, 'testBool').name('Pause').onFinishChange(tog);
    //gui.add(cont, 'testInt').name('TestMenu');
    //gui.add(cont, 'testInt', 0, 20).step(1).name('TestMenu').onFinishChange(testFoo);
	gui.add(cont, 'testInt', {
		'Conway/Atom': 0,
		'Conway\'s GoL': 1,
		'Replicators': 2,
		'Tether': 3,
		'Feeders': 4,
		'Acid Eggs': 5,
		'Molecules': 6,
		'Orbwave': 7,
		//'Many Rings': 8,
		'Network': 8,
		'Waves': 9,
		'Dunes': 10,
		'Sweeper': 11
	}).name('Algorithm').onChange(set_rule);

	function testFoo(value) {
        alert("TEST GUI Response: " + value);
    }

	function tog(){
		gol.toggle();
	}

	function fpsChange(value) {
		gol.toggle();
        if(value) {gol.fps_target = 16.7; }
        if(!value) {gol.fps_target = 33.3;}
		gol.toggle();
    }

	function set_rule(value){
		gol.active_rule = value;
		gol.setRandom();
		gol.player_reset();
	}
	
}

function myConfig() {
	this.testInt = 0;
	this.testBool = false;
}


/**
 * Manages the user input interface for a simulation.
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
				gol.melee_on = false;
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
				if (gol.p_move_y < gol.p_speed){ gol.p_move_U = gol.p_speed; }
		        break;
		    case 65: /* A */
		        if (gol.p_move_x > -gol.p_speed){ gol.p_move_L = -gol.p_speed; }
		        break;
		    case 83: /* S */
		        if (gol.p_move_y > -gol.p_speed){ gol.p_move_D = -gol.p_speed; }
		        break;
		    case 68: /* D */
		        if (gol.p_move_x < gol.p_speed){ gol.p_move_R = gol.p_speed; }
		        break;    
			case 32: /* D */
				if(gol.p_s_burstcooldown <= 0 && !gol.space_down) {gol.space_down = true;}
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
			gol.player_reset();
            break;
        case 46: /* [delete] */
            gol.setEmpty();
            gol.draw();
            break;
        case 32: /* [space] */
            //gol.toggle();
			//gol.space_down = false;
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

/* ************************
// End General functions //
************************ */


// ---------------------------------------


/* *********************************
//    Game-specific functions     //
********************************* */

GOL.prototype.create_bullet = function() {
	/*
	var cost = 120;
	if(gol.p_power >= cost){
		this.bullet_x = (this.statesize[0]/this.scale/2);
		this.bullet_y = (this.statesize[1]/this.scale/2);
		this.bullet_exists = true;
		gol.bullet_size = 12;
		gol.bullet_life = 0;
		gol.bullet_val = 0;
		gol.p_power -= cost;
		gol.b_targ_x = (gol.mouse_x - this.statesize[0]/2);
		gol.b_targ_y = (gol.mouse_y - this.statesize[1]/2);
	}
	*/
    return this;
};

GOL.prototype.enm_create_bullet = function() {
	/*
	gol.enm_b_start_x = Math.random()*this.statesize[0];
	gol.enm_b_start_y = Math.random()*this.statesize[1];

	if(!gol.cpu_hit_test(this.statesize[0]/2, gol.enm_b_start_x, this.statesize[1]/2, gol.enm_b_start_y, 128, 1)) {

		this.enm_bullet_x = gol.enm_b_start_x;
		this.enm_bullet_y = gol.enm_b_start_y;
		this.enm_bullet_exists = true;
		gol.enm_bullet_size = (Math.random()*17)+4;
		gol.enm_bullet_life_max = (Math.random()*100)+45;
		gol.enm_bullet_life = 0;
		gol.enm_bullet_val = 1;
		gol.enm_b_targ_x = (this.statesize[0]/2);
		gol.enm_b_targ_y = (this.statesize[1]/2);
	} else {
		gol.enm_create_bullet();
	}
	*/
    return this;
};


GOL.prototype.create_melee = function() {
	/*
	if(gol.bullet_life == 0) {
		this.bullet_x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/4);
		this.bullet_y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/4);
		this.bullet_exists = true;
		if(gol.p_power >= 333) {
			gol.bullet_size = 9+16;
		} else { gol.bullet_size = 9+(gol.p_power/1000)*48;}
		
		gol.bullet_life = -1;
		gol.bullet_val = 0;
		gol.p_power -= 7;
	}
	*/
    return this;
};

GOL.prototype.animate_bullets = function() {
	/*
	var lifespan = 15;
	if(gol.bullet_exists && gol.bullet_life >= 0 && gol.bullet_life <= lifespan) {

		gol.bullet_x += (gol.b_targ_x/lifespan)-gol.p_move_x;		 //(gol.mouse_x - this.statesize[0]/2)/lifespan;
		gol.bullet_y += (gol.b_targ_y/lifespan)-gol.p_move_y; 		//(gol.mouse_y - this.statesize[1]/2)/lifespan;

		gol.bullet_life += 1;
		
		if(gol.bullet_life >= lifespan) {	
			gol.bullet_size = 47;
			gol.bullet_val = 1;
			gol.placeBoth(gol.bullet_x, gol.bullet_y, gol.bullet_size, 0, 0, 1, 0);
			gol.placeBoth(gol.bullet_x, gol.bullet_y, gol.bullet_size/4, 1, 1, 0, 0);
		} else {
			gol.placeBoth(gol.bullet_x, gol.bullet_y, gol.bullet_size, 1, gol.bullet_val, 1, 0);
			gol.placeBoth(gol.bullet_x-(gol.b_targ_x/lifespan/2), gol.bullet_y-(gol.b_targ_y/lifespan/2), gol.bullet_size, 1, gol.bullet_val, 1, 0);
		}

	} else if(gol.bullet_life >= lifespan) {
		gol.bullet_exists = false;
		gol.bullet_life = 0;
	}
	
	if(gol.bullet_exists && gol.bullet_life < 0) {
		gol.bullet_x += (gol.mouse_x - this.statesize[0]/2)/30;
		gol.bullet_y += (gol.mouse_y - this.statesize[1]/2)/30;
		gol.bullet_life = 0;
		gol.bullet_exists = false;

		gol.placeBoth(gol.bullet_x, gol.bullet_y, gol.bullet_size, 1, gol.bullet_val, 1, 0);
		gol.placeBoth(gol.bullet_x, gol.bullet_y, gol.bullet_size/4, 1, 1, 0, 0);
	}
	*/
    return this;
};


GOL.prototype.enm_animate_bullets = function() {
	/*
	var lifespan = gol.enm_bullet_life_max;
	if(gol.enm_bullet_exists && gol.enm_bullet_life >= 0) {

		gol.enm_bullet_x += ((gol.enm_b_targ_x-gol.enm_b_start_x)/lifespan)-gol.p_move_x;		 //(gol.mouse_x - this.statesize[0]/2)/lifespan;
		gol.enm_bullet_y += ((gol.enm_b_targ_y-gol.enm_b_start_y)/lifespan)-gol.p_move_y; 		//(gol.mouse_y - this.statesize[1]/2)/lifespan;

		gol.enm_bullet_life += 1;

		gol.placeBoth(gol.enm_bullet_x, gol.enm_bullet_y, gol.enm_bullet_size, 1, gol.enm_bullet_val, 0.2, 0);
		gol.placeBoth(gol.enm_bullet_x, gol.enm_bullet_y, gol.enm_bullet_size/2, 1, gol.enm_bullet_val, 0.8, 0);
		//gol.placeBoth(gol.bullet_x-(gol.b_targ_x/lifespan/2), gol.bullet_y-(gol.b_targ_y/lifespan/2), gol.bullet_size, 1, gol.bullet_val, 1, 0);
		
		if(gol.enm_bullet_life >= lifespan*1.3) {	
			gol.enm_bullet_life = 0;
			gol.enm_bullet_exists = false;
		}

	}

	*/

    return this;
};



GOL.prototype.Deflect = function() {
	/*
	if(gol.enm_bullet_exists && gol.space_down && gol.p_s_burstcooldown <= 0) {
		if(gol.cpu_hit_test(this.statesize[0]/2, gol.enm_bullet_x, this.statesize[1]/2, gol.enm_bullet_y, gol.p_s_burstsize*(gol.p_power/1000), gol.enm_bullet_size)) {
			gol.enm_can_shoot = true;
			gol.enm_bullet_exists = false;
			gol.enemy_cooldown = Math.floor(Math.random()*200) + 90; //gol.enm_bullet_life_max + 90 + (Math.random()*40)
			gol.game_score += 50;
		}
	}	

	if(gol.enm_bullet_exists && gol.bullet_exists) {
		if(gol.cpu_hit_test(gol.enm_bullet_x, gol.bullet_x, gol.enm_bullet_y, gol.bullet_y, gol.enm_bullet_size, gol.bullet_size)) {
			gol.enm_can_shoot = true;
			gol.enm_bullet_exists = false;
			gol.enemy_cooldown = Math.floor(Math.random()*150) + 60; //gol.enm_bullet_life_max + 90 + (Math.random()*40);
			gol.game_score += 25;
		}
	}

	if(gol.enm_bullet_exists) {
		if(gol.cpu_hit_test(gol.enm_bullet_x, gol.wp_x, gol.enm_bullet_y, gol.wp_y, gol.enm_bullet_size, 69)) {
			gol.enm_can_shoot = true;
			gol.enm_bullet_exists = false;
			gol.enemy_cooldown = Math.floor(Math.random()*30)+10;
			gol.wp_jumptime -= 90;
		}
	
		for(var i = 0; i < gol.barriers.length; i++) {
			if(gol.barriers.length > 0 && gol.barriers[i] != null) {
				if(gol.cpu_hit_test(gol.enm_bullet_x, gol.barriers[i][0], gol.enm_bullet_y, gol.barriers[i][1], gol.enm_bullet_size, gol.barrier_size)) {
					gol.enm_can_shoot = true;
					gol.enm_bullet_exists = false;
					gol.enemy_cooldown = Math.floor(Math.random()*30)+10;
					gol.barriers[i][2] -= 500;
				}
			}
		}
	}

	*/

	//Player Collision with Barriers
	for(var i = 0; i < gol.barriers.length; i++) {
		if(gol.barriers.length > 0 && gol.barriers[i] != null) {
			if(gol.cpu_hit_test(this.statesize[0]/2, gol.barriers[i][0], this.statesize[1]/2, gol.barriers[i][1], gol.player_size, gol.barrier_size)) {
				gol.p_fuel -= 25;
			}
		}
	}

    return this;
};









//Read the pixels from the CA texture, return Uint8Array
GOL.prototype.player_hitbox = function() {
	var gl = this.igloo.gl, w = this.statesize[0], h = this.statesize[1];
	this.framebuffers.step.attach(this.textures.front);
	var rgba = new Uint8Array(gol.player_size * gol.player_size * 4);
	gl.readPixels(gol.statesize[0]/gol.scale/2-(gol.player_size/2), gol.statesize[1]/gol.scale/2-(gol.player_size/2), gol.player_size, gol.player_size, gl.RGBA, gl.UNSIGNED_BYTE, rgba);
	
	var state = new Uint8Array(gol.player_size * gol.player_size);
	for (var i = 0; i < gol.player_size * gol.player_size; i++) {
		state[i] = rgba[i * 4] > 128 ? 1 : 0;
	}
	return state;
};

//Flags & values that need to be reset on game restart
GOL.prototype.player_reset = function() {
	gol.place_cell_world(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, this.statesize[0]/3, this.statesize[1]/3, 0, 0, 0);
	gol.p_power = 1000;
	gol.p_health = gol.p_health_max;
	gol.p_fuel = 1000;
	gol.p_move_R = 0;
	gol.p_move_L = 0;
	gol.p_move_U = 0;
	gol.p_move_D = 0;
	gol.space_down = false;
	gol.l_click = false;
	gol.r_click = false;
	gol.p_s_burstcooldown = 0;
	this.enm_can_shoot = true;
	this.enm_bullet_exists = false;
	this.enemy_cooldown = 180 + Math.floor(Math.random()*350);
	gol.wp_jumptime = 0;
	gol.game_score = 0;
	gol.melee_on = false;
	gol.barriers = new Array();
	return this;
};


//Enemy controller
GOL.prototype.RunEnemy = function() {
	if(	gol.enemy_cooldown >= 1 && !gol.enm_bullet_exists){
		gol.enemy_cooldown -= 1;
	}

	if(gol.enemy_cooldown <= 0) {
		gol.enemy_cooldown = 200 + Math.floor(Math.random()*300);
		gol.enm_create_bullet();
	}
}


GOL.prototype.health_waypoint = function() {
	/*
	if(gol.wp_jumptime <= 0) {
		gol.wp_jump();	
		gol.wp_jumptime = Math.floor(Math.random()*500)+800;
		gol.wp_jumptime_max = gol.wp_jumptime;
	}	else {


		gol.wp_x -= gol.p_move_x;
		gol.wp_y -= gol.p_move_y;
		
		if(gol.wp_x > this.statesize[0]) { gol.wp_x = gol.wp_x % this.statesize[0]; }	
		if(gol.wp_y > this.statesize[1]) { gol.wp_y = gol.wp_y % this.statesize[1]; }	

		if(gol.wp_x < 0) { gol.wp_x = (this.statesize[0] - Math.abs(gol.wp_x)) % this.statesize[0]; }	
		if(gol.wp_y < 0) { gol.wp_y = (this.statesize[1] - Math.abs(gol.wp_y)) % this.statesize[1]; }	
		
		gol.wp_jumptime -= 1;

		var col = gol.wp_jumptime/gol.wp_jumptime_max;

		gol.placeBoth(gol.wp_x, gol.wp_y, 69, 1, 1, 0, 0);
		gol.placeBoth(gol.wp_x, gol.wp_y, 65, 0, 0.0, 0.15, 0.15);

		gol.place_cell_rend(gol.wp_x, gol.wp_y, 25, 25, 0.6, 0, 0.4)
		gol.place_cell_rend(gol.wp_x, gol.wp_y, 21, 21, 1-col, col, col)

	}

	if(gol.cpu_hit_test(gol.statesize[0]/2, gol.wp_x, gol.statesize[1]/2, gol.wp_y, 1, 69)) {
		gol.p_health += 20;
		gol.p_power += 4;
		gol.p_fuel += 2;
		gol.game_score += 1;
		gol.wp_jumptime -= 2;
	}
	*/
	
}


GOL.prototype.create_barrier = function(bx, by, life) {
	var new_bar = new Array(3);
	new_bar[0]=bx;
	new_bar[1]=by;
	new_bar[2]=life;
	gol.barriers.push(new_bar);
}

GOL.prototype.run_barrier = function() {
	for(var i = 0; i < gol.barriers.length; i++) {
		//alert(gol.barriers[i]);
		if(gol.barriers.length > 0 && gol.barriers[i] != null) {
			if(gol.barriers[i][2] <= 0) {
				gol.barriers[i] = null;
			} else {
				gol.barriers[i][2] -= 1;
				gol.barriers[i][0] -= gol.p_move_x;
				gol.barriers[i][1] -= gol.p_move_y;
		
				if(gol.barriers[i][0] > this.statesize[0]) { gol.barriers[i][0] = gol.barriers[i][0] % this.statesize[0]; }	
				if(gol.barriers[i][1] > this.statesize[1]) { gol.barriers[i][1] = gol.barriers[i][1] % this.statesize[1]; }	
				if(gol.barriers[i][0] < 0) { gol.barriers[i][0] = (this.statesize[0] - Math.abs(gol.barriers[i][0])) % this.statesize[0]; }	
				if(gol.barriers[i][1] < 0) { gol.barriers[i][1] = (this.statesize[1] - Math.abs(gol.barriers[i][1])) % this.statesize[1]; }	

				gol.placeBoth(gol.barriers[i][0], gol.barriers[i][1], gol.barrier_size, 0, 0, gol.barriers[i][2]/gol.barrier_life_max, 1-(gol.barriers[i][2]/gol.barrier_life_max));
			}
		}
	}
	for(var i = 0; i < gol.barriers.length; i++) {
		if(gol.barriers[i] != null) {
			gol.place_cell_rend(gol.barriers[i][0], gol.barriers[i][1], gol.barrier_size*0.8, gol.barrier_size*0.8, 0.4, 0.4, 0.4);
		}
	}
}


GOL.prototype.wp_jump = function() {
	/*
	gol.wp_x = Math.random()*gol.statesize[0];
	gol.wp_y = Math.random()*gol.statesize[1];

	if(gol.cpu_hit_test(this.statesize[0]/2, gol.wp_x, this.statesize[1]/2, gol.wp_y, 128, 1)) {
		gol.wp_jump();
	}
	*/
}

//Check if two rectangles intersect
GOL.prototype.cpu_hit_test = function(x1, x2, y1, y2, s1, s2) {
	var hit = false;
	if(Math.abs(Math.abs(x1) - Math.abs(x2)) < (s1/2)+(s2/2)) {
		if(Math.abs(Math.abs(y1) - Math.abs(y2)) < (s1/2)+(s2/2)) {
			hit = true;		
		}
	}
	return hit;
}


//Player controller
GOL.prototype.RunPlayer = function() {

	gol.place_barrier_cooldown -= 1;

	if(gol.p_shield_cooldown > 0) {
		gol.p_shield_cooldown -= 1;
	} else { gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, 19, 19, 0, 0.2, 0.4); }	

	var hit = 0;
		
	if(gol.hitmod == 0) {
		//hitcheck / health
		gol.p_hit = gol.player_hitbox();
			
		for(var i = 0; i < gol.player_size*gol.player_size; i++) {
			hit += gol.p_hit[i];
		}
	
		//do damage
		if(hit > 0) {gol.p_health -= (hit*gol.hitrate + 30); gol.p_fuel -= (hit+10);}
		if(hit > ((gol.player_size*gol.player_size)/2) ) {gol.p_health -= hit/2;}
	
		//Shield (deletes impacted objects)
		if(!gol.space_down && hit > 0 && gol.p_shield_cooldown == 0) {
			gol.p_power -= 80;
			gol.p_shield_cooldown = 10;

			//gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, 23, 23, 0, 1, 1)
			//gol.placeBoth(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, 15, 0, 0, 1, 1);
			
			var shield_size_calc = Math.ceil((gol.p_power/gol.p_power_max)*gol.p_shield_size_max) + gol.p_shield_size;
			gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, shield_size_calc, shield_size_calc, 0, 1, 1)
			gol.placeBoth(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, shield_size_calc, 0, 0, 1, 1);

		}
	}

	gol.hitmod = (gol.hitmod + 1) % gol.hitrate;


	//if(hit != 0) {alert(hit + " / " + (gol.player_size*gol.player_size));}
	

	//draw player	
	if(hit == 0) {gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size, gol.player_size, 1, 1, 0);} else {
		gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size, gol.player_size, 1, 0, 0)
		gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, 9, 9, 1, 1, 0)
	}






	if((gol.p_move_L + gol.p_move_R != 0) || (gol.p_move_U + gol.p_move_D != 0)) { gol.p_fuel -= 5; }
	
	if(gol.p_fuel >= 150) {
		gol.p_speed = 2;
		if(gol.p_move_R != 0) { gol.p_move_R = 2; }
		if(gol.p_move_L != 0) { gol.p_move_L = -2; }
		if(gol.p_move_U != 0) { gol.p_move_U = 2; }
		if(gol.p_move_D != 0) { gol.p_move_D = -2; }
	}
	if(gol.p_fuel <= 300) {
		gol.p_speed = 1;
		if(gol.p_move_R != 0) { gol.p_move_R = 1; }
		if(gol.p_move_L != 0) { gol.p_move_L = -1; }
		if(gol.p_move_U != 0) { gol.p_move_U = 1; }
		if(gol.p_move_D != 0) { gol.p_move_D = -1; }
	}

	if(gol.p_power <= 0) {
		gol.can_shoot = false; 
		if(gol.space_down) {gol.p_s_burstcooldown = 60;} 
		gol.space_down = false;
	}

	if(gol.p_power >= 100) {gol.can_shoot = true;}


	//regen
	if(gol.p_fuel < 1000) {gol.p_fuel += 4;}
	if(gol.p_health < gol.p_health_max) {gol.p_health += 2;}
	if(gol.p_power < 1000) {gol.p_power += 4;}

	//Overflow cases
	if(gol.p_fuel > 1000) {gol.p_fuel = 1000;}
	if(gol.p_health > gol.p_health_max) {gol.p_health = gol.p_health_max;}
	if(gol.p_power > 1000) {gol.p_power = 1000;}

	if(gol.p_fuel < 0) {gol.p_fuel = 0;}
	if(gol.p_health < 0) {gol.p_health = 0;}
	if(gol.p_power < 0) {gol.p_power = 0;}
	

	//status bars
	gol.place_cell_rend((gol.statesize[0]/2), 8+18, (gol.statesize[0]/4), 8, 0.2, 0.2, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 22+16, (gol.statesize[0]/4), 12, 0.2, 0, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 36+14, (gol.statesize[0]/4), 8, 0, 0.2, 0.2)

	gol.place_cell_rend((gol.statesize[0]/2), 8+18, (gol.statesize[0]/4)*(gol.p_fuel/1000), 8, 1, 1, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 22+16, (gol.statesize[0]/4)*(gol.p_health/gol.p_health_max), 12, 1, 0, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 36+14, (gol.statesize[0]/4)*(gol.p_power/1000), 8, 0, 1, 1)

	/*

	if(!gol.bullet_exists){
		if(gol.can_shoot) {if(!gol.r_click && gol.l_click && gol.bullet_life == 0) {gol.create_bullet();}}          //gol.place_cell_world(gol.mouse_x, gol.mouse_y, 33, 0);
		if((!gol.l_click || gol.melee_on) && gol.r_click && gol.bullet_life == 0) {gol.create_melee();}       						//gol.place_cell_world(gol.mouse_x, gol.mouse_y, 17, 1);
		if(!gol.l_click && gol.r_click && !gol.melee_on) {gol.p_power -= 50; gol.melee_on = true;}       		
		if(gol.l_click && gol.r_click && gol.p_power >= 30 && gol.melee_on && gol.place_barrier_cooldown <= 0) {
			gol.create_barrier((this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5), (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5), gol.barrier_life_max); 
			gol.place_barrier_cooldown = 5;
			gol.p_power -= 35;
		}
	}

	*/

	if(gol.space_down) {
		gol.placeBoth(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, gol.p_s_burstsize*(gol.p_power/1000)+gol.player_size, 0, 0, 1, 1);
		gol.p_power -= 30;
	}

	if(gol.p_s_burstcooldown > 0) {gol.p_s_burstcooldown -= 1;}
				
	if(gol.p_health <= 0) {
		//alert("You did not survive, this time.");
		//gol.active_rule = Math.floor(Math.random()*gol.rule_array.length)
		gol.setRandom();
		gol.player_reset();
	}

	return this;
}



/* *********************************
//  End Game-specific functions   //
********************************* */


/* Initialize everything. Entry Point. */
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
