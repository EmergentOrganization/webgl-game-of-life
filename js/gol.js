/**
 * Game of Life simulation and display.
 * @param {HTMLCanvasElement} canvas Render target
 * @param {number} [scale] Size of each cell in pixels (power of 2)
 */
function GOL(canvas, scale) {

	// Core Engine
    var igloo = this.igloo = new Igloo(canvas, { preserveDrawingBuffer: true });
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
	document.getElementById("life").style.cursor = "none";

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
	this.mouse_x = 0
	this.mouse_y = 0
	this.space_down = false;

	//General game values
	this.active_rule = new Array(2); //Which level?
	this.active_rule[0] = 13;
	this.active_rule[1] = 0;

	this.game_score = 0; //Scorekeeping
	this.game_frame = 0; //timekeeping
	this.healthflash = false;
	this.health_low_flash = 0;
	this.master_volume = 2.5;

	//Player Stats
	this.p_health_max = 5000;
	this.p_health = this.p_health_max;
	this.p_fuel = 1000;
	this.p_power_max = 1000;
	this.p_power = this.p_power_max;

	//CA collision detection
	this.p_hit = new Uint8Array(this.player_size * this.player_size * 4);
	this.hitmod = 1; //ticker for GPU hittest
	this.hitrate = 2; //GPU hittest cooldown (frames between checks)

	//melee
	this.melee_on = false;
	this.melee_size_max = 32;
	this.melee_size_min = 12;

	//Player shield
	this.p_shield_cooldown = 0;
	this.p_shield_size_max = 8;
	this.p_shield_size = this.player_size+2;
	this.p_s_burstsize = 90;
	this.p_s_burstcooldown = 0;
	this.p_shield_charge_cooldown = 0;
	this.shield_burst_duration = 0;

	//Game objects containers
	this.bullets = new Array();
	this.barriers = new Array();
	this.waypoints = new Array();
	this.enemies = new Array();
	this.explosions = new Array();

	//Bullets
	this.shoot_cooldown = 0;
	this.p_rof = 10;

	//enemy creation
	this.enemy_cooldown = Math.floor(Math.random()*200+400);
	this.queen_cooldown = 4000;

	//waypoint creation
	this.waypoint_cooldown = Math.floor(Math.random()*500+400);

	//Placeable Barrier object
	this.barrier_size = 18;
	this.place_barrier_cooldown = 0;
	this.barrier_life_max = 1200;
	
	this.audio_ar = new Array(18);
	for(var i = 0; i < this.audio_ar.length; i++) {
		this.audio_ar[i] = new Array(10);
	}

	for(i = 0; i < 7; i++) {
		var j = 0;

		this.audio_ar[j][i] = new Audio("sounds/ShieldBurst.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.15;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/EnemyHit.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.03;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/WaypointHit.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/BulletBlock.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/ShootDet.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/EnemyShoot.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/EnemyDie.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.3;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/Waypoint.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.25;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/PlayerHit.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 4;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/Shoot.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.05;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/Melee.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.05;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 6;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/CreateWall.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.18;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 4;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/PlayerHitBig.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 4;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/Wilhelm_Scream.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.2;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/CreateEnemy.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.15;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/WaypointRegen.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.025;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 12;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/CreateEnemy2.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.2;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 12;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/LowHealth.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.12;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 60;
		

	}
	

    gl.disable(gl.DEPTH_TEST); //disables alpha channels? not sure.

	//Load the shaders
	//This causes massive CPU usage spike that crashes or triggers panic decapture.
	//Follow up for chrome fix.
	//
	//	Load these one at a time?
	//	Keep the neighbourhoods CPU-side?
	//

	this.programs = {
        gol:  			igloo.program('glsl/quad.vert', 'glsl/gol.frag'),
        evo:  			igloo.program('glsl/quad.vert', 'glsl/evo.frag'),
        MiniAtomConway: igloo.program('glsl/quad.vert', 'glsl/MiniAtomConway.frag'),
        MicroFeeders:  	igloo.program('glsl/quad.vert', 'glsl/MicroFeeders-1.frag'),
        Waves:  		igloo.program('glsl/quad.vert', 'glsl/Waves.frag'),
        Dunes:  		igloo.program('glsl/quad.vert', 'glsl/Dunes.frag'),
        Sweeper:  		igloo.program('glsl/quad.vert', 'glsl/Sweeper.frag'),
        Minefield:  	igloo.program('glsl/quad.vert', 'glsl/Minefield.frag'),

		//Heavy Rules
        	Microbes:  		igloo.program('glsl/quad.vert', 'glsl/EF741-2.frag'),
        	orbw:  			igloo.program('glsl/quad.vert', 'glsl/orbwave-2.frag'),
        	 Tether:  		igloo.program('glsl/quad.vert', 'glsl/Tether.frag'),
        	Feeders:  		igloo.program('glsl/quad.vert', 'glsl/Feeders12-3.frag'),
        	MiniAtom:  		igloo.program('glsl/quad.vert', 'glsl/MiniAtom-2.frag'),
        	Tsunami:  		igloo.program('glsl/quad.vert', 'glsl/Tsunami.frag'),
        	Nemesis:  		igloo.program('glsl/quad.vert', 'glsl/Nemesis.frag'),

		//Unused Rules
        		//AtomSmall:  igloo.program('glsl/quad.vert', 'glsl/AtomSmall.frag'),
        		//ManyRings:  igloo.program('glsl/quad.vert', 'glsl/ManyRings.frag'),

		//Utility shaders
        copy: 			igloo.program('glsl/quad.vert', 'glsl/copy.frag'),
        ShiftCells:  	igloo.program('glsl/quad.vert', 'glsl/ShiftCells_2.frag'),
        PlaceCells:  	igloo.program('glsl/quad.vert', 'glsl/PlaceCells.frag'),
        RendMerge3:  	igloo.program('glsl/quad.vert', 'glsl/RendMerge3.frag'),
        DestInterf:  	igloo.program('glsl/quad.vert', 'glsl/DestInterf.frag')
    };

	//Rule & seed selection containers
	this.rule_array = new Array(15);
	this.rule_seeds = new Array(15);

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
	this.rule_array[12] = this.programs.Tsunami;
	this.rule_array[13] = this.programs.Minefield;
	this.rule_array[14] = this.programs.Nemesis;

	//Assign unique seed strengths to rules' indexes
	this.rule_seeds[0] = 0.22;
	this.rule_seeds[1] = 0.08;
	this.rule_seeds[2] = 0.03;
	this.rule_seeds[4] = 0.28;
	this.rule_seeds[5] = 0.39;
	this.rule_seeds[6] = 0.34;
	this.rule_seeds[7] = 0.44;
	this.rule_seeds[8] = 0.43;
	this.rule_seeds[9] = 0.31;
	this.rule_seeds[10] = 0.31;
	this.rule_seeds[11] = 0.33;
	this.rule_seeds[12] = 0.29;
	this.rule_seeds[14] = 0.44;


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
        foreground_1: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        foreground_2: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        background_1: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        background_2: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        rend: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1])
    };

	//Bind textures to this so they can be drawn to
    this.framebuffers = {
        step: igloo.framebuffer()
    };

	//Randomise the worldspace
    this.setRandom(this.textures.front, 1);
    this.setEmpty(this.textures.background_1);

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
GOL.prototype.set = function(state, tex) {
    var gl = this.igloo.gl;
    var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);
    for (var i = 0; i < state.length; i++) {
        var ii = i * 4;
        rgba[ii + 0] = rgba[ii + 1] = rgba[ii + 2] = state[i] ? 255 : 0;
        rgba[ii + 3] = 255;
    }
    tex.subset(rgba, 0, 0, this.statesize[0], this.statesize[1]);
    return this;
};

/**
 * Fill the entire state with random values.
 * @param {number} [p] Chance of a cell being alive (0.0 to 1.0)
 * @returns {GOL} this
 */
GOL.prototype.setRandom = function(tex, layer, p) {
    var gl = this.igloo.gl, size = this.statesize[0] * this.statesize[1];
    p = p == null ? this.rule_seeds[this.active_rule[layer]] : p;
    var rand = new Uint8Array(size);
    for (var i = 0; i < size; i++) {
        rand[i] = Math.random() < p ? 1 : 0;
    }
    this.set(rand, tex);
    return this;
};

/**
 * Clear the simulation state to empty.
 * @returns {GOL} this
 */
GOL.prototype.setEmpty = function(tex) {
    this.set(new Uint8Array(this.statesize[0] * this.statesize[1]), tex);
    return this;
};

/**
 * Swap the texture buffers.
 * @returns {GOL} this
 */
GOL.prototype.swap_main = function() {
    var tmp = this.textures.front;
    this.textures.front = this.textures.back;
    this.textures.back = tmp;
    return this;
};
GOL.prototype.swap_back = function() {
    var tmp = this.textures.background_1;
    this.textures.background_1 = this.textures.background_2;
    this.textures.background_2 = tmp;
    return this;
};
GOL.prototype.swap_fore = function() {
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


//Combines three ca world layers into one final render state
GOL.prototype.swap_MergeRend3 = function() {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.rend);

	//Bind textures
    this.textures.background_1.bind(3);
    this.textures.foreground_1.bind(2);
    this.textures.front.bind(1);
    this.textures.rend.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.RendMerge3.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('render', 0)
        .uniformi('state', 1)
        .uniformi('front', 2)
        .uniformi('back', 3)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};

//destructive interference
GOL.prototype.destruct_interf = function() {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.front);

	//Bind textures
    this.textures.background_1.bind(2);
    this.textures.foreground_1.bind(1);
    this.textures.front.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.DestInterf.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('front', 1)
        .uniformi('back', 2)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};
/**
 * Step the selected rule without rendering anything.
 * @returns {GOL} this
 */
GOL.prototype.step = function(tex_front, tex_back, rule_prog, layer) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(tex_back);
    tex_front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    rule_prog.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);
	if(layer == 1) {this.swap_main();}
	if(layer == 0) {this.swap_back();}
	if(layer == 2) {this.swap_front();}
    return this;
};


GOL.prototype.fakestep = function(tex_front, tex_back, rule_prog, layer) {
    this.framebuffers.step.attach(tex_back);
    tex_front.bind(0);
	//if(layer == 1) {this.swap_main();}
	//if(layer == 0) {this.swap_back();}
	//if(layer == 2) {this.swap_front();}
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



//draw a rectangle only on the CA texture (front)
GOL.prototype.place_cell_back = function(x, y, w, h, r, g, b) {
	if(r == 1) {r = 0;} else {r = 1;}
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.background_1);
    this.textures.background_1.bind(0);
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
GOL.prototype.shift = function(tex_front, tex_back, layer, mult) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(tex_back);
    tex_front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);

	this.p_move_x = (this.p_move_L + this.p_move_R) * mult;
	this.p_move_y = (this.p_move_U + this.p_move_D) * mult;

    this.programs.ShiftCells.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('mx', this.p_move_x)
        .uniform('my', this.p_move_y)
        .draw(gl.TRIANGLE_STRIP, 4);

	if(layer == 1) {this.swap_main();}
	if(layer == 0) {this.swap_back();}
	if(layer == 2) {this.swap_front();}

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
GOL.prototype.placeAll = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_cell_world(x,y,size,size,valWorld,g,b);
	gol.place_cell_back(x,y,size,size,valWorld,g,b);
	gol.place_cell_rend(x,y,size,size,valRend,g,b);
    return this;
};


//Create a square at the location and size in both rend and front textures
GOL.prototype.place_Rend_World = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_cell_world(x,y,size,size,valWorld,g,b);
	//gol.place_cell_back(x,y,size,size,valWorld,g,b);
	gol.place_cell_rend(x,y,size,size,valRend,g,b);
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
			

			//These have to be ordered specifically...
			// shift, step, hit, bullet, enemy, swap_rend, waypoint, barrier, player, draw

			//Offset the CA texture (front) by player's movements
			gol.shift(gol.textures.front, gol.textures.back, 1, 1);	
			gol.shift(gol.textures.background_1, gol.textures.background_2, 0, 1);	
			
			//Compute the next frame(s) of the CA
			for (var i = 0; i < 1; i++) { 
				gol.step(gol.textures.front, gol.textures.back, gol.rule_array[gol.active_rule[1]], 1);
				gol.game_frame += 1
			}

			if(gol.game_frame % 4 == 0) {
				gol.step(gol.textures.background_1, gol.textures.background_2, gol.rule_array[gol.active_rule[0]], 0);
			} else {
				gol.fakestep(gol.textures.background_1, gol.textures.background_2, gol.rule_array[gol.active_rule[0]], 0);
			}

			gol.destruct_interf();
			
        	gol.run_hittests();			//CPU Hit tests
			gol.run_bullets();			//Step Bullet calcs

			//gol.swap_rend();			//Merge the CA and Player texture layers
			gol.swap_MergeRend3();

			gol.run_explosions();		//Detonations

			gol.run_waypoints();		//Step Waypoint calcs
			gol.run_enemies();			//Step Enemy calcs
			gol.run_barriers();			//Step Barrier calcs
			gol.run_player();			//Step Player calcs

			gol.draw();					//Render the final texture to the screen


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

    // Copy the pixels to a 2D canvas
    var context = canvas.getContext('2d');
    var imageData = context.createImageData(width, height);
    imageData.data.set(data, this.textures.front);

    context.putImageData(imageData, 0, 0);
	context.scale(1, -1);
	context.drawImage(canvas, 0, -height);

    var img = new Image();
    img.src = canvas.toDataURL("image/png"); // Turn the image data int a base64-encoded PNG 

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
	gui.add(cont, 'rule', {
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
		'Sweeper': 11,
		'Tsunami': 12,
		'Minefield': 13,
		'Blood Parasite': 14,
		'Random': -1
	}).name('Hostile Algorithm').onChange(set_rule);

	gui.add(cont, 'buddy_rule', {
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
		'Sweeper': 11,
		'Tsunami': 12,
		'Minefield': 13,
		'Blood Parasite': 14,
		'Random': -1
	}).name('Player Algorithm').onChange(set_buddy_rule);

	function testFoo(value) {
        alert("TEST GUI Response: " + value);
    }

	function tog(){
		gol.toggle();
		document.getElementById("life").focus();
	}

	function fpsChange(value) {
		gol.toggle();
        if(value) {gol.fps_target = 16.7; }
        if(!value) {gol.fps_target = 33.3;}
		gol.toggle();
		document.getElementById("life").focus();
    }

	function set_rule(value){
		gol.active_rule[1] = value;
		if(value == -1) {gol.active_rule[1] = Math.floor(Math.random()*gol.rule_array.length); cont.rule = gol.active_rule[1];}
		gol.setRandom(gol.textures.front, 1);
		gol.setEmpty(gol.textures.background_1);
		gol.player_reset();
		document.getElementById("life").focus();
		//gui.close();
	}

	function set_buddy_rule(value){
		gol.active_rule[0] = value;
		if(value == -1) {gol.active_rule[0] = Math.floor(Math.random()*gol.rule_array.length); cont.buddy_rule = gol.active_rule[0];}
		gol.setRandom(gol.textures.front, 1);
		gol.setEmpty(gol.textures.background_1);
		gol.player_reset();
		document.getElementById("life").focus();
		//gui.close();
	}
	
}

function myConfig() {
	this.testInt = 0;
	this.testBool = false;
	this.rule = 0;
	this.buddy_rule = 0;
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
		    case 80: /* P */
		        gol.load_score();
		        break;    
			case 32: /* space */
				if(gol.p_s_burstcooldown <= 0 && !gol.space_down && (gol.p_power/gol.p_power_max) >= 0.5) {
					gol.space_down = true;
			 		gol.play_sound(0);
					gol.shield_burst_duration = 15;
				}
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
            gol.setRandom(gol.textures.front, 1);
			gol.setEmpty(gol.textures.background_1);
			gol.player_reset();
            break;
        case 46: /* [delete] */
			gol.setEmpty(gol.textures.background_1);
            gol.setEmpty(gol.textures.front);
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

GOL.prototype.save_score = function() {
	
	//localStorage.clear();

	var score_ar = [];

	if(JSON.parse ( localStorage.getItem('WebGoL-Highscores')) != null) {
		score_ar = JSON.parse ( localStorage.getItem('WebGoL-Highscores'));
	}

	var newscore = [this.statesize[0], this.statesize[1], gol.active_rule[1], gol.active_rule[0], gol.game_score, gol.game_frame];
	score_ar.push(newscore);

	// Put the object into storage
	localStorage.setItem('WebGoL-Highscores', JSON.stringify(score_ar));

	//localStorage.clear();

    return this;
};

GOL.prototype.load_score = function() {
	
	var current_list = JSON.parse ( localStorage.getItem('WebGoL-Highscores'));

	if(current_list != null) {

		var s = "";
		for(var i = 0; i < current_list.length; i++) {
			s = s + "[" + current_list[i] + "]<br>";
		}

		var newWindow = window.open();
		newWindow.document.write(s);
		newWindow.document.close();
	} else {alert("No highscores found");}

    return this;
};

GOL.prototype.play_sound = function(s_num) {
	if(gol.audio_ar[s_num][8] <= 0) {
		gol.audio_ar[s_num][8] = gol.audio_ar[s_num][9];
		gol.audio_ar[s_num][gol.audio_ar[s_num][7]].play();
		gol.audio_ar[s_num][7] = (gol.audio_ar[s_num][7] + 1) % 7;
	}
}

GOL.prototype.get_dist = function(x1, x2, y1, y2) {	

	var dsx = Math.abs(Math.abs(x1)-Math.abs(x2));
	var dsy = Math.abs(Math.abs(y1)-Math.abs(y2));

	//a^2 + b^2 = c^2
	
	return Math.sqrt(dsx*dsx + dsy*dsy);
}


GOL.prototype.player_cap_mouse_pos_max = function(cap) {	

	//get mouse positions
	var x_full = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2));
	var y_full = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2));

	var full_dist = gol.get_dist(this.statesize[0]/2, x_full, this.statesize[1]/2, y_full);

	var d_ratio = cap/full_dist;

	var x_fin = (this.statesize[0]/2) + (gol.mouse_x - this.statesize[0]/2)*d_ratio;
	var y_fin = (this.statesize[1]/2) + (gol.mouse_y - this.statesize[1]/2)*d_ratio;
	
	return [x_fin, y_fin];
}


/* ************************
// End General functions //
************************ */


// ---------------------------------------


/* *********************************
//    Game-specific functions     //
********************************* */


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

GOL.prototype.cpu_positioning = function(x, y) {
	x -= gol.p_move_x;
	y -= gol.p_move_y;

	if(x > this.statesize[0]) { x = x % this.statesize[0]; }	
	if(y > this.statesize[1]) { y = y % this.statesize[1]; }	
			
	if(x < 0) { x = (this.statesize[0] - Math.abs(x)) % this.statesize[0]; }	
	if(y  < 0) { y  = (this.statesize[1] - Math.abs(y)) % this.statesize[1]; }	
	
	return [x, y];
}

GOL.prototype.ar_kill = function(array, index) {
	array.splice(index, 1);
}

GOL.prototype.run_hittests = function() {

	//Player Collision with Barriers
	for(var i = 0; i < gol.barriers.length; i++) {
		if(gol.barriers.length > 0 && gol.barriers[i] != null) {
			if(gol.cpu_hit_test(this.statesize[0]/2, gol.barriers[i][0], this.statesize[1]/2, gol.barriers[i][1], gol.player_size, gol.barrier_size)) {
				gol.p_fuel -= 25;
			}
		}
	}

	//Player Collision with Waypoints
	for(var i = 0; i < gol.waypoints.length; i++) {
		if(gol.waypoints.length > 0 && gol.waypoints[i] != null) {
			if(gol.cpu_hit_test(this.statesize[0]/2, gol.waypoints[i][0], this.statesize[1]/2, gol.waypoints[i][1], gol.player_size, gol.waypoints[i][2])) {
				gol.p_health += 8;
				gol.p_power += 4;
				gol.p_fuel += 2;
				gol.game_score += 1;
				gol.waypoints[i][3] -= 3;
				gol.play_sound(15);
			}
		}
	}

	//Bullet collision with Waypoints
	var hit_wp_sound = false;
	for(var i = 0; i < gol.waypoints.length; i++) {
		for(var j = 0; j < gol.bullets.length; j++) {
			if(gol.waypoints.length > 0 && gol.waypoints[i] != null) {
				if(gol.bullets.length > 0 && gol.bullets[j] != null) {
					if(gol.bullets[j][9] == 1) {
						if(gol.cpu_hit_test(gol.bullets[j][0], gol.waypoints[i][0], gol.bullets[j][1], gol.waypoints[i][1], gol.bullets[j][2], gol.waypoints[i][2])) {
							gol.waypoints[i][3] -= (gol.bullets[j][2]*10)+20;
							gol.ar_kill(gol.bullets, j);
							hit_wp_sound = true;
						}
					}
				}
			}
		}
	}

	//enemy collision with Waypoints
	for(var i = 0; i < gol.waypoints.length; i++) {
		for(var j = 0; j < gol.enemies.length; j++) {
			if(gol.waypoints.length > 0 && gol.waypoints[i] != null) {
				if(gol.enemies.length > 0 && gol.enemies[j] != null) {
					if(gol.cpu_hit_test(gol.enemies[j][0], gol.waypoints[i][0], gol.enemies[j][1], gol.waypoints[i][1], gol.enemies[j][2], gol.waypoints[i][2])) {
						gol.waypoints[i][3] -= gol.enemies[j][3]*10;
						gol.enemies[j][3] = 0;
						hit_wp_sound = true;
					}
				}
			}
		}
	}


	//Bullet collision with bullet
	var hit_bul_sound = false;
	for(var i = 0; i < gol.bullets.length; i++) {
		for(var j = 0; j < gol.bullets.length; j++) {
			if(gol.bullets.length > 0 && gol.bullets[i] != null) {
				if(gol.bullets.length > 0 && gol.bullets[j] != null) {
					if(gol.bullets[i][9] != gol.bullets[j][9]) {
						if(gol.cpu_hit_test(gol.bullets[j][0], gol.bullets[i][0], gol.bullets[j][1], gol.bullets[i][1], gol.bullets[j][2], gol.bullets[i][2])) {
							gol.bullets[i] = null;
							gol.bullets[j] = null;
							gol.game_score += 10;
							hit_bul_sound = true;
						}
					}
				}
			}
		}
	}

	//Bullet collision with enemy
	var hit_enemy_sound = false;
	for(var i = 0; i < gol.bullets.length; i++) {
		for(var j = 0; j < gol.enemies.length; j++) {
			if(gol.bullets.length > 0 && gol.bullets[i] != null) {
				if(gol.enemies.length > 0 && gol.enemies[j] != null) {
					if(gol.bullets[i][9] == 0) {
						if(gol.cpu_hit_test(gol.enemies[j][0], gol.bullets[i][0], gol.enemies[j][1], gol.bullets[i][1], gol.enemies[j][2], gol.bullets[i][2])) {
							gol.ar_kill(gol.bullets, i);
							gol.enemies[j][3] -= 15;
							hit_enemy_sound = true;
						}
					}
				}
			}
		}
	}

	//explosion collision with enemy
	for(var i = 0; i < gol.explosions.length; i++) {
		for(var j = 0; j < gol.enemies.length; j++) {
			if(gol.explosions.length > 0 && gol.explosions[i] != null) {
				if(gol.enemies.length > 0 && gol.enemies[j] != null) {
					if(gol.explosions[i][3] == gol.explosions[i][4]-1) {
						if(gol.cpu_hit_test(gol.enemies[j][0], gol.explosions[i][0], gol.enemies[j][1], gol.explosions[i][1], gol.enemies[j][2], gol.explosions[i][2])) {
							gol.enemies[j][3] -= 15;
							hit_enemy_sound = true;
						}
					}
				}
			}
		}
	}

	//explosion collision with bullet
	for(var i = 0; i < gol.explosions.length; i++) {
		for(var j = 0; j < gol.bullets.length; j++) {
			if(gol.explosions.length > 0 && gol.explosions[i] != null) {
				if(gol.bullets.length > 0 && gol.bullets[j] != null) {
					if(gol.explosions[i][3] == gol.explosions[i][4]-1 && gol.bullets[j][9] == 1) {
						if(gol.cpu_hit_test(gol.bullets[j][0], gol.explosions[i][0], gol.bullets[j][1], gol.explosions[i][1], gol.bullets[j][2], gol.explosions[i][2])) {
							gol.ar_kill(gol.bullets, j);
							gol.game_score += 10;
							hit_bul_sound = true;
						}
					}
				}
			}
		}
	}


	//Bullet collision with barrier
	for(var i = 0; i < gol.bullets.length; i++) {
		for(var j = 0; j < gol.barriers.length; j++) {
			if(gol.bullets.length > 0 && gol.bullets[i] != null) {
				if(gol.barriers.length > 0 && gol.barriers[j] != null) {
					if(gol.bullets[i][9] == 1) {
						if(gol.cpu_hit_test(gol.barriers[j][0], gol.bullets[i][0], gol.barriers[j][1], gol.bullets[i][1], gol.barriers[j][2], gol.bullets[i][2])) {
							gol.barriers[j][3] -= (gol.bullets[i][2]*75)+20;
							gol.ar_kill(gol.bullets, i);
							hit_bul_sound = true;
						}
					}
				}
			}
		}
	}


	//Bullet collision with melee
	for(var i = 0; i < gol.bullets.length; i++) {
		if(gol.bullets.length > 0 && gol.bullets[i] != null) {
			if(gol.bullets[i][9] == 1 && gol.melee_on) {
				var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/3);
				var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/3);
				var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				if(dist >= 64) {
					var capped_pos = gol.player_cap_mouse_pos_max(64);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				if(dist <= 18) {
					var capped_pos = gol.player_cap_mouse_pos_max(18);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				
				if(gol.cpu_hit_test(x, gol.bullets[i][0], y, gol.bullets[i][1], (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, gol.bullets[i][2])) {
					gol.ar_kill(gol.bullets, i);
					hit_bul_sound = true;
				}
			}
		}
	}

	//Bullet collision with shield burst
	for(var i = 0; i < gol.bullets.length; i++) {
		if(gol.bullets.length > 0 && gol.bullets[i] != null) {
			if(gol.bullets[i][9] == 1 && gol.space_down) {
				if(gol.cpu_hit_test(this.statesize[0]/2, gol.bullets[i][0], this.statesize[1]/2, gol.bullets[i][1], (gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/1000)+gol.player_size, gol.bullets[i][2])) {
					gol.ar_kill(gol.bullets, i);
					hit_bul_sound = true;
				}
			}
		}
	}

	
	//enemy collision with shield burst
	for(var i = 0; i < gol.enemies.length; i++) {
		if(gol.enemies.length > 0 && gol.enemies[i] != null && gol.space_down) {
			if(gol.cpu_hit_test(this.statesize[0]/2, gol.enemies[i][0], this.statesize[1]/2, gol.enemies[i][1], (gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/1000)+gol.player_size, gol.enemies[i][2])) {
				gol.enemies[i][3] -= 50;
			}
		}
	}

	//enemy collision with melee
	for(var i = 0; i < gol.enemies.length; i++) {
		if(gol.enemies.length > 0 && gol.enemies[i] != null) {
			if(gol.melee_on) {
				var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/3);
				var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/3);
				var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				if(dist >= 64) {
					var capped_pos = gol.player_cap_mouse_pos_max(64);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				if(dist <= 18) {
					var capped_pos = gol.player_cap_mouse_pos_max(18);
					x = capped_pos[0];
					y = capped_pos[1];
				}

				if(gol.cpu_hit_test(x, gol.enemies[i][0], y, gol.enemies[i][1], (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, gol.enemies[i][2])) {
				gol.enemies[i][3] -= 8*(gol.p_power/gol.p_power_max)+1;
				}
			}
		}
	}

	if(hit_enemy_sound) {
		gol.play_sound(1);
	}
	if(hit_wp_sound) {
		gol.play_sound(2);
	}
	if(hit_bul_sound) {
		gol.play_sound(3);
	}


	return this;
};

GOL.prototype.check_barrier_placement = function() {
	var hit = false;

	//placement collision with barrier
	for(var i = 0; i < gol.barriers.length; i++) {
		if(gol.barriers.length > 0 && gol.barriers[i] != null) {
			if(gol.barriers[i][3] >= gol.barrier_life_max*0.3) {
				var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5);
				var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5);
				var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				
				if(dist >= 50) {
					var capped_pos = gol.player_cap_mouse_pos_max(50);
					x = capped_pos[0];
					y = capped_pos[1];
				}

				if(gol.cpu_hit_test(x, gol.barriers[i][0], y, gol.barriers[i][1], gol.barrier_size/2, gol.barrier_size/2)) {
					hit = true;
				}
			} else {
				var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5);
				var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5);
				var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				
				if(dist >= 50) {
					var capped_pos = gol.player_cap_mouse_pos_max(50);
					x = capped_pos[0];
					y = capped_pos[1];
				}

				if(gol.cpu_hit_test(x, gol.barriers[i][0], y, gol.barriers[i][1], gol.barrier_size/2, gol.barrier_size/2)) {
					gol.barriers[i][3] = 0;
					hit = true;
				}
			}
		}
	}

	return hit;
}

GOL.prototype.create_bullet = function(x, y, size, life, targ_x, targ_y, val, exp, open, rand) {
	var new_obj = new Array(13);

	new_obj[0] = x;			// Actual X pos
	new_obj[1] = y;			// Actual Y pos
	new_obj[2] = size;		// Square size
	new_obj[3] = life;		// Life (frames)
	new_obj[4] = life;		// Lifespan (frames)
	new_obj[5] = targ_x;	// Target X pos
	new_obj[6] = targ_y;	// Target Y pos
	new_obj[7] = x;			// Origin X pos
	new_obj[8] = y;			// Origin Y pos
	new_obj[9] = val;		// Payload value
	new_obj[10] = exp;		// Explosion size
	new_obj[11] = open;		// Overpenetration percentage
	new_obj[12] = rand;		// Randomise accuracy

	if(rand > 1) {
		new_obj[5] += (Math.random()*rand*2)-rand;
		new_obj[6] += (Math.random()*rand*2)-rand;
	}

	gol.bullets.push(new_obj);

    return this;
};

GOL.prototype.run_bullets = function() {
	for(var i = 0; i < gol.bullets.length; i++) {
		if(gol.bullets.length > 0 && gol.bullets[i] != null) {
			
			if(gol.bullets[i][3] == 0){
				gol.ar_kill(gol.bullets, i);
			} else {
			
				gol.bullets[i][0] += (gol.bullets[i][5]/gol.bullets[i][4])*(gol.bullets[i][11]/100)-gol.p_move_x;	
				gol.bullets[i][1] += (gol.bullets[i][6]/gol.bullets[i][4])*(gol.bullets[i][11]/100)-gol.p_move_y; 	

				if(gol.bullets[i][3] > 0) {
					gol.placeAll(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2], 1, gol.bullets[i][9], 0.5, 0);
					gol.bullets[i][3] -= 1;

					if(gol.bullets[i][10] > 0 && gol.bullets[i][3] <= 0) {
						gol.create_explosion(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+gol.bullets[i][10], 5, 0, 0, 0.6, 0, 0, false, 0);
						gol.play_sound(4);
					}

				}
			}
				
			
			
		}
	}

    return this;
};

GOL.prototype.create_melee = function() {
	var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/3);
	var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/3);
	var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);

	if(dist > 18 && dist < 64) {
		gol.place_Rend_World(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 1, 0.4);
		gol.place_cell_rend(x, y, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, 0.9, 1, 0.9);
		gol.p_power -= 6;
		gol.play_sound(10);
	} else if(dist >= 64) {

		var capped_pos = gol.player_cap_mouse_pos_max(64);

		x = capped_pos[0];
		y = capped_pos[1];

		gol.place_Rend_World(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 1, 0.4);
		gol.place_cell_rend(x, y, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, 0.9, 1, 0.9);
		gol.p_power -= 6;
		gol.play_sound(10);
	} else if(dist <= 18) {

		var capped_pos = gol.player_cap_mouse_pos_max(18);

		x = capped_pos[0];
		y = capped_pos[1];

		gol.place_Rend_World(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 1, 0.4);
		gol.place_cell_rend(x, y, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, 0.9, 1, 0.9);
		gol.p_power -= 6;
		gol.play_sound(10);
	}
    
	return this;
};

GOL.prototype.create_enemy = function(x, y, size, life, cooldown, bul_size, hive) {

	if(!gol.cpu_hit_test(this.statesize[0]/2, x, this.statesize[1]/2, y, gol.player_size, 96)) {

		var new_obj = new Array(12);

		new_obj[0] = x;			// Actual X pos
		new_obj[1] = y;			// Actual Y pos
		new_obj[2] = size;		// Square size
		new_obj[3] = life;		// Life (frames)
		new_obj[4] = life;		// Lifespan (frames)
		new_obj[5] = cooldown/6;	// Shoot cooldown (frames)
		new_obj[6] = cooldown;	// Cooldown Max (frames)
		new_obj[7] = bul_size;	// bullet size
		new_obj[8] = false;	// Moving?
		new_obj[9] = 0;	// move_x
		new_obj[10] = 0;	// move_y
		new_obj[11] = hive;	// is_hive

		gol.enemies.push(new_obj);

		if(hive > 0) {gol.play_sound(16);} else {gol.play_sound(14);}

	} else {
		gol.enemy_cooldown = 1;
		if(hive > 0) {gol.queen_cooldown = 1;}
	}

    return this;
};

GOL.prototype.run_enemies = function() {
	if(gol.enemy_cooldown <= 0 && gol.enemies.length <= 1 + Math.floor(gol.game_score/1500)) {
		gol.enemy_cooldown = 180+Math.random()*300;

		var rof = Math.random()*390+20;
		var bul_rand = (rof/400)*25;

		//create_queen
		if(gol.enemies.length == 0 && gol.queen_cooldown <= 0) {
			gol.create_enemy(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)+40, Math.random()*200+150+(gol.game_score/100), 30, 25, Math.random()*2+4);
			gol.queen_cooldown = 2000;
		} else {
			//create_normal
			gol.create_enemy(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)*(bul_rand/20)+22, Math.random()*90+5+(gol.game_score/250), rof, Math.random()*bul_rand+4, 0);
		}
	

	}

	for(var i = 0; i < gol.enemies.length; i++) {
		if(gol.enemies.length > 0 && gol.enemies[i] != null) {

			if(gol.enemies[i][11] <= 0) {
				//shoot
				if(gol.enemies[i][5] <= 0) {
					gol.enemies[i][5] = gol.enemies[i][6];
					gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][7], 150, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, 0, 150, 32);						
					gol.play_sound(5);
				}
				//set direction and move-flag
				if(gol.enemies[i][5] >= 30 && gol.enemies[i][5] <= gol.enemies[i][6]*0.8) {
					if(!gol.enemies[i][8]) {
						gol.enemies[i][8] = true;
						gol.enemies[i][9] = Math.floor(Math.random()*3-1);
						gol.enemies[i][10] = Math.floor(Math.random()*3-1);
					}
				} else {
					gol.enemies[i][8] = false;
				}
				//move
				if(gol.enemies[i][8]) {
					gol.enemies[i][0] += gol.enemies[i][9];
					gol.enemies[i][1] += gol.enemies[i][10];
				}
			} else {
				//Spawn
				if(gol.enemies[i][5] <= 0) {
					gol.enemies[i][5] = gol.enemies[i][6];
					var rof = Math.random()*80+120;
					var bul_rand = (rof/200)*10;
					gol.enemies[i][11] -= 1;
					gol.create_enemy(gol.enemies[i][0]+Math.floor(Math.random()*45-22), gol.enemies[i][1]+Math.floor(Math.random()*45-22), 18, 50+(gol.game_score/250), rof, Math.random()*bul_rand+2, 0);
					if(gol.enemies[i][11] <= 0) {gol.enemies[i][6] = 240;}
				}
			}

			//cooldown
			gol.enemies[i][5]-= 1;
			
			//cpu offset adjustment
			var adjusted_pos = gol.cpu_positioning(gol.enemies[i][0], gol.enemies[i][1]);
			gol.enemies[i][0] = adjusted_pos[0];
			gol.enemies[i][1] = adjusted_pos[1];

			gol.placeAll(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2], 1, 1, 0.0, 0.0);
			gol.placeAll(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]-6, 1, 1, (gol.enemies[i][3]/gol.enemies[i][4]), 0.0);

			if(gol.enemies[i][3] <= 0) {
				gol.game_score += 30;
				if(gol.enemies[i][11] > 0) {gol.game_score += 200;}
				gol.ar_kill(gol.enemies, i);
				if(gol.enemy_cooldown <= 30){
					gol.enemy_cooldown = 15+Math.random()*15;
				} else {gol.enemy_cooldown += 15;}
				gol.play_sound(6);
			}

		}
	}

	return this;
}

GOL.prototype.create_waypoint = function(x, y, size, cooldown) {
	if(!gol.cpu_hit_test(this.statesize[0]/2, x, this.statesize[1]/2, y, gol.player_size, 160)) {
		var new_obj = new Array(5);

		new_obj[0] = x;			// Actual X pos
		new_obj[1] = y;			// Actual Y pos
		new_obj[2] = size;		// Square size
		new_obj[3] = cooldown;	// Warp cooldown (frames)
		new_obj[4] = cooldown;	// Cooldown Max (frames)

		gol.waypoints.push(new_obj);
		
		gol.play_sound(7);

	} else {gol.waypoint_cooldown = 1;}
	
	return this;
}

GOL.prototype.run_waypoints = function() {

	if(gol.waypoint_cooldown == 0) {
		gol.create_waypoint(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], 65, 3200);
		if(gol.waypoint_cooldown == 0) {gol.waypoint_cooldown = -1;}
		
	}

	for(var i = 0; i < gol.waypoints.length; i++) {
		if(gol.waypoints.length > 0 && gol.waypoints[i] != null) {

			var col = gol.waypoints[i][3]/gol.waypoints[i][4];

			var adjusted_pos = gol.cpu_positioning(gol.waypoints[i][0], gol.waypoints[i][1]);
			gol.waypoints[i][0] = adjusted_pos[0];
			gol.waypoints[i][1] = adjusted_pos[1];
			
			gol.placeAll(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]+4, 1, 1, 0, 0);
			gol.placeAll(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2], 0, 0, 0.8, 0);
			gol.placeAll(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-8, 0, 0, 0.2, 0);
			gol.place_cell_rend(gol.waypoints[i][0], gol.waypoints[i][1], 21, 21, 1-col, col, col);

			gol.waypoints[i][3]-= 1;

			if(gol.waypoints[i][3] <= 0) {
				gol.waypoint_cooldown = Math.floor((Math.random()*900*3)+360);
				gol.ar_kill(gol.waypoints, i);
				gol.play_sound(7);
			}

		}
	}

	return this;
}


GOL.prototype.create_explosion = function(x, y, size, cooldown, outval, inval, r, g, b, shift, layers) {
	var new_obj = new Array(12);

	new_obj[0] = x;			// Actual X pos
	new_obj[1] = y;			// Actual Y pos
	new_obj[2] = size;		// Square size
	new_obj[3] = cooldown;	// Warp cooldown (frames)
	new_obj[4] = cooldown;	// Cooldown Max (frames)
	new_obj[5] = outval;	// Outer Explosion Value
	new_obj[6] = inval;		// Inner Explosion Value
	new_obj[7] = r;			// Rend Colour R
	new_obj[8] = g;			// Rend Colour G
	new_obj[9] = b;			// Rend Colour B
	new_obj[10] = shift;	// Bool adjust for player pos
	new_obj[11] = layers;	// Bool adjust for player pos

	gol.explosions.push(new_obj);
	
	return this;
}

GOL.prototype.run_explosions = function() {

	for(var i = 0; i < gol.explosions.length; i++) {
		if(gol.explosions.length > 0 && gol.explosions[i] != null) {

			var col = gol.explosions[i][3]/gol.explosions[i][4];

			if(!gol.explosions[i][10]) {
				var adjusted_pos = gol.cpu_positioning(gol.explosions[i][0], gol.explosions[i][1]);
				gol.explosions[i][0] = adjusted_pos[0];
				gol.explosions[i][1] = adjusted_pos[1];
			}
			
			if(gol.explosions[i][11] == 0) {
				gol.placeAll(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5), 		gol.explosions[i][7], 	gol.explosions[i][5], 	gol.explosions[i][8], 	gol.explosions[i][9]);
				gol.placeAll(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*col*0.7, 			1, 						gol.explosions[i][6], 	1, 						col);
			}

			if(gol.explosions[i][11] == 1) {
				gol.place_Rend_World(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5), 		gol.explosions[i][7], 	gol.explosions[i][5], 	gol.explosions[i][8], 	gol.explosions[i][9]);
				gol.place_Rend_World(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*col*0.7, 			1, 						gol.explosions[i][6], 	1, 						col);
			}


			gol.explosions[i][3]-= 1;

			if(gol.explosions[i][3] <= 0) {
				gol.ar_kill(gol.explosions, i);
			}

		}
	}

	return this;
}


//Create new barrier object
GOL.prototype.create_barrier = function(x, y, size, life) {
	
	var new_obj = new Array(4);

	new_obj[0] = x;
	new_obj[1] = y;
	new_obj[2] = size;
	new_obj[3] = life;

	gol.barriers.push(new_obj);

	return this;
}

//Process the barrier's step function
GOL.prototype.run_barriers = function() {
	
	for(var i = 0; i < gol.barriers.length; i++) {
		//alert(gol.barriers[i]);
		if(gol.barriers.length > 0 && gol.barriers[i] != null) {
			if(gol.barriers[i][3] <= 0) {
				gol.ar_kill(gol.barriers, i);
			} else {
				gol.barriers[i][3] -= 1;

				var adjusted_pos = gol.cpu_positioning(gol.barriers[i][0], gol.barriers[i][1]);
				gol.barriers[i][0] = adjusted_pos[0];
				gol.barriers[i][1] = adjusted_pos[1];

				gol.place_Rend_World(gol.barriers[i][0], gol.barriers[i][1], gol.barrier_size, 0, 0, gol.barriers[i][3]/gol.barrier_life_max, 1-(gol.barriers[i][3]/gol.barrier_life_max));
			}
		}
	}
	for(var i = 0; i < gol.barriers.length; i++) {
		if(gol.barriers[i] != null) {
			gol.place_cell_rend(gol.barriers[i][0], gol.barriers[i][1], gol.barrier_size*0.8, gol.barrier_size*0.8, 0.4, 0.4, 0.4);
		}
	}

	return this;
}


GOL.prototype.run_shields = function() {

	//Shield (deletes impacted objects)
	if(gol.p_shield_cooldown <= 0 && gol.p_shield_charge_cooldown <= 0) {
		gol.p_power -= 60;
		gol.p_shield_cooldown = 15;
		gol.p_shield_charge_cooldown = 4;

		//figure out how large the burst should be
		var shield_size_calc = Math.ceil((gol.p_power/gol.p_power_max)*gol.p_shield_size_max) + gol.p_shield_size;

		//gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, shield_size_calc, shield_size_calc, 0, 1, 1)
		//gol.placeAll(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, shield_size_calc, 0, 0, 1, 1);

		gol.create_explosion(gol.statesize[0]/2, gol.statesize[1]/2, shield_size_calc, 3, 0, 0, 0, 1, 1, true, 1);
	} else {gol.p_shield_charge_cooldown -= 1;}

	return this;
}

GOL.prototype.hitplayer = function() {
	var hit = 0;
		
	if(gol.hitmod == 0) {
		//hitcheck / health
		gol.p_hit = gol.player_hitbox();
			
		for(var i = 0; i < gol.player_size*gol.player_size; i++) {
			hit += gol.p_hit[i];
		}
	
		//do damage
		if(hit > 0) {gol.p_health -= (hit*gol.hitrate + 30); gol.p_fuel -= (hit+10); gol.play_sound(8);}
		if(hit > ((gol.player_size*gol.player_size)/3) ) {gol.p_health -= hit/2; gol.play_sound(12);}
			

	}

	gol.hitmod = (gol.hitmod + 1) % gol.hitrate;

	return hit;
}


GOL.prototype.drainfuel = function() {
	//If moving, drain fuel
	if((gol.p_move_L + gol.p_move_R != 0) || (gol.p_move_U + gol.p_move_D != 0)) { gol.p_fuel -= 5; }
	
	//Speed changes based on fuel
	if(gol.p_fuel >= 250) {
		gol.p_speed = 2;
		if(gol.p_move_R != 0) { gol.p_move_R = 2; }
		if(gol.p_move_L != 0) { gol.p_move_L = -2; }
		if(gol.p_move_U != 0) { gol.p_move_U = 2; }
		if(gol.p_move_D != 0) { gol.p_move_D = -2; }
	}

	if(gol.p_fuel < 250) {
		gol.p_speed = 1;
		if(gol.p_move_R != 0) { gol.p_move_R = 1; }
		if(gol.p_move_L != 0) { gol.p_move_L = -1; }
		if(gol.p_move_U != 0) { gol.p_move_U = 1; }
		if(gol.p_move_D != 0) { gol.p_move_D = -1; }
	}

	return this;
}


//Read the pixels from the CA texture, return Uint8Array
GOL.prototype.player_hitbox = function() {
	var gl = this.igloo.gl, w = this.statesize[0], h = this.statesize[1];
	this.framebuffers.step.attach(gol.textures.front);
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
	if(gol.game_score > 0) {gol.save_score();}

	gol.place_cell_world(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, this.statesize[0]/3, this.statesize[1]/3, 0, 0, 0);
	
	//others
	gol.p_power = 1000;
	gol.p_health = gol.p_health_max;
	gol.p_fuel = 1000;
	gol.p_move_R = 0;
	gol.p_move_L = 0;
	gol.p_move_U = 0;
	gol.p_move_D = 0;

	//User input controls
	gol.l_click = false;
	gol.r_click = false;
	gol.melee_on = false;
	gol.mouse_x = 0
	gol.mouse_y = 0
	gol.space_down = false;

	//General game values
	gol.game_score = 0; //Scorekeeping
	gol.healthflash = false;
	gol.game_frame = 0;
	health_low_flash = 0;

	//Player shield
	gol.p_shield_cooldown = 0;
	gol.p_s_burstcooldown = 0;

	//Game objects containers
	gol.bullets = new Array();
	gol.barriers = new Array();
	gol.waypoints = new Array();
	gol.enemies = new Array();

	//Cooldowns
	gol.shoot_cooldown = 0;
	gol.enemy_cooldown = 600;
	gol.waypoint_cooldown = 900;
	gol.place_barrier_cooldown = 0;
	gol.queen_cooldown = 4000;

	return this;
};


//Player controller
GOL.prototype.run_player = function() {

	//Placement marker
	var x_place = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5);
	var y_place = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5);
	var dist = gol.get_dist(this.statesize[0]/2, x_place, this.statesize[1]/2, y_place);
				
	if(dist >= 50) {
		var capped_pos = gol.player_cap_mouse_pos_max(50);
		x_place = capped_pos[0];
		y_place = capped_pos[1];
	}

	gol.place_cell_rend(x_place, y_place, 9, 9, 0.8, 0.8, 0.8);
	gol.place_cell_rend(x_place, y_place, 7, 7, 0.3, 0.3, 0.3);


	//Shoot marker
	gol.place_cell_rend((this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)), (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)), 11, 11, 0, 0, 0);
	gol.place_cell_rend((this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)), (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)), 9, 9, 1, 1, 1);
	gol.place_cell_rend((this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)), (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)), 5, 5, 0.8, 0, 0);
	

	//Melee marker
	var x_mel = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/3);
	var y_mel = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/3);
	var dist = gol.get_dist(this.statesize[0]/2, x_mel, this.statesize[1]/2, y_mel);
				
	if(dist >= 64) {
		var capped_pos = gol.player_cap_mouse_pos_max(64);
		x_mel = capped_pos[0];
		y_mel = capped_pos[1];
	}

	gol.place_cell_rend(x_mel, y_mel, 7, 7, 0.4, 0.8, 0.4);
	gol.place_cell_rend(x_mel, y_mel, 5, 5, 1, 1, 1);




	//cooldowns
	gol.place_barrier_cooldown -= 1;
	gol.shoot_cooldown -= 1;
	gol.enemy_cooldown -= 1;
	gol.waypoint_cooldown -= 1;
	gol.queen_cooldown -= 1;
	

	for(var i = 0; i < gol.audio_ar.length; i++) {
		gol.audio_ar[i][8] -= 1;
	}	

	if(gol.p_shield_cooldown > 0) {
		gol.p_shield_cooldown -= 1;
	} else { 
		//show 'shield-ready' glow
		gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, 19, 19, 0, 0.2, 0.4); 
	}	

	//attempt hit detection and give me the result
	var hit = gol.hitplayer();

	//draw player	
	if(hit == 0) {gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size, gol.player_size, 1, 1, 0);} else {
		gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size, gol.player_size, 1, 0, 0)
		gol.place_cell_rend(gol.statesize[0]/2, gol.statesize[1]/2, 9, 9, 1, 1, 0)
	}

	if(hit > 0) {
		gol.run_shields();
	}

	//If moving, drain fuel and slow down
	gol.drainfuel();

	//Drained all power
	if(gol.p_power <= 0) {
		if(gol.space_down) {gol.p_s_burstcooldown = 30;} 
		gol.space_down = false;
	}



	//regens
	if(gol.p_fuel < 1000) {gol.p_fuel += 4;}
	if(gol.p_health < gol.p_health_max) {gol.p_health += 1;}
	if(gol.p_power < 1000) {gol.p_power += 4;}

	//Regen overflow cases
	if(gol.p_fuel > 1000) {gol.p_fuel = 1000;}
	if(gol.p_health > gol.p_health_max) {gol.p_health = gol.p_health_max;}
	if(gol.p_power > 1000) {gol.p_power = 1000;}

	if(gol.p_fuel < 0) {gol.p_fuel = 0;}
	if(gol.p_health < 0) {gol.p_health = 0;}
	if(gol.p_power < 0) {gol.p_power = 0;}
	

	if(hit >= (gol.player_size*gol.player_size)/3) {
		gol.healthflash = true;
	} else if(gol.hitmod == 1) {
		gol.healthflash = false;
	}

	if(gol.health_low_flash < 8 && gol.p_health/gol.p_health_max < 0.25) {
		gol.healthflash = true;
		if(gol.health_low_flash == 0) {
			gol.play_sound(17);
		}
	}

	gol.health_low_flash = (gol.health_low_flash + 1) % 16;

	//status bars
	//  Back bars
	gol.place_cell_rend((gol.statesize[0]/2), 8+18, (gol.statesize[0]/4), 8, 0.26, 0.2, 0)

	if(gol.healthflash) {
		gol.place_cell_rend((gol.statesize[0]/2), 22+16, (gol.statesize[0]/4), 12, 1, 0.8, 0.8)
	} else {
		gol.place_cell_rend((gol.statesize[0]/2), 22+16, (gol.statesize[0]/4), 12, 0.2, 0, 0)
	}

	gol.place_cell_rend((gol.statesize[0]/2), 36+14, (gol.statesize[0]/4), 8, 0, 0.1, 0.2)

	//  Front bars
	gol.place_cell_rend((gol.statesize[0]/2), 8+18, (gol.statesize[0]/4)*(gol.p_fuel/1000), 8, 0.8, 0.6, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 22+16, (gol.statesize[0]/4)*(gol.p_health/gol.p_health_max), 12, 1, 0, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 36+14, (gol.statesize[0]/4)*(gol.p_power/1000), 8, 0, 0.5, 0.8)

	
	//Player UI action handler
	if(!gol.bullet_exists){
		//Main Shooter
		if(!gol.r_click && gol.l_click) {
			if(gol.shoot_cooldown <= 0) {
				if(gol.p_power >= 125){
					gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 9, 25, (gol.mouse_x - this.statesize[0]/2), (gol.mouse_y - this.statesize[1]/2), 0, 39, 101, 12);						
					gol.shoot_cooldown = gol.p_rof;
					gol.p_power -= 125;
					gol.play_sound(9);
				}
			}
		}         
		
		if((!gol.l_click || gol.melee_on) && gol.r_click) {
			gol.create_melee(); 
		}      		
		
		if(!gol.l_click && gol.r_click && !gol.melee_on) {gol.p_power -= 50; gol.melee_on = true;}       		
		
		if(gol.l_click && gol.r_click && gol.p_power >= 30 && gol.melee_on && gol.place_barrier_cooldown <= 0) {
			if(!gol.check_barrier_placement()) {
				var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5);
				var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5);
				var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				
				if(dist >= 50) {
					var capped_pos = gol.player_cap_mouse_pos_max(50);
					x = capped_pos[0];
					y = capped_pos[1];
				}

				gol.create_barrier(x, y, gol.barrier_size, gol.barrier_life_max); 
				gol.place_barrier_cooldown = 5;
				gol.p_power -= 50;					
				gol.play_sound(11);
			}
		}
	}

	
	//Shield burst attack
	if(gol.space_down) {
		gol.place_Rend_World(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, (gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/1000)+gol.player_size, 0, 0, 1, 1);
		gol.place_cell_rend(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/1000)+gol.player_size)*0.85, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/1000)+gol.player_size)*0.85, 0.9, 0.9, 1)
		gol.p_power -= 30;
	}

	if(gol.p_s_burstcooldown > 0) {gol.p_s_burstcooldown -= 1;}
	if(gol.space_down && gol.shield_burst_duration > 0) {gol.shield_burst_duration -= 1;} else {gol.space_down = false;}
			

	//Game Over!	
	if(gol.p_health <= 0) {
		gol.play_sound(13);
		//alert("You did not survive, this time.");
		//gol.active_rule = Math.floor(Math.random()*gol.rule_array.length)
		gol.setRandom(gol.textures.front, 1);
		gol.setEmpty(gol.textures.background_1);
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
