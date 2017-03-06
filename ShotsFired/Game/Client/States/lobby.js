/// <reference path="../Lib/phaser.min.js" />
var Lobby = {
	create: function () {
		// Set menu background (using menu layout for now)
		this.background = this.add.sprite(0, 0, 'menu_background');

		this.stage.disableVisibilityChange = true;

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
		this.gameHub.server.joinGame(2, this.playerId);
		/*
		this.lobbySelection = function(char)
		{
			if (!isNaN(parseInt(char))) {
				this.gameHub.server.joinGame(char, this.playerId);
				game.input.keyboard.stop();
			}
		};

		game.input.keyboard.addCallbacks(this, null, null, this.lobbySelection);
		*/
		alert("Select a number to join that lobby (TEMPORARY QUICK METHOD)");
	},

	// Temporary play button to go to the game.
	play: function()
	{
		this.state.start("Game");
	},

	// Connect to the server 
	connectToServer: function()
	{
		// Connect with signalR.
		this.gameHub  = $.connection.gameHub;
		this.eventHub = $.connection.eventHub;

		this.setupCallbackFunctions();
		var _this = this;

		$.connection.hub.start().done(function()
		{
			//TODO: Add username passing from a selection screen.
			_this.gameHub.server.addPlayerToServerList(null);
		});
	},

	// All callback functions for the game.
	setupCallbackFunctions: function()
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
			_this.displayLobbyInformation(gameInstance, false);
			console.log("You have just hosted game instance: " + gameInstance.InstanceId);
		}

		// On success when trying to join a game.
		this.gameHub.client.gameJoinSuccess = function(gameInstance)
		{
			_this.displayLobbyInformation(gameInstance, false);
			console.log("You have joined game instance: " + gameInstance.InstanceId);
		}

		// On success when trying to join a game.
		this.gameHub.client.leaveLobbySuccess = function(player)
		{
			_this.displayLobbyInformation(gameInstance, false);
		}

		// On return of setting the player state to ready.
		this.gameHub.client.noGameFound = function()
		{
			alert("No game was found in that server slot.");
		}

		// On return of setting the player state to ready.
		this.gameHub.client.gameIsAlreadyRunning = function()
		{
			alert("That game is already running.");
		}

		// When the game has been closed.
		this.gameHub.client.gameClosed = function()
		{
			_this.displayLobbyInformation(null, true);
		}

		// On return of setting the player state to ready.
		this.gameHub.client.setReady = function(playerId)
		{
			_this.playerReady(playerId);
		}

		// On return of setting the player state to ready.
		this.gameHub.client.startGame = function(gameInstance)
		{
			_this.gameInstance = gameInstance;
			_this.state.start("Game");
		}

		// TODO: Probably a better way to do this.
		// Create callbacks for the playing game state.
		this.state.states.Game.createGameCallbackFunctions(this.gameHub);
		this.state.states.Game.createEventCallbackFunctions();
	},

	// Show the current lobby information you are in.
	// ugly function, 
	displayLobbyInformation: function(gameInstance, closed)
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

		if (closed) {
			return;
			alert("Lobby was closed due to host leaving");
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