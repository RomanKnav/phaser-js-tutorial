// the scene where we load the rest of the game assets.
// has all the same methods as InitScene
class PreloaderScene extends Phaser.Scene {

	constructor ()
    {
    	// Sets the string name we can use to access this scene from other scenes
		super({key:'PreloaderScene'});
    }

    init()
    {
    	console.log('PreloaderScene Started');
    }

	preload()
	{
		// each of these events can update your preloader!
        // what is this.load?

        // set our background color (what color?)
		this.cameras.main.setBackgroundColor(0x42484E);

        // add our preloader image and center it on the camera
        // remember: this image was preloaded in InitScene.js:
		this.bg_image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'preloader_background');

        // note where our dynamic/interactive stuff should go
        // wtf is this? coordinate stuff for the play button.
		this.interact_point = {x: this.bg_image.x, y: this.bg_image.y + (this.bg_image.height/2) - 42};

        let loadbar_width = 224;
		let loadbar_height = 8;
		let loadbar_pad = 4;
		let loadbar_x = this.interact_point.x - loadbar_width/2;
		let loadbar_y = this.interact_point.y - loadbar_height/2;

        // LOADBAR BACKGROUND
        // create backgroundfor the loading bar (dynamically saves us having to add more image files!)
		let loadbar_bg = this.add.graphics();
		// color and alpha
		loadbar_bg.fillStyle(0x525961, 1);  
		// position and dimensions (no, position here does NOT set origin point, thats why we're using 0,0)
		loadbar_bg.fillRect(0, 0, loadbar_width + loadbar_pad*2, loadbar_height + loadbar_pad*2);
		// move the bar where we want it
		loadbar_bg.x = loadbar_x - loadbar_pad;
		loadbar_bg.y = loadbar_y - loadbar_pad;

        // do the same for the loading bar itself
		let loadbar_bar = this.add.graphics();
		loadbar_bar.fillStyle(0xD2D8E3, 1);
		loadbar_bar.fillRect(0, 0, loadbar_width, loadbar_height);
		loadbar_bar.x = loadbar_x;
		loadbar_bar.y = loadbar_y;

        // start the bar at 0% width
		loadbar_bar.scaleX = 0;

        // A FUCKING LOADING BAR:
        /* The 'progress' event will give is a number between 0 and 1, indicating 
        how far along the overall preload phase has gotten. */
		// update the progress bar width with each progress event
		this.load.on('progress', function (progress) {
            console.log("total progress: " + (progress * 100) + "%");
			loadbar_bar.scaleX = progress;
		});

        /* this'll update us on how far each individual file has gotten along, 
        returning one of Phaser's file objects */
		this.load.on('fileprogress', function (file) {
			console.log("loading asset: " + file.src);
			console.log("file progress: " + (file.percentComplete * 100) + "%");
		});

		// remove the progress bar when everything has loaded
		this.load.on('complete', function () {
			loadbar_bar.destroy();
			loadbar_bg.destroy();
		});

		// Load the assets for the actual game here
    	this.load.audio('castle_crashers_theme', 'lib/Four_Brave_Champions__FULL.mp3');

        // preload the cat and burger images
        this.load.image('cat_head', 'lib/cat-head.png');
    	this.load.image('cheezeburger', 'lib/cheezeburger.png');

        /* this event "fires" when all the files have been loaded, but before the 
        'create' method is called. */
		this.load.on('complete', function () {
			console.log("everything is loaded!");
		});
	}

	create()
	{
        // (x, y, image)
        let play_btn = this.add.image(this.interact_point.x, this.interact_point.y, 'preloader_button');
		// make the button interactive
		play_btn.setInteractive();
		// add some alpha for the default state
		play_btn.alpha = 0.9;

        // remove alpha on hover
		play_btn.on('pointerover', ()=>{
			play_btn.alpha = 1;
		});

        // add alpha on roll out (fuck that mean) Take back to default state when not hovering over
		play_btn.on('pointerout', ()=>{
			play_btn.alpha = 0.9;
		});
    
    	// start the GameScene when the button is clicked. Bonus - this will enable audio playback as well!
		play_btn.on('pointerup', ()=>{
			this.scene.start('GameScene');
		});

		console.log('PreloaderScene Created');

		// When our bulk assets have been preloaded, we can start our main game scene
		// this.scene.start('GameScene');
	}

}
