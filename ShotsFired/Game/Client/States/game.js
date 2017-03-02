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

		// Difficulty.

		// Level.

		// Physics & Gravity.
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = 100;

		// Constants.

		// Variables.
	},

	preload: function () {

	},

	create: function () {
		// Game assets.
		this.background = this.add.sprite(0, 0, 'game_background');

        // Master font.
		this.font_style = {
		    font: "12px Arial",
		    fill: "#ffffff"
		};

		// Groups.
		this.players     = this.add.group();
		this.projectiles = this.add.group();

		// Variables.
		this.shotsFired = false;

		//  A single bullet that the tank will fire
		// this.bullet = this.add.sprite(0, 0, 'bullet');
		// this.bullet.exists = false;
		// this.physics.arcade.enable(this.bullet);

		// Test tank.
		var testTankData = {
			tankAsset:   'tank',
			turretAsset: 'turret',
			health:      100,
			armour:      100,
			fuel:        300
		};

        //move turret and gui into tank
		// First test tank.
		tankCreator = new TankCreator(this);
		this.testTank = tankCreator.createTank(400, 600, testTankData);
		tankTurret = new Turret(this, 400, 600 - 30, testTankData);
		this.testTank.tankTurret = tankTurret;
		tankGUI = new TankGUI(this, this.testTank.x, this.testTank.y, 'playerName', this.testTank.tankTurret.angle, this.testTank.power, testTankData);
		this.testTank.tankGUI = tankGUI;
		
		//this.tankGUI();

		this.players.add(this.testTank);

		// Second test tank.
		//this.testTank2 = tankCreator.createTank(300, 600, testTankData);
		//tankTurret2 = new Turret(this, 300, 600 - 30, testTankData);
		//this.testTank2.tankTurret = tankTurret2;
		//this.players.add(this.testTank2);

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
	    //this.powerText = this.textController(8, 8, 'Power: ' + this.testTank.power);
	    //this.angleText = this.textController(8, 32, 'Angle: ' + this.testTank.tankTurret.angle);
	    //this.fuelText = this.textController(8, 56, 'Fuel:' + this.testTank.fuel);
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
         
	    this.healthBarText = this.add.text(this.textGenerator(this.healthBar_val.x+20, this.healthBar_val.y+1, this.testTank.health + "/" + this.testTank.data.health, 'small'));
	    this.armourBarText = this.add.text(this.textGenerator(this.armourBar_val.x+20, this.armourBar_val.y+1, this.testTank.armour + "/" + this.testTank.data.armour, 'small'));
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
	//    this.playerNameText = this.add.text(this.testTank.x, this.testTank.y - 46, 'player name', font_style);
	//    this.playerNameText.anchor.setTo(0.5);
	//    this.tankVarText = this.add.text(this.testTank.x, this.testTank.y - 62, this.testTank.tankTurret.angle + ', ' + this.testTank.power, font_style);
	//    this.tankVarText.anchor.setTo(0.5);
	//},

	//updateTankGUI: function (power, angle) {
	//    this.tankVarText.text = angle + ", " + power;
	//},

	update: function () {
		if(this.fireButton.isDown && this.shotsFired == false){//need a timer for each turn -- 30 seconds should do
			// Test projectile data.
			var testProjectileData = {
				asset: 'bullet'
			};

			// Fire a bullet from the tank.
			this.testTank.launchProjectile(testProjectileData);
			this.shotsFired = true;
			console.log('Shots Fired');
			//TODO: Text controller.
			this.readyText.text = 'Ready?: ' + this.shotsFired;

		}
		else if(!this.shotsFired){
			// Player can only change the angle and power before shooting. Not during and not after
			if(this.powerUp.isDown && this.testTank.power < 500){
				this.testTank.adjustPower(1);
				console.log('increase power');
				//this.powerText.text = 'Power: ' + this.testTank.power;
				//this.updateTankGUI(this.testTank.power, null);
			}
			else if(this.powerDown.isDown && this.testTank.power > 100){
				this.testTank.adjustPower(-1);
				console.log('decrease power');
				//this.powerText.text = 'Power: ' + this.testTank.power;
			}

			if(this.angleLeft.isDown && this.testTank.tankTurret.angle > -180){
				this.testTank.rotateTurret(-1);
				console.log('Angle left');
				//this.angleText.text = 'Angle: ' + (this.testTank.tankTurret.angle).toFixed();
			}
			else if(this.angleRight.isDown && this.testTank.tankTurret.angle < 180){
				this.testTank.rotateTurret(1);
				console.log('Angle right');
                
				//this.angleText.text = 'Angle: ' + (this.testTank.tankTurret.angle).toFixed();
			}

			// Fuel logic.
			if(this.testTank.fuel>0){
				// Only when projectile isn't active and when you have fuel
				if (this.moveLeft.isDown && this.testTank.x >20)
				{
					// Move the tank to the left.
					this.testTank.movement(-1);
					console.log('Move left');

					// Take a unit from the fuel.
					//TODO: Move this duplicated functionality to a generic function.
					this.testTank.fuel--;
					//this.fuelText.text = 'Fuel: ' + this.testTank.fuel;
				}
				else if (this.moveRight.isDown && this.testTank.x < this.game.width-40)
				{
					// Move the tank to the right.
					this.testTank.movement(1);
					console.log('Move right');

					// Take a unit from the fuel.
					//TODO: Move this duplicated functionality to a generic function.
					this.testTank.fuel--;
					//this.fuelText.text = 'Fuel: ' + this.testTank.fuel;
				}
			}
			this.testTank.tankGUI.updateAngleText(this.testTank.power, this.testTank.tankTurret.angle);
		    //this.updateTankGUI(this.testTank.power, this.testTank.tankTurret.angle);
		}

		// Collision detection?


	}

	//turnReset
	//fuel...

};


