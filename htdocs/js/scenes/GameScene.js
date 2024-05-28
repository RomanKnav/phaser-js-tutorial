// straight-forward
class GameScene extends Phaser.Scene {

	constructor ()
    {
    	// Sets the string name we can use to access this scene from other scenes
		super({key:'GameScene'});
    }

    init()
    {
    	console.log('GameScene Started');
    }

	create()
	{
		// add the Castle Crasher theme to the scene
        // custom var, cc_theme. Defined in the preload method of PreloaderScene.js:
		this.cc_theme = this.sound.add('castle_crashers_theme');
		// and play it on a loop
		this.cc_theme.play({loop: true});

		// Lets change the background again too so you can see something happened
        // what exactly this do? just makes background blue
		this.cameras.main.setBackgroundColor(0x00AAFF);
	}

  
  	update()
  	{
  		// This is your main game loop. Code in here runs on every frame tick.
  	}
  
  }