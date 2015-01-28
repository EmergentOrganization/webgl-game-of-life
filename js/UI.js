function addGUI() { 
	alert("Init Gui")

    var gui = new dat.GUI(),
        cont = new myConfig();

	dat.GUI.prototype.updateDisplays = function() {
        for (var i in this.__controllers) {
            this.__controllers[i].updateDisplay();
        }
    };
	

	gui.add(cont, 'testVar', 0, 20).step(1).name('Brush Size').onFinishChange(testFoo);

	function testFoo() {
        alert("TEST GUI Response");
		alert(cont.testVar);
    }
	
	guiSurface.updateDisplays();

}

//Some sort of constructor? Called from vendor scripts?
function Controller() {
	alert("TEST Controller");
    addGUI()
}


function myConfig() {
	this.testVar = 0;
	alert("TEST myConfig");
}