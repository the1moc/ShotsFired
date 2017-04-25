/// <reference path="../Lib/phaser.min.js" />
var Lobby = {
    create: function()
    {
        // Set menu background (using menu layout for now)
        //this.background = this.add.sprite(0, 0, 'menu_bg');
        this.background = this.add.sprite(0, 0, 'menu_bg2');
        var bgScale = 600.0 / 1080;
        this.background.scale.setTo(1, bgScale);


        this.stage.disableVisibilityChange = true;

        this.lobbyLeftXPos = 100;
        this.lobbyCentreXPos = 240;
        this.lobbyRightXPos = 500;
        this.lobbyYPos = 162;
        // Title image.
        this.lobbyTitle = game.add.text(this.game.width / 2, 40, "Shots Fired!", { font: "50px Arial", fill: "#000000", align: "center" });
        this.lobbyTitle.anchor.setTo(0.5, 0.5);
        this.lobbySubTitle = game.add.text(this.game.width / 2, this.lobbyTitle.bottom + 15, "Main Menu", { font: "20px Arial", fill: "#000000", align: "center" });
        this.lobbySubTitle.anchor.setTo(0.5, 0.5);
        //declare default values for some variables
        this.gameType = 'FFA';
        this.playerCount = 4;
        this.healthPoints = 100;
        this.wind = false;
        this.turnLength = 45;
        this.shotTracer = true;
        this.items = false;

        this.createGUI();

        if (this.connected) {
            this.gameHub.server.returnGameInstanceToClient();
            return;
        }

        this.connectToServer();
    },

    // Connect to the server 
    connectToServer: function()
    {
        // Connect with signalR.
        this.gameHub = $.connection.gameHub;
        this.eventHub = $.connection.eventHub;

        this.setupCallbackFunctions();
        var _this = this;

        $.connection.hub.start().done(function()
        {
            _this.connected = true;
            //TODO: Add username passing from a selection screen.
            _this.gameHub.server.addPlayerToServerList(null);
        });
    },

    //stylePicker: function(i){
    //    var style;
    //    switch (i) {
    //        case 1: style = { font: "20px Arial", fill: "#000000", align: "center" };
    //            break;
    //        case 2: style = { font: "12px Arial", fill: "#000000", align: "center" };
    //            break;
    //    }

    //    return style;
    //},

    createGUI: function()
    {
        //create background UI
        var ex = 80; var ey = 100; this.rows = 10;
        var top = this.add.sprite(ex, ey, 'lrgBanner_top');
        for (var i = 0; i < this.rows; i++) {
            var row = this.add.sprite(ex, top.bottom + 32 * i, 'lrgBanner_row');
        }
        this.bottomBG = this.add.sprite(ex, top.bottom + 32 * this.rows, 'lrgBanner_bottom');
        
        //TODO: Music. got some music - need a button and looping
        this.lobbyMusic = game.add.audio('aud_lobbyMusic');
        this.lobbyMusic.play();
        this.lobbyMusic.volume = 0.1
        this.lobbyMusic.mute = true;//temporary till i can fix

        // Buttons
        this.firingRangeButton = this.add.button(this.lobbyLeftXPos, this.lobbyTitle.height + 100, 'btnUP', this.host, this);
        this.firingRangeLabel = this.add.text(22, 0, "Range", stylePicker(1));
        this.firingRangeButton.addChild(this.firingRangeLabel);
        this.hostButton = this.add.button(this.lobbyLeftXPos, this.firingRangeButton.bottom + 20, 'btnUP', this.host, this);
        this.hostLabel = this.add.text(30, 0, "Host", stylePicker(1));
        this.hostButton.addChild(this.hostLabel);
        this.joinButton = this.add.button(this.lobbyLeftXPos, this.hostButton.bottom + 20, 'btnUP', this.join, this);
        this.joinLabel = this.add.text(30, 0, "Join", stylePicker(1));
        this.joinButton.addChild(this.joinLabel);
        this.customButton = this.add.button(this.lobbyLeftXPos, this.bottomBG.top - 10, 'btnUP', this.customization, this);
        this.customLabel = this.add.text(10, 5, "Customization", stylePicker(2));//change to options?
        this.customButton.addChild(this.customLabel);

        //divider
        var divTop = this.add.sprite(this.firingRangeButton.right + 15, this.firingRangeButton.y-5, 'div_t');
        for (var i = 0; i < this.rows - 1; i++) {
            var divMid = this.add.sprite(divTop.x, divTop.bottom + 32*i, 'div_m');
        }
        var divBot = this.add.sprite(divTop.x, divMid.bottom, 'div_b');


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

    // Join a pre-existing game
    join: function()
    {
        this.lobbySelection = function(char)
        {
            if (!isNaN(parseInt(char))) {
                this.gameHub.server.joinGame(parseInt(char), this.playerId);
            }
        };

        game.input.keyboard.addCallbacks(this, null, null, this.lobbySelection);

        alert("Select a number to join that lobby (TEMPORARY QUICK METHOD)");
    },

    // Temporary play button to go to the game.
    play: function()
    {
        //need to pause music (stop)
        this.lobbyMusic.mute = true;

        this.state.start("Game");
    },

    customization: function()
    {
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

        // On return of setting the player state to ready.
        this.gameHub.client.customizationSaved = function()
        {
            alert("Choices saved");
            _this.state.start("Lobby");
        }

        // On all players being ready, fetch the lobby state.
        //TODO: tell ALL clients about this REMEMBER DO TO THIS
        this.gameHub.client.getLobbyState = function()
        {
            //TODO: Set the lobby data for each client.
            mockLobbyData = {
                map: 1,
                health: 100,
                wind: 1,
                turntimer: 100,
                shottracer: true,
                gravity: 100
            };
            _this.gameHub.server.beginGame(_this.playerId, mockLobbyData);
        }

        // Create callbacks for the playing game state.
        this.state.states.Game.createGameCallbackFunctions(this.gameHub);
        this.state.states.Game.createEventCallbackFunctions();
    },

    doT: function(){

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
        this.lobbyTitle = game.add.text(this.lobbyCentreXPos, this.lobbyYPos, "Game Lobby: " + gameInstance.InstanceId, { font: "22px Arial", fill: '#000000' });
        this.currentLobbyUsers = [];
        var titlePosX = this.lobbyTitle.x;
        var titlePosY = this.lobbyTitle.y;

        // Reference for this.
        _this = this;
        gameInstance.Players.forEach(function(player, index)
        {
            var initialDiv = this.lobbyYPos + 35;
            var well = game.add.sprite(titlePosX, titlePosY + 50, 'player_well');
            // Create lobby text for each player.
            //var text = game.add.text(titlePosX, titlePosY + 50, player.PlayerId + ": " + player.Username, { font: "15px Arial", fill: '#000000' });
            var text = game.add.text(50, 15, player.Username, { font: "15px Arial", fill: '#000000' });
            text.playerId = player.PlayerId;
            well.addChild(text);
            _this.currentLobbyUsers.push(text);
            titlePosY += 30;
        });

        //need to show the setting for the lobby
        this.displayLobbySettingsInformation();

        //this.add.button(this.lobbyRightXPos, this.game.height - 100, 'btn_ready', this.ready, _this);
        this.readyButton = this.add.button(this.settingsVariableX, this.bottomBG.bottom - 50, 'btnUP', this.ready, _this);
        this.readyLabel = this.add.text(22, 0, "Ready", stylePicker(1));
        this.readyButton.addChild(this.readyLabel);

        this.lobbyDisplayed = true;
    },

    displayLobbySettingsInformation: function()
    {
        // Clear existing lobby information.
        //if (this.lobbySettingsDisplayed) {
        //	this.lobbyTitle.destroy();
        //	this.currentLobbyUsers.forEach(function(text)
        //	{
        //		text.destroy();
        //	});
        //	this.lobbySettingsDisplayed = false;
        //}

        //divider
        var divTop = this.add.sprite(this.lobbyRightXPos - 25, this.firingRangeButton.y - 5, 'div_t');
        for (var i = 0; i < this.rows - 1; i++) {
            var divMid = this.add.sprite(divTop.x, divTop.bottom + 32 * i, 'div_m');
        }
        var divBot = this.add.sprite(divTop.x, divMid.bottom, 'div_b');

        //settings
        var spacer = 15;
        this.settingsLabelX = 500;
        this.settingsVariableX = 580;
        this.lobbySettingsTitle = game.add.text(this.lobbyRightXPos, this.lobbyYPos, "Settings", { font: "22px Arial", fill: '#000000' });
        //items,shot tracer, mode, hp, wind, shot type, turn time, map
        //make a json fiel for this as its awful to look at
        //this.mapText = game.add.text(this.lobbyRightXPos, this.lobbySettingsTitle.bottom + spacer, "Map", { font: "12px Arial", fill: '#000000' });
        //this.mapL = game.add.button(this.mapText.right + 5, this.mapText.top - 5, 'btnUP_l', this.doT);
        //this.mapChoice = game.add.sprite(this.mapL.right, this.mapText.top - 5, 'btnUP_m');
        //this.mapR = game.add.button(this.mapChoice.right, this.mapText.top - 5, 'btnUP_r', this.doT);

        this.gameTypeText = game.add.text(this.lobbyRightXPos, this.lobbySettingsTitle.bottom + spacer, "Game Type", { font: "12px Arial", fill: '#000000' });
        this.gTL = game.add.button(this.settingsVariableX, this.gameTypeText.top - 5, 'btnUP_l', this.doT);
        this.gTChoice = game.add.sprite(this.gTL.right, this.gameTypeText.top - 5, 'btnUP_m');
        this.gTR = game.add.button(this.gTChoice.right, this.gameTypeText.top - 5, 'btnUP_r', this.doT);
        this.gTLabel = game.add.text(0, 0, this.gameType, stylePicker(1));
        this.gTChoice.addChild(this.gTLabel);

        this.playerCountText = game.add.text(this.lobbyRightXPos, this.gameTypeText.bottom + spacer, "Players", { font: "12px Arial", fill: '#000000' });
        this.pCL = game.add.button(this.settingsVariableX, this.playerCountText.top - 5, 'btnUP_l', this.doT);
        this.pCChoice = game.add.sprite(this.pCL.right, this.playerCountText.top - 5, 'btnUP_m');
        this.pCR = game.add.button(this.pCChoice.right, this.playerCountText.top - 5, 'btnUP_r', this.doT);
        this.pCLabel = game.add.text(0, 0, this.playerCount, stylePicker(1));
        this.pCChoice.addChild(this.pCLabel);

        this.healthPointsText = game.add.text(this.lobbyRightXPos, this.playerCountText.bottom + spacer, "Health", { font: "12px Arial", fill: '#000000' });
        this.hPL = game.add.button(this.settingsVariableX, this.healthPointsText.top - 5, 'btnUP_l', this.doT);
        this.hPChoice = game.add.sprite(this.hPL.right, this.healthPointsText.top - 5, 'btnUP_m');
        this.hPR = game.add.button(this.hPChoice.right, this.healthPointsText.top - 5, 'btnUP_r', this.doT);
        this.hPLabel = game.add.text(0, 0, this.healthPoints, stylePicker(1));
        this.hPChoice.addChild(this.hPLabel);

        this.windText = game.add.text(this.lobbyRightXPos, this.healthPointsText.bottom + spacer, "Wind", { font: "12px Arial", fill: '#000000' });
        this.wL = game.add.button(this.settingsVariableX, this.windText.top - 5, 'btnUP_l', this.doT);
        this.wChoice = game.add.sprite(this.wL.right, this.windText.top - 5, 'btnUP_m');
        this.wR = game.add.button(this.wChoice.right, this.windText.top - 5, 'btnUP_r', this.doT);
        this.wLabel = game.add.text(0, 0, this.wind, stylePicker(1));
        this.wChoice.addChild(this.wLabel);
        

        this.turnTimeText = game.add.text(this.lobbyRightXPos, this.windText.bottom + spacer, "Turn Length", { font: "12px Arial", fill: '#000000' });
        this.tTL = game.add.button(this.settingsVariableX, this.turnTimeText.top - 5, 'btnUP_l', this.doT);
        this.tTChoice = game.add.sprite(this.tTL.right, this.turnTimeText.top - 5, 'btnUP_m');
        this.tTR = game.add.button(this.tTChoice.right, this.turnTimeText.top - 5, 'btnUP_r', this.doT);
        this.tTLabel = game.add.text(0, 0, this.turnLength, stylePicker(1));
        this.tTChoice.addChild(this.tTLabel);

        
        this.shotTracerText = game.add.text(this.lobbyRightXPos, this.turnTimeText.bottom + spacer, "Shot Tracer", { font: "12px Arial", fill: '#000000' });
        this.sTL = game.add.button(this.settingsVariableX, this.shotTracerText.top - 5, 'btnUP_l', this.doT);
        this.sTChoice = game.add.sprite(this.sTL.right, this.shotTracerText.top - 5, 'btnUP_m');
        this.sTR = game.add.button(this.sTChoice.right, this.shotTracerText.top - 5, 'btnUP_r', this.doT);
        this.sTLabel = game.add.text(0, 0, this.shotTracer, stylePicker(1));
        this.sTChoice.addChild(this.sTLabel);

        //radio
        this.itemsText = game.add.text(this.lobbyRightXPos, this.shotTracerText.bottom + spacer, "Items", { font: "12px Arial", fill: '#000000' });
        this.iL = game.add.button(this.settingsVariableX, this.itemsText.top - 5, 'btnUP_l', this.doT);
        this.iChoice = game.add.sprite(this.iL.right, this.itemsText.top - 5, 'btnUP_m');
        this.iR = game.add.button(this.iChoice.right, this.itemsText.top - 5, 'btnUP_r', this.doT);
        this.iLabel = game.add.text(0, 0, this.items, stylePicker(1));
        this.iChoice.addChild(this.iLabel);

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