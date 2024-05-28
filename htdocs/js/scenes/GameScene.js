// straight-forward
class GameScene extends Phaser.Scene {

	constructor ()
    {
    	// Sets the string name we can use to access this scene from other scenes
        // (this is our last scene so we don't use it anywhere else)
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

        // add the player sprite
        // the x/y coords are purely built in.
		this.player = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'cat_head');

		// add the cheeseburger sprite somewhere off-screen
        // what's up with -9999 x coord? sets it FAR offscreen (offscreen rendering?)
		this.cheezeburger = this.add.image(-9999, 0, 'cheezeburger');

        // set a cool time for cheezeburger respawn
		this.cheezeburger_cooldown = 80;

		// set the initial cool time for the cheezeburger
		this.cheezeburger_cooltime = this.cheezeburger_cooldown;

        // set how fast the player can move
		this.player_speed = 20;

		// handy container for our keyboard keys
		this.controls = {
			up: 	this.input.keyboard.addKey('UP'), // up arrow
			down: 	this.input.keyboard.addKey('DOWN'), // down arrow
			left: 	this.input.keyboard.addKey('LEFT'), // left arrow
			right: 	this.input.keyboard.addKey('RIGHT') // right arrow
		};

        // this is our score counter
		this.score = 0;

		// and this is our score text
		this.scoretext = this.add.text(5, 5, "Score: "+this.score);
		this.scoretext.setStyle({
			fontSize: "26px",
			fontFamily: "Arial Black"
		});
	}
  
  	update()
  	{
  		// This is your main game loop. Code in here runs on every frame tick.
        // up and down movement
		if (this.controls.up.isDown) {
            // if up button is held down:
			this.player.y -= this.player_speed;
			// screen wrap (player goes to other side of screen)
			if (this.player.y < 0) this.player.y = this.cameras.main.height;
		} else if (this.controls.down.isDown) {
			this.player.y += this.player_speed;
			// screen wrap
			if (this.player.y > this.cameras.main.height) this.player.y = 0;
		}

        // up and down movement
		if (this.controls.left.isDown) {
			this.player.x -= this.player_speed;
			// screen wrap
			if (this.player.x < 0) this.player.x = this.cameras.main.width;
		} else if (this.controls.right.isDown) {
			this.player.x += this.player_speed;
			// screen wrap
			if (this.player.x > this.cameras.main.width) this.player.x = 0;
		}

		// check our cheezeburger cool time
        // spawn it if time is less than 1
		if (this.cheezeburger_cooltime > 0) {
			this.cheezeburger_cooltime--;
			if (this.cheezeburger_cooltime < 1) {
				this.spawnBurger();
			}
		}

        // check for collision with cheezeburger
		// (note, we aren't using physics here, just checking distance with pythagorean theorem)
		let cheezeburger_distance = Math.sqrt(
            // what's math.pow? power of function
            // pythagorean theorem: a^2 + b^2 = c^2
			Math.pow(this.player.x - this.cheezeburger.x, 2) + Math.pow(this.player.y - this.cheezeburger.y, 2)
		);

        // why 60? guessing at this distance cat and burger are touching.
		if (cheezeburger_distance < 60) this.eatBurger();
  	}

    //------------------- custom methods -------------------\\

    // handles "spawning" the burger
    spawnBurger()
    {
        // put the burger somweher random within camera bounds
        this.cheezeburger.x = Math.round(Math.random() * this.cameras.main.width);
        this.cheezeburger.y = Math.round(Math.random() * this.cameras.main.height);
    }

    // handles "eating" the burger
    eatBurger()
    {
        // update the score
        this.score++;

        // move the burger off-screen
        this.cheezeburger.x = -9999;

        // reset the cool time
        this.cheezeburger_cooltime = this.cheezeburger_cooldown;

        this.scoretext.setText("Score: "+this.score);
    }
}