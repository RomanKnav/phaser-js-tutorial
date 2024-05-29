// loader for the preloader
// yes, this scene doesn't actually have ANYTHING.

/* This is our first Phaser scene, and it is a proper ES6 subclass of Phaser.Scene 
(as are all of our scene classes). */
class InitScene extends Phaser.Scene {
    /* The 'init' method is the first thing that's called when this scene is started. 
    It's a good place to initialize any data you may need later in the class. */
    init()
    {
    		console.log('InitScene Started');
    }

    /* we call the parent class constructor to pass along a key. This is a string 
    that Phaser uses to label each scene internally, and you should have this in all 
    of your scene classes. Without it, you won't be able to switch between scenes, and 
    your game will likely crash. */
	constructor ()
    {
    		// Sets the string name we can use to access this scene from other scenes
		super({key:'InitScene'});
    }

	preload()
	{
		// This is where you would preload the elements you need to render the preloader scene
	        // I'm guessing the preloader scene is the newgrounds logo? Yes.
	        this.load.image('preloader_background', 'lib/ng-simple-preloader-bg.png');
		this.load.image('preloader_button', 'lib/ng-simple-play-btn.png');
        	// filenames given labels for easier use.
	}

    // this gets called when everything has been loaded and the scene is ready for action
	create()
	{
		console.log('InitScene Created');
	
		// Once the preload phase is done, we can switch to our preloader scene
		this.scene.start('PreloaderScene');
	}

}
