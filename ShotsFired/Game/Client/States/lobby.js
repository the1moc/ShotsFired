/// <reference path="../Lib/phaser.min.js" />
var Lobby = {
	create: function () {
		// Set menu background (using menu layout for now)
		this.background = this.add.sprite(0, 0, 'menu_background');

		// Title image.
		this.title = game.add.text(this.game.width / 5, this.game.height / 5, "Lobby", { font: "50px Arial", fill: "#000000", align: "center" });

		//TODO: Music.

		// Buttons.
		this.host = this.add.button(this.game.width / 4 - 50, this.game.height / 3, 'host', this.host, this);
		this.join = this.add.button(this.game.width / 4 - 50, this.game.height / 2.3, 'join', this.join, this);

		// This is here just so we can access the game before lobby and hosting functionality are totally done.
		this.join = this.add.button(this.game.width / 4 - 50, this.game.height / 1.2, 'play_button', this.play, this);
		this.connectToServer();
	},

	// Host a new instance of a game.
	host: function()
	{
		this.gameHub.server.hostGame(this.playerId);
	},

	// Join a pre-existing game CHANGE THIS 
	join: function()
	{
		this.lobbySelection = function(char)
		{
			if (!isNaN(parseInt(char))) {
				this.gameHub.server.joinGame(char, this.playerId);
			}
		};

		game.input.keyboard.addCallbacks(this, null, null, this.lobbySelection);
		alert("Select a number to join that lobby (TEMPORARY QUICK METHOD)");
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
		this.setupLobbyCallbackFunctions();
		var _this = this;

		$.connection.hub.start().done(function()
		{
			//TODO: Add username passing from a selection screen.
			_this.gameHub.server.connectToServer(null);
		});
	},

	// All callback functions for the hosting, joining and starting of a game instance.
	setupLobbyCallbackFunctions: function()
	{
		// Keep reference to this.
		var _this = this;

		// On successful connection to the server and adding to the player base.
		this.gameHub.client.connectPlayerSuccess = function(player)
		{
			// TODO: Make this better.
			_this.playerId = player.PlayerId;
			_this.username = player.Username;
			console.log("You have connected to the server.");
		}

		// On success when trying to host a game;
		this.gameHub.client.gameHostSuccess = function(gameInstance)
		{
			_this.displayLobbyInformation(gameInstance);
			console.log("You have just hosted game instance: " + gameInstance.InstanceId);
		}

		// On success when trying to join a game.
		this.gameHub.client.gameJoinSuccess = function(gameInstance)
		{
			_this.displayLobbyInformation(gameInstance);
			console.log("You have joined game instance: " + gameInstance.InstanceId);
		}

		// On return of setting the player state to ready.
		this.gameHub.client.setReady = function(playerId)
		{
			_this.playerReady(playerId);
		}

		// On return of setting the player state to ready.
		this.gameHub.client.startGame = function(game)
		{
			
		}
		//TODO: Failed host game.
		//TODO: Failed join game.
		//TODO: Disconnect from game.
	},

	// Show the current lobby information you are in.
	// ugly function, 
	displayLobbyInformation: function(gameInstance)
	{
		// Clear existing lobby information.
		if (this.lobbyDisplayed) {
			this.lobbyTitle.destroy();
			this.currentLobbyUsers.forEach(function(text)
			{
				text.destroy();
			});
			this.lobbyDisplayed = false;
		}

		// Add the title.
		this.lobbyTitle = game.add.text(500, 100, "Game Lobby: " + gameInstance.InstanceId, { font: "32px Arial", fill: '#000000', backgroundColor: "#FFFFFF" });
		this.currentLobbyUsers = [];
		var titlePosX   = this.lobbyTitle.x;
		var titlePosY   = this.lobbyTitle.y;

		// Reference for this.
		_this = this;
		gameInstance.Players.forEach(function(player, index)
		{
			// Create lobby text for each player.
			var text = game.add.text(titlePosX, titlePosY + 50, player.PlayerId + ": " + player.Username, { font: "20px Arial", fill: '#000000', backgroundColor: '#FFFFFF' });
			text.playerId = player.PlayerId;
			_this.currentLobbyUsers.push(text);
			titlePosY += 30;
		});

		this.add.button(this.lobbyTitle.x, this.game.height / 1.2, 'ready_button', this.ready, _this);

		this.lobbyDisplayed = true;
	},

	// Tell the server this player is ready.
	ready: function()
	{
		this.gameHub.server.ready(this.playerId);
	},

	// Tell the server this player is ready.
	playerReady: function(playerId)
	{
		var _this = this;
		this.currentLobbyUsers.find(function(player)
		{
			return player.playerId == playerId;
		}).addColor("#00FF00", 0);

		// Inform the server this player is ready, and check if all others are.
	}
};