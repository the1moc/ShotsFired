var Boot = {
	init: function () {
		// Background colour.
		this.game.stage.backgroundColor = '#FFFFFF';

		// Scaling options.
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Center the game horizontally.
		this.scale.pageAlignHorizontally=true;
		this.scale.pageAlignVertically = true;

		// Physics - P2 and Arcade
		this.game.physics.startSystem(Phaser.Physics.p2);

		// Stop the game from pausing.
		this.stage.disableVisibilityChange = false;

		// Setting minimum width and height.
		this.scale.minWidth = 270;
		this.scale.minHeight= 480;

		// Force landscape?
		//this.stage.forceLandscape = true;
	},

	preload: function () {
		// Loading bar to be added.
	},

	create: function () {
		// Start the preload state.
		this.state.start('Preload');
	}
};
