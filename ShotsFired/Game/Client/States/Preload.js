var Preload = {
	preload: function () {
		// Display loading bar here, centre screen and fairly visible
		
		//Directory Shortcuts
		var IMG_DIR = "Game/Client/assets/images/";
		var BTN_DIR = IMG_DIR + "buttons/";
		var SPT_DIR = IMG_DIR + "sprites/";
		var AUD_DIR = "Game/Client/assets/audio/";
		var DAT_DIR = "Game/Client/assets/data/";
		var FNT_DIR = "Game/Client/assets/fonts/";

		/* Images and Sprites
		Smoke
		Explosion
		Cloud
		Tree
		Bullet
		*/

		// Aesthetics
		this.load.image('game_background', SPT_DIR + 'temp_background.png');
		this.load.image('menu_background', SPT_DIR + 'menu_background.png');
		this.load.image('title', SPT_DIR + 'menu_title.png');

		// Tank
		this.load.image('turret', SPT_DIR + 'tank_turret.png');
		this.load.image('tank', SPT_DIR + 'tank_body.png');
		//smoke stuff? animations?

		// Weapons
		this.load.image('bullet', SPT_DIR + 'bullet.png');

		// Buttons
		this.load.image('btnHealth', BTN_DIR + 'healthTile.png');
		this.load.image('btnArmour', BTN_DIR + 'armourTile.png');
		this.load.image('btnWeapons', BTN_DIR + 'weaponsTile.png');
		this.load.image('play_button', BTN_DIR + 'play_button.png');
		this.load.image('ready_button', SPT_DIR + 'ready.png');
		this.load.image('host', SPT_DIR + 'host.png');
		this.load.image('join', SPT_DIR + 'join.png');

		// Audio

		// Data

		// Font
	},

	create: function() {
		this.state.start('Menu', true, false);
	}
};
