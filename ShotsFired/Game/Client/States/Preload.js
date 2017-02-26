var Preload = {
	preload: function () {
		// Display loading bar here, centre screen and fairly visible
		var SPT_DIR = "Game/Client/assets/sprites/";
		var IMG_DIR = "Game/Client/assets/images/";
		var BTN_DIR = IMG_DIR + "buttons/";
		var AUD_DIR = "Client/assets/audio/";
		var DAT_DIR = "Client/assets/data/";
		var FNT_DIR = "Client/assets/fonts/";

		/* Images and Sprites
		Smoke
		Explosion
		Cloud
		Tree
		Bullet
		*/

		this.load.image('turret', SPT_DIR + 'tank_turret.png');
		this.load.image('tank', SPT_DIR + 'tank_body.png');
		this.load.image('game_background', SPT_DIR + 'temp_background.png');
		this.load.image('menu_background', SPT_DIR + 'menu_background.png');
		this.load.image('bullet', SPT_DIR + 'bullet.png');
		this.load.image('title', SPT_DIR + 'menu_title.png');
		this.load.image('play_button', SPT_DIR + 'play_button.png');
		this.load.image('host', SPT_DIR + 'host.png');
		this.load.image('join', SPT_DIR + 'join.png');

		// Buttons

		// Audio

		// Data
	},

	create: function() {
		this.state.start('Menu', true, false);
	}
};
