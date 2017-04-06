/// <reference path="../Lib/phaser.min.js" />
var Lobby = {
	create: function () {
		// Set menu background (using menu layout for now)
		this.background = this.add.sprite(0, 0, 'menu_bg');

		this.stage.disableVisibilityChange = true;

		this.lobbyLeftXPos = 50;
		this.lobbyCentreXPos = 200;
		this.lobbyRightXPos = 550;

	    // Title image.
		this.title = game.add.text(this.lobbyLeftXPos, 50, "Lobby", { font: "50px Arial", fill: "#000000", align: "center" });

		this.lobbyYPos = this.title.bottom + 25;


		this.createGUI();

        //MALCOLM -- Why is this button needed? doesn't seem to do anything? Also erases this.join?
		// This is here just so we can access the game before lobby and hosting functionality are totally done.
		//this.join = this.add.button(this.game.width / 4 - 50, this.game.height / 1.2, 'btn_play', this.play, this);
		this.connectToServer();
	},

    // Connect to the server 
	connectToServer: function () {


	    // Connect with signalR.
	    this.gameHub = $.connection.gameHub;
	    this.eventHub = $.connection.eventHub;

	    this.setupCallbackFunctions();
	    var _this = this;

	    $.connection.hub.start().done(function () {
	        //TODO: Add username passing from a selection screen.
	        _this.gameHub.server.addPlayerToServerList(null);
	    });
	},

	createGUI: function () {
	    
	    //setting button

	    //TODO: Music. got some music - need a button and looping
	    this.lobbyMusic = game.add.audio('aud_lobbyMusic');
	    this.lobbyMusic.play();
	    this.lobbyMusic.volume = 0.1
	    this.lobbyMusic.mute = true;//temporary till i can fix
	    // Buttons
	    this.hostButton = this.add.button(this.lobbyLeftXPos, this.title.height + 100, 'btn_host', this.host, this);
	    this.joinButton = this.add.button(this.lobbyLeftXPos, this.title.height + 200, 'btn_join', this.join, this);
	    this.customButton = this.add.button(this.lobbyLeftXPos, this.title.height + 400, 'btn_join', this.customization, this);
	    //i want to use the text class i found on the internet (we will need to ask if allowed) and reference it properly
	    //http://codepen.io/jdnichollsc/pen/waVMdB?editors=001
	    //http://www.html5gamedevs.com/topic/16672-input-type-text-in-canvas-with-phaser-and-canvasinput-d/
	    //this.enterButton = this.add.button(this.title.x, this.title.height + 200, 'btn_Health', this.join, this);
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
	    //need to pause music (stop)
	    this.lobbyMusic.mute = true;

		this.state.start("Game");
	},

	customization: function(){
	    this.state.start("Customization");
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

        //eventually this will show: Player Name | Team | Tank Image | Ready?
		// Add the title.
		this.lobbyTitle = game.add.text(this.lobbyCentreXPos, this.lobbyYPos, "Game Lobby: " + gameInstance.InstanceId, { font: "22px Arial", fill: '#000000'});
		this.currentLobbyUsers = [];
		var titlePosX   = this.lobbyTitle.x;
		var titlePosY   = this.lobbyTitle.y;

		// Reference for this.
		_this = this;
		gameInstance.Players.forEach(function(player, index)
		{
			// Create lobby text for each player.
		    var text = game.add.text(titlePosX, titlePosY + 50, player.PlayerId + ": " + player.Username, { font: "15px Arial", fill: '#000000' });
			text.playerId = player.PlayerId;
			_this.currentLobbyUsers.push(text);
			titlePosY += 30;
		});

        //need to show the setting for the lobby
		this.displayLobbySettingsInformation();

		this.add.button(this.lobbyRightXPos, this.game.height -100, 'btn_ready', this.ready, _this);

		this.lobbyDisplayed = true;
	},

	displayLobbySettingsInformation: function () {
        // Clear existing lobby information.
		//if (this.lobbySettingsDisplayed) {
		//	this.lobbyTitle.destroy();
		//	this.currentLobbyUsers.forEach(function(text)
		//	{
		//		text.destroy();
		//	});
		//	this.lobbySettingsDisplayed = false;
	    //}

	    var spacer = 15;

	    //Add the settings Title
	    this.lobbySettingsTitle = game.add.text(this.lobbyRightXPos, this.lobbyYPos, "Game Settings", { font: "22px Arial", fill: '#000000' });
	    //items,shot tracer, mod, hp, wind, shot type, turn time, map
        //make a json fiel for this as its awful to look at
	    this.mapText = game.add.text(this.lobbyRightXPos, this.lobbySettingsTitle.bottom + spacer, "Map", { font: "12px Arial", fill: '#000000' });
	    //this.mapButtonLeft = this.add.button(this.lobbyLeftXPos, this.title.height + 100, 'btn_host', this.host, this);
	    //this.mapButtonLeft = this.add.button(this.lobbyLeftXPos, this.title.height + 100, 'btn_host', this.host, this);
	    //this.mapButtonLeft = this.add.button(this.lobbyLeftXPos, this.title.height + 100, 'btn_host', this.host, this);
        //< Map Name >
	    this.gameTypeText = game.add.text(this.lobbyRightXPos, this.mapText.bottom + spacer, "Game Type", { font: "12px Arial", fill: '#000000' });
        //< Gamt Type >
	    this.playerCountText = game.add.text(this.lobbyRightXPos, this.gameTypeText.bottom + spacer, "No. Of Players", { font: "12px Arial", fill: '#000000' });
        //enter number, default 4
	    this.healthPointsText = game.add.text(this.lobbyRightXPos, this.playerCountText.bottom + spacer, "HP", { font: "12px Arial", fill: '#000000' });
        //enter number, default 100
	    this.windText = game.add.text(this.lobbyRightXPos, this.healthPointsText.bottom + spacer, "Wind", { font: "12px Arial", fill: '#000000' });
        //radio
	    this.friendlyFireText = game.add.text(this.lobbyRightXPos, this.windText.bottom + spacer, "Friendly Fire", { font: "12px Arial", fill: '#000000' });
        //radio
	    this.turnTimeText = game.add.text(this.lobbyRightXPos, this.friendlyFireText.bottom + spacer, "Turn Timer Length", { font: "12px Arial", fill: '#000000' });
        //enter number, default 45, show in minutes, seconds
	    this.shotTracerText = game.add.text(this.lobbyRightXPos, this.turnTimeText.bottom + spacer, "Shot Tracer", { font: "12px Arial", fill: '#000000' });
        //radio
	    this.itemsText = game.add.text(this.lobbyRightXPos, this.shotTracerText.bottom + spacer, "Items", { font: "12px Arial", fill: '#000000' });
        //radio

	    //JSON file setup, obv wouldn't look like this but some would have buttons and some would not.
        //things like map selection would link to other arrays in the file
	    /*
            id: turnTimer,
            text: TurnTimerLength,
            style: {...},
            input:radio / text / button
            leftButton: null,
            rightButton: null,
            linkedArray: la de da,
            default: 45 //in seconds,
            max: 600
        */

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