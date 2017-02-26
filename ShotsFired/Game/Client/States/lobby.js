var Lobby = {
	create: function () {
		// Set menu background (using menu layout for now)
		this.background = this.add.sprite(0, 0, 'menu_background');

		// Title image.
		this.title = game.add.text(this.game.width / 5, this.game.height / 5, "Lobby", { font: "50px Arial", fill: "#000000", align: "center" });

		//TODO: Music.

		// Buttons.
		this.host = this.add.button(this.game.width / 4 - 50, this.game.height / 2, 'host', this.host, this);
		this.join = this.add.button(this.game.width / 4 - 50, this.game.height / 1.5, 'join', this.join, this);

		// This is here just so we can access the game before lobby and hosting functionality are totally done.
		this.join = this.add.button(this.game.width / 4 - 50, this.game.height / 1.2, 'play_button', this.play, this);
		this.connectToServer();
	},

	// Host a new instance of a game.
	host: function()
	{
		this.gameHub.server.hostGame(1);
	},

	// Join a pre-existing game.
	join: function()
	{
		this.gameHub.server.joinGame(1, 1);
	},

	// Temporary play button to go to the game.
	play: function()
	{
		this.state.start("Game");
	},

	// Connect to the server.
	connectToServer: function()
	{
		// Connect with signalR.
		this.gameHub = $.connection.gameHub;
		this.lobbyCallbackFunctions();
		$.connection.hub.start();
	},

	// All callback functions for the hosting, joining and starting of a game instance.
	lobbyCallbackFunctions: function()
	{
		// On success when trying to host a game;
		this.gameHub.client.gameHostSuccess = function(gameInstanceId)
		{
			alert("You have just hosted game instance: " + gameInstanceId);
		}
		// On success when trying to join a game.
		this.gameHub.client.gameJoinSuccess = function(gameInstanceId)
		{
			alert("You have joined game instance: " + gameInstanceId);
		}
		//TODO: Failed host game
		//TODO: Failed join game
	}
};