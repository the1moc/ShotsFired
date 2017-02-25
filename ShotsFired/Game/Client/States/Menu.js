var Tanks = Tanks || {};

Tanks.Menu = {

	preload: function () {
		//?
	},

	create: function () {
		// Set menu background.
		this.background = this.add.sprite(0, 0, 'menu_background');

		// Title image.
		this.title = this.add.sprite(this.game.width / 2, this.game.height / 2, 'title');
		this.title.anchor.setTo(0.5, 0.5);

		//TODO: Music.


		// Buttons.
		this.button1 = this.add.button(this.game.width / 2 - 50, this.game.height / 1.7, 'play_button', this.play, this, 2, 1, 0);
	},

	play: function()
	{
		this.state.start("Game");
	}
};