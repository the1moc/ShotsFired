
var Menu = {

	preload: function () {
		//?
	},

	create: function () {
		// Set menu background.
		//this.background = this.add.sprite(0, 0, 'menu_bg');
	    this.background = this.add.sprite(0, 0, 'menu_bg2');
	    var bgScale = 600.0 / 1080;
	    this.background.scale.setTo(1, bgScale);

		// Title image.
		//this.title = this.add.sprite(this.game.width / 2, this.game.height / 2, 'title');
		//this.title.anchor.setTo(0.5, 0.5);

		this.menuTitle = game.add.text(this.game.width / 2, this.game.height / 2, "Shots Fired!", { font: "50px Arial", fill: "#000000", align: "center" });
		this.menuTitle.anchor.setTo(0.5, 0.5);

		this.playButton = this.add.button(this.game.width / 2, this.menuTitle.bottom + 40, 'btnUP', this.play, this, 2, 1, 0);
		
		this.playLabel = this.add.text(-20, -13, "Play", stylePicker(5));
		this.playButton.addChild(this.playLabel);
		this.playButton.anchor.setTo(0.5,0.5);

	    //TODO: Music.

		// Buttons.
		//this.button1 = this.add.button(this.game.width / 2 - 50, this.game.height / 1.7, 'btn_play', this.play, this, 2, 1, 0);
	},

	play: function()
	{
		this.state.start("Lobby");
	}
};