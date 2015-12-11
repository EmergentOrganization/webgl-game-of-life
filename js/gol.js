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
	this.gpuframes = 1;
	this.fps_target = 33.3; //Determines framerate. 66.6 = 15fps, 33.3 = 30fps, 16.7 = 60fps
	document.getElementById("life").style.cursor = "none";

	//Record functions
	this.export_image = null;
	this.export_images = new Array();
	this.gen = 0;
	this.render_frame = 0;
	this.recordnow = false;
	this.capture_frame_mod = 1;
	this.downloadbatchstart = 0;
	this.downloadbatchsize = 100;
	this.allframecount = 0;

	//Initial state setup
	this.active_rule = new Array(2);
	this.active_rule[0] = 1;
	this.active_rule[1] = 0;
	this.seed_strength = 2.5;
	this.game_frame = 0;

	//User input controls
	this.l_click = false;
	this.r_click = false;
	this.mouse_x = 0
	this.mouse_y = 0
	this.space_down = false;
	this.sb_mousesize = 48;	

	//GUI
	this.births = new Array(4);
	for(var i = 0; i < this.births.length; i++) { this.births[i] = new Array(2); }
	this.deaths = new Array(4);
	for(var i = 0; i < this.deaths.length; i++) { this.deaths[i] = new Array(2); }
	this.births[0][0] = 25;
	this.do_next_image = true;
	this.photo_duration = 1.0;
	this.rule_count = 1;

	//Seed Images/Frames
	this.seed_images = new Array();
	this.seedimgnum = 0;
	this.shuffletime = 1;
	this.useblur = false;

	//preload seed images
	this.imgcount = 43;

	for(var i = 0; i < this.imgcount+1; i++) {
		//Naming Scheme
		var sZos = "00000";
		if(i % this.imgcount  > 9) {sZos = "0000";}
		if(i % this.imgcount  > 99) {sZos = "000";}
		if(i % this.imgcount  > 999) {sZos = "00";}
		var imgsrc = "Seeds/image" + sZos + i % this.imgcount +".png";

		var img = new Image();
		img.src = imgsrc;

		this.seed_images[i] = img;
	}	

	this.video = document.createElement('video');
	this.nextvidframe = 0;
	this.webcamon = false;
	this.showwebcam = true;

    gl.disable(gl.DEPTH_TEST); //disables alpha channels?

	//Load the shaders

	this.rule_paths = new Array();
	this.rule_paths.push('glsl/First.frag'),
	this.rule_paths.push('glsl/Edges.frag')
   

	this.programs = {
      
		Rule0:	igloo.program('glsl/quad.vert', this.rule_paths[0]),
		Rule1:	igloo.program('glsl/quad.vert', this.rule_paths[0]),

		//Utility shaders
        copy: 			igloo.program('glsl/quad.vert', 'glsl/copy.frag'),
        RendMerge3:  	igloo.program('glsl/quad.vert', 'glsl/RendMerge3.frag')
    };

	//Rule & seed selection containers
	this.rule_array = new Array(2);
	this.rule_seeds = new Array(15);

	//set the seed strength defaults
	for (var i = 0; i < this.rule_seeds.length; i++){
		this.rule_seeds[i] = this.seed_strength;
	}

	//Define the rules
	
	this.rule_array[0] = this.programs.Rule0;
	this.rule_array[1] = this.programs.Rule1;


	this.rule_seeds[0] = this.seed_strength;


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

        rgba[ii + 0] = stateR[i] ? Math.floor(Math.random()*255) : 0;
        rgba[ii + 1] = stateG[i] ? Math.floor(Math.random()*255) : 0;
        rgba[ii + 2] = stateB[i] ? Math.floor(Math.random()*255) : 0;

        rgba[ii + 3] = 255;
    }
    tex.subset(rgba, 0, 0, this.statesize[0], this.statesize[1]);
    return this;
};

GOL.prototype.setChansImg = function(stateR, stateG, stateB, tex) {

    var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);

    //var gl = gol.igloo.gl;
    //var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);
    for (var i = 0; i < stateR.length; i++) {
        var ii = i * 4;

        rgba[ii + 0] = stateR[i];
        rgba[ii + 1] = stateG[i];
        rgba[ii + 2] = stateB[i];

        rgba[ii + 3] = 255;
    }
    tex.subset(rgba, 0, 0, this.statesize[0], this.statesize[1]);
    return this;
};

GOL.prototype.setChansImgBlur = function(stateR, stateG, stateB, tex) {
	var gl = gol.igloo.gl;
    var framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, gol.textures.front.texture, 0);

    // Read the contents of the framebuffer
    var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);
    gl.readPixels(0, 0, this.statesize[0], this.statesize[1], gl.RGBA, gl.UNSIGNED_BYTE, rgba);
    gl.deleteFramebuffer(framebuffer);


	var age_loss = 1.1;
	var new_add = 12;

    //var gl = gol.igloo.gl;
    //var rgba = new Uint8Array(this.statesize[0] * this.statesize[1] * 4);
    for (var i = 0; i < stateR.length; i++) {
        var ii = i * 4;

        rgba[ii + 0] = rgba[ii + 0]/age_loss + stateR[i]/new_add;
        rgba[ii + 1] = rgba[ii + 1]/age_loss + stateG[i]/new_add;
        rgba[ii + 2] = rgba[ii + 2]/age_loss+ stateB[i]/new_add;

        rgba[ii + 3] = 255;
    }
    tex.subset(rgba, 0, 0, this.statesize[0], this.statesize[1]);
    return this;
};


GOL.prototype.setImage = function(tex/*, layer*/) {

    var canvas = document.createElement("canvas");
    canvas.width = gol.canvas.width;
    canvas.height = gol.canvas.height;
	var ctx = canvas.getContext("2d");
    var imageData = ctx.createImageData(canvas.width, canvas.height);

	//console.log((gol.seedimgnum) + " Img: " + gol.seed_images[gol.seedimgnum]);
	ctx.drawImage(gol.seed_images[gol.seedimgnum], 0, 0);

 	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	if(gol.seedimgnum >= gol.imgcount) {gol.seedimgnum = 0;} else {gol.seedimgnum += 1;}

    var gl = this.igloo.gl, size = this.statesize[0] * this.statesize[1];
    var colR = new Uint8Array(size);
    var colG = new Uint8Array(size);
    var colB = new Uint8Array(size);
    for (var i = 0; i < size; i++) {
		var ii = i * 4;
        colR[i] = imageData.data[ii];
        colG[i] = imageData.data[ii+1];
        colB[i] = imageData.data[ii+2];
    }

	if(gol.useblur) {this.setChansImgBlur(colR, colG, colB, tex);} else {this.setChansImg(colR, colG, colB, tex);}
    
    //

    return this;
};


/**
 * Clear the simulation state to empty.
 * @returns {GOL} this
 */

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
				var downpc = Math.round((gol.downloadbatchstart/gol.render_frame)*100);				
				if(gol.downloadbatchstart == 0) {downpc = 0;}
				$('.fps').text(this.fps + ' FPS, (' + gol.render_frame + ' recorded | ' + downpc + "% saved)");
				this.lasttick = GOL.now();
				this.fps = 0;
			} else {
				this.fps++;
			}

			if(gol.nextvidframe <= 0 && !gol.video.paused) {
				gol.getnextimage();
			}

			//Compute the next frame(s) of the CA
	
			
			for (var repeat_frame_i = 0; repeat_frame_i < gol.gpuframes; repeat_frame_i++) { 

				for (var i = 0; i < 1; i++) { 
					gol.step(gol.textures.front, gol.textures.back, gol.rule_array[0], 1);
					gol.game_frame += 1
				}

				//gol.step(gol.textures.background_1, gol.textures.background_2, gol.rule_array[1], 0);
				
				gol.swap_MergeRend3();

			}

			if(gol.game_frame % gol.gpuframes != 0) {
				gol.game_frame -= gol.game_frame % gol.gpuframes;
			}

			//console.log(gol.game_frame % gol.gpuframes);

			//gol.run_sandbox();			//Step sandbox

			gol.draw();					//Render the final texture to the screen

			if(gol.do_next_image) {
				if(gol.game_frame % gol.shuffletime == 0) {
					gol.next_image();
				}
			}

			//Image Export handler
			if (gol.recordnow === true) {
				gol.gen += 1;
				if(gol.gen % gol.capture_frame_mod === 0){

					gol.export_image = gol.exportImage(gol.igloo.gl, gol.textures.rend.texture, gol.canvas.width, gol.canvas.height);
					gol.export_images[gol.render_frame] = gol.export_image;
					gol.render_frame += 1;


					/*var rendmod = 50;
					gol.export_image = gol.exportImage(gol.igloo.gl, gol.textures.rend.texture, gol.canvas.width, gol.canvas.height);
					gol.export_images[gol.render_frame%rendmod] = gol.export_image;
					gol.render_frame += 1;
					if(gol.render_frame % rendmod === 0)	{
						gol.downloadAll(gol.export_images, gol.render_frame-rendmod);
					}*/
				}
			}

			if(gol.allframecount == 1) {gol.toggle();}

			gol.allframecount++;

        }, this.fps_target);     //Determines framerate. 66.6 = 15fps, 33.3 = 30fps, 16.7 = 60fps
		
    }
    return this;
};

GOL.prototype.getnextimage = function() {
	var canvas = document.createElement("canvas");
	canvas.width = gol.canvas.width;
	canvas.height = gol.canvas.height;
	var ctx = canvas.getContext("2d");
	var imageData = ctx.createImageData(canvas.width, canvas.height);

	ctx.drawImage(gol.video, 0, 0, canvas.width, canvas.height)

	var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	var gl = gol.igloo.gl, size = gol.statesize[0] * gol.statesize[1];
	var colR = new Uint8Array(size);
	var colG = new Uint8Array(size);
	var colB = new Uint8Array(size);
	for (var i = 0; i < size; i++) {
		var ii = i * 4;
		colR[i] = imageData.data[ii];
		colG[i] = imageData.data[ii+1];
		colB[i] = imageData.data[ii+2];
	}

	//gol.setChansImg(colR, colG, colB, gol.textures.front);
	if(gol.useblur) {gol.setChansImgBlur(colR, colG, colB, gol.textures.front);} else {gol.setChansImg(colR, colG, colB, gol.textures.front);}
	gol.nextvidframe = gol.shuffletime;
}

GOL.prototype.hasGetUserMedia = function() {
  	if(!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia)) {
		alert('getUserMedia() is not supported in your browser');
	}

	var p = navigator.mediaDevices.getUserMedia({ audio: false, video: true });

	p.then(function(mediaStream) {
	   	gol.video.src = window.URL.createObjectURL(mediaStream);
	   	gol.video.onloadedmetadata = function(e) {
			//alert('Success');
	   	};

		gol.video.play();

		gol.video.addEventListener('play', function() {
			//console.log('Added Listener');
			var i=window.setInterval(function() {
				//console.log('PLAY');
				
				gol.nextvidframe -= 1;
				
				//console.log('DONE');
			}, 16);
		},false);

	});

	p.catch(function(e) { console.log(e.name); }); // always check for errors at the end.

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
	zerStr+=((imgnum).toString());

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
GOL.prototype.downloadAll = function(imgs, imgstart, imgcount) {

    // (Try to) download the images
	for (var i = imgstart; i < imgstart+imgcount; i++) {
        gol.download(imgs[i], i);
		gol.downloadbatchstart++;
    }
	//gol.downloadbatchstart += gol.downloadbatchsize;

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


//Builds the menu & event handlers
function addGUI() { 
    var gui = new dat.GUI(),
        cont = new myConfig();
	gui.cont = cont;




    gui.add(cont, 'boolon').name('Pause').onFinishChange(tog);
    gui.add(cont, 'boolon').name('Play Frames').onFinishChange(ranrul_player);
    gui.add(cont, 'booloff').name('Use Webcam').onFinishChange(webcam);

	gui.add(cont, 'rule', {    	
    	'First': 0,
    	'Edges': 1
	}).name('Filter File').onChange(set_rule);

	gui.add(cont, 'ruleparams', 1, 40)	.step(1.0).name('Filter #').onChange(set_ruleparamsB1);
    gui.add(cont, 'fps', 1, 60)		.step(1.0).name('Target FPS').onFinishChange(set_fps);
    gui.add(cont, 'gpuframes', 1, 16)	.step(1.0).name('GPU Frames').onFinishChange(set_gpuframes);
    //gui.add(cont, 'booloff').name('Blur').onFinishChange(blur);

	var f1 = gui.addFolder('Exporting / Recording');
    f1.add(cont, 'booloff').name('Record/Export').onFinishChange(rec);





	function set_ruleparamsB1(value) {
		gol.births[0][0] = value; 
	}

	function tog(){
		gol.toggle();
		document.getElementById("life").focus();
	}

	function blur(){
		gol.useblur = !gol.useblur;
		document.getElementById("life").focus();
	}

	function rec(){
		gol.recordnow = !gol.recordnow;
		document.getElementById("life").focus();
	}

	function webcam(){
		if(!gol.webcamon) {gol.hasGetUserMedia(); gol.webcamon = true;} else {
			if(gol.video.paused) {gol.video.play();} else {gol.video.pause();}
		}
		document.getElementById("life").focus();
	}

	function ranrul_player(){
		gol.do_next_image = !gol.do_next_image;
		//console.log("Enable Images");
		document.getElementById("life").focus();
	}


   function set_fps(value){
		gol.toggle();

        gol.fps_target = 1000/value;

		gol.toggle();

		document.getElementById("life").focus();
	}


   function set_gpuframes(value){
		gol.toggle();

        gol.gpuframes = Math.round(value);

		gol.toggle();

		document.getElementById("life").focus();
	}

   	function set_fcap(value){
		gol.capture_frame_mod = value;
	}

	function set_seed_str(val){
		gol.seed_strength = val;
		
		for (var i = 0; i < gol.rule_seeds.length; i++){
			gol.rule_seeds[i] = gol.seed_strength;
		}
	}

	function set_brush(val){
		gol.sb_mousesize = val;
	}

	function set_framelen(val){
		gol.shuffletime = val;
	}

	function fpsChange(value) {
		gol.toggle();
        if(value) {gol.fps_target = 16.7; }
        if(!value) {gol.fps_target = 33.3;}
		gol.toggle();
		document.getElementById("life").focus();
    }

	function set_rule(value){
		gol.reset_rules(value, cont.rule);
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
	this.rule = 0;
	this.fps = 30;
	this.gpuframes = 1;
	this.fcap = 1;
	this.framelen = gol.shuffletime;
	this.ruleparams = 25;
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

    $(document).on('keydown', function(event) {
		switch (event.which) {  
		    case 32: /* SPAAAAACE */
				gol.downloadAll(gol.export_images, gol.downloadbatchstart, gol.downloadbatchsize);
		        break;       
		};
    });

    $canvas.on('contextmenu', function(event) {
        event.preventDefault();
        return false;
    });

}

GOL.prototype.next_image = function() {
	gol.setImage(gol.textures.front);
}

GOL.prototype.reset_rules = function(rule0, rule1) {
	
	gol.programs = {
		Rule0:	gol.igloo.program('glsl/quad.vert', gol.rule_paths[rule0]),
		Rule1:	gol.igloo.program('glsl/quad.vert', gol.rule_paths[rule1]),

		//Utility shaders
        copy: 			gol.igloo.program('glsl/quad.vert', 'glsl/copy.frag'),
        RendMerge3:  	gol.igloo.program('glsl/quad.vert', 'glsl/RendMerge3.frag')
    };

	gol.rule_array[0] = gol.programs.Rule0;
	gol.rule_array[1] = gol.programs.Rule1;
}


/* ************************
// End General functions //
************************ */


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
