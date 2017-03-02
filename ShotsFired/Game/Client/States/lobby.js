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
		this.gameHub.server.hostGame(this.playerId);
	},

	// Join a pre-existing game.
	join: function()
	{
		this.gameHub.server.joinGame(2, this.playerId);
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
		var _this = this;
		$.connection.hub.start().done(function()
		{
			//TODO: Add username passing from a selection screen.
			_this.gameHub.server.connectToServer(null);
		});
	},

	// All callback functions for the hosting, joining and starting of a game instance.
	lobbyCallbackFunctions: function()
	{
		// Keep reference to this.
		var _this = this;

		// On successful connection to the server and adding to the player base.
		this.gameHub.client.connectPlayerSuccess = function(playerId, username)
		{
			// TODO: Make this better.
			_this.playerId = playerId;
			_this.username = username;
			console.log("You have connected to the server.");
		}

		// On success when trying to host a game;
		this.gameHub.client.gameHostSuccess = function(gameInstanceId, playerIds, hostPlayerId)
		{
			_this.displayLobbyInformation(gameInstanceId, playerIds, hostPlayerId);
			console.log("You have just hosted game instance: " + gameInstanceId);
		}

		// On success when trying to join a game.
		this.gameHub.client.gameJoinSuccess = function(gameInstanceId, playerIds, hostPlayerId)
		{
			_this.displayLobbyInformation(gameInstanceId, playerIds, hostPlayerId);
			console.log("You have joined game instance: " + gameInstanceId);
		}
		//TODO: Failed host game.
		//TODO: Failed join game.
		//TODO: Disconnect from game.
	},

	// Show the current lobby information you are in.
	displayLobbyInformation: function(gameInstanceId, playerIds, hostPlayerId)
	{
		// Clear existing lobby information.
		if (this.lobbyDisplayed) {
			this.lobbyTitle.destroy();
			this.playerInformation.forEach(function(text)
			{
				text.destroy();
			});
			this.lobbyDisplayed = false;
		}

		this.lobbyTitle = game.add.text(500, 100, "Game Lobby: " + gameInstanceId, { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)' });
		this.playerInformation = [];
		var titlePosX   = this.lobbyTitle.x;
		var titlePosY   = this.lobbyTitle.y;

		// Reference for this.
		_this = this;
		playerIds.forEach(function(playerId)
		{
			console.log(playerId);
			_this.playerInformation.push(game.add.text(titlePosX, titlePosY + 50, "PlayerId: " + playerId, { font: "32px Arial", fill: '#ffffff', backgroundColor: 'rgba(0,255,0,0.25)' }));
			titlePosY += 50;
		});

		this.lobbyDisplayed = true;
	}
};