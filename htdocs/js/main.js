// CODE FROM TUTORIAL

/* 
This file is kind of our staging area for our Phaser game. It loads all of our scene files 
so we only have to update the config.scene_name array whenever we add new scenes.
*/

// our phaser game instantiated here.

// this whole file is just a big ass variable
/* The way this script is set up, it creates a global MainConfig object. You could 
access the main Phaser.Game object from anywhere by using MainConfig.game. */

// this can be accessed from anywhere?
var MainConfig = (()=>{

	// loose reference
	let config = this;

	// path to our scene scripts
	let scene_path = "js/scenes/";

    // THE SCENES THEMSELVES (filenames)
	// class/file names of all our scenes
	config.scene_names = [
		'InitScene',
		'PreloaderScene',
		'GameScene'
	];

    /* InitScene is a very basic scene that preloads the absolute minimum 
    assets we will need to render our proper preloader. 
    - so, it's a loader for the PRELOADER.
    
    PreloadScene is where we will load everything else and render a proper preloader. 
    It's also where we'll make sure sound is enabled in our game.

    GameScene will be the class that controls the ACTUAL game. In a real game, you might 
    have a TitleScene and OptionsScene, and multiple variations of GameScene as well, but 
    we won't be doing anything that polished in this guide. */

    // seems like this framework uses "preloading".
	// This will be called when all our scene files have loaded and we are ready to start the Phaser game.
	function startGame() {

		config.game = new Phaser.Game({

			width: 860,
			height: 640,
			type: Phaser.AUTO,	// Render mode, could also be Phaser.CANVAS or Phaser.WEBGL
            /*letting Phaser automatically determine the best rendering mode to use on the 
            user's end machine. */

			scene: config.scene_classes // the code below will set this for us

		});
	}


	//---------- You shouldn't need to edit anything below here ----------\\

	// this will store references to our scene classes as they are loaded.
    // looks like this contains the scenes themselves (added at 57)
	config.scene_classes = [];

	// get the body tag in the HTML document
	let body = document.getElementsByTagName('body')[0];

	// keep track of number of loaded scenes
	let scenes_loaded = 0;

	// Loads a scene file by adding a script tag for it in our page HTML
	function loadScene(scene_name) {    // passed in a filename (not including ".js")

        // creates a whole ass script tag. Not added to the html until line 60
		let script_tag = document.createElement('script');
		script_tag.src = scene_path + scene_name + ".js";

		// wait for the scene file to load, then check if we have loaded them all
		script_tag.addEventListener('load', ()=>{
			scenes_loaded++;
			eval("config.scene_classes.push("+scene_name+")");

			// looks like we can start the game!
			if (scenes_loaded === config.scene_names.length) startGame();
		});

		body.appendChild(script_tag);
	}

	// start loading all of our scene files
	config.scene_names.forEach((scene_name)=> {
		loadScene(scene_name);
	});

	return this;
})();