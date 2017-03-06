/// <reference path="../Lib/phaser.min.js" />
/*
Arcade Physics: Ship trail
follow for singleplayer
add targets for single player
menu: single player - vs ai or targets
	  multiplayer - host or join

 */
var Game = {
	init: function()
	{
		this.gameInstance = this.state.states.Lobby.gameInstance;
		this.playerId     = this.state.states.Lobby.playerId;

		// Difficulty.

		// Level.

		// Physics & Gravity.
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = this.gameInstance.World.Gravity;

		// Constants.

		// Variables.
	},

	preload: function () {

	},

	create: function()
	{
		// Game assets.
		this.background = this.add.sprite(0, 0, 'game_background');

		// Master font.
		this.font_style = {
			font: "12px Arial",
			fill: "#ffffff"
		};

		// Groups.
		this.players = this.add.group();
		this.players.enableBody = true;
		this.projectiles = this.add.group();

		// Variables.
		this.shotsFired = false;

		// Create the tanks.
		tankCreator = new TankCreator(this);
		_this = this;
		this.gameInstance.Players.forEach(function(player)
		{
			tank            = tankCreator.createTank(player.Tank, player.PlayerId);
			tankTurret      = new Turret(_this, 400, 600 - 30);
			tank.tankTurret = tankTurret;

			//TODO: This can be done inside the tank class, seeing as it is basically using all the data from it.
			tankGUI = new TankGUI(_this, tank.x, tank.y, 'playerName', tank.tankTurret.angle, tank.power, tank.health, tank.armour);
			tank.tankGUI = tankGUI;

			if (player.PlayerId == _this.playerId)
			{
				_this.playerTank = tank;
			}

			_this.players.add(tank);
		});

		// Buttons
		// Fire Controls
		this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		// this.fireButton.onDown.add(this.fire, this);

		// Angle controls.
		this.angleLeft = this.input.keyboard.addKey(Phaser.Keyboard.Q);
		// this.angleLeft.onDown.add(this.rotateTurret, this,0);
		this.angleRight = this.input.keyboard.addKey(Phaser.Keyboard.E);

		// Power controls.
		this.powerUp = this.input.keyboard.addKey(Phaser.Keyboard.W);
		this.powerDown = this.input.keyboard.addKey(Phaser.Keyboard.S);

		// Movement controls.
		this.moveLeft = this.input.keyboard.addKey(Phaser.Keyboard.A);
		this.moveRight = this.input.keyboard.addKey(Phaser.Keyboard.D);

		// Turn timer creation.
		this.turnTimer = this.game.time.create(false);

		// Create the GUI.
		this.createGUI();
	},

	//TODO: Create text controller.
	createGUI: function () {
		//this.turnTimerText = this.textController(400, 32, this.turnTimer);
		//this.powerText = this.textController(8, 8, 'Power: ' + this.playerTank.power);
		//this.angleText = this.textController(8, 32, 'Angle: ' + this.playerTank.tankTurret.angle);
		//this.fuelText = this.textController(8, 56, 'Fuel:' + this.playerTank.fuel);
		this.readyText = this.add.text(this.textGenerator(200, 16, 'Ready?: ' + this.shotsFired, 'body'));
		
		this.armourTile = this.add.sprite(10, 10, 'btnArmour');

		var aBMD_bg = game.add.bitmapData(100, 10);
		aBMD_bg.ctx.beginPath();
		aBMD_bg.ctx.rect(0, 0, 180, 30);
		aBMD_bg.ctx.fillStyle = '#1C0772';
		aBMD_bg.ctx.fill();

		var aBMD = game.add.bitmapData(30, 10);
		aBMD.ctx.beginPath();
		aBMD.ctx.rect(0, 0, 180, 30);
		aBMD.ctx.fillStyle = '#4188D2';
		aBMD.ctx.fill();

		this.healthTile = this.add.sprite(10, 60, 'btnHealth');

		var hBMD_bg = game.add.bitmapData(100, 10);
		hBMD_bg.ctx.beginPath();
		hBMD_bg.ctx.rect(0, 0, 180, 30);
		hBMD_bg.ctx.fillStyle = '#A61000';
		hBMD_bg.ctx.fill();

		var hBMD = game.add.bitmapData(80, 10);
		hBMD.ctx.beginPath();
		hBMD.ctx.rect(0, 0, 180, 30);
		hBMD.ctx.fillStyle = '#FF1300';
		hBMD.ctx.fill();

		this.healthBar_bg = game.add.sprite(this.healthTile.x + 50, this.healthTile.y + 15, hBMD_bg);
		this.healthBar_val = game.add.sprite(this.healthTile.x + 50, this.healthTile.y + 15, hBMD);
		this.armourBar_bg = game.add.sprite(this.armourTile.x + 50, this.armourTile.y + 15, aBMD_bg);
		this.armourBar_val = game.add.sprite(this.armourTile.x + 50, this.armourTile.y + 15, aBMD);

		this.healthTile = this.add.sprite(10, 110, 'btnWeapons');
		 
		this.healthBarText = this.add.text(this.textGenerator(this.healthBar_val.x+20, this.healthBar_val.y+1, this.playerTank.health + "/" + this.playerTank.data.health, 'small'));
		this.armourBarText = this.add.text(this.textGenerator(this.armourBar_val.x+20, this.armourBar_val.y+1, this.playerTank.armour + "/" + this.playerTank.data.armour, 'small'));
	},

	textGenerator: function (x, y, input, type) {
		switch (type) {
			case 'small':
				this.font_style = {
					font: "8px Arial",
					fill: "#ffffff"
				};
				break;
			case 'body':
				this.font_style = {
					font: "12px Arial",
					fill: "#ffffff"
				};
				break;
			case 'title':
				this.font_style = {
					font: "18px Arial",
					fill: "#ffffff"
				};
				break;
		}
		var text = this.add.text(x, y, input, this.font_style);
		text.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
		return text;
		
	},

	//not sure but this could be added to the tank composite?
	//createTankGUI: function () {
	//    var font_style = {
	//        font: "12px Arial",
	//        fill: "#ffffff"
	//    };
	//    this.playerNameText = this.add.text(this.playerTank.x, this.playerTank.y - 46, 'player name', font_style);
	//    this.playerNameText.anchor.setTo(0.5);
	//    this.tankVarText = this.add.text(this.playerTank.x, this.playerTank.y - 62, this.playerTank.tankTurret.angle + ', ' + this.playerTank.power, font_style);
	//    this.tankVarText.anchor.setTo(0.5);
	//},

	update: function () {
		if(this.fireButton.isDown && this.shotsFired == false){//need a timer for each turn -- 30 seconds should do
			// Fire a bullet from the tank.
			this.playerTank.launchProjectile("bullet");
			this.shotsFired = true;
			this.eventHub.server.launchProjectile(this.playerTank.playerId);
			console.log('Shots Fired');
			//TODO: Text controller.
			this.readyText.text = 'Ready?: ' + this.shotsFired;

		}
		else if(!this.shotsFired){
			// Player can only change the angle and power before shooting. Not during and not after
			if(this.powerUp.isDown && this.playerTank.power < 500){
				this.playerTank.adjustPower(1);
				this.eventHub.server.increasePower(this.playerTank.playerId);
				console.log('increase power');
				//this.powerText.text = 'Power: ' + this.playerTank.power;
				//this.updateTankGUI(this.playerTank.power, null);
			}
			else if(this.powerDown.isDown && this.playerTank.power > 100){
				this.playerTank.adjustPower(-1);
				this.eventHub.server.decreasePower(this.playerTank.playerId);
				console.log('decrease power');
				//this.powerText.text = 'Power: ' + this.playerTank.power;
			}

			if(this.angleLeft.isDown && this.playerTank.tankTurret.angle > -180){
				this.playerTank.rotateTurret(-1);
				this.eventHub.server.rotateLeft(this.playerTank.playerId);
			}
			else if(this.angleRight.isDown && this.playerTank.tankTurret.angle < 180){
				this.playerTank.rotateTurret(1);
				this.eventHub.server.rotateRight(this.playerTank.playerId);
			}

			// Fuel logic.
			if(this.playerTank.fuel>0){
				// Only when projectile isn't active and when you have fuel
				if (this.moveLeft.isDown && this.playerTank.x >20)
				{
					// Move the tank to the left.
					this.playerTank.movement(-1);
					this.eventHub.server.moveLeft(this.playerTank.playerId);

					// Take a unit from the fuel.
					//TODO: Move this duplicated functionality to a generic function.
					this.playerTank.fuel--;
					//this.fuelText.text = 'Fuel: ' + this.playerTank.fuel;
				}
				else if (this.moveRight.isDown && this.playerTank.x < this.game.width-40)
				{
					// Move the tank to the right.
					this.playerTank.movement(1);
					this.eventHub.server.moveRight(this.playerTank.playerId);

					// Take a unit from the fuel.
					//TODO: Move this duplicated functionality to a generic function.
					this.playerTank.fuel--;
					//this.fuelText.text = 'Fuel: ' + this.playerTank.fuel;
				}
			}
			this.playerTank.tankGUI.updateAngleText(this.playerTank.power, this.playerTank.tankTurret.angle);
			//this.updateTankGUI(this.playerTank.power, this.playerTank.tankTurret.angle);
		}

		// Collision detection?


	},

	// Callback functions called from the GameHub during the game state..
	createGameCallbackFunctions: function(gameHub)
	{
		this.gameHub = gameHub;
		_this = this;

		// On success of leaving a currently active game
		this.gameHub.client.leaveGameSuccess = function(playerId)
		{
			console.log("Player has left the game! " + playerId);
			var playerToRemoveIndex = _this.gameInstance.Players.findIndex(function(player)
			{
				return player.playerId == playerId
			});

			_this.gameInstance.Players.splice(playerToRemoveIndex, 1);
		}
	},

	// Callback functions called from the EventHub during the game state.
	createEventCallbackFunctions: function(eventHub)
	{
		this.eventHub = $.connection.eventHub;
		_this         = this;

		// Player moves left.
		this.eventHub.client.left = function(playerId)
		{
			_this.players.filter(function(tank)
			{
				return tank.playerId == playerId
			}).first.movement(-1);
		}

		// Players moves right.
		this.eventHub.client.right = function(playerId)
		{
			_this.players.filter(function(tank)
			{
				return tank.playerId == playerId
			}).first.movement(1);
		}

		// Players turret angles left.
		this.eventHub.client.rotateLeft = function(playerId)
		{
			_this.players.filter(function(tank)
			{
				return tank.playerId == playerId
			}).first.rotateTurret(-1);
		}

		// Players turrent angles right.
		this.eventHub.client.rotateRight = function(playerId)
		{
			_this.players.filter(function(tank)
			{
				return tank.playerId == playerId
			}).first.rotateTurret(1);
		}

		// Increase the power of a player tank.
		this.eventHub.client.increasePower = function(playerId)
		{
			_this.players.filter(function(tank)
			{
				return tank.playerId == playerId
			}).first.adjustPower(1);
		}

		// Decrease the power of a player tank.
		this.eventHub.client.decreasePower = function(playerId)
		{
			_this.players.filter(function(tank)
			{
				return tank.playerId == playerId
			}).first.adjustPower(-1);
		}

		// Launch a projectile from a tank.
		this.eventHub.client.launchProjectile = function(playerId)
		{
			_this.players.filter(function(tank)
			{
				return tank.playerId == playerId
			}).first.launchProjectile("bullet");
		}
	}
};


