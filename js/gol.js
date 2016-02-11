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
    this.statesize = new Float32Array([w / 2, h / 2]);
    this.timer = null;
    this.lasttick = GOL.now();
    this.fps = 0;
	this.gpuframes = 1;
	this.fps_target = 16.7; //Determines framerate. 66.6 = 15fps, 33.3 = 30fps, 16.7 = 60fps
	document.getElementById("life").style.cursor = "none";

	//Record function
	this.export_image = null;
	this.export_images = new Array();
	this.gen = 0;
	this.render_frame = 0;
	this.recordnow = false;
	this.capture_frame_mod = 16;

	this.game_on = true;
	this.seed_strength = 1.37;

	this.births = new Array(4);
	for(var i = 0; i < this.births.length; i++) {
		this.births[i] = new Array(2);
	}

	this.deaths = new Array(4);
	for(var i = 0; i < this.deaths.length; i++) {
		this.deaths[i] = new Array(2);
	}

	//Player definition & control
	this.player_size = 9;
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
	this.sb_mousesize = 25;

	//General game values
	this.active_rule = new Array(2); //Which level?
	this.active_rule[0] = 1;
	this.active_rule[1] = 0;
	
	this.randrule_player = false;
	this.randrule_enviro = false;
	this.shuffletime = 900;
	this.photo_duration = 1.0;
	this.rule_count = 101;
	this.use_trails = true;

	this.game_score = 0; //Scorekeeping
	this.game_score_div = 0; //Scorekeeping
	this.gsd_deflate = false; //Scorekeeping
	this.game_score_disp = 0; //Scorekeeping
	this.game_score_max = 0; //Scorekeeping
	this.game_frame = 0; //timekeeping
	this.healthflash = false;
	this.health_low_flash = 0;
	this.hit_flash = 0;
	this.master_volume = 0.6;

	//Player Stats
	this.p_health_max = 800;// 7500;
	this.p_power_max = 500;// 2000;
	this.p_fuel_max = 100;// 1000;

	this.p_health = this.p_health_max;
	this.p_power = this.p_power_max;
	this.p_fuel = this.p_fuel_max;
	this.player_level = 0;
	this.player_level_points = 0;
	this.p_shot_cost = 0;
	this.can_level = true;
	

	//CA collision detection
	this.p_hit = new Uint8Array(this.player_size * this.player_size * 4);
	this.hitmod = 1; //ticker for GPU hittest
	this.hitrate = 2; //GPU hittest cooldown (frames between checks)

	//melee
	this.melee_on = false;
	this.melee_size_max = 16/2;
	this.melee_size_min = 28/2;
	this.melee_start_cost = 50;

	//Player shield
	this.p_shield_cooldown = 0;
	this.p_shield_size_max = 4;
	this.p_shield_size = this.player_size+4;
	this.p_s_burstsize = 90/2;
	this.p_s_burstcooldown = 0;
	this.p_shield_charge_cooldown = 0;
		
						
	this.shield_burst_duration = 0;

	//Game objects containers
	this.bullets = new Array();
	this.barriers = new Array();
	this.waypoints = new Array();
	this.enemies = new Array();
	this.enemy_spawn = new Array();
	this.explosions = new Array();

	//Bullets
	this.shoot_cooldown = 0;
	this.p_rof = 15;

	//enemy creation
	this.enemy_cooldown = Math.floor(Math.random()*200+400);
	this.queen_cooldown = 3000;

	/*this.enemy_cooldown = 20;
	this.queen_cooldown = 3;/**/

	//waypoint creation
	this.waypoint_cooldown = Math.floor(Math.random()*500+400);

	//Placeable Barrier object
	this.barrier_size = 30;
	this.place_barrier_cooldown = 0;
	this.barrier_life_max = 12000;
	this.barrier_cost = 500;
	this.bar_type = 3;
	
	this.audio_ar = new Array(20);
	for(var i = 0; i < this.audio_ar.length; i++) {
		this.audio_ar[i] = new Array(10);
	}

	for(i = 0; i < 7; i++) {
		var j = 0;

		this.audio_ar[j][i] = new Audio("sounds/ShieldBurst.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/EnemyHit.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
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
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/Waypoint.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
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
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/Melee.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 8;
		
		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/CreateWall.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
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
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/CreateEnemy.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 5;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/WaypointRegen.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 14;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/CreateEnemy2.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 12;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/LowHealth.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 60;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/LevelUp.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 4;

		j += 1;

		this.audio_ar[j][i] = new Audio("sounds/PowerUp.wav");
		this.audio_ar[j][i].volume = this.master_volume*0.1;
		this.audio_ar[j][7] = 0;
		this.audio_ar[j][8] = 0;
		this.audio_ar[j][9] = 4;

		j += 1;
		

	}
	

    gl.disable(gl.DEPTH_TEST); //disables alpha channels? not sure.

	//Load the shaders
	//This causes massive CPU usage spike that crashes or triggers panic decapture.
	//Follow up for chrome fix.
	//
	//	Load these one at a time?
	//	Keep the neighbourhoods CPU-side?
	//

	this.rule_paths = new Array();

	for(var i = 0; i < 999; i++) {
		this.rule_paths.push('glsl/'+i+'.frag');
	}

	/*this.rule_paths.push('glsl/evo.frag'),
    this.rule_paths.push('glsl/EW-FMA7-9.frag'),
    this.rule_paths.push('glsl/A2R3-2.frag'),
    this.rule_paths.push('glsl/AsymPuffers.frag'),
    this.rule_paths.push('glsl/Atom-Original.frag'),
    this.rule_paths.push('glsl/BloomGlide.frag'),
    this.rule_paths.push('glsl/Bugs.frag'),
    this.rule_paths.push('glsl/EF74-4.frag'),
    this.rule_paths.push('glsl/EF74-6.frag'),
    this.rule_paths.push('glsl/EF741-2.frag'),
    this.rule_paths.push('glsl/EF7TCWave-14.frag'),
    this.rule_paths.push('glsl/Dunes.frag'),
    this.rule_paths.push('glsl/EF7Tether-5.frag'),
    this.rule_paths.push('glsl/EW-FMA7-5.frag'),
    this.rule_paths.push('glsl/F15225-6.frag'),
    this.rule_paths.push('glsl/Feeders-9.frag'),
    this.rule_paths.push('glsl/FMA15-2.frag'),
    this.rule_paths.push('glsl/MicroFeeders-1.frag'),
    this.rule_paths.push('glsl/orbwave-2.frag'),
    this.rule_paths.push('glsl/Sweeper.frag'),
    this.rule_paths.push('glsl/FMA15-20.frag'),
    this.rule_paths.push('glsl/FMA15-23.frag'),
    this.rule_paths.push('glsl/FMA15227-2.frag'),
    this.rule_paths.push('glsl/gol.frag'),
    this.rule_paths.push('glsl/Infection-2.frag'),
    this.rule_paths.push('glsl/Feeders12-3.frag'),
    this.rule_paths.push('glsl/FeedersMicroAtom-17.frag'),
    this.rule_paths.push('glsl/FMA15-1.frag'),
    this.rule_paths.push('glsl/FMA15-10-10.frag'),
    this.rule_paths.push('glsl/FMA15-10-11.frag'),
    this.rule_paths.push('glsl/FMA15-10-3.frag'),
    this.rule_paths.push('glsl/FMA15-10-5.frag'),
    this.rule_paths.push('glsl/FMA15-10-6.frag'),
    this.rule_paths.push('glsl/FMA15-10-7.frag'),
    this.rule_paths.push('glsl/FMA15-10-8.frag'),
    this.rule_paths.push('glsl/FMA15-10-9.frag'),
    this.rule_paths.push('glsl/FMA15-10.frag'),
    this.rule_paths.push('glsl/F15225-9.frag'),
    this.rule_paths.push('glsl/Feeders-1.frag'),
    this.rule_paths.push('glsl/Feeders-16.frag'),
    this.rule_paths.push('glsl/Feeders-17.frag'),
    this.rule_paths.push('glsl/Feeders-20.frag'),
    this.rule_paths.push('glsl/Feeders-7.frag'),
    this.rule_paths.push('glsl/Minefield.frag'),
    this.rule_paths.push('glsl/MiniAtom-18.frag'),
    this.rule_paths.push('glsl/MiniAtom-2.frag'),
    this.rule_paths.push('glsl/MiniAtom-22.frag'),
    this.rule_paths.push('glsl/MiniAtom-5.frag'),
    this.rule_paths.push('glsl/MiniAtomConway.frag'),
    this.rule_paths.push('glsl/Nemesis.frag'),
    this.rule_paths.push('glsl/OrbReplicator.frag'),
    this.rule_paths.push('glsl/OrbWave-4.frag'),
    this.rule_paths.push('glsl/OrbWave-9.frag'),
    this.rule_paths.push('glsl/Tether.frag'),
    this.rule_paths.push('glsl/Tsunami.frag'),
    this.rule_paths.push('glsl/WaveChain.frag'),
    this.rule_paths.push('glsl/Waves.frag'),
    this.rule_paths.push('glsl/WaveShield.frag')/**/






	this.programs = {
        /*gol:  		igloo.program('glsl/quad.vert', 'glsl/gol.frag'),
        evo:  			igloo.program('glsl/quad.vert', 'glsl/PortTest.frag'),
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
		*/

		Rule0:	igloo.program('glsl/quad.vert', this.rule_paths[82]),
		Rule1:	igloo.program('glsl/quad.vert', this.rule_paths[0]),
		Rule2:	igloo.program('glsl/quad.vert', this.rule_paths[39]),

		//Utility shaders
        copy: 			igloo.program('glsl/quad.vert', 'glsl/copy.frag'),
        ShiftCells:  	igloo.program('glsl/quad.vert', 'glsl/ShiftCells_2.frag'),
        PlaceCells:  	igloo.program('glsl/quad.vert', 'glsl/PlaceCells.frag'),
        PlaceSegs:  	igloo.program('glsl/quad.vert', 'glsl/PlaceSegs.frag'),
        RendMerge3:  	igloo.program('glsl/quad.vert', 'glsl/RendMerge3.frag'),
        PlaceCircle:  	igloo.program('glsl/quad.vert', 'glsl/PlaceCircle.frag'),
        ViewRadius:  	igloo.program('glsl/quad.vert', 'glsl/ViewRadius.frag'),
        DestInterf:  	igloo.program('glsl/quad.vert', 'glsl/DestInterf.frag'),
        Blur:  			igloo.program('glsl/quad.vert', 'glsl/Blur.frag'),
        LevelInterf:  	igloo.program('glsl/quad.vert', 'glsl/LevelInterf.frag'),
        photo:  		igloo.program('glsl/quad.vert', 'glsl/photo.frag')
    };

	//console.log(this.programs);

	//Rule & seed selection containers
	this.rule_array = new Array(3);
	this.rule_seeds = new Array(15);

	//set the seed strength defaults
	for (var i = 0; i < this.rule_seeds.length; i++){
		this.rule_seeds[i] = this.seed_strength;
	}

	//Define the rules

	this.rule_array[0] = this.programs.Rule0;
	this.rule_array[1] = this.programs.Rule1;
	this.rule_array[2] = this.programs.Rule2;


	this.rule_seeds[0] = 1.37;
	this.rule_seeds[1] = 1.37;

	//Assign unique seed strengths to rules' indexes
	/*this.rule_seeds[0] = 0.22;
	this.rule_seeds[1] = 0.08;
	this.rule_seeds[2] = 0.33;//0.03;
	this.rule_seeds[4] = 0.28;
	this.rule_seeds[5] = 0.39;
	this.rule_seeds[6] = 0.34;
	this.rule_seeds[7] = 0.44;
	this.rule_seeds[8] = 0.43;
	this.rule_seeds[9] = 0.31;
	this.rule_seeds[10] = 0.31;
	this.rule_seeds[11] = 0.33;
	this.rule_seeds[12] = 0.29;
	this.rule_seeds[14] = 0.44;*/


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
        level_1: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
            .blank(this.statesize[0], this.statesize[1]),
        level_2: igloo.texture(null, gl.RGBA, gl.REPEAT, gl.NEAREST)
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
    this.setRandom(this.textures.level_1, 1);
    this.setEmpty(this.textures.background_1);
	this.setEmpty(this.textures.foreground_1);
    //if(this.game_on == false) {this.setRandom(this.textures.background_1, 1);}

	//clear the CA in an area around the player
	if(this.game_on) {
		this.place_circle_world(this.statesize[0]/scale/2, this.statesize[1]/scale/2, this.statesize[0]/3, this.statesize[1]/3, 0, 0, 0);
	}

	//gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 9, 35, (gol.mouse_x - this.statesize[0]/2), (gol.mouse_y - this.statesize[1]/2), 0, (gol.p_power/gol.p_power_max)*42+12, 101, 12, 1, 0);
	//function(x, y, size, life, targ_x, targ_y, val, exp, open, rand, rendtype, trackingtype)
	//  proj count, size, life, val, explosion_rand, explosion_min, overpenetration, variance, rat of fire
	this.p_bullet_ar = [1, 4, 40, 0, 20, 1, 100, 12, 1, this.p_rof, 0, 0];	
	
	this.p_bullet_ar_mods = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	this.poweruptimer_max = 60*12;
	this.poweruptimer = 0;

	var cost_mult = 0;
	var cost_flat = 0;



		cost_mult += (this.p_bullet_ar[0])*1.8;
		cost_mult += 1.5-((this.p_bullet_ar[3]/60)*1.5);
		cost_mult += this.p_bullet_ar[11]*2.5;
		cost_mult += (this.p_bullet_ar[4]/48)*1.5;
		cost_mult += (this.p_bullet_ar[5]/32)*1.5;
		cost_mult += (this.p_bullet_ar[1]/30)*2;

		cost_flat += this.p_bullet_ar[0]*3;
		cost_flat += 8-((this.p_bullet_ar[3]/60)*4);
		cost_flat += this.p_bullet_ar[11]*6;
		cost_flat += (this.p_bullet_ar[4]/48)*6;
		cost_flat += (this.p_bullet_ar[5]/32)*8;

		cost_flat += (this.p_bullet_ar[1]/30)*80;
		cost_flat += (4-((this.p_bullet_ar[2]/180)*8));
		cost_flat += (this.p_bullet_ar[6]/130*15);
		cost_flat += (4-((this.p_bullet_ar[7]/50)*8));
		cost_flat += 3-this.p_bullet_ar[10]/2;



	this.p_shot_cost = (8 + cost_flat*2)*cost_mult;
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

GOL.prototype.setChans = function(stateR, stateG, stateB, tex) {
    var gl = this.igloo.gl;
    var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);
    for (var i = 0; i < stateR.length; i++) {
        var ii = i * 4;

        rgba[ii + 0] = stateR[i] ? 255 : 0;
        rgba[ii + 1] = stateG[i] ? 255 : 0;
        rgba[ii + 2] = stateB[i] ? 255 : 0;

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
    var randR = new Uint8Array(size);
    var randG = new Uint8Array(size);
    var randB = new Uint8Array(size);
    for (var i = 0; i < size; i++) {
        randR[i] = Math.random() < p/3 ? 1 : 0;
    }
    for (var i = 0; i < size; i++) {
        randG[i] = Math.random() < p/3 ? 1 : 0;
    }
    for (var i = 0; i < size; i++) {
        randB[i] = Math.random() < p/3 ? 1 : 0;
    }
    this.setChans(randR, randG, randB, tex);
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
    var tmp = this.textures.foreground_1;
    this.textures.foreground_1 = this.textures.foreground_2;
    this.textures.foreground_2 = tmp;
    return this;
};
GOL.prototype.swap_level = function() {
    var tmp = this.textures.level_1;
    this.textures.level_1 = this.textures.level_2;
    this.textures.level_2 = tmp;
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
    this.textures.level_1.bind(4);
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
        .uniformi('level', 4)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};

GOL.prototype.runphotobackg = function(tex) {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.foreground_1);

	//Bind textures
    tex.bind(2);
    this.textures.foreground_1.bind(1);
    this.textures.front.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.photo.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('front', 1)
        .uniformi('back', 2)
        .uniform('scale', this.statesize)
        .uniform('duration', this.photo_duration)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};

//destructive interference
GOL.prototype.destruct_interf = function() {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.front);

	//Bind textures
    this.textures.level_1.bind(3);
    this.textures.background_1.bind(2);
    this.textures.foreground_1.bind(1);
    this.textures.front.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.DestInterf.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('front', 1)
        .uniformi('back', 2)
        .uniformi('level', 3)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};

//destructive interference
GOL.prototype.level_interf_front = function() {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.front);

	//Bind textures
    this.textures.level_1.bind(1);
    this.textures.front.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.LevelInterf.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('level', 1)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};//destructive interference

GOL.prototype.level_interf_background = function() {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.background_1);

	//Bind textures
    this.textures.level_1.bind(1);
    this.textures.background_1.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.LevelInterf.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniformi('level', 1)
        .uniform('scale', this.statesize)
        .draw(gl.TRIANGLE_STRIP, 4);

    return this;
};

GOL.prototype.level_blur = function() {

	//Set rend as destination?
	var gl = this.igloo.gl;
	this.framebuffers.step.attach(this.textures.level_1);

	//Bind textures
    this.textures.level_1.bind(0);

	//overlay rend onto ca, result goes in rend tex
	this.programs.Blur.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
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
        .uniform('birth1', gol.births[0][0])
        .uniform('birth1R', gol.births[0][1])
        .uniform('birth2', gol.births[1][0])
        .uniform('birth2R', gol.births[1][1])
        .uniform('birth3', gol.births[2][0])
        .uniform('birth3R', gol.births[2][1])
        .uniform('birth4', gol.births[3][0])
        .uniform('birth4R', gol.births[3][1])
        .uniform('death1', gol.deaths[0][0])
        .uniform('death1R', gol.deaths[0][1])
        .uniform('death2', gol.deaths[1][0])
        .uniform('death2R', gol.deaths[1][1])
        .uniform('death3', gol.deaths[2][0])
        .uniform('death3R', gol.deaths[2][1])
        .uniform('death4', gol.deaths[3][0])
        .uniform('death4R', gol.deaths[3][1])
        .draw(gl.TRIANGLE_STRIP, 4);
	if(layer == 1) {this.swap_main();}
	if(layer == 0) {this.swap_back();}
	if(layer == 2) {this.swap_front();}
	if(layer == 3) {this.swap_level();}
    return this;
};


GOL.prototype.fakestep = function(tex_front, tex_back, rule_prog, layer) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(tex_back);
    tex_front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
	if(layer == 1) {this.swap_main();}
	if(layer == 0) {this.swap_back();}
	if(layer == 2) {this.swap_front();}
	if(layer == 3) {this.swap_level();}
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



GOL.prototype.place_circle_rend = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.rend);
    this.textures.rend.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCircle.use()
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
GOL.prototype.place_circle_world = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.front);
    this.textures.front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCircle.use()
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
	//if(r == 1) {r = 0;} else {r = 1;}
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
GOL.prototype.place_circle_back = function(x, y, w, h, r, g, b) {
	//if(r == 1) {r = 0;} else {r = 1;}
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.background_1);
    this.textures.background_1.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCircle.use()
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
GOL.prototype.place_cell_fore = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.foreground_1);
    this.textures.foreground_1.bind(0);
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

GOL.prototype.place_segs = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.foreground_1);
    this.textures.foreground_1.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceSegs.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('x', x - w/2)
        .uniform('y', y - h/2)
        .uniform('w', w)
        .uniform('h', h)
        .uniform('r', r)
        .uniform('g', g)
        .uniform('b', b)
        .uniform('birth1', gol.births[0][0])
        .draw(gl.TRIANGLE_STRIP, 4);
    return this;
};

GOL.prototype.place_circle_fore = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.foreground_1);
    this.textures.foreground_1.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCircle.use()
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



GOL.prototype.place_circle_level = function(x, y, w, h, r, g, b) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.level_1);
    this.textures.level_1.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.PlaceCircle.use()
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


GOL.prototype.place_view_radius = function(x, y, w, h, r, g, b) {
     var gl = this.igloo.gl;
    this.framebuffers.step.attach(this.textures.rend);
    this.textures.foreground_1.bind(0);
    this.textures.rend.bind(1);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);
    this.programs.ViewRadius.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('render', 0)
        .uniformi('state', 1)
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
	if(layer == 2) {this.swap_fore();}
	if(layer == 3) {this.swap_level();}

    return this;
};

//Offset the 'front' texture by the the player's movements
GOL.prototype.drift = function(tex_front, tex_back, layer, mult) {
    var gl = this.igloo.gl;
    this.framebuffers.step.attach(tex_back);
    tex_front.bind(0);
    //gl.viewport(0, 0, this.statesize[0], this.statesize[1]);

	/*var x = (Math.random() * mult) - mult/2;
	var y = (Math.random() * mult) - mult/2;*/

	var x = 0;
	var y = mult;

    this.programs.ShiftCells.use()
        .attrib('quad', this.buffers.quad, 2)
        .uniformi('state', 0)
        .uniform('scale', this.statesize)
        .uniform('mx', x)
        .uniform('my', y)
        .draw(gl.TRIANGLE_STRIP, 4);

	if(layer == 1) {this.swap_main();}
	if(layer == 0) {this.swap_back();}
	if(layer == 2) {this.swap_fore();}
	if(layer == 3) {this.swap_level();}

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
    gl.viewport(0, 0, this.statesize[0]*2, this.statesize[1]*2);
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
	//gol.place_cell_fore(x,y,size,size,valRend,g,b);
    return this;
};

//Create a square at the location and size in both rend and front textures
GOL.prototype.place_back_rend = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_cell_back(x,y,size,size,valWorld,g,b);
	gol.place_cell_rend(x,y,size,size,valRend,g,b);
    return this;
};
GOL.prototype.place_back_rend_circle = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_circle_back(x,y,size,size,valWorld,g,b);
	gol.place_circle_rend(x,y,size,size,valRend,g,b);
    return this;
};
GOL.prototype.place_level_rend_circle = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_circle_level(x,y,size,size,valWorld,g,b);
	gol.place_circle_rend(x,y,size,size,valRend,g,b);
    return this;
};


//Create a square at the location and size in both rend and front textures
GOL.prototype.place_Rend_World = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_cell_world(x,y,size,size,valWorld,g,b);
	gol.place_cell_rend(x,y,size,size,valRend,g,b);
    return this;
};
GOL.prototype.place_Rend_World_circle = function(x, y, size, valRend, valWorld, g, b) {
	gol.place_circle_world(x,y,size,size,valWorld,g,b);
	gol.place_circle_rend(x,y,size,size,valRend,g,b);
    return this;
};
GOL.prototype.place_Rend_circle = function(x, y, size, r, g, b) {
	gol.place_circle_rend(x,y,size,size,r,g,b);
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
				$('.fps').text(this.fps + ' FPS     |  Score: ' + gol.game_score_disp + ' (' + Math.round(((gol.game_score_div/30)*100)) + '%)     |  Difficulty: ' + Math.round(gol.game_score_max) + '    |  Level: ' + gol.player_level + '/' + gol.player_level_points);
				this.lasttick = GOL.now();
				this.fps = 0;
			} else {
				this.fps++;
			}
			
			
			//Offset the CA texture (front) by player's movements
			if(gol.game_on) {
				gol.shift(gol.textures.front, gol.textures.back, 1, 1);	
				gol.shift(gol.textures.background_1, gol.textures.background_2, 0, 1);	
				gol.shift(gol.textures.foreground_1, gol.textures.foreground_2, 2, 1);	
				gol.shift(gol.textures.level_1, gol.textures.level_2, 3, 1);	
			}

			
			//gol.drift(gol.textures.level_1, gol.textures.level_2, 3, 1);	


			//Compute the next frame(s) of the CA
	
			
			if(gol.game_frame == 0){	
				for(var i = 0; i < 30; i++) {
					gol.step(gol.textures.level_1, gol.textures.level_2, gol.rule_array[2], 3);
					if(i > 20 && i < 28) {gol.place_circle_level(Math.random()*(gol.statesize[0]-128)+64,Math.random()*(gol.statesize[1]-128)+64,(Math.random()*64)+64,(Math.random()*64)+64,0,0,0);}
				}

				for(var i = 0; i < 5; i++) {gol.level_blur();}
			}

			//gol.place_segs(gol.statesize[0]/2,gol.statesize[1]/2,gol.statesize[0],gol.statesize[1],1,1,1);			

			for (var repeat_frame_i = 0; repeat_frame_i < gol.gpuframes; repeat_frame_i++) { 

				for (var i = 0; i < 1; i++) { 
					gol.step(gol.textures.front, gol.textures.back, gol.rule_array[0], 1);
					gol.game_frame += 1
				}

				if(gol.game_on){
					if(gol.game_frame % 3 == 0) {
						gol.step(gol.textures.background_1, gol.textures.background_2, gol.rule_array[1], 0);
					}
				} else {
					gol.step(gol.textures.background_1, gol.textures.background_2, gol.rule_array[1], 0);
				}

				if(gol.game_frame > 5 && gol.use_trails) {
					//gol.runphotobackg(gol.textures.background_1);
					//gol.runphotobackg(gol.textures.level_1);				
				}

				gol.level_interf_front();
				gol.level_interf_background();
				gol.destruct_interf();
				gol.swap_MergeRend3();

			}
gol.runphotobackg(gol.textures.background_1);
			if(gol.game_on) {
				if(gol.poweruptimer > 0) {gol.poweruptimer--;} else { gol.p_bullet_ar_mods = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; }

		    	gol.run_hittests();			//CPU Hit tests
				gol.run_waypoints();		//Step Waypoint calcs
				gol.run_barriers();			//Step Barrier calcs
				gol.run_bullets();			//Step Bullet calcs
				gol.run_enemy_spawn();		//Step Enemy spawner calcs
				gol.run_enemies();			//Step Enemy calcs
				gol.run_explosions();		//Detonations
				gol.view_distortion();      //view range limiter
				gol.run_player();			//Step Player calcs
				
			} else {
				gol.run_sandbox();			//Step sandbox
			}



			gol.draw();					//Render the final texture to the screen

			if(gol.game_score_div > 30) {gol.game_score_div=30;}

			gol.game_score_div += 0.008;

			//gol.game_score = gol.game_score - ((gol.game_score*0.02)/(gol.game_score_div*3));
			gol.game_score = gol.game_score - (gol.game_score* (0.005-(gol.game_score_div/30)*0.005));

			gol.game_score_disp = Math.round(gol.game_score);

			var basescore = (gol.game_score_max*0.1) + 0.55*((gol.game_score_max/30)*(gol.game_score_div));

			if(gol.game_score <= basescore) { gol.game_score = basescore;}

			//if(gol.game_score <= (gol.game_score_max*0.4)+(gol.game_score_max*(gol.game_score_div/30))) {gol.game_score_max*0.4+(gol.game_score_max*(gol.game_score_div/30));}
			
			if(gol.game_score > gol.game_score_max) {
				gol.game_score_max=gol.game_score; 
				gol.gsd_deflate = true; 
				if(gol.can_level) {
					gol.player_level++; 
					gol.player_level_points++;
					gol.can_level = false;
					gol.p_health_max += 750;
					gol.p_power_max += 50;
					gol.p_fuel_max += 25;	
					gol.p_health = gol.p_health_max;
					gol.p_power = gol.p_power_max;
					gol.p_fuel = gol.p_fuel_max;	
					gol.play_sound(18);		
					gol.game_score += 100;	
				}
			}

			if(gol.gsd_deflate) {gol.game_score_div -= 0.1;}
			if(gol.game_score_div < 1) {gol.gsd_deflate = false; gol.can_level = true;}

			//if(gol.game_score > gol.game_score_max && gol.game_score_div >= 30) {  }

			if(gol.randrule_player) {
				if(gol.game_frame % gol.shuffletime == 0) {
					gol.rand_buddy(gol.rule_count);
					//if(!gol.game_on) {
					//	gol.setRandom(gol.textures.background_1, 0, 0.07);
					//}
				}
			}
			if(gol.randrule_enviro) {
				if(gol.game_frame % gol.shuffletime == 0) {
					gol.rand_rule(gol.rule_count);					
					//if(!gol.game_on) {
					//	gol.setRandom(gol.textures.front, 0, 0.15);
					//}
				}
			}

			//Image Export handler
			if (gol.recordnow === true) {
				gol.gen += 1;
				if(gol.gen % gol.capture_frame_mod === 0/*(gol.gen > 600 && gol.gen % 100 === 0) || (gol.gen < 600 && gol.gen % 10 === 0) || (gol.gen < 30)*/){
					
					var rendmod = 50;

					gol.export_image = gol.exportImage(gol.igloo.gl, gol.textures.rend.texture, gol.canvas.width/2, gol.canvas.height/2);
					gol.export_images[gol.render_frame%rendmod] = gol.export_image;
					gol.render_frame += 1;


					if(gol.render_frame % rendmod === 0)	{
						//alert("Download");
						//gol.imageDump();
						gol.downloadAll(gol.export_images, gol.render_frame-rendmod);
					}
				}
			}

        }, this.fps_target);     //Determines framerate. 66.6 = 15fps, 33.3 = 30fps, 16.7 = 60fps
    }
    return this;
};


//Capture the data from the given texture, and return a base64 png image
/*GOL.prototype.exportImage = function(gl, texture, width, height) {

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

    return img;
};*/

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

    return img;
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
	gol.export_images = [];


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

/* Download an img */
GOL.prototype.download = function(img, imgnum) {
	var zerStr = "";
	for (i = 0; i < 6-imgnum.toString().length; i++) {
		zerStr += "0";
	}
	zerStr+=imgnum.toString();

    var link = document.createElement("a");
    link.href = img.src;
    link.download = "image" + zerStr + ".png";
    link.style.display = "none";
    var evt = new MouseEvent("click", {
        "view": window,
        "bubbles": true,
        "cancelable": true
    });

    document.body.appendChild(link);
    link.dispatchEvent(evt);
    document.body.removeChild(link);
    //console.log("Downloading...");
}

/* Download all images in 'imgs'. 
 * Optionaly filter them by extension (e.g. "jpg") and/or 
 * download the 'limit' first only  */
GOL.prototype.downloadAll = function(imgs, imgnum) {

    /* (Try to) download the images */ 
	for (var i = 0; i < imgs.length; i++) {
        gol.download(imgs[i], imgnum+i);
    }
   /* for (var i = start; i < imgs.length; i++) {
        var img = imgs[i];
        //console.log("IMG: " + img.src + " (", img, ")");
        gol.download(img, i);
    }*/
}

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
	gui.cont = cont;


    gui.add(cont, 'booloff').name('Pause').onFinishChange(tog);
    gui.add(cont, 'boolon').name('Game Mode').onFinishChange(tog_game);
    gui.add(cont, 'fps', 0.5, 300)		.step(1).name('Target FPS').onFinishChange(set_fps);
    gui.add(cont, 'volume', 0.0, 2.5)	.step(0.1).name('Sound Volume').onFinishChange(set_volume);

   // f1.add(cont, 'gpuframes', 1, 50)		.step(1).name('GPU Frames').onFinishChange(set_gpuframes);
    //f1.add(cont, 'fcap', 1, 3000)		.step(1).name('Capture Rate').onFinishChange(set_fcap);

	//var f1 = gui.addFolder('Config');
	//var f3 = gui.addFolder('Game');
	//var f4 = gui.addFolder('Sandbox');
	//var f5 = gui.addFolder('Params');
	//var f6 = gui.addFolder('LevelUp');

	var f0 = gui.addFolder('Game');
	  var f00 = f0.addFolder('Weapon');
	  var f01 = f0.addFolder('LevelUp');
	  var f02 = f0.addFolder('World');

    f01.add(cont, 'lv_H', 0, 1).step(1).name('Health').onFinishChange(set_lv_H);
    f01.add(cont, 'lv_P', 0, 1).step(1).name('Energy').onFinishChange(set_lv_P);
    f01.add(cont, 'lv_F', 0, 1).step(1).name('Fuel').onFinishChange(set_lv_F);

    f02.add(cont, 'seed', 0, 3).step(0.01).name('Seed Strength').onFinishChange(set_seed_str);
	f02.add(cont, 'rule', -1, 200)	.step(1).name('Enemy Rule').onFinishChange(set_rule);
	f02.add(cont, 'buddy_rule', -1, 200)	.step(1).name('Player Rule').onFinishChange(set_buddy_rule);
    f02.add(cont, 'booloff').name('Player Shuffle').onFinishChange(ranrul_player);
    f02.add(cont, 'booloff').name('Rule Shuffle').onFinishChange(ranrul_enviro);
	f02.add(cont, 'level_rule', -1, 200)	.step(1).name('Level Rule').onFinishChange(set_level_rule);

	f00.add(cont, 'preset_shots', {    	
		'Default': 0,   	
		'Rapidfire': 1,   		
		'Sniper': 2,   	
		'Shotgun': 3,   	
		'Defense': 4,   	
		'Explosive': 5,   	
		'Mines': 6,   	
		'BigShot': 7
	}).name('Presets').onChange(set_shot);

	var f000 = f00.addFolder('Custom');

    f000.add(cont, 'pb_proj', 1, 3).step(1).name('Projectiles').onFinishChange(set_pb);
    f000.add(cont, 'pb_size', 3, 30).step(1).name('Size').onFinishChange(set_pb);
    f000.add(cont, 'pb_life', 30, 180).step(1).name('Duration').onFinishChange(set_pb);
    f000.add(cont, 'pb_expmax', 1, 48).step(1).name('ExplodeMax').onFinishChange(set_pb);
    f000.add(cont, 'pb_expmin', 1, 32).step(1).name('ExplodeMin').onFinishChange(set_pb);
    f000.add(cont, 'pb_oPen', 0, 130).step(1).name('Overpenetration').onFinishChange(set_pb);
    f000.add(cont, 'pb_rand', 0, 50).step(1).name('Accuracy').onFinishChange(set_pb);
    f000.add(cont, 'pb_rof', 6, 60).step(1).name('RoF').onFinishChange(set_pb);
    f000.add(cont, 'pb_vibrate', 0, 6).step(1).name('Vibrate').onFinishChange(set_pb);
    f000.add(cont, 'pb_fork', 0, 1).step(1).name('Fork').onFinishChange(set_pb);

	var f1 = gui.addFolder('Config');

    f1.add(cont, 'boolon').name('Trails').onFinishChange(tog_trail);
    f1.add(cont, 'trail', 4, 500).step(1).name('Trail Length').onFinishChange(set_trail_len);
    f1.add(cont, 'gpuframes', 1, 50)		.step(1).name('GPU Frames').onFinishChange(set_gpuframes);
	f1.add(cont, 'sb_drawsize', 2, 200)	.step(1).name('BrushSize').onFinishChange(set_brush);
    f1.add(cont, 'booloff').name('Record Frames').onFinishChange(tog_record);
    f1.add(cont, 'fcap', 1, 512)		.step(1).name('Capture Rate').onFinishChange(set_fcap);


	/*f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B1').onChange(set_ruleparamsB1);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B1R').onFinishChange(set_ruleparamsB1R);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B2').onFinishChange(set_ruleparamsB2);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B2R').onFinishChange(set_ruleparamsB2R);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B3').onFinishChange(set_ruleparamsB3);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B3R').onFinishChange(set_ruleparamsB3R);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B4').onFinishChange(set_ruleparamsB4);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('B4R').onFinishChange(set_ruleparamsB4R);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D1').onFinishChange(set_ruleparamsD1);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D1R').onFinishChange(set_ruleparamsD1R);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D2').onFinishChange(set_ruleparamsD2);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D2R').onFinishChange(set_ruleparamsD2R);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D3').onFinishChange(set_ruleparamsD3);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D3R').onFinishChange(set_ruleparamsD3R);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D4').onFinishChange(set_ruleparamsD4);
	f5.add(cont, 'ruleparams', 1, 200)	.step(1).name('D4R').onFinishChange(set_ruleparamsD4R);*/





	function set_ruleparamsB1(value) {
		gol.births[0][0] = value; 
	}
	function set_ruleparamsB1R(value) {
		gol.births[0][1] = value;
	}
	function set_ruleparamsB2(value) {
		gol.births[1][0] = value;
	}
	function set_ruleparamsB2R(value) {
		gol.births[1][1] = value;
	}
	function set_ruleparamsB3(value) {
		gol.births[2][0] = value;
	}
	function set_ruleparamsB3R(value) {
		gol.births[2][1] = value;
	}
	function set_ruleparamsB4(value) {
		gol.births[3][0] = value;
	}
	function set_ruleparamsB4R(value) {
		gol.births[3][1] = value;
	}


	function set_ruleparamsD1(value) {
		gol.deaths[0][0] = value;
	}
	function set_ruleparamsD1R(value) {
		gol.deaths[0][1] = value;
	}
	function set_ruleparamsD2(value) {
		gol.deaths[1][0] = value;
	}
	function set_ruleparamsD2R(value) {
		gol.deaths[1][1] = value;
	}
	function set_ruleparamsD3(value) {
		gol.deaths[2][0] = value;
	}
	function set_ruleparamsD3R(value) {
		gol.deaths[2][1] = value;
	}
	function set_ruleparamsD4(value) {
		gol.deaths[3][0] = value;
	}
	function set_ruleparamsD4R(value) {
		gol.deaths[3][1] = value;
	}


	function testFoo(value) {
        alert("TEST GUI Response: " + value);
    }

	function tog(){
		gol.toggle();
		document.getElementById("life").focus();
	}

	function tog_game(){
		gol.game_on = !gol.game_on;
		document.getElementById("life").focus();
	}

	function ranrul_player(){
		//gol.randrules gol.randrules;
		gol.randrule_player = !gol.randrule_player;
		document.getElementById("life").focus();
	}


	function ranrul_enviro(){
		//gol.randrules gol.randrules;
		gol.randrule_enviro = !gol.randrule_enviro;
		document.getElementById("life").focus();
	}

	function set_pb(){
		gol.p_bullet_ar = [cont.pb_proj, cont.pb_size, cont.pb_life, cont.pb_rof, cont.pb_expmax, cont.pb_expmin, cont.pb_oPen, cont.pb_rand, 1, 0, cont.pb_vibrate, cont.pb_fork];
		gol.p_rof = cont.pb_rof;

		var cost_mult = 0;
		var cost_flat = 0;

		cost_mult += (gol.p_bullet_ar[0])*1.8;
		cost_mult += 1.5-((gol.p_bullet_ar[3]/60)*1.5);
		cost_mult += gol.p_bullet_ar[11]*2.5;
		cost_mult += (gol.p_bullet_ar[4]/48)*1.5;
		cost_mult += (gol.p_bullet_ar[5]/32)*1.5;
		cost_mult += (gol.p_bullet_ar[1]/30)*2;

		cost_flat += gol.p_bullet_ar[0]*3;
		cost_flat += 4-((gol.p_bullet_ar[3]/60)*2);
		cost_flat += gol.p_bullet_ar[11]*6;
		cost_flat += (gol.p_bullet_ar[4]/48)*4;
		cost_flat += (gol.p_bullet_ar[5]/32)*6;

		cost_flat += (gol.p_bullet_ar[1]/30)*60;
		cost_flat += (8-((gol.p_bullet_ar[2]/180)*16));
		cost_flat += (gol.p_bullet_ar[6]/130*15);
		cost_flat += (2-((gol.p_bullet_ar[7]/50)*4));
		cost_flat += 12-gol.p_bullet_ar[10]*2;

		gol.p_shot_cost = (2 + cost_flat*2)*cost_mult;
	
	}

   function set_fps(value){
		gol.toggle();

        gol.fps_target = 1000/value;

		gol.toggle();

		document.getElementById("life").focus();
	}

   function tog_record(value){
		gol.recordnow = !gol.recordnow;
		document.getElementById("life").focus();
	}

   function set_gpuframes(value){
		gol.toggle();

        gol.gpuframes = value;

		gol.toggle();

		document.getElementById("life").focus();
	}

   	function set_fcap(value){
		gol.capture_frame_mod = value;
	}

	function tog_trail(){
		gol.use_trails = !gol.use_trails;
		gol.setEmpty(gol.textures.foreground_1);
		document.getElementById("life").focus();
	}

	function set_seed_str(val){
		gol.seed_strength = val;
		
		for (var i = 0; i < gol.rule_seeds.length; i++){
			gol.rule_seeds[i] = gol.seed_strength;
		}
	}

	function set_trail_len(val){
		gol.photo_duration = val*0.001;
		gol.reset_rules(cont.rule, cont.buddy_rule, gol.gui.cont.level_rule);
	}

	function set_volume(val){
		gol.master_volume = val;
		for(i = 0; i < 7; i++) {
			var j = 0;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;		
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;		
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;		
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
			j += 1;
			gol.audio_ar[j][i].volume = gol.master_volume*0.1;
		}
	}

	function set_brush(val){
		gol.sb_mousesize = val;
	}

	function fpsChange(value) {
		gol.toggle();
        if(value) {gol.fps_target = 16.7; }
        if(!value) {gol.fps_target = 33.3;}
		gol.toggle();
		document.getElementById("life").focus();
    }

	function set_rule(value){
		if(value == -1) {
			value = Math.floor(Math.random()*gol.rule_count);
			cont.rule = value;
			for (var i = 0; i < f0.__folders.World.__controllers.length; i++) {
				f0.__folders.World.__controllers[i].updateDisplay();
			}
		}
		gol.reset_rules(value, cont.buddy_rule, cont.level_rule);
		//gol.setRandom(gol.textures.front, 1);
		//gol.setEmpty(gol.textures.background_1);
		//gol.setEmpty(gol.textures.foreground_1);
//    	if(gol.game_on == false) {gol.setRandom(gol.textures.background_1, 1);}
		//gol.player_reset();
		document.getElementById("life").focus();
		//gui.close();
	}


	function set_lv_H(value){
		if(gol.player_level_points > 0 && value == 1) {
			gol.p_health_max += 200;
			gol.player_level_points--; 
		}

		cont.lv_H = 0;

		for (var i = 0; i < f0.__folders.LevelUp.__controllers.length; i++) {
			f0.__folders.LevelUp.__controllers[i].updateDisplay();
		}

		document.getElementById("life").focus();
	}

	function set_lv_P(value){
		if(gol.player_level_points > 0 && value == 1) {
			gol.p_power_max += 125;
			gol.player_level_points--; 
		}

		cont.lv_P = 0;

		for (var i = 0; i < f0.__folders.LevelUp.__controllers.length; i++) {
			f0.__folders.LevelUp.__controllers[i].updateDisplay();
		}

		document.getElementById("life").focus();
	}

	function set_lv_F(value){
		if(gol.player_level_points > 0 && value == 1) {
			gol.p_fuel_max += 75;	
			gol.player_level_points--; 
		}

		cont.lv_F = 0;

		for (var i = 0; i < f0.__folders.LevelUp.__controllers.length; i++) {
			f0.__folders.LevelUp.__controllers[i].updateDisplay();
		}

		document.getElementById("life").focus();
	}

	function set_buddy_rule(value){
		if(value == -1) {
			value = Math.floor(Math.random()*gol.rule_count);
			cont.buddy_rule = value;
			for (var i = 0; i < f0.__folders.World.__controllers.length; i++) {
				f0.__folders.World.__controllers[i].updateDisplay();
			}
		}
		gol.reset_rules(cont.rule, value, cont.level_rule);
		//gol.setRandom(gol.textures.front, 1);
		//gol.setEmpty(gol.textures.background_1);
		//gol.setEmpty(gol.textures.foreground_1);
//    	if(gol.game_on == false) {gol.setRandom(gol.textures.background_1, 1);}
		//gol.player_reset();
		document.getElementById("life").focus();
		//gui.close();
	}


	function set_level_rule(value){
		if(value == -1) {
			value = Math.floor(Math.random()*gol.rule_count);
			cont.level_rule = value;
			for (var i = 0; i < f0.__folders.World.__controllers.length; i++) {
				f0.__folders.World.__controllers[i].updateDisplay();
			}
		}
		gol.reset_rules(cont.rule, cont.buddy_rule, value);
		document.getElementById("life").focus();
	}


	function set_shot(value){
		if(value == 0) {
			cont.pb_proj = 1;
			cont.pb_size = 6;
			cont.pb_life = 40;
			cont.pb_rof = 16;
			cont.pb_expmax = 0;
			cont.pb_expmin = 0;
			cont.pb_oPen = 115;
			cont.pb_rand = 12;
			cont.pb_vibrate = 2;
			cont.pb_fork = 0;
		}
		if(value == 1) {
			cont.pb_proj = 1;
			cont.pb_size = 3;
			cont.pb_life = 40;
			cont.pb_rof = 6;
			cont.pb_expmax = 1;
			cont.pb_expmin = 1;
			cont.pb_oPen = 130;
			cont.pb_rand = 20;
			cont.pb_vibrate = 3;
			cont.pb_fork = 0;
		}
		if(value == 2) {
			cont.pb_proj = 3;
			cont.pb_size = 12;
			cont.pb_life = 30;
			cont.pb_rof = 60;
			cont.pb_expmax = 1;
			cont.pb_expmin = 1;
			cont.pb_oPen = 130;
			cont.pb_rand = 0;
			cont.pb_vibrate = 0;
			cont.pb_fork = 0;
		}
		if(value == 3) {
			cont.pb_proj = 3;
			cont.pb_size = 5;
			cont.pb_life = 30;
			cont.pb_rof = 30;
			cont.pb_expmax = 1;
			cont.pb_expmin = 1;
			cont.pb_oPen = 115;
			cont.pb_rand = 20;
			cont.pb_vibrate = 6;
			cont.pb_fork = 1;
		}
		if(value == 4) {
			cont.pb_proj = 3;
			cont.pb_size = 3;
			cont.pb_life = 90;
			cont.pb_rof = 12;
			cont.pb_expmax = 1;
			cont.pb_expmin = 1;
			cont.pb_oPen = 50;
			cont.pb_rand = 50;
			cont.pb_vibrate = 6;
			cont.pb_fork = 0;
		}
		if(value == 5) {
			cont.pb_proj = 1;
			cont.pb_size = 3;
			cont.pb_life = 30;
			cont.pb_rof = 15;
			cont.pb_expmax = 48;
			cont.pb_expmin = 32;
			cont.pb_oPen = 100;
			cont.pb_rand = 8;
			cont.pb_vibrate = 0;
			cont.pb_fork = 0;
		}
		if(value == 6) {
			cont.pb_proj = 1;
			cont.pb_size = 6;
			cont.pb_life = 180;
			cont.pb_rof = 10;
			cont.pb_expmax = 48;
			cont.pb_expmin = 32;
			cont.pb_oPen = 0;
			cont.pb_rand = 50;
			cont.pb_vibrate = 1;
			cont.pb_fork = 0;
		}
		if(value == 7) {
			cont.pb_proj = 1;
			cont.pb_size = 15;
			cont.pb_life = 70;
			cont.pb_rof = 28;
			cont.pb_expmax = 48;
			cont.pb_expmin = 1;
			cont.pb_oPen = 130;
			cont.pb_rand = 20;
			cont.pb_vibrate = 0;
			cont.pb_fork = 0;
		}

		set_pb();

		for (var i = 0; i < f00.__folders.Custom.__controllers.length; i++) {
			f00.__folders.Custom.__controllers[i].updateDisplay();
		}

		document.getElementById("life").focus();
	}

	return gui;
	
}



function myConfig() {
	this.testInt = 0;
	this.seed = gol.seed_strength;
	this.testBool = false;
	this.booloff = false;
	this.boolon = true;
	this.rule = 82;
	this.buddy_rule = 0;
	this.level_rule = 39;
	this.fps = 60;
	this.gpuframes = 1;
	this.fcap = 8;
	this.trail = 10.0;
	this.volume = gol.master_volume;

	this.pb_proj = gol.p_bullet_ar[0];
	this.pb_size = gol.p_bullet_ar[1];
	this.pb_life = gol.p_bullet_ar[2];
	this.pb_rof = gol.p_rof;
	this.pb_expmax = gol.p_bullet_ar[4];
	this.pb_expmin = gol.p_bullet_ar[5];
	this.pb_oPen = gol.p_bullet_ar[6];
	this.pb_rand = gol.p_bullet_ar[7];
	this.pb_vibrate = gol.p_bullet_ar[10];
	this.pb_fork = gol.p_bullet_ar[11];

	this.lv_H = 0;
	this.lv_P = 0;
	this.lv_F = 0;

	this.preset_shots = 0;

	this.sb_drawsize = gol.sb_mousesize;

	this.ruleparams = 1;
	
}


/**
 * Manages the user input interface for a simulation.
 */
function Controller(gol) {
    this.gol = gol;
    var _this = this,
        $canvas = $(gol.igloo.canvas);
    this.drag = null;

	gol.gui = addGUI();

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
        gol.mouse_x = pos[0]/2;
		gol.mouse_y = pos[1]/2;
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
		    case 79: /* O */
		        gol.next_rule();
				//gol.next_buddy();
		        break;       
		    case 73: /* I */
		        //gol.next_rule();
				gol.next_buddy();
		        break;        
		    case 85: /* U */
				gol.recordnow = !gol.recordnow;
		        break;       
		    case 67: /* C */
				gol.shuffletime = 60;
		        break;    
		    case 89: /* Y */
				gol.setRandom(gol.textures.background_1, 1);
		        break;        
			case 32: /* space */
				if(gol.p_s_burstcooldown <= 0 && !gol.space_down && (gol.p_power/gol.p_power_max) >= 0.28) {
					gol.start_shieldburst()
					gol.space_down = true;
			 		gol.play_sound(0);
					gol.shield_burst_duration = 22;
					//gol.game_score += 100;
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
    		gol.setRandom(gol.textures.level_1, 1);
			gol.setEmpty(gol.textures.background_1);
			gol.setEmpty(gol.textures.foreground_1);
//    		if(gol.game_on == false) {gol.setRandom(gol.textures.background_1, 1);}
			gol.player_reset();
            break;
        case 46: /* [delete] */
			gol.setEmpty(gol.textures.background_1);
            gol.setEmpty(gol.textures.front);
            gol.setEmpty(gol.textures.foreground_1);
            gol.setEmpty(gol.textures.level_1);
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
		case 67: /* C */
			gol.shuffletime = 1800;
		    break;    
        };
    });
}

GOL.prototype.save_score = function() {
	
	//localStorage.clear();

	var score_ar = [];

	//if(JSON.parse ( localStorage.getItem('WebGoL-Highscores')) != null) {
	//	score_ar = JSON.parse ( localStorage.getItem('WebGoL-Highscores'));
	//}

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

GOL.prototype.next_rule = function() {
	gol.gui.cont.rule += 1;
	gol.reset_rules(gol.gui.cont.rule, gol.gui.cont.buddy_rule, gol.gui.cont.level_rule);
	gol.setRandom(gol.textures.front, 1);
    gol.setRandom(gol.textures.level_1, 1);
	gol.setEmpty(gol.textures.background_1);
	gol.setEmpty(gol.textures.foreground_1);
//    if(gol.game_on == false) {gol.setRandom(gol.textures.background_1, 1);}
	gol.player_reset();
	document.getElementById("life").focus();
}


GOL.prototype.next_buddy = function() {
	gol.gui.cont.buddy_rule += 1;
	gol.reset_rules(gol.gui.cont.rule, gol.gui.cont.buddy_rule, gol.gui.cont.level_rule);
	gol.setRandom(gol.textures.front, 1);
    gol.setRandom(gol.textures.level_1, 1);
	gol.setEmpty(gol.textures.background_1);
	gol.setEmpty(gol.textures.foreground_1);
//    if(gol.game_on == false) {gol.setRandom(gol.textures.background_1, 1);}
	gol.player_reset();
	document.getElementById("life").focus();
}



GOL.prototype.rand_buddy = function(rand) {
	gol.gui.cont.buddy_rule = Math.floor(Math.random()*rand);
	gol.reset_rules(gol.gui.cont.rule, gol.gui.cont.buddy_rule, gol.gui.cont.level_rule);
}

GOL.prototype.rand_rule = function(rand) {
	gol.gui.cont.rule = Math.floor(Math.random()*rand);
	gol.reset_rules(gol.gui.cont.rule, gol.gui.cont.buddy_rule, gol.gui.cont.level_rule);
}

GOL.prototype.reset_rules = function(rule0, rule1, rule2) {
	
	gol.programs = {
		Rule0:	gol.igloo.program('glsl/quad.vert', gol.rule_paths[rule0]),
		Rule1:	gol.igloo.program('glsl/quad.vert', gol.rule_paths[rule1]),
		Rule2:	gol.igloo.program('glsl/quad.vert', gol.rule_paths[rule2]),

		//Utility shaders
        copy: 			gol.igloo.program('glsl/quad.vert', 'glsl/copy.frag'),
        ShiftCells:  	gol.igloo.program('glsl/quad.vert', 'glsl/ShiftCells_2.frag'),
        PlaceCells:  	gol.igloo.program('glsl/quad.vert', 'glsl/PlaceCells.frag'),
        PlaceSegs:  	gol.igloo.program('glsl/quad.vert', 'glsl/PlaceSegs.frag'),
        RendMerge3:  	gol.igloo.program('glsl/quad.vert', 'glsl/RendMerge3.frag'),
        PlaceCircle:  	gol.igloo.program('glsl/quad.vert', 'glsl/PlaceCircle.frag'),
        ViewRadius:  	gol.igloo.program('glsl/quad.vert', 'glsl/ViewRadius.frag'),
        DestInterf:  	gol.igloo.program('glsl/quad.vert', 'glsl/DestInterf.frag'),
        Blur:  			gol.igloo.program('glsl/quad.vert', 'glsl/Blur.frag'),
        LevelInterf:  	gol.igloo.program('glsl/quad.vert', 'glsl/LevelInterf.frag'),
        photo:  		gol.igloo.program('glsl/quad.vert', 'glsl/photo.frag')
    };

	gol.rule_array[0] = gol.programs.Rule0;
	gol.rule_array[1] = gol.programs.Rule1;
	gol.rule_array[2] = gol.programs.Rule2;
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
				gol.p_fuel -= 8;
			}
		}
	}

	//Player Collision with Waypoints
	for(var i = 0; i < gol.waypoints.length; i++) {
		if(gol.waypoints.length > 0 && gol.waypoints[i] != null) {
			if(gol.cpu_hit_test(this.statesize[0]/2, gol.waypoints[i][0], this.statesize[1]/2, gol.waypoints[i][1], gol.player_size, gol.waypoints[i][2])) {
				if(gol.waypoints[i][5] == 0) {
					gol.p_health += 14;
					gol.p_power += 8;
					gol.p_fuel += 4;
					//gol.game_score += 5;
					gol.waypoints[i][3] -= 2;
					gol.play_sound(15);
				} 

				if(gol.waypoints[i][5] == 1) {
					gol.waypoints[i][3] -= 35;
					gol.p_health += gol.p_health_max/200;
					gol.play_sound(15);
					//gol.game_score += 8;
	
				}				
		

				if(gol.waypoints[i][5] == 2) {
					if(gol.p_power < gol.p_power_max) {
						if((gol.p_power_max-gol.p_power) < 40){
							gol.waypoints[i][3] -= (gol.p_power_max-gol.p_power)/4;
							gol.p_power += (gol.p_power_max-gol.p_power);
						} else {
							gol.waypoints[i][3] -= 10;
							gol.p_power += 8;
						}
						//gol.game_score += 10;
					}
					gol.p_fuel += 10;
					gol.play_sound(15);
				}	

				if(gol.waypoints[i][5] == 3) {
					gol.waypoints[i][3] = 0;
					gol.p_bullet_ar_mods[0] = 2;
					gol.p_bullet_ar_mods[7] = 15;
					gol.play_sound(19);
					gol.poweruptimer = gol.poweruptimer_max;
					//gol.create_explosion(gol.waypoints[i][0], gol.waypoints[i][1], 80, 16, 0, 0, 0.6, 0, 0, false, 2);
					//gol.game_score += 12;
				}	

				if(gol.waypoints[i][5] == 4) {
					gol.waypoints[i][3] = 0;
					gol.p_bullet_ar_mods[1] = 15;
					gol.play_sound(19);
					gol.poweruptimer = gol.poweruptimer_max;
					//gol.create_explosion(gol.waypoints[i][0], gol.waypoints[i][1], 80, 16, 0, 0, 0.6, 0, 0, false, 2);
					//gol.game_score += 12;
				}	

				if(gol.waypoints[i][5] == 5) {
					gol.waypoints[i][3] = 0;
					gol.p_bullet_ar_mods[5] = 30;
					gol.p_bullet_ar_mods[4] = 10;
					gol.play_sound(19);
					gol.poweruptimer = gol.poweruptimer_max;
					//gol.create_explosion(gol.waypoints[i][0], gol.waypoints[i][1], 80, 16, 0, 0, 0.6, 0, 0, false, 2);
					//gol.game_score += 12;
				}		

				if(gol.waypoints[i][5] == 6) {
					gol.waypoints[i][3] = 0;
					gol.p_bullet_ar_mods[7] = -30;
					gol.p_bullet_ar_mods[2] = -20;
					gol.play_sound(19);
					gol.poweruptimer = gol.poweruptimer_max;
					//gol.create_explosion(gol.waypoints[i][0], gol.waypoints[i][1], 80, 16, 0, 0, 0.6, 0, 0, false, 2);
					//gol.game_score += 12;
				}	

				if(gol.waypoints[i][5] == 7) {
					gol.waypoints[i][3] = 0;
					var offset = 24;
					gol.create_barrier(gol.waypoints[i][0]-offset, gol.waypoints[i][1]-offset, gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.create_barrier(gol.waypoints[i][0]-offset, gol.waypoints[i][1], gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.create_barrier(gol.waypoints[i][0]-offset, gol.waypoints[i][1]+offset, gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.create_barrier(gol.waypoints[i][0]+offset, gol.waypoints[i][1]+offset, gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.create_barrier(gol.waypoints[i][0]+offset, gol.waypoints[i][1], gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.create_barrier(gol.waypoints[i][0]+offset, gol.waypoints[i][1]-offset, gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.create_barrier(gol.waypoints[i][0], gol.waypoints[i][1]+offset, gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.create_barrier(gol.waypoints[i][0], gol.waypoints[i][1]-offset, gol.barrier_size*0.55, gol.barrier_life_max, 0); 
					gol.play_sound(19);
					//gol.create_explosion(gol.waypoints[i][0], gol.waypoints[i][1], 80, 16, 0, 0, 0.6, 0, 0, false, 2);
					//gol.game_score += 12;
				}		

			//  proj count, size, life, val, explosion_rand, explosion_min, overpenetration, variance, rat of fire
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
							if(gol.waypoints[i][5] == 0) {
								gol.waypoints[i][3] -= (gol.bullets[j][2]*10)+120;
								//gol.ar_kill(gol.bullets, j);
								gol.bullets[j][3] = 0;
								hit_wp_sound = true;
							}
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
						gol.waypoints[i][3] -= (gol.enemies[j][3]) + 50;
						gol.enemies[j][3] -= 10;
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
					//if(i != j) {
						if(gol.cpu_hit_test(gol.bullets[j][0], gol.bullets[i][0], gol.bullets[j][1], gol.bullets[i][1], gol.bullets[j][2], gol.bullets[i][2])) {

							gol.bullets[i][3] -= 1;
							gol.bullets[j][3] -= 1;
							if(gol.bullets[i][10] > 1) {gol.bullets[i][3] = 0;}

							gol.bullets[j][0] += (gol.bullets[j][5]/30)/2;
							gol.bullets[j][1] += (gol.bullets[j][5]/30)/2;

							gol.bullets[i][0] -= (gol.bullets[i][5]/30)/2;
							gol.bullets[i][1] -= (gol.bullets[i][6]/30)/2;
							

							gol.bullets[j][5] = (Math.floor(Math.random()*320)-160)/2;
							gol.bullets[j][6] = (Math.floor(Math.random()*320)-160)/2;
							gol.bullets[i][5] = (Math.floor(Math.random()*320)-160)/2;
							gol.bullets[i][6] = (Math.floor(Math.random()*320)-160)/2;
							//gol.game_score += 10;
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
							gol.enemies[j][3] -= (gol.bullets[i][2]*20) - 30;
							gol.bullets[i][3] -= 2;

							gol.enemies[j][0] +=  (gol.bullets[i][5]/500) * gol.bullets[i][2];
							gol.enemies[j][1] +=  (gol.bullets[i][6]/500) * gol.bullets[i][2];

							gol.bullets[i][0] -= (gol.bullets[i][5]/30)/2;
							gol.bullets[i][1] -= (gol.bullets[i][6]/30)/2;

							gol.bullets[i][5] = (Math.floor(Math.random()*320)-160)/2;
							gol.bullets[i][6] = (Math.floor(Math.random()*320)-160)/2;
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
							gol.enemies[j][3] -= 40 + (gol.explosions[i][2]*3);
							hit_enemy_sound = true;
						}
					}
				}
			}
		}
	}

	//explosion collision with barrier
	for(var i = 0; i < gol.explosions.length; i++) {
		for(var j = 0; j < gol.barriers.length; j++) {
			if(gol.explosions.length > 0 && gol.explosions[i] != null) {
				if(gol.barriers.length > 0 && gol.barriers[j] != null) {
					if(gol.explosions[i][3] == gol.explosions[i][4]-1) {
						if(gol.cpu_hit_test(gol.barriers[j][0], gol.explosions[i][0], gol.barriers[j][1], gol.explosions[i][1], gol.barriers[j][2], gol.explosions[i][2])) {
							gol.barriers[j][3] -= 400+(gol.explosions[i][2]*10);
							//hit_enemy_sound = true;
						}
					}
				}
			}
		}
	}

	//explosion collision with waypoint
	for(var i = 0; i < gol.explosions.length; i++) {
		for(var j = 0; j < gol.waypoints.length; j++) {
			if(gol.explosions.length > 0 && gol.explosions[i] != null) {
				if(gol.waypoints.length > 0 && gol.waypoints[j] != null) {
					if(gol.explosions[i][3] == gol.explosions[i][4]-1) {
						if(gol.cpu_hit_test(gol.waypoints[j][0], gol.explosions[i][0], gol.waypoints[j][1], gol.explosions[i][1], gol.waypoints[j][2], gol.explosions[i][2])) {
							if(gol.waypoints[j][5] == 0) {
								gol.waypoints[j][3] -= 100+(gol.explosions[i][2]*10);
								hit_wp_sound = true;
							}
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
							//gol.ar_kill(gol.bullets, j);
							gol.bullets[j][3] = 0;
							//gol.game_score += 20;
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
					if(gol.cpu_hit_test(gol.barriers[j][0], gol.bullets[i][0], gol.barriers[j][1], gol.bullets[i][1], gol.barriers[j][2], gol.bullets[i][2])) {
						/*if(gol.bullets[i][10] > 0) {
							gol.bullets[i][3] = 0;
						} else {*/
							gol.barriers[j][3] -= (gol.bullets[i][2]*60)+120;

							gol.barriers[j][0] +=  (gol.bullets[i][5]/500) * gol.bullets[i][2];
							gol.barriers[j][1] +=  (gol.bullets[i][6]/500) * gol.bullets[i][2];

							gol.bullets[i][0] -= (gol.bullets[i][5]/30)/2;
							gol.bullets[i][1] -= (gol.bullets[i][6]/30)/2;

							if(gol.bullets[i][14] == 1) {
								gol.bullets[i][14] = 0;
								gol.bullets[i][10] += 30;
								gol.bullets[i][3] = 90;
							}

							gol.bullets[i][5] = (Math.floor(Math.random()*128)-64)/2;
							gol.bullets[i][6] = (Math.floor(Math.random()*128)-64)/2;
						//}
						hit_bul_sound = true;
					}
				}
			}
		}
	}



	//barrier collision with barrier
	for(var i = 0; i < gol.barriers.length; i++) {
		for(var j = 0; j < gol.barriers.length; j++) {
			if(i != j) {
				if(gol.barriers.length > 0 && gol.barriers[i] != null) {
					if(gol.barriers.length > 0 && gol.barriers[j] != null) {
						if(gol.cpu_hit_test(gol.barriers[j][0], gol.barriers[i][0], gol.barriers[j][1], gol.barriers[i][1], gol.barriers[j][2], gol.barriers[i][2])) {
							var mx = (Math.floor(Math.random()*3)-1);
							var my = (Math.floor(Math.random()*3)-1);
							gol.barriers[j][0] += mx;
							gol.barriers[j][1] += my;
							gol.barriers[i][0] -= mx;
							gol.barriers[i][1] -= my;
						}
					}
				}
			}
		}
	}


	//barrier collision with melee
	for(var i = 0; i < gol.barriers.length; i++) {
		if(gol.enemies.length > 0 && gol.barriers[i] != null) {
			if(gol.melee_on) {
				var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/3);
				var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/3);
				var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				if(dist >= 64/2) {
					var capped_pos = gol.player_cap_mouse_pos_max(64/2);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				if(dist <= 18/2) {
					var capped_pos = gol.player_cap_mouse_pos_max(18/2);
					x = capped_pos[0];
					y = capped_pos[1];
				}

				if(gol.cpu_hit_test(x, gol.barriers[i][0], y, gol.barriers[i][1], (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, gol.barriers[i][2])) {
					if(gol.barriers[i][2] < gol.barrier_life_max) {
						gol.barriers[i][3] += (120*(gol.p_power/gol.p_power_max))+30;
						//gol.game_score += 5;
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
				if(dist >= 64/2) {
					var capped_pos = gol.player_cap_mouse_pos_max(64/2);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				if(dist <= 18/2) {
					var capped_pos = gol.player_cap_mouse_pos_max(18/2);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				
				if(gol.cpu_hit_test(x, gol.bullets[i][0], y, gol.bullets[i][1], (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, gol.bullets[i][2])) {
					//gol.ar_kill(gol.bullets, i);
					gol.bullets[i][3] = 0;
					//gol.game_score += 10;
					hit_bul_sound = true;
				}
			}
		}
	}

	//Bullet collision with shield burst
	for(var i = 0; i < gol.bullets.length; i++) {
		if(gol.bullets.length > 0 && gol.bullets[i] != null) {
			if(gol.bullets[i][9] == 1 && gol.space_down) {
				if(gol.cpu_hit_test(this.statesize[0]/2, gol.bullets[i][0], this.statesize[1]/2, gol.bullets[i][1], (gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size, gol.bullets[i][2])) {
					//gol.ar_kill(gol.bullets, i);
					gol.bullets[i][3] = 0;
					hit_bul_sound = true;
				}
			}
		}
	}

	
	//enemy collision with shield burst
	for(var i = 0; i < gol.enemies.length; i++) {
		if(gol.enemies.length > 0 && gol.enemies[i] != null && gol.space_down) {
			if(gol.cpu_hit_test(this.statesize[0]/2, gol.enemies[i][0], this.statesize[1]/2, gol.enemies[i][1], (gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size, gol.enemies[i][2])) {
				gol.enemies[i][3] -= 20*(gol.p_power/gol.p_power_max)+5;
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
				if(dist >= 64/2) {
					var capped_pos = gol.player_cap_mouse_pos_max(64/2);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				if(dist <= 18/2) {
					var capped_pos = gol.player_cap_mouse_pos_max(18/2);
					x = capped_pos[0];
					y = capped_pos[1];
				}

				if(gol.cpu_hit_test(x, gol.enemies[i][0], y, gol.enemies[i][1], (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, gol.enemies[i][2])) {
					gol.enemies[i][3] -= 25*(gol.p_power/gol.p_power_max)+3;
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
			var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5);
			var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5);
			var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				
			if(dist >= 50/2) {
				var capped_pos = gol.player_cap_mouse_pos_max(50/2);
				x = capped_pos[0];
				y = capped_pos[1];
			}

			if(gol.cpu_hit_test(x, gol.barriers[i][0], y, gol.barriers[i][1], gol.barrier_size/1.8, gol.barrier_size/1.8)) {
				if(gol.barriers[i][3] <= gol.barrier_life_max * 0.75) {
					gol.p_power -= gol.barrier_cost-(gol.barrier_cost*(gol.barriers[i][3]/gol.barrier_life_max));		
					gol.barriers[i][3] = gol.barrier_life_max;			
					gol.play_sound(11);
				}
				hit = true;				
			}
		}
	}

	return hit;
}

//gol.create_bullet(gol.enemies[i][0]+24, gol.enemies[i][1], bulsize, (Math.random()*200)+60, 0, 0, 1, 128, 100, 0, 0, 0);

GOL.prototype.create_bullet = function(x, y, size, life, targ_x, targ_y, val, exp, open, rand, rendtype, trackingtype, walkval, forktimediv) {
	var new_obj = new Array(17);

	new_obj[0] = x;			// Actual X pos
	new_obj[1] = y;			// Actual Y pos
	new_obj[2] = (size/3)+1;		// Square size
	new_obj[3] = life;		// Life (frames)
	new_obj[4] = life;		// Lifespan (frames)
	new_obj[5] = targ_x;	// Target X pos
	new_obj[6] = targ_y;	// Target Y pos
	new_obj[7] = x;			// Origin X pos
	new_obj[8] = y;			// Origin Y pos
	new_obj[9] = val;		// Payload value
	new_obj[10] = exp;		// Explosion size
	new_obj[11] = open;		// Overpenetration percentage
	new_obj[12] = rand/2;		// Randomise accuracy
	new_obj[13] = rendtype;		// Randomise accuracy
	new_obj[14] = trackingtype;
	new_obj[15] = walkval; 
	new_obj[16] = forktimediv;

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
			
			/*if(gol.bullets[i][3] <= 0){
				gol.ar_kill(gol.bullets, i);
			} else {*/
			
				if(gol.bullets[i][3] == gol.bullets[i][16] && gol.bullets[i][16] == 1){
				//if((gol.bullets[i][4]-(gol.bullets[i][3]-1)) % gol.bullets[i][16] == 0){
					//gol.bullets[i][16] = 0;
					gol.create_bullet(gol.bullets[i][0], gol.bullets[i][1], (gol.bullets[i][2]-1)*3, gol.bullets[i][3]+15, 0, 0, gol.bullets[i][9], gol.bullets[i][10], gol.bullets[i][11], gol.bullets[i][12]*2+30, gol.bullets[i][13], gol.bullets[i][14], gol.bullets[i][15], 0);
					gol.create_bullet(gol.bullets[i][0], gol.bullets[i][1], (gol.bullets[i][2]-1)*3, gol.bullets[i][3]+15, 0, 0, gol.bullets[i][9], gol.bullets[i][10], gol.bullets[i][11], gol.bullets[i][12]*2+30, gol.bullets[i][13], gol.bullets[i][14], gol.bullets[i][15], 0);
					gol.create_bullet(gol.bullets[i][0], gol.bullets[i][1], (gol.bullets[i][2]-1)*3, gol.bullets[i][3]+15, 0, 0, gol.bullets[i][9], gol.bullets[i][10], gol.bullets[i][11], gol.bullets[i][12]*2+30, gol.bullets[i][13], gol.bullets[i][14], gol.bullets[i][15], 0);
				}

				if(gol.bullets[i][14] == 0) {
					gol.bullets[i][0] += /*((Math.random()*(gol.bullets[i][12]/20))-(gol.bullets[i][12]/2)/20)+*/(gol.bullets[i][5]/gol.bullets[i][4])*(gol.bullets[i][11]/100)-gol.p_move_x;	
					gol.bullets[i][1] += /*((Math.random()*(gol.bullets[i][12]/20))-(gol.bullets[i][12]/2)/20)+*/(gol.bullets[i][6]/gol.bullets[i][4])*(gol.bullets[i][11]/100)-gol.p_move_y; 	
				}		

				//player
				if(gol.bullets[i][14] == 1) {
					//gol.bullets[i][5] = gol.mouse_x - this.statesize[0]/2;
					//gol.bullets[i][6] = gol.mouse_y - this.statesize[1]/2;
					gol.bullets[i][0] += (gol.bullets[i][5]/gol.bullets[i][4])*(gol.bullets[i][11]/100)-gol.p_move_x;	
					gol.bullets[i][1] += (gol.bullets[i][6]/gol.bullets[i][4])*(gol.bullets[i][11]/100)-gol.p_move_y; 	
				}	
	
				if(gol.bullets[i][3] > 0) {
					if(gol.bullets[i][0] < 0) {gol.bullets[i][0] = gol.statesize[0]-Math.abs(gol.bullets[i][0])%gol.statesize[0];}
					if(gol.bullets[i][1] < 0) {gol.bullets[i][1] = gol.statesize[1]-Math.abs(gol.bullets[i][1])%gol.statesize[1];}
					if(gol.bullets[i][0] > 0) {gol.bullets[i][0] = gol.bullets[i][0]%gol.statesize[0];}
					if(gol.bullets[i][1] > 0) {gol.bullets[i][1] = gol.bullets[i][1]%gol.statesize[1];}
					gol.bullets[i][0] += (Math.random()*gol.bullets[i][15])-(gol.bullets[i][15]/2);
					gol.bullets[i][1] += (Math.random()*gol.bullets[i][15])-(gol.bullets[i][15]/2);

					//player
					if(gol.bullets[i][13] == 1) {
						if(gol.use_trails){gol.place_circle_fore(gol.bullets[i][0], gol.bullets[i][1], (gol.bullets[i][2]*1.5)+1, (gol.bullets[i][2]*1.5)+1, 0.7, 0.7, 0.7, 0.7);}
						gol.place_circle_rend(gol.bullets[i][0], gol.bullets[i][1], (gol.bullets[i][2]*1.5)+1, (gol.bullets[i][2]*1.5)+1, 0.4, 0.4, 0.4, 0.4);
						gol.place_back_rend_circle(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2], 1, 1, 1, 1);
					}

					//enemy
					if(gol.bullets[i][13] == 0) {
						if(gol.use_trails){
							

							if(gol.bullets[i][14] == 1){
								gol.place_circle_fore(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+2, gol.bullets[i][2]+2, 0.0, 0.3, 1, 0);
							} else if(gol.bullets[i][10] > 0){
								gol.place_circle_fore(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+2, gol.bullets[i][2]+2, 0.5, 1, 0, 0);
							} else {
								gol.place_circle_fore(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+2, gol.bullets[i][2]+2, 1, 0, 1, 1);
							}

						}

						if(gol.bullets[i][14] == 1){
							gol.place_circle_rend(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+2, gol.bullets[i][2]+2, 0, 0.3, 1, 0);
						} else if(gol.bullets[i][10] > 0){
							gol.place_circle_rend(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+2, gol.bullets[i][2]+2, 0.5, 1, 0, 0);
						} else {
							gol.place_circle_rend(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+2, gol.bullets[i][2]+2, 1, 0, 1, 1);
						}

						gol.place_circle_back(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2], gol.bullets[i][2], 0, 0, 0);
						gol.place_Rend_World_circle(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2], 1, gol.bullets[i][9], 1, 1);
					}
					
					if(gol.bullets[i][14] == 1){
						gol.bullets[i][0] += ((this.statesize[0]/2)-gol.bullets[i][0])/(30+gol.bullets[i][2]);
						gol.bullets[i][1] += ((this.statesize[1]/2)-gol.bullets[i][1])/(30+gol.bullets[i][2]);
					}

					gol.bullets[i][3] -= 1;

					if(gol.bullets[i][10] > 0 && gol.bullets[i][3] <= 0) {	
						if(gol.bullets[i][13] == 0) {
							gol.create_explosion(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+gol.bullets[i][10], 16, 1, 1, 0.0, 1, 0.3, false, 0);
							gol.play_sound(4);
						} else {
							gol.create_explosion(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+gol.bullets[i][10], 16, 0, 0, 0.6, 0, 0, false, 2);
							gol.play_sound(4);
						}
					}

				}
				if(gol.bullets[i][3] <= 0){
					if(gol.bullets[i][10] > 0) {
						if(gol.bullets[i][13] == 0) {
							gol.create_explosion(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+gol.bullets[i][10], 16, 1, 1, 0.0, 1, 0.3, false, 0);
							gol.play_sound(4);
						} else {
							gol.create_explosion(gol.bullets[i][0], gol.bullets[i][1], gol.bullets[i][2]+gol.bullets[i][10], 16, 0, 0, 0.6, 0, 0, false, 2);
							gol.play_sound(4);
						}
					}
					gol.ar_kill(gol.bullets, i);
				}
			//}
		}
	}

    return this;
};

GOL.prototype.create_melee = function() {
	var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/3);
	var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/3);
	var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);

	var melee_cost = 14;

	if(dist > 18/2 && dist < 64/2) {
		if(gol.use_trails){gol.place_circle_fore(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 1, 1, 1, 1);}
		gol.place_Rend_World_circle(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 0, 0);
		gol.place_circle_back(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 0, 0);
		gol.place_circle_rend(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 1, 0.2);
		gol.place_circle_rend(x, y, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, 0.9, 1, 0.9);
		gol.p_power -= melee_cost;
		gol.play_sound(10);
	} else if(dist >= 64/2) {

		var capped_pos = gol.player_cap_mouse_pos_max(64/2);

		x = capped_pos[0];
		y = capped_pos[1];

		if(gol.use_trails){gol.place_circle_fore(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 1, 1, 1, 1);}
		gol.place_Rend_World_circle(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 0, 0);
		gol.place_circle_back(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 0, 0);
		gol.place_circle_rend(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 1, 0.2);
		gol.place_circle_rend(x, y, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, 0.9, 1, 0.9);
		gol.p_power -= melee_cost;
		gol.play_sound(10);
	} else if(dist <= 18/2) {

		var capped_pos = gol.player_cap_mouse_pos_max(18/2);

		x = capped_pos[0];
		y = capped_pos[1];

		if(gol.use_trails){gol.place_circle_fore(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 1, 1, 1, 1);}
		gol.place_Rend_World_circle(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 0, 0);
		gol.place_circle_back(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 0, 0, 0);
		gol.place_circle_rend(x, y, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, (gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min, 0, 1, 0.2);
		gol.place_circle_rend(x, y, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, ((gol.melee_size_max*(gol.p_power/gol.p_power_max))+gol.melee_size_min)-gol.melee_size_min, 0.9, 1, 0.9);
		gol.p_power -= melee_cost;
		gol.play_sound(10);
	}
    
	return this;
};





GOL.prototype.create_enemy_spawner = function(x, y, size, life, cooldown, bul_size, ammo, enm_type) {
	
	var new_obj = new Array(10);
			

	new_obj[0] = x;			// Actual X pos
	new_obj[1] = y;			// Actual Y pos
	new_obj[2] = size;		// Square size
	new_obj[3] = life;		// Life (frames)
	new_obj[4] = cooldown;	// Cooldown Max (frames)
	new_obj[5] = bul_size;	// bullet size
	new_obj[6] = ammo;	// non-regenerating ammo
	new_obj[7] = enm_type;	// AI type
	new_obj[8] = 90;	// spawn delay

	if(enm_type > 0) {new_obj[8] = 90*3;}

	new_obj[9] = new_obj[8];	// spawn delay max

	gol.enemy_spawn.push(new_obj);

	//if(enm_type > 0) {gol.play_sound(16);} else {gol.play_sound(14);}


    return this;
};

GOL.prototype.run_enemy_spawn = function() {
	for(var i = 0; i < gol.enemy_spawn.length; i++) {
		gol.enemy_spawn[i][8]--;

		//cpu offset adjustment
		var adjusted_pos = gol.cpu_positioning(gol.enemy_spawn[i][0], gol.enemy_spawn[i][1]);
		gol.enemy_spawn[i][0] = adjusted_pos[0];
		gol.enemy_spawn[i][1] = adjusted_pos[1];


		gol.place_Rend_circle(gol.enemy_spawn[i][0], gol.enemy_spawn[i][1], gol.enemy_spawn[i][2], 1, 1, 1);
		//gol.place_Rend_circle(gol.enemy_spawn[i][0], gol.enemy_spawn[i][1], gol.enemy_spawn[i][2]/gol.enemy_spawn[i][8], 0, 0, 0);
		gol.place_Rend_circle(gol.enemy_spawn[i][0], gol.enemy_spawn[i][1], gol.enemy_spawn[i][2]-(gol.enemy_spawn[i][2]*(gol.enemy_spawn[i][8]/gol.enemy_spawn[i][9])), 0, 0, 0);


		if(gol.enemy_spawn[i][8] <= 0) {
			gol.create_enemy_nocheck(
				gol.enemy_spawn[i][0], 
				gol.enemy_spawn[i][1], 
				gol.enemy_spawn[i][2], 
				gol.enemy_spawn[i][3], 
				gol.enemy_spawn[i][4], 
				gol.enemy_spawn[i][5], 
				gol.enemy_spawn[i][6], 
				gol.enemy_spawn[i][7]
			);
			gol.ar_kill(gol.enemy_spawn, i);
		}
	}
}


GOL.prototype.create_enemy = function(x, y, size, life, cooldown, bul_size, ammo, enm_type) {
	var retry = false;
	if(!gol.cpu_hit_test(this.statesize[0]/2, x, this.statesize[1]/2, y, gol.player_size, 400)) {

		for(var i = 0; i < gol.waypoints.length; i++) {
			if(gol.cpu_hit_test(gol.waypoints[i][0], x, gol.waypoints[i][1], y, gol.player_size, 128)) {
				retry = true;
			}
		}

		if(!retry) {
			var new_obj = new Array(13);

			new_obj[0] = x;			// Actual X pos
			new_obj[1] = y;			// Actual Y pos
			new_obj[2] = (size/2)+1;		// Square size
			new_obj[3] = life;		// Life (frames)
			new_obj[4] = life;		// Lifespan (frames)
			new_obj[5] = cooldown/6;	// Shoot cooldown (frames)
			new_obj[6] = cooldown;	// Cooldown Max (frames)
			new_obj[7] = bul_size;	// bullet size
			new_obj[8] = false;	// Moving?
			new_obj[9] = 0;	// move_x
			new_obj[10] = 0;	// move_y
			new_obj[11] = ammo;	// non-regenerating ammo
			new_obj[12] = enm_type;	// AI type

			gol.enemies.push(new_obj);

			if(enm_type > 0) {gol.play_sound(16);} else {gol.play_sound(14);}
		}
	} else {
		retry = true;
	}

	if(retry) {
		gol.enemy_cooldown = 1;
		if(enm_type > 0) {gol.queen_cooldown = 1;}
	}

    return this;
};


GOL.prototype.create_enemy_nocheck = function(x, y, size, life, cooldown, bul_size, ammo, enm_type) {
	
	var new_obj = new Array(13);

	new_obj[0] = x;			// Actual X pos
	new_obj[1] = y;			// Actual Y pos
	new_obj[2] = (size/2)+1;		// Square size
	new_obj[3] = life;		// Life (frames)
	new_obj[4] = life;		// Lifespan (frames)
	new_obj[5] = cooldown/6;	// Shoot cooldown (frames)
	new_obj[6] = cooldown;	// Cooldown Max (frames)
	new_obj[7] = bul_size;	// bullet size
	new_obj[8] = false;	// Moving?
	new_obj[9] = 0;	// move_x
	new_obj[10] = 0;	// move_y
	new_obj[11] = ammo;	// non-regenerating ammo
	new_obj[12] = enm_type;	// AI type

	gol.enemies.push(new_obj);

	if(enm_type == 0 && (ammo == 1 || ammo == 2 || ammo == 3)) {
		life = (life*2) + 20;
		new_obj[3] = life;		
		new_obj[4] = life;		
	}

	if(enm_type > 0) {gol.play_sound(16);} else {gol.play_sound(14);}


    return this;
};


GOL.prototype.run_enemies = function() {

	var emm_cap = 2 + (Math.floor(gol.game_score_max/2000));
	if(emm_cap >= 8) {emm_cap = 8;}

	if(gol.enemy_cooldown <= 0 && gol.enemies.length <= emm_cap && gol.enemies.length < 6) {
		gol.enemy_cooldown = 150+Math.random()*600;

		var rof = Math.random()*270+30 + (Math.random()*200);
		var bul_rand = (rof/500)*25;

		//create_queen
		if((gol.enemies.length == 0 || Math.floor(Math.random()*6) == 0) && gol.queen_cooldown <= 0 && gol.game_score_max > 1500) {
			var mobtype = 1+Math.floor(Math.random()*4);
			if(mobtype == 1) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)+40, Math.random()*(1000+(gol.game_score_max/5))+1000, 30, 20, Math.random()*2+4, mobtype);}
			if(mobtype == 2) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)+40, Math.random()*(1500+(gol.game_score_max/5))+500, 300, 18, Math.random()*8+4, mobtype);}
			if(mobtype == 3) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*8)+28, Math.random()*(500+(gol.game_score_max/5))+500, 200, 25, 1, mobtype);}
			if(mobtype == 4) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], 70, Math.random()*(600+(gol.game_score_max/5))+800, 200, 25, 1, mobtype);}
			gol.queen_cooldown = Math.floor(Math.random()*6000)+2500;
		} else if(gol.enemies.length <= emm_cap-2 && Math.floor(Math.random()*5) == 0) {
			//create_normal
			gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)*(bul_rand/20)+22, (Math.random()*(gol.game_score_max/20))+1, rof, Math.random()*bul_rand+4, Math.floor(Math.random()*16), 0);
			gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)*(bul_rand/20)+22, (Math.random()*(gol.game_score_max/20))+1, rof, Math.random()*bul_rand+4, Math.floor(Math.random()*16), 0);
			gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)*(bul_rand/20)+22, (Math.random()*(gol.game_score_max/20))+1, rof, Math.random()*bul_rand+4, Math.floor(Math.random()*16), 0);
		} else {
			//create_normal
			gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)*(bul_rand/20)+22, (Math.random()*(gol.game_score_max/20))+1, rof, Math.random()*bul_rand+4, Math.floor(Math.random()*16), 0);
		}
	

	}

	var move_too = false;
	var veto_move_change = false;

	for(var i = 0; i < gol.enemies.length; i++) {
		if(gol.enemies.length > 0 && gol.enemies[i] != null) {


			if(gol.enemies[i][12] == 0) {

				if(gol.enemies[i][11] == 3) {
					veto_move_change = true;
				}

				//shoot
				if(gol.enemies[i][5] <= 0) {
					gol.enemies[i][5] = gol.enemies[i][6];

					var x = (this.statesize[0]/2) - gol.enemies[i][0];
					var y = (this.statesize[1]/2) - gol.enemies[i][1];
					var dist = gol.get_dist(0, x, 0, y)*2;
					var bul_life = Math.random()*120 + 90;
					if(dist < 450) {

						if((dist > 180 && (Math.floor(Math.random()*12) == 0) || gol.enemies[i][11] == 3)) {
							if(gol.enemies[i][9] != 0 || gol.enemies[i][10] != 0) {
								gol.create_barrier(gol.enemies[i][0], gol.enemies[i][1], gol.barrier_size*1.3, gol.barrier_life_max*0.8, 1); 						
								gol.enemies[i][5] = (gol.enemies[i][6]/2)+90;
							}							
							if(gol.enemies[i][9] == 0 && gol.enemies[i][10] == 0) {veto_move_change = false;}
							if(Math.floor(Math.random()*2) == 0) {veto_move_change = false;}
						} else if(dist > 180 && (Math.floor(Math.random()*8) == 0)) {
							gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][7]+18)/2, bul_life*1.5, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, ((gol.enemies[i][7]+8)*3), 95, 12, 0, 0, 0, 0);	
							gol.enemies[i][5] = gol.enemies[i][6]*1.1;
						} else if(gol.enemies[i][11] == 1) {
							if(dist > 280) {
								gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][7]/2)+12, bul_life*1.5, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, ((gol.enemies[i][7]+8)*2), 1, 12, 0, 1, 0, 0);	
								gol.enemies[i][5] = gol.enemies[i][6]*1.5;
							} else { 
								gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][7]+18)/4, bul_life*1.5, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, ((gol.enemies[i][7]+8)*3), 95, 12, 0, 0, 0, 0);	
								gol.enemies[i][5] = gol.enemies[i][6]*0.8;
							}
						} else if(dist > 240 && (Math.floor(Math.random()*12) == 0 || gol.enemies[i][11] == 2)) {
							gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][7]/3)+3, bul_life/1.7, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, 0, 120, 50, 0, 0, 0, 0);					
							gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][7]/3)+3, bul_life/1.7, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, 0, 120, 50, 0, 0, 0, 0);					
							gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][7]/3)+3, bul_life/1.7, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, 0, 120, 50, 0, 0, 0, 0);					
							gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][7]/3)+3, bul_life/1.7, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, 0, 120, 50, 0, 0, 0, 0);					
							gol.enemies[i][5] = gol.enemies[i][6]*1.3;
						} else {
							if(Math.floor(Math.random()*16) == 0) {
								gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][7], bul_life*2, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, 0, 0, 32, 0, 1, 0, 0);	
							} else {
								gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][7], bul_life, (this.statesize[0]/2) - gol.enemies[i][0], (this.statesize[1]/2) - gol.enemies[i][1], 1, 0, 150, 32, 0, 0, 0, 0);	
							}				
						}
						gol.play_sound(5);
					}
					if(dist < 180) {
						gol.enemies[i][5] = gol.enemies[i][6]/4;
						if(gol.enemies[i][5] < 25) {gol.enemies[i][5] = 25;}
					}
					if(gol.enemies[i][11] == 3) {gol.enemies[i][6] = 90; gol.enemies[i][5] = 90;}
				}
			} 

			if(gol.enemies[i][12] == 1){
				//Spawn

				//gol.enemy_cooldown = 300; //prevent normal spawning

				if(gol.enemies[i][5] <= 0) {
					gol.enemies[i][5] = gol.enemies[i][6];
					var rof = Math.random()*80+120;
					var bul_rand = (rof/200)*10;
					if(gol.enemies[i][11] > 0) {
						if(Math.floor(Math.random()*15) == 0 && gol.enemies[i][11] == 1){
							gol.enemies[i][3] = 0;
							var mobtype = 2+(Math.floor(Math.random()*3));
							if(mobtype == 2) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)+40, Math.random()*(1500+(gol.game_score_max/5))+500, 300, 18, Math.random()*8+4, mobtype);}
							if(mobtype == 3) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*8)+28, Math.random()*(500+(gol.game_score_max/5))+500, 200, 25, 1, mobtype);}
							if(mobtype == 4) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], 70, Math.random()*(600+(gol.game_score_max/5))+800, 200, 25, 1, mobtype);}
							mobtype = 2+(Math.floor(Math.random()*3));
							if(mobtype == 2) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*10)+40, Math.random()*(1500+(gol.game_score_max/5))+1500, 300, 18, Math.random()*8+4, mobtype);}
							if(mobtype == 3) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], (Math.random()*8)+28, Math.random()*(500+(gol.game_score_max/5))+1500, 200, 25, 1, mobtype);}
							if(mobtype == 4) {gol.create_enemy_spawner(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], 70, Math.random()*(600+(gol.game_score_max/5))+800, 200, 25, 1, mobtype);}
							gol.enemies[i][11] = 0;
							gol.play_sound(16);
						} else {
							gol.create_enemy_nocheck(gol.enemies[i][0]+Math.floor(Math.random()*45-22), gol.enemies[i][1]+Math.floor(Math.random()*45-22), 18, 80+(gol.game_score_max/200), rof*2, Math.random()*bul_rand+3, 0, 0);
							gol.enemies[i][11] -= 1;
						}
					}
					if(gol.enemies[i][11] <= 0) {
						gol.enemies[i][6] = 30;
						//gol.enemies[i][12] = 0;
						if(gol.enemies.length < emm_cap+2) {
							gol.enemies[i][11] = 1;
						}
					}
				}
			}


			//Nova
			if(gol.enemies[i][12] == 2){
				if(gol.enemies[i][5] <= 0 && gol.enemies[i][11] > 0) {
					gol.enemies[i][5] = gol.enemies[i][6]/10;
					var shotdist = ((Math.random()*100)+30)/2;
					var orig1 = 32/2;
					var orig2 = 24/2;
					var bulsize = (Math.random()*22)+4;
					var bullife = ((Math.random()*120)+80)/2;
					/*if(Math.floor(Math.random()*5) == 0) {	
						gol.create_bullet(gol.enemies[i][0]+orig1, gol.enemies[i][1], bulsize, bullife, shotdist, 0, 1, 60, 100, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1]+orig1, bulsize, bullife, 0, shotdist, 1, 60, 100, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]-orig1, gol.enemies[i][1], bulsize, bullife, -shotdist, 0, 1, 60, 100, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1]-orig1, bulsize, bullife, 0, -shotdist, 1, 60, 100, 0, 0, 0, 0, 0);		
						gol.create_bullet(gol.enemies[i][0]+orig2, gol.enemies[i][1]+orig2, bulsize, bullife, shotdist, shotdist, 1, 60, 70, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]-orig2, gol.enemies[i][1]+orig2, bulsize, bullife, -shotdist, shotdist, 1, 60, 70, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]+orig2, gol.enemies[i][1]-orig2, bulsize, bullife, shotdist, -shotdist, 1, 60, 70, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]-orig2, gol.enemies[i][1]-orig2, bulsize, bullife, -shotdist, -shotdist, 1, 60, 70, 0, 0, 0, 0, 0);	
					} else {*/
						gol.create_bullet(gol.enemies[i][0]+orig2, gol.enemies[i][1]+orig2, bulsize, bullife, shotdist, shotdist, 1, 0, 100, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]-orig2, gol.enemies[i][1]+orig2, bulsize, bullife, -shotdist, shotdist, 1, 0, 100, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]+orig2, gol.enemies[i][1]-orig2, bulsize, bullife, shotdist, -shotdist, 1, 0, 100, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]-orig2, gol.enemies[i][1]-orig2, bulsize, bullife, -shotdist, -shotdist, 1, 0, 100, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]+orig1, gol.enemies[i][1], bulsize, bullife, shotdist, 0, 1, 0, 130, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1]+orig1, bulsize, bullife, 0, shotdist, 1, 0, 130, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0]-orig1, gol.enemies[i][1], bulsize, bullife, -shotdist, 0, 1, 0, 130, 0, 0, 0, 0, 0);	
						gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1]-orig1, bulsize, bullife, 0, -shotdist, 1, 0, 130, 0, 0, 0, 0, 0);		
					//}
							
					gol.enemies[i][11] -= 1;
					gol.play_sound(5);
				}

				

				if(gol.enemies[i][11] <= 0) {
					move_too = true;
					if(!gol.enemies[i][8]) {
						gol.enemies[i][5] = gol.enemies[i][6]*0.75;
						gol.enemies[i][8] = true;
						gol.enemies[i][9] = Math.floor(Math.random()*3-1);
						gol.enemies[i][10] = Math.floor(Math.random()*3-1);
					}
				}

				
			}


			//Mines
			if(gol.enemies[i][12] == 3){
				if(gol.enemies[i][5] <= 0 && gol.enemies[i][11] > 0) {
					gol.enemies[i][5] = gol.enemies[i][6]/10;
					var life = (Math.random()*200)+60;
					var bulsize = gol.enemies[i][7];
					//gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1], bulsize, life, 0, 0, 1, 128, 100, 0, 0, 0);
					var offset = 32/2;
					gol.create_bullet(gol.enemies[i][0]+offset, gol.enemies[i][1], bulsize, (Math.random()*400)+180, 0, 0, 1, 90, 100, 80, 0, 0, 4, 0);	
					gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1]+offset, bulsize, (Math.random()*400)+180, 0, 0, 1, 90, 100, 80, 0, 0, 4, 0);	
					gol.create_bullet(gol.enemies[i][0]-offset, gol.enemies[i][1], bulsize, (Math.random()*400)+180, 0, 0, 1, 90, 100, 80, 0, 0, 4, 0);	
					gol.create_bullet(gol.enemies[i][0], gol.enemies[i][1]-offset, bulsize, (Math.random()*400)+180, 0, 0, 1, 60, 100, 80, 0, 0, 4, 0);		
					gol.enemies[i][11] -= 1;
					gol.play_sound(5);
				}

				if(gol.enemies[i][11] <= 0) {
					move_too = true;
					if(!gol.enemies[i][8]) {
						gol.enemies[i][5] = gol.enemies[i][6]*0.45;
						gol.enemies[i][8] = true;
						gol.enemies[i][9] = Math.floor(Math.random()*3-1)*2;
						gol.enemies[i][10] = Math.floor(Math.random()*3-1)*2;
					}
				}

				
			}

			//Pulse
			if(gol.enemies[i][12] == 4){

				if(gol.enemies[i][2] > 70/2) {
					gol.enemies[i][11] = 0;
				} else if(gol.enemies[i][2] < 12/2) {
					gol.enemies[i][11] = 1;			
				}

				if(gol.enemies[i][11] == 1) {
					move_too = true;
					if(!gol.enemies[i][8]) {
						gol.enemies[i][5] = (Math.random()*gol.enemies[i][6]*0.45)+gol.enemies[i][6]*0.25;
						gol.enemies[i][8] = true;

						gol.enemies[i][9] = Math.floor(Math.random()*3-1);
						gol.enemies[i][10] = Math.floor(Math.random()*3-1);
						if(Math.abs(gol.enemies[i][9]) + Math.abs(gol.enemies[i][10]) == 0) {
							gol.create_barrier(gol.enemies[i][0]-32/2, gol.enemies[i][1]+32/2, gol.barrier_size*0.6, gol.barrier_life_max*1.7, 1); 
							gol.create_barrier(gol.enemies[i][0]+32/2, gol.enemies[i][1]-32/2, gol.barrier_size*0.6, gol.barrier_life_max*1.7, 1); 
							gol.create_barrier(gol.enemies[i][0]+32/2, gol.enemies[i][1]+32/2, gol.barrier_size*0.6, gol.barrier_life_max*1.7, 1); 
							gol.create_barrier(gol.enemies[i][0]-32/2, gol.enemies[i][1]-32/2, gol.barrier_size*0.6, gol.barrier_life_max*1.7, 1); 
						}

					}
				}

				if(gol.enemies[i][11] == 1) {
					gol.enemies[i][2] += 0.3;
				}
				if(gol.enemies[i][11] == 0) {
					gol.enemies[i][2] -= 1.0;
				}
			}

			if(gol.enemies[i][12] == 0 || move_too){
				//set direction and move-flag
				if((gol.enemies[i][5] >= 30 && gol.enemies[i][5] <= gol.enemies[i][6]*0.8) || gol.enemies[i][5] >= gol.enemies[i][6]) {
					if(!gol.enemies[i][8]) {
						gol.enemies[i][8] = true;
						if(!veto_move_change) {
							gol.enemies[i][9] = Math.floor(Math.random()*3-1);
							gol.enemies[i][10] = Math.floor(Math.random()*3-1);
						}
					}
				} else {
					gol.enemies[i][8] = false;
					if(gol.enemies[i][12] == 2) {gol.enemies[i][11] = 8;}
					if(gol.enemies[i][12] == 3) {gol.enemies[i][11] = 1;}
				}
				//move
				if(gol.enemies[i][8]) {
					gol.enemies[i][0] += gol.enemies[i][9]/2;
					gol.enemies[i][1] += gol.enemies[i][10]/2;
				}
			}
			//cooldown
			gol.enemies[i][5]-= 1;
			
			//cpu offset adjustment
			var adjusted_pos = gol.cpu_positioning(gol.enemies[i][0], gol.enemies[i][1]);
			gol.enemies[i][0] = adjusted_pos[0];
			gol.enemies[i][1] = adjusted_pos[1];

			//gol.placeAll(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2], 1, 1, 0.0, 0.0);
			//gol.placeAll(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]-6, 1, 1, (gol.enemies[i][3]/gol.enemies[i][4]), 0.0);
			gol.place_circle_back(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2], gol.enemies[i][2], 0, 0, 0);
			gol.place_Rend_World_circle(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2], 1, 1, 1, 1);

			if(gol.enemies[i][12] >= 1) {
				gol.place_Rend_World_circle(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]-3, 0, 0, 1.0-(gol.enemies[i][3]/gol.enemies[i][4]), (gol.enemies[i][3]/gol.enemies[i][4]));
			} else if(gol.enemies[i][12] == 0 && (gol.enemies[i][11] >= 1 && gol.enemies[i][11] <= 3)) {
				gol.place_Rend_World_circle(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]-3, 1, 1, 1.0-(gol.enemies[i][3]/gol.enemies[i][4]), 1.0);
			} else {gol.place_Rend_World_circle(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]-3, 1, 1, (gol.enemies[i][3]/gol.enemies[i][4]), 0.0);}
			

			gol.place_circle_rend(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]-6, gol.enemies[i][2]-6, 0.0, 0.0, 0.0);
			if(gol.use_trails){gol.place_circle_fore(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]+8, gol.enemies[i][2]+8, 0.8, 0.8, 	0.8, 0);}
			
			

			if(gol.enemies[i][3] <= 0) {
				if(Math.floor(Math.random()*3) == 0) {
					var waysize = 40;//32+(Math.floor(Math.random()*12));
					gol.create_waypoint( gol.enemies[i][0]+(Math.random()*32-16), gol.enemies[i][1]+(Math.random()*32-16), waysize, (2000*(waysize/40))+(1500 + Math.floor(Math.random()*1500)), 1+Math.floor(Math.random()*7) );
				}
				//gol.create_explosion(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2]*2.8, 12, 1, 1, 1, 0.4, 0.7, false, 0);
				gol.create_explosion(gol.enemies[i][0], gol.enemies[i][1], (gol.enemies[i][2]*3)+30, 12, 1, 1, 1, 1, 1, false, 0);

				gol.game_score += 50 + gol.enemies[i][4]/* + gol.game_score/20*/;
				if(gol.enemies[i][12] == 0 && (gol.enemies[i][11] == 1 || gol.enemies[i][11] == 2)) {gol.game_score += 250;}
				if(gol.enemies[i][12] != 0){gol.game_score_div += 10; gol.game_score += 1000/*+gol.game_score/10*/; }
				gol.game_score_div += 3;

				gol.ar_kill(gol.enemies, i);

				var delay_spawn = 30 + (Math.random()*2)*((gol.game_score/750)+1);

				if(gol.enemy_cooldown >= 1200){gol.enemy_cooldown = 1200;}
				if(gol.enemy_cooldown <= delay_spawn){
					gol.enemy_cooldown = delay_spawn;
				} else {gol.enemy_cooldown += delay_spawn;}

				if(Math.floor(Math.random()*8) == 1) {
					gol.enemy_cooldown += delay_spawn*(Math.random()*3);
				}

				//gol.p_health += gol.p_health_max/20;
				gol.play_sound(6);
			}

		}
	}

	return this;
}


GOL.prototype.view_distortion = function() {
	//enemy view distortion
	//for(var i = 0; i < gol.enemies.length; i++) {
	//	if(gol.enemies.length > 0 && gol.enemies[i] != null) {
	//		gol.place_view_radius(gol.enemies[i][0], gol.enemies[i][1], gol.enemies[i][2], gol.enemies[i][2], 0.2, 0.2, 0.2);
	//	}
	//}
	//main view distortion

	

	gol.place_view_radius(gol.statesize[0]/2, gol.statesize[1]/2, gol.statesize[1]/2, gol.statesize[1]/2, 0.2, 0.2, 0.2);
}

GOL.prototype.create_waypoint = function(x, y, size, cooldown, type) {
	if(!gol.cpu_hit_test(this.statesize[0]/2, x, this.statesize[1]/2, y, gol.player_size, 160)) {
		var new_obj = new Array(6);

		new_obj[0] = x;			// Actual X pos
		new_obj[1] = y;			// Actual Y pos
		new_obj[2] = (size/2)+1;		// Square size
		new_obj[3] = cooldown;	// Warp cooldown (frames)
		new_obj[4] = cooldown;	// Cooldown Max (frames)
		new_obj[5] = type;	// behavior type

		gol.waypoints.push(new_obj);
		
		if(type == 0) {gol.play_sound(7);}

	} else {gol.waypoint_cooldown = 1;}
	
	return this;
}

GOL.prototype.run_waypoints = function() {


	var passive_spawn = true;

	for(var i = 0; i < gol.waypoints.length; i++) {
		if(gol.waypoints.length > 0 && gol.waypoints[i] != null) {

			var col = gol.waypoints[i][3]/gol.waypoints[i][4];

			var adjusted_pos = gol.cpu_positioning(gol.waypoints[i][0], gol.waypoints[i][1]);
			gol.waypoints[i][0] = adjusted_pos[0];
			gol.waypoints[i][1] = adjusted_pos[1];
			
			//gol.placeAll(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]+4, 1, 1, 0, 0);


			if(gol.waypoints[i][5] == 0) {
				gol.place_Rend_World(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2], 0, 0, 0, 0);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2], 0, 0, 0.8, 0);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-4, 0, 0.9, 1, 0.9);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-8, (col*0.1)+0.15, (col*0.1)+0.15, 0.15, (col*0.35)+0.25);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-14, (col*0.2)+0.3, (col*0.2)+0.3, 0.3, (col*0.65)+0.45);
				gol.place_cell_rend(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]/4, gol.waypoints[i][2]/1.4, 0.3, 0.4+(col*0.4), 0.4+(col*0.4));
				gol.place_cell_rend(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]/1.4, gol.waypoints[i][2]/4, 0.3, 0.4+(col*0.4), 0.4+(col*0.4));
				if(gol.use_trails){gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]+4, gol.waypoints[i][2]+4, 1, 1, 1, 0);}
			}

			if(gol.waypoints[i][5] == 1) {
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-6, 1, 1, 1, 1);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-8, (col*0.5)+0.2, (col*0.5)+0.2, 0.0, 0.0);
				gol.place_cell_rend(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]/4, gol.waypoints[i][2]/1.4, 1, 0, 0);
				gol.place_cell_rend(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]/1.4, gol.waypoints[i][2]/4, 1, 0, 0);
				if(gol.use_trails){
					gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%16)), (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%16)), 1.0, 0.2, 0.2, 0);
					//gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/10)%6)), (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/10)%6)), 1.0, 1.0, 1.0, 0);
				}
			}

			if(gol.waypoints[i][5] == 2) {
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-6, 1, 1, 1, 1);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-8, 0, 0.0, (col*0.5)+0.2, (col*0.5)+0.2);
				gol.place_cell_rend(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]/4, gol.waypoints[i][2]/1.4, 0, 1, 1);
				gol.place_cell_rend(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]/1.4, gol.waypoints[i][2]/4, 0, 1, 1);
				if(gol.use_trails){	
					gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%16)), (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%16)), 0.4, 1.0, 1.0, 0);
					//gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/5)%6)), (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/5)%6)), 1.0, 1.0, 1.0, 0);
				}

			}	

			if(gol.waypoints[i][5] >= 3 && gol.waypoints[i][5] <= 6) {
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-6, 1, 1, 1, 1);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-8, 1, (col*0.7)+0.2, (col*0.7)+0.2, 0);

				if(gol.waypoints[i][5] == 3) {
					gol.place_back_rend_circle(gol.waypoints[i][0]-4, gol.waypoints[i][1], 3, 0, 0, 0, 0);
					gol.place_back_rend_circle(gol.waypoints[i][0]+4, gol.waypoints[i][1], 3, 0, 0, 0, 0);
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]+2, 3, 0, 0, 0, 0);
				}
				if(gol.waypoints[i][5] == 4) {
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]+3, 6, 0, 0, 0, 0);
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]-6, 3, 0, 0, 0, 0);
				}
				if(gol.waypoints[i][5] == 5) {
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], 9, 1, 1, 1, 1);
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], 4, 0, 0, 0, 0);
				}
				if(gol.waypoints[i][5] == 6) {
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]-6, 2, 0, 0, 0, 0);
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]-2, 2, 0, 0, 0, 0);
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]+2, 2, 0, 0, 0, 0);
					gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]+6, 2, 0, 0, 0, 0);
				}

				if(gol.use_trails){	
					gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%16)), (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%12)), 1.0, 1.0, 0.0, 0);
					//gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/5)%6)), (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/5)%6)), 1.0, 1.0, 1.0, 0);
				}
			}	
	
			if(gol.waypoints[i][5] == 7) {
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-6, 1, 1, 1, 1);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1], gol.waypoints[i][2]-8, 0, (col*0.7)+0.2, 0, 0);

				gol.place_back_rend_circle(gol.waypoints[i][0]-4, gol.waypoints[i][1]-4, 2, 0, 0.3, 0.3, 0.3);
				gol.place_back_rend_circle(gol.waypoints[i][0]-4, gol.waypoints[i][1], 2, 0, 0.3, 0.3, 0.3);
				gol.place_back_rend_circle(gol.waypoints[i][0]-4, gol.waypoints[i][1]+4, 2, 0, 0.3, 0.3, 0.3);
				gol.place_back_rend_circle(gol.waypoints[i][0]+4, gol.waypoints[i][1]-4, 2, 0, 0.3, 0.3, 0.3);
				gol.place_back_rend_circle(gol.waypoints[i][0]+4, gol.waypoints[i][1], 2, 0, 0.3, 0.3, 0.3);
				gol.place_back_rend_circle(gol.waypoints[i][0]+4, gol.waypoints[i][1]+4, 2, 0, 0.3, 0.3, 0.3);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]+4, 2, 0, 0.3, 0.3, 0.3);
				gol.place_back_rend_circle(gol.waypoints[i][0], gol.waypoints[i][1]-4, 2, 0, 0.3, 0.3, 0.3);

				if(gol.use_trails){	
					gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%16)), (gol.waypoints[i][2]-12)+(Math.floor((gol.game_frame/10)%12)), 0.0, 1.0, 0.0, 0);
					//gol.place_circle_fore(gol.waypoints[i][0], gol.waypoints[i][1], (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/5)%6)), (gol.waypoints[i][2]-8)+(Math.floor((gol.game_frame/5)%6)), 1.0, 1.0, 1.0, 0);
				}
			}	
	
		
			if(gol.waypoints[i][5] == 0) {gol.waypoints[i][3]-= 1;} else {
				gol.waypoints[i][3]-= 5;
			}

			if(gol.waypoints[i][5] == 0) {passive_spawn = false;}





			if(gol.waypoints[i][3] <= 0 ) {
				if(gol.waypoints[i][5] == 0) {
					gol.waypoint_cooldown = Math.floor( (Math.random()*900*4) + 360 + (gol.game_score/10) ) ;
					gol.waypoints[i][3] = 0;
					gol.play_sound(7);
				}
				gol.ar_kill(gol.waypoints, i);
				
			}



		}
	}

	if(passive_spawn) {
		if(gol.waypoint_cooldown == 0) {
			gol.create_waypoint(Math.random()*gol.statesize[0], Math.random()*gol.statesize[1], 96, 5000, 0);
			if(gol.waypoint_cooldown == 0) {gol.waypoint_cooldown = -1;}
		
		}
	}
	return this;
}


GOL.prototype.create_explosion = function(x, y, size, cooldown, outval, inval, r, g, b, shift, layers) {
	var new_obj = new Array(12);

	new_obj[0] = x;			// Actual X pos
	new_obj[1] = y;			// Actual Y pos
	new_obj[2] = (size/2)+1;		// Square size
	new_obj[3] = cooldown;	// Warp cooldown (frames)
	new_obj[4] = cooldown;	// Cooldown Max (frames)
	new_obj[5] = outval;	// Outer Explosion Value
	new_obj[6] = inval;		// Inner Explosion Value
	new_obj[7] = r;			// Rend Colour R
	new_obj[8] = g;			// Rend Colour G
	new_obj[9] = b;			// Rend Colour B
	new_obj[10] = shift;	// Bool adjust for player pos
	new_obj[11] = layers;	// 

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
			
			/*if(gol.explosions[i][11] == 0) {
				gol.placeAll(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5), 				gol.explosions[i][7], 	gol.explosions[i][5], 	gol.explosions[i][8], 	gol.explosions[i][9]);
				gol.placeAll(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*col*0.7, 						1, 						gol.explosions[i][6], 	1, 						col);
			}

			if(gol.explosions[i][11] == 1) {
				gol.place_Rend_World_circle(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5), 		gol.explosions[i][7], 	gol.explosions[i][5], 	gol.explosions[i][8], 	gol.explosions[i][9]);
				gol.place_Rend_World_circle(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*col*0.7, 				1, 						gol.explosions[i][6], 	1, 						col);
			}

			if(gol.explosions[i][11] == 2) {
				gol.place_back_rend_circle(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5), 		gol.explosions[i][7], 	gol.explosions[i][5], 	gol.explosions[i][8], 	gol.explosions[i][9]);
				gol.place_back_rend_circle(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*col*0.7, 				1, 						gol.explosions[i][6], 	1, 						col);
			}*/

			//enemy explosion
			if(gol.explosions[i][11] == 0) {
				gol.place_Rend_World_circle(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5),	gol.explosions[i][2]*((col/2)+0.5), 			1, 1, 	1, 1);
				gol.place_circle_back(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5),	gol.explosions[i][2]*((col/2)+0.5), 			0,	0, 	0, 0);
				if(gol.use_trails){gol.place_circle_fore(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5),	gol.explosions[i][2]*((col/2)+0.5), 0.7, 1, 0.7, 0);}
				if(gol.use_trails){gol.place_circle_fore(gol.explosions[i][0], gol.explosions[i][1], (gol.explosions[i][2]*((col/2)+0.5))-12,	(gol.explosions[i][2]*((col/2)+0.5))-12, 0.2, 1, 0.2, 0);}
				//gol.placeAll(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*col*0.7, 						0, 	0, 	0, 0);
								

			}

			if(gol.explosions[i][11] == 2) {
				gol.place_Rend_World_circle(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5),	0, 			0, 	0, 0);
				gol.place_back_rend_circle(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5),	1, 			1, 	1, 1);
				gol.place_Rend_circle(gol.explosions[i][0], gol.explosions[i][1], 1.1*gol.explosions[i][2]*((col/2)+0.5), 1, 1, 1);
				if(gol.use_trails){gol.place_circle_fore(gol.explosions[i][0], gol.explosions[i][1], gol.explosions[i][2]*((col/2)+0.5),	gol.explosions[i][2]*((col/2)+0.5), 1, 1, 	1, 0);}
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
GOL.prototype.create_barrier = function(x, y, size, life, type) {
	
	var new_obj = new Array(5);

	new_obj[0] = x;
	new_obj[1] = y;
	new_obj[2] = (size/2)+1;
	new_obj[3] = life;
	new_obj[4] = type;

	gol.barriers.push(new_obj);

	return this;
}

//Process the barrier's step function
GOL.prototype.run_barriers = function() {
	
	for(var i = 0; i < gol.barriers.length; i++) {
		//alert(gol.barriers[i]);
		if(gol.barriers.length > 0 && gol.barriers[i] != null) {
			if(gol.barriers[i][3] <= 0) {
				if(gol.barriers[i][4] == 0) {gol.create_explosion(gol.barriers[i][0], gol.barriers[i][1], (gol.barriers[i][2]*1.8)+32, 9, 0, 0, 0.6, 0, 0, false, 2);}
				if(gol.barriers[i][4] == 1) {gol.create_explosion(gol.barriers[i][0], gol.barriers[i][1], (gol.barriers[i][2]*1.8)+32, 9, 0, 0, 0.6, 0, 0, false, 0);}
				gol.ar_kill(gol.barriers, i);			
				gol.play_sound(11);
			} else {
				gol.barriers[i][3] -= 8;

				var adjusted_pos = gol.cpu_positioning(gol.barriers[i][0], gol.barriers[i][1]);
				gol.barriers[i][0] = adjusted_pos[0];
				gol.barriers[i][1] = adjusted_pos[1];

				if(gol.barriers[i][4] == 0) {
					gol.place_circle_back(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2], gol.barriers[i][2], 1, 1, 1);
					gol.place_circle_rend(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2], gol.barriers[i][2], 0, gol.barriers[i][3]/gol.barrier_life_max, 1-(gol.barriers[i][3]/gol.barrier_life_max));
				}
				if(gol.barriers[i][4] == 1) {
					gol.place_circle_world(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2], gol.barriers[i][2], 1, 1, 1);
					gol.place_circle_rend(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2], gol.barriers[i][2], gol.barriers[i][3]/gol.barrier_life_max, 0.5, 1-(gol.barriers[i][3]/gol.barrier_life_max));
				}
			}
		}
	}
	for(var i = 0; i < gol.barriers.length; i++) {
		if(gol.barriers[i] != null) {
			if(gol.barriers[i][4] == 0) {
				gol.place_circle_rend(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2]*0.8, gol.barriers[i][2]*0.8, 0.4, 0.4, 0.4);
				if(gol.use_trails){gol.place_circle_fore(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2]+4, gol.barriers[i][2]+4, 1, 1, 	1, 0);}
			}
			if(gol.barriers[i][4] == 1) {
				gol.place_circle_rend(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2]*0.8, gol.barriers[i][2]*0.8, 0.7, 0.7, 0.7);
      			gol.place_circle_rend(gol.barriers[i][0], gol.barriers[i][1], (gol.barriers[i][2]/3)+2, (gol.barriers[i][2]/3)+2, gol.barriers[i][3]/gol.barrier_life_max, 0.5, 1-(gol.barriers[i][3]/gol.barrier_life_max));
				if(gol.use_trails){gol.place_circle_fore(gol.barriers[i][0], gol.barriers[i][1], gol.barriers[i][2]+4, gol.barriers[i][2]+14, 1, 0.15, 	0.2, 0);}
			}
		}
	}

	return this;
}


GOL.prototype.run_shields = function() {

	//Shield (deletes impacted objects)
	var shield_size_calc = Math.ceil((gol.p_power/gol.p_power_max)*gol.p_shield_size_max) + gol.p_shield_size;
	if(gol.p_shield_cooldown <= 0 && gol.p_shield_charge_cooldown <= 0) {
		gol.p_power -= 120;
		gol.p_shield_cooldown = 20;
		gol.p_shield_charge_cooldown = 8;

		//figure out how large the burst should be

		//gol.placeAll(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, shield_size_calc, 0, 0, 1, 1);

		//unction(x, y, size, cooldown, outval, inval, r, g, b, shift, layers)
		gol.create_explosion(gol.statesize[0]/2, gol.statesize[1]/2, shield_size_calc*2, 9, 0, 0, 0, 0, 0, true, 2);
		
	} else {
		gol.p_shield_charge_cooldown -= 1;
		gol.create_explosion(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size/8, 2, 0, 0, 0, 0, 0, true, 2);
	}

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
	
		hit = hit * 3;
		if(hit > 150){hit = 150;}

		//do damage
		var minhit = 50;
		if(hit > 0) {gol.p_fuel -= (hit/10)+5; gol.play_sound(8);}
		if(hit > 4) {gol.p_health -= (hit*gol.hitrate + minhit)/2;}
		if(hit > ((gol.player_size*gol.player_size)*0.8) ) {gol.play_sound(12);}
			

	}

	gol.hitmod = (gol.hitmod + 1) % gol.hitrate;

	return hit;
}


GOL.prototype.drainfuel = function() {
	//If moving, drain fuel
	if((gol.p_move_L + gol.p_move_R != 0) || (gol.p_move_U + gol.p_move_D != 0)) { gol.p_fuel -= 5; }
	
	//Speed changes based on fuel
	if(gol.p_fuel >= gol.p_fuel_max/4) {
		gol.p_speed = 2;
		if(gol.p_move_R != 0) { gol.p_move_R = 2; }
		if(gol.p_move_L != 0) { gol.p_move_L = -2; }
		if(gol.p_move_U != 0) { gol.p_move_U = 2; }
		if(gol.p_move_D != 0) { gol.p_move_D = -2; }
	}

	if(gol.p_fuel < gol.p_fuel_max/4) {
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
		var filled = 0;
		filled += rgba[i * 4 + 2] > 128 ? 1 : 0;
		filled += rgba[i * 4 + 1] > 128 ? 1 : 0;
		filled += rgba[i * 4	 ] > 128 ? 1 : 0;
		if(filled > 0) {state[i] = 1;}
	}
	return state;
};

//Flags & values that need to be reset on game restart
GOL.prototype.player_reset = function() {
	if(gol.game_score > 0) {gol.save_score();}

	if(gol.game_on) {
		gol.place_circle_world(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, this.statesize[0]/3, this.statesize[1]/3, 0, 0, 0);
	}
	
	//others
	gol.p_power = gol.p_power_max;
	gol.p_health = gol.p_health_max;
	gol.p_fuel = gol.p_fuel_max;
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
	gol.game_score_div = 0; //Scorekeeping
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
	gol.explosions = new Array();

	//Cooldowns
	gol.shoot_cooldown = 0;
	gol.enemy_cooldown = 600;
	gol.waypoint_cooldown = 900;
	gol.place_barrier_cooldown = 0;
	gol.queen_cooldown = 3000;

	return this;
};


GOL.prototype.start_shieldburst = function() {
	gol.create_bullet(this.statesize[0]/2-32/2, this.statesize[1]/2, 9, 45, -96, 0, 0, 32, 70/2, 1, 1, 0, 0, 0);		
	gol.create_bullet(this.statesize[0]/2+32/2, this.statesize[1]/2, 9, 45, 96, 0, 0, 32, 70/2, 1, 1, 0, 0, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2-32/2, 9, 45, 0, -96, 0, 32, 70/2, 1, 1, 0, 0, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2+32/2, 9, 45, 0, 96, 0, 32, 70/2, 1, 1, 0, 0, 0);		
	gol.create_bullet(this.statesize[0]/2-32/2, this.statesize[1]/2-32/2, 9, 45, -96, -96, 0, 32, 40/2, 1, 1, 0, 0, 0);		
	gol.create_bullet(this.statesize[0]/2-32/2, this.statesize[1]/2+32/2, 9, 45, -96, 96, 0, 32, 40/2, 1, 1, 0, 0, 0);		
	gol.create_bullet(this.statesize[0]/2+32/2, this.statesize[1]/2-32/2, 9, 45, 96, -96, 0, 32, 40/2, 1, 1, 0, 0, 0);		
	gol.create_bullet(this.statesize[0]/2+32/2, this.statesize[1]/2+32/2, 9, 45, 96, 96, 0, 32, 40/2, 1, 1, 0, 0, 0);	

	/*gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, -96, 0, 0, 0, 100, 1, 1, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, 96, 0, 0, 0, 100, 1, 1, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, 0, -96, 0, 0, 100, 1, 1, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, 0, 96, 0, 0, 100, 1, 1, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, -96, -96, 0, 0, 70, 1, 1, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, -96, 96, 0, 0, 70, 1, 1, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, 96, -96, 0, 0, 70, 1, 1, 0);		
	gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 4, 95, 96, 96, 0, 0, 70, 1, 1, 0);	*/
}

//sandbox
GOL.prototype.run_sandbox = function() {
	
	if(gol.gen % gol.capture_frame_mod != (gol.capture_frame_mod-1)) {
		gol.place_circle_rend(gol.mouse_x, gol.mouse_y, 9, 9, 0.7, 0.7, 0.7);
		gol.place_circle_rend(gol.mouse_x, gol.mouse_y, 5, 5, 0.2, 0.2, 0.2);
	}


	/*if(gol.l_click) {
		//watertest
		gol.place_back_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize+4, 0, 0, 1, 1);
		gol.place_back_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize+4, 0, 0, 0, 1);

		gol.place_back_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize, 1, 1, 1, 1);
		gol.place_back_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize-2, 0, 0, 0, 0);
		gol.place_back_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize-4, 1, 1, 1, 1);
	}*/

	if(gol.l_click) {
		//watertest
		gol.place_level_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize, 0, 0, 1, 1);
	}

	/*if(gol.l_click && gol.r_click) {
		if(gol.place_barrier_cooldown <= 0){
			var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2));
			var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2));
			gol.create_barrier(x, y, gol.barrier_size, gol.barrier_life_max+10000000, gol.bar_type); 
			gol.place_barrier_cooldown = 10;	
		}
	} else if(gol.r_click) {
		gol.place_back_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize, 1, 0, 0, 0);
		if(gol.bar_type == 0) {gol.bar_type = 1;} else {gol.bar_type = 0;}
	}*/
	if(gol.l_click && gol.r_click) {
		if(gol.place_barrier_cooldown <= 0){
			var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2));
			var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2));
			gol.create_barrier(x, y, gol.barrier_size, gol.barrier_life_max+10000000, gol.bar_type); 
			gol.place_barrier_cooldown = 10;	
		}
	} else if(gol.r_click) {
		gol.place_level_rend_circle(gol.mouse_x, gol.mouse_y, gol.sb_mousesize, 1, 0, 0, 0);
		if(gol.bar_type == 0) {gol.bar_type = 1;} else {gol.bar_type = 0;}
	}


	
	gol.run_barriers();			//Step Barrier calcs
	gol.place_barrier_cooldown--;
	
}

//Player controller
GOL.prototype.run_player = function() {

	
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
		gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size+4, gol.player_size+4, 0, 0.5, 0.7); 
	}	

	//attempt hit detection and give me the result
	var hit = gol.hitplayer();

	//draw player	
	if(gol.use_trails){
		gol.place_circle_fore(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size+4, gol.player_size+4, 1, 1, 1)
		//gol.place_circle_fore(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size+4, gol.player_size+4, gol.p_health/gol.p_health_max, gol.p_fuel/gol.p_fuel_max, gol.p_power/gol.p_power_max)
	}


	if(hit == 0) {
		if(gol.shoot_cooldown > 0) {			
			gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size-((gol.player_size*(gol.shoot_cooldown/gol.p_rof))/2), gol.player_size-((gol.player_size*(gol.shoot_cooldown/gol.p_rof))/2), (0.8-(gol.shoot_cooldown/gol.p_rof)/2)+0.2, (0.8-(gol.shoot_cooldown/gol.p_rof)/2)+0.2, (gol.shoot_cooldown/gol.p_rof)*0.8);
		} else {
			gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size, gol.player_size, 1, 1, 0);
		}
	} else {
		gol.hit_flash = 6;
		//gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size, gol.player_size, 1, 0, 0)
		//gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, 9, 9, 1, 1, 0)
	}

	if(gol.hit_flash > 0) {
		gol.hit_flash -= 1;
		gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size+6, gol.player_size+6, 1, 0, 0)
		if(gol.shoot_cooldown > 0) {			
			gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size-((gol.player_size*(gol.shoot_cooldown/gol.p_rof))/2), gol.player_size-((gol.player_size*(gol.shoot_cooldown/gol.p_rof))/2), (0.8-(gol.shoot_cooldown/gol.p_rof)/2)+0.2, (0.8-(gol.shoot_cooldown/gol.p_rof)/2)+0.2, (gol.shoot_cooldown/gol.p_rof)*0.8);
		} else {
			gol.place_circle_rend(gol.statesize[0]/2, gol.statesize[1]/2, gol.player_size-4, gol.player_size-4, 1, 1, 0);
		}
	}

	if(hit > 0) {
		gol.run_shields();
	}

	//gol.place_view_radius(gol.statesize[0]/2, gol.statesize[1]/2, 500, 500, 0.5, 0.5, 0.5);
	//gol.place_view_radius(gol.statesize[0]/2, gol.statesize[1]/2, 520, 520, 0.6, 0.6, 0.6);


	//If moving, drain fuel and slow down
	gol.drainfuel();

	//Drained all power
	if(gol.p_power <= 0) {
		if(gol.space_down) {gol.p_s_burstcooldown = 60*3;} 
		gol.space_down = false;
	}



	//regens
	if(gol.p_fuel < gol.p_fuel_max) 								{gol.p_fuel += 1.5;}
	if(gol.p_health < gol.p_health_max && gol.game_frame % 2 == 0) 	{gol.p_health += 0.3;}
	if(gol.p_power < gol.p_power_max) 								{gol.p_power += 9;}

	//Regen overflow cases
	if(gol.p_fuel > gol.p_fuel_max) {gol.p_fuel = gol.p_fuel_max;}
	if(gol.p_health > gol.p_health_max) {gol.p_health = gol.p_health_max;}
	if(gol.p_power > gol.p_power_max) {gol.p_power = gol.p_power_max;}

	if(gol.p_fuel < 0) {gol.p_fuel = 0;}
	if(gol.p_health < 0) {gol.p_health = 0;}
	if(gol.p_power < 0) {gol.p_power = 0;}
	

	if(hit >= (gol.player_size*gol.player_size)/3) {
		gol.healthflash = true;
	} else if(gol.hitmod == 1) {
		gol.healthflash = false;
	}

	if(gol.health_low_flash < 8 && gol.p_health/gol.p_health_max < 0.37) {
		gol.healthflash = true;
		if(gol.health_low_flash == 0) {
			gol.play_sound(17);
		}
	}

	gol.health_low_flash = (gol.health_low_flash + 1) % 16;

	//status bars
	//  Back bars
	gol.place_cell_rend((gol.statesize[0]/2), 22, (gol.statesize[0]/4), 4, 0.26, 0.2, 0)

	if(gol.healthflash) {
		gol.place_cell_rend((gol.statesize[0]/2), 28, (gol.statesize[0]/4), 4, 1, 0.8, 0.8)
	} else {
		gol.place_cell_rend((gol.statesize[0]/2), 28, (gol.statesize[0]/4), 4, 0.2, 0, 0)
	}

	gol.place_cell_rend((gol.statesize[0]/2), 34, (gol.statesize[0]/4), 4, 0, 0.1, 0.2)

	gol.place_cell_rend((gol.statesize[0]/2), 12, (gol.statesize[0]/3), 5, 0.1, 0.2, 0.1)

	//  Front bars
	gol.place_cell_rend((gol.statesize[0]/2), 22, (gol.statesize[0]/4)*(gol.p_fuel/gol.p_fuel_max), 4, 0.8, 0.6, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 28, (gol.statesize[0]/4)*(gol.p_health/gol.p_health_max), 4, 1, 0, 0)
	gol.place_cell_rend((gol.statesize[0]/2), 34, (gol.statesize[0]/4)*(gol.p_power/gol.p_power_max), 4, 0, 0.5, 0.8)

	if(gol.p_shot_cost <= gol.p_power_max) {gol.place_cell_rend((gol.statesize[0]/2), 33, (gol.statesize[0]/4)*(gol.p_shot_cost/gol.p_power_max), 2, 0.7, 0.9, 1);} else {
		gol.place_cell_rend((gol.statesize[0]/2), 33, (gol.statesize[0]/4), 2, 0.0, 0.1, 0.2);
	}
	

	gol.place_cell_rend((gol.statesize[0]/2), 12, (gol.statesize[0]/3)*(Math.round(((gol.game_score_div/30)*100))/100), 5, 0.6, 0.8, 0.6)
	if((Math.round(((gol.game_score_div/30)*100))/100) > 0.9) {	gol.place_cell_rend((gol.statesize[0]/2), 12, (gol.statesize[0]/3)*(Math.round(((gol.game_score_div/30)*100))/100), 5, 1, 1, 0.4); }
	gol.place_cell_rend((gol.statesize[0]/2), 12, ((gol.statesize[0]/3)-2)*(gol.game_score_disp/gol.game_score_max), 2, 0, 0.6, 0)
	if(gol.game_score_disp/gol.game_score_max > 0.85) {	gol.place_cell_rend((gol.statesize[0]/2), 12, ((gol.statesize[0]/3)-2)*(gol.game_score_disp/gol.game_score_max), 2, 0, (gol.game_score_disp/gol.game_score_max), (gol.game_score_disp/gol.game_score_max)); }
	
	
	//Player UI action handler
	if(!gol.bullet_exists){
		//Main Shooter
		if(!gol.r_click && gol.l_click) {
			if(gol.shoot_cooldown <= 0) {
				if(gol.p_power >= gol.p_shot_cost){
					var x = (gol.mouse_x - this.statesize[0]/2);
					var y = (gol.mouse_y - this.statesize[1]/2);
					var dist = gol.get_dist(0, x, 0, y);

					if(dist <= 300/2) {
						for(var i = 0; i < gol.p_bullet_ar[0]+gol.p_bullet_ar_mods[0]; i++) {
							//gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 9, 35, (gol.mouse_x - this.statesize[0]/2), (gol.mouse_y - this.statesize[1]/2), 0, (gol.p_power/gol.p_power_max)*42+12, 101, 12, 1, 0);		
							gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, gol.p_bullet_ar[1]+gol.p_bullet_ar_mods[1], gol.p_bullet_ar[2]+gol.p_bullet_ar_mods[2], (gol.mouse_x - this.statesize[0]/2), (gol.mouse_y - this.statesize[1]/2), 0, (gol.p_power/gol.p_power_max)*(gol.p_bullet_ar[4]+gol.p_bullet_ar_mods[4])+gol.p_bullet_ar[5]+gol.p_bullet_ar_mods[5], gol.p_bullet_ar[6]+gol.p_bullet_ar_mods[6], gol.p_bullet_ar[7]+gol.p_bullet_ar_mods[7], gol.p_bullet_ar[8]+gol.p_bullet_ar_mods[8], 0, gol.p_bullet_ar[10]+gol.p_bullet_ar_mods[10], gol.p_bullet_ar[11]+gol.p_bullet_ar_mods[11]);		
							//  proj count, size, life, val, explosion_rand, explosion_min, overpenetration, variance
							//gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, gol.p_bullet_ar[1], gol.p_bullet_ar[2], (gol.mouse_x - this.statesize[0]/2), (gol.mouse_y - this.statesize[1]/2), 0, (gol.p_power/gol.p_power_max)*gol.p_bullet_ar[4]+gol.p_bullet_ar[5], gol.p_bullet_ar[6], gol.p_bullet_ar[7], gol.p_bullet_ar[8], 0);		
						}
						gol.shoot_cooldown = gol.p_rof;
						gol.p_power -= gol.p_shot_cost;
						//gol.game_score += 10;
						gol.play_sound(9);
					} else {
						var capped_pos = gol.player_cap_mouse_pos_max(300/2);
						x = capped_pos[0] - this.statesize[0]/2;
						y = capped_pos[1] - this.statesize[1]/2;
						for(var i = 0; i < gol.p_bullet_ar[0]+gol.p_bullet_ar_mods[0]; i++) {
							gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, gol.p_bullet_ar[1]+gol.p_bullet_ar_mods[1], gol.p_bullet_ar[2]+gol.p_bullet_ar_mods[2], x, y, 0, (gol.p_power/gol.p_power_max)*(gol.p_bullet_ar[4]+gol.p_bullet_ar_mods[4])+gol.p_bullet_ar[5]+gol.p_bullet_ar_mods[5], gol.p_bullet_ar[6]+gol.p_bullet_ar_mods[6], gol.p_bullet_ar[7]+gol.p_bullet_ar_mods[7], gol.p_bullet_ar[8]+gol.p_bullet_ar_mods[8], 0, gol.p_bullet_ar[10]+gol.p_bullet_ar_mods[10], gol.p_bullet_ar[11]+gol.p_bullet_ar_mods[11]);		
						}	
						//gol.create_bullet(this.statesize[0]/2, this.statesize[1]/2, 9, 35, x, y, 0, 39, 101, 12, 1, 0);	
						//gol.create_bullet(0, 0, 9, 55, x, y, 0, 39, 101, 12, 1);	//close	
						gol.shoot_cooldown = gol.p_rof;
						gol.p_power -= gol.p_shot_cost;
						gol.play_sound(9);
					}
				}
				
				
			}
		}         
		
		if((!gol.l_click || gol.melee_on) && gol.r_click) {
			gol.create_melee(); 
		}      		
		
		if(!gol.l_click && gol.r_click && !gol.melee_on) {gol.p_power -= gol.melee_start_cost; gol.melee_on = true;}       		
		
		if(gol.l_click && gol.r_click && gol.p_power >= gol.barrier_cost && gol.melee_on && gol.place_barrier_cooldown <= 0) {
			gol.shoot_cooldown = (gol.p_rof/4)+15; //don't shoot own barriers
			if(!gol.check_barrier_placement()) {
				var x = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5);
				var y = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5);
				var dist = gol.get_dist(this.statesize[0]/2, x, this.statesize[1]/2, y);
				
				if(dist >= 50/2) {
					var capped_pos = gol.player_cap_mouse_pos_max(50/2);
					x = capped_pos[0];
					y = capped_pos[1];
				}
				gol.create_barrier(x, y, gol.barrier_size, gol.barrier_life_max+Math.floor(Math.random()*200), 0); 
				gol.place_barrier_cooldown = 12;
				gol.p_power -= gol.barrier_cost;		
				//gol.game_score += 50;			
				gol.play_sound(11);
			}
		}
	}

	
	//Shield burst attack
	if(gol.space_down) {
		//gol.place_Rend_World(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, (gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size, 0, 0, 1, 1);
		gol.place_circle_back(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), 0, 0, 0);
		gol.place_circle_world(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), 0, 0, 0);
		if(gol.use_trails){gol.place_circle_fore(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), 1, 1, 1);}
		gol.place_circle_rend(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size), 0, 0.9, 1);
		gol.place_circle_rend(gol.statesize[0]/gol.scale/2, gol.statesize[1]/gol.scale/2, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size)*0.85, ((gol.p_s_burstsize/3)+gol.p_s_burstsize*(gol.p_power/gol.p_power_max)+gol.player_size)*0.85, 0.9, 1, 1);
		gol.p_power -= 75;
	}

	//if(gol.shield_burst_duration == 2 && gol.space_down) {gol.create_barrier(gol.statesize[0]/2, gol.statesize[1]/2, gol.barrier_size*1.7, gol.barrier_life_max*0.75, 0);gol.play_sound(11); gol.p_s_burstcooldown = 0;}
	if(gol.p_s_burstcooldown > 0) {gol.p_s_burstcooldown -= 1;}
	if(gol.space_down && gol.shield_burst_duration > 0) {gol.shield_burst_duration -= 1;} else {gol.space_down = false;}
	
	//Game Over!	
	if(gol.p_health <= 0) {
		gol.play_sound(13);
		//alert("You did not survive, this time.");
		//gol.active_rule = Math.floor(Math.random()*gol.rule_array.length)
		gol.setRandom(gol.textures.front, 1);
    	gol.setRandom(gol.textures.level_1, 1);
		gol.setEmpty(gol.textures.background_1);
		gol.setEmpty(gol.textures.foreground_1);
		gol.player_reset();
	}

	//Placement marker
	var x_place = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/2.5);
	var y_place = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/2.5);
	var dist = gol.get_dist(this.statesize[0]/2, x_place, this.statesize[1]/2, y_place);
				
	if(dist >= 50/2) {
		var capped_pos = gol.player_cap_mouse_pos_max(50/2);
		x_place = capped_pos[0];
		y_place = capped_pos[1];
	}

	gol.place_circle_rend(x_place, y_place, 5, 5, 0.6, 0.8, 0.6);
	gol.place_circle_rend(x_place, y_place, 3, 3, 0.2, 0.2, 0.2);


	//Shoot marker	
	//limit marker
	var x_place = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2));
	var y_place = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2));
	var dist = gol.get_dist(this.statesize[0]/2, x_place, this.statesize[1]/2, y_place);
				
	if(dist >= 300/2) {
		var capped_pos = gol.player_cap_mouse_pos_max(300/2);
		x_place = capped_pos[0];
		y_place = capped_pos[1];
	}

	gol.place_circle_rend(x_place, y_place, 7, 7, 1, 1, 1);
	gol.place_circle_rend(x_place, y_place, 5, 5, 0, 0, 0);
	gol.place_circle_rend(x_place, y_place, 3, 3, 1, 1, 1);
	gol.place_circle_rend(x_place, y_place, 2, 2, 0.8, 0, 0);
	

	//Melee marker
	var x_mel = (this.statesize[0]/this.scale/2) + ((gol.mouse_x - this.statesize[0]/2)/3);
	var y_mel = (this.statesize[1]/this.scale/2) + ((gol.mouse_y - this.statesize[1]/2)/3);
	var dist = gol.get_dist(this.statesize[0]/2, x_mel, this.statesize[1]/2, y_mel);
				
	if(dist >= 64/2) {
		var capped_pos = gol.player_cap_mouse_pos_max(64/2);
		x_mel = capped_pos[0];
		y_mel = capped_pos[1];
	}

	gol.place_circle_rend(x_mel, y_mel, 4, 4, 0.4, 0.8, 0.4);
	gol.place_circle_rend(x_mel, y_mel, 3, 3, 1, 1, 1);

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
