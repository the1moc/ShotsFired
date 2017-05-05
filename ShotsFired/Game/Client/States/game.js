/// <reference path="../Lib/phaser.min.js" />
/*
Arcade Physics: Ship trail
Add options for firing styles
- explosive (firework)
- bounce (can collide a certain number of times)

Pass in to game init:
- asset of shot
- colour of tank parts(body turret,treads)
- armour for players tank (armour)
- health for players tank
- number of shots (barrell)
- accuracy (precision)
- fuel economy (treads)
- the turn time length

 */
var Game = {
    init: function()
    {
        this.gameInstance = this.state.states.Lobby.gameInstance;
        this.playerId = this.state.states.Lobby.playerId;

        // Map.
        this.map = this.gameInstance.World.Map;

        // Physics & Gravity.
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = this.gameInstance.World.Gravity;

        // Variables.
        this.playerHealth = this.gameInstance.World.Health;
        this.playerFuel = this.gameInstance.World.Fuel;
    }, 

    create: function()
    {
        //random game bg
        var noOfBgs = 2;
        var selectedBG = Math.floor(Math.random() * noOfBgs)+1;
        console.log(selectedBG);
        this.background = this.add.sprite(0, 0, 'game_bg' + selectedBG);
        var bgScale = 600.0 / 1080;
        this.background.scale.setTo(1, bgScale);

        //constants
        this.TANK_WIDTH = 29;
        this.TANK_HEIGHT = 19;
        this.TANK_MIDDLE = Math.round(this.TANK_WIDTH / 2);
        this.TURRET_WIDTH = 15;
        this.TURRET_HEIGHT = 5;
        this.TURN_TIME = Phaser.Timer.SECOND * 300;
        this.COLLISION_DELAY = 1000;
        this.DAMAGEMIN = 30;
        this.DAMAGEMAX = 40;
        this.STATBARWIDTH = 100;

        // Master fonts. change all to stylepciker
        this.tiny_style = { font: "8px Arial", fill: "#ffffff" };
        this.small_style = { font: "12px Arial", fill: "#ffffff" };
        this.body_style = { font: "12px Arial", fill: "#ffffff" };
        this.title_style = { font: "12px Arial", fill: "#ffffff" };
        this.large_style = { font: "35px Arial", fill: "#000000" };

        // Groups.
        this.players = this.add.group();
        this.players.enableBody = true;
        this.projectiles = this.add.group();
        this.weaponList = this.add.group();

        // Variables.
        this.shotsFired = false;
        this.launch_sound = this.game.add.audio('aud_fire');//move to tank?
        this.damage_sound = this.game.add.audio('aud_damage');
        this.destroy_sound = this.game.add.audio('aud_destroy');
        this.current_turn = 1;
        

        // Create the tanks.
        tankCreator = new TankCreator(this);
        _this = this;
        this.gameInstance.Players.forEach(function(player)
        {
            tank            = tankCreator.createTank(player.Tank, player.PlayerId, player.TankSettings);
            tankTurret      = new Turret(_this, 400, 600 - 20, player.TankSettings);
            tank.tankTurret = tankTurret;

            //TODO: This can be done inside the tank class, seeing as it is basically using all the data from it.
            tankGUI = new TankGUI(_this, tank.x, tank.y, player.Username, tank.tankTurret.angle, tank.power, tank.health, tank.armour);
            tank.tankGUI = tankGUI;

            if (player.PlayerId == _this.playerId)
            {
                _this.playerTank = tank;
            }

            player.IsHost ? _this.isPlayerHost = true : _this.isPlayerHost = false;

            _this.players.add(tank);
        });
        //this.add.sprite(200, 200, 'pixelTank');

        //define maximum h, a, f
        this.MAXARMOUR = this.playerTank.armour;
        this.MAXHEALTH = this.playerTank.health;
        this.TURNFUEL = this.playerTank.fuel;
        this.fuelDeduction = 100 / this.TURNFUEL;

        //initialise the buttons
        this.initialisePlayerControls();
        // Create the GUI.
        this.createGUI();
        
        
    },

    initialisePlayerControls: function () {
        // Buttons
        // Fire Controls
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //this.fireButton.onDown.add(this.fire, this);

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

        //test reset button
        //this.resetShots = this.input.keyboard.addKey(Phaser.Keyboard.R);
    },

    

    createGUI: function () {
        //player stats: health, armour, fuel with super small number in them and a little image of the players' tank
        this.playerStatBG = this.add.sprite(10, 10, 'playerUI_bars');
        this.bMD_barWidth = 100;

        //background(width, height)
        var aBMD_bg = game.add.bitmapData(this.bMD_barWidth, 10);
        aBMD_bg.ctx.beginPath();
        aBMD_bg.ctx.rect(0, 0, this.bMD_barWidth, 30);
        aBMD_bg.ctx.fillStyle = '#1C0772';
        aBMD_bg.ctx.fill();
        //varying bar
        var aBMD = game.add.bitmapData(this.bMD_barWidth, 10);
        aBMD.ctx.beginPath();
        aBMD.ctx.rect(0, 0, this.bMD_barWidth, 30);
        aBMD.ctx.fillStyle = '#4188D2';
        aBMD.ctx.fill();
        
        //the value inside the data are value/100, height of bar
        var hBMD_bg = game.add.bitmapData(this.bMD_barWidth, 10);
        hBMD_bg.ctx.beginPath();
        hBMD_bg.ctx.rect(0, 0, this.bMD_barWidth, 30);
        hBMD_bg.ctx.fillStyle = '#A61000';
        hBMD_bg.ctx.fill();

        //the value inside the data are value/100, height of bar
        var hBMD = game.add.bitmapData(this.bMD_barWidth, 10);
        hBMD.ctx.beginPath();
        hBMD.ctx.rect(0, 0, this.bMD_barWidth, 30);
        hBMD.ctx.fillStyle = '#FF1300';
        hBMD.ctx.fill();

        //the value inside the data are value/100, height of bar
        var fBMD_bg = game.add.bitmapData(this.bMD_barWidth, 10);
        fBMD_bg.ctx.beginPath();
        fBMD_bg.ctx.rect(0, 0, this.bMD_barWidth, 30);
        fBMD_bg.ctx.fillStyle = '#A68F00';
        fBMD_bg.ctx.fill();

        //the value inside the data are value/100, height of bar
        this.fBMD = game.add.bitmapData(this.bMD_barWidth, 10);
        this.fBMD.ctx.beginPath();
        this.fBMD.ctx.rect(0, 0, this.bMD_barWidth, 10);
        this.fBMD.ctx.fillStyle = '#FFDB00';
        this.fBMD.ctx.fill();

        var barX = 74;
        var barY = 7;
        var barDivider = 10;

        this.armourBar_bg = game.add.sprite(barX, barY, aBMD_bg);
        this.armourBar_val = game.add.sprite(barX, barY, aBMD);
        this.playerStatBG.addChild(this.armourBar_bg);
        this.playerStatBG.addChild(this.armourBar_val);

        this.healthBar_bg = game.add.sprite(barX, this.armourBar_bg.bottom + barDivider, hBMD_bg);
        this.healthBar_val = game.add.sprite(barX, this.armourBar_bg.bottom + barDivider, hBMD);
        this.playerStatBG.addChild(this.healthBar_bg);
        this.playerStatBG.addChild(this.healthBar_val);
        
        this.fuelBar_bg = game.add.sprite(barX, this.healthBar_bg.bottom + barDivider, fBMD_bg);
        this.fuelBar_val = game.add.sprite(barX, this.healthBar_bg.bottom + barDivider, this.fBMD);//'this' is required as it is referenced for shrinking the bar
        this.playerStatBG.addChild(this.fuelBar_bg);
        this.playerStatBG.addChild(this.fuelBar_val);

        this.armourBarText = this.add.text(this.armourBar_bg.x + 10, this.armourBar_bg.y -2, this.playerTank.armour, this.small_style);
        this.healthBarText = this.add.text(this.healthBar_val.x + 10, this.healthBar_val.y - 2, this.playerTank.health, this.small_style);
        this.fuelBarText = this.add.text(this.fuelBar_val.x + 10, this.fuelBar_val.y - 2, this.playerTank.fuel, this.small_style);
        this.playerStatBG.addChild(this.armourBarText);
        this.playerStatBG.addChild(this.healthBarText);
        this.playerStatBG.addChild(this.fuelBarText);

        //submenu for firing styles
        this.firingStylesBG = this.add.sprite(10, this.playerStatBG.bottom + 10, 'playerUI_stylesBG');
        this.generateFiringStylesList();

        //timer
        this.turnTimer = this.game.time.create();
        this.turnTimerEvent = this.turnTimer.add(this.TURN_TIME, this.endTurn, this);
        this.turnTimer.start();
        this.turnTimerText = this.add.text(this.game.width / 2, 10, this.TURN_TIME/1000, this.small_style);
    },

    generateFiringStylesList: function () {
        this.styleData = JSON.parse(this.game.cache.getText('dat_firingStyles'));

        this.firingStylesList = this.add.group();
        this.firingStylesList.visible = true;

        var firingStyle;
        this.styleData.forEach(function (element, index) {
            firingStyle = new Phaser.Button(this.game, 34 + (index * 50), 92, element.btnAsset, this.selectFiringStyle, this);
            this.firingStylesList.add(firingStyle);

            firingStyle.styleData = element;
        }, this);
    },

    selectFiringStyle: function (style) {
        if (!style.selected) {//first time clicking
            this.clearStyleChoiceSelection();

            style.selected = true;
            style.alpha = 0.5;

            this.currentStyleSelected = style.styleData;
        }
        else {
            this.clearStyleChoiceSelection();
        }
    },

    clearStyleChoiceSelection: function () {
        this.currentStyleSelected = null;

        this.firingStylesList.forEach(function (style) {
            style.alpha = 1;
            style.selected = false;
        }, this);
    },

    //this might be a server side thing
    //gravity - set to a random number between ? 0-50 both plus and minus plus update some text to display on screen so players can adjust
    //newTurn: function(){
    //    //timer
    //    //wind
    //    //reset fuel
    //    //this.playerTank.fuel = 
    //},

    //resetTurn: function(){
    //    //reset turn timer
    //    //reset fuel
    //    //reset shot firing capability
    //    //increment turns by 1
    //},

    //need to edit this as shadow isn't needed for everything. also need to put this in the preload function or a bit later. just as long as this is declared earlier than this class
    //textGenerator: function (x, y, input, type) {
    //	switch (type) {
    //		case 'small':
    //			this.font_style = {
    //				font: "8px Arial",
    //				fill: "#ffffff"
    //			};
    //			break;
    //		case 'body':
    //			this.font_style = {
    //				font: "12px Arial",
    //				fill: "#ffffff"
    //			};
    //			break;
    //		case 'title':
    //			this.font_style = {
    //				font: "18px Arial",
    //				fill: "#ffffff"
    //			};
    //			break;
    //	}
    //	var text = this.add.text(x, y, input, this.font_style);
    //	text.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
    //	return text;
        
    //},
    
    updatePlayerStats: function(value, dmg){
        this.healthBarText.setText(this.playerTank.health);
        this.armourBarText.setText(this.playerTank.armour);
        this.fuelBarText.setText(this.playerTank.fuel);

        switch (value) {
            case 1: var currWidth = this.fuelBar_val.width;
                var difference;
                
                this.fuelBar_val.width = currWidth - (currWidth / this.playerTank.fuel);
                break;
            case 2: var currHWidth = this.healthBar_val.width;                
                this.STATBARWIDTH / this.MAXHEALTH * dmg;
                this.healthBar_val.width = currHWidth - dmg;
                break;
            case 3: var currAWidth = this.armourBar_val.width;
                this.armourBar_val.width = currAWidth - (currAWidth / this.playerTank.armour);
                break;
        }

        //deduct fuel
        //var deduction = this.fBMD_base - this.fuelDeduction;
        //var currWidth = this.fuelBar_val.width;
        //this.fuelBar_val.width = currWidth - currWidth / this.playerTank.fuel;
        
        //var currHWidth = this.healthBar_val.width;
        //this.healthBar_val.width = currHWidth - currHWidth / this.playerTank.health;
        //this.fBMD.ctx.beginPath();
        //this.fBMD.ctx.rect(0, 0, this.fBMD_base - deduction, 30);
        //this.fBMD.ctx.fillStyle = '#FFDB00';
        //this.fBMD.ctx.fill();
        //this.fBMD.update(0, 0, this.fBMD_base - deduction, 10);
        //this.fBMD.ctx.fillStyle = '#FFDB00';
        //this.fBMD.ctx.fill();
    },

    update: function () {
        /*
        I think this is wrong.
        It may need to be if fire has been pressed and shotsFired is false and style has been selected, but that shouldn't fire the shot.
        It should go to a schedule shot or something

        And have another if statement in update checking to see if all players are ready, or if the counter reaches 0, then fires all shots at the same time

        In regards to the handling of styles, that could be done in the projectile class. Pass in the asset and the style?

        also change shotsFired to playerReady and add another shotsFired
        */

        //if(this.fireButton.isDown && this.shotsFired == false && this.currentWeaponSelected){//need a timer for each turn -- 30 seconds should do

        //	// Fire a bullet from the tank.
        //	//this.playerTank.launchProjectile("bullet");
        //	this.playerTank.launchProjectile(this.currentWeaponSelected.projectileAsset);
        //	this.shotsFired = true;
        //	this.eventHub.server.launchProjectile(this.playerTank.playerId);
        //	console.log('Shots Fired');
        //	//TODO: Text controller.
        //	//this.readyText.text = 'Ready?: ' + this.shotsFired;

        //}
    	if (this.fireButton.isDown && this.currentStyleSelected && !this.shotsFired) {
    	    this.gameHub.server.setFireReady(this.playerTank.playerId);
    	    this.fireText = this.add.text(this.game.width / 2 - 50, 150, "LOCKED IN", this.large_style);
    	    _this = this;
    	    setTimeout(function ()
    	    {
    	        _this.fireText.destroy();
    	    }, 1500);
            this.shotsFired = true;
        }
        else if(!this.shotsFired){
            // Player can only change the angle and power before shooting. Not during and not after
            if(this.powerUp.isDown && this.playerTank.power < 500){
                this.playerTank.adjustPower(1);
                this.eventHub.server.increasePower(this.playerTank.playerId);
                //this.powerText.text = 'Power: ' + this.playerTank.power;
                //this.updateTankGUI(this.playerTank.power, null);
            }
            else if(this.powerDown.isDown && this.playerTank.power > 100){
                this.playerTank.adjustPower(-1);
                this.eventHub.server.decreasePower(this.playerTank.playerId);
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
                if (this.moveLeft.isDown && this.playerTank.x >this.TANK_MIDDLE)
                {
                    // Move the tank to the left.
                    this.playerTank.movement(-1);
                    //this.playerTank.scale *= +1;
                    this.eventHub.server.moveLeft(this.playerTank.playerId);

                    // Take a unit from the fuel.
                    //TODO: Move this duplicated functionality to a generic function.
                    this.playerTank.fuel--;

                    this.updatePlayerStats(1);
                    //this.fuelText.text = 'Fuel: ' + this.playerTank.fuel;
                }
                else if (this.moveRight.isDown && this.playerTank.x < this.game.width-this.TANK_MIDDLE)
                {
                    // Move the tank to the right.
                    this.playerTank.movement(1);
                    //this.playerTank.scale *= -1
                    this.eventHub.server.moveRight(this.playerTank.playerId);

                    // Take a unit from the fuel.
                    //TODO: Move this duplicated functionality to a generic function.
                    this.playerTank.fuel--;
                    this.updatePlayerStats(1);
                    //this.fuelText.text = 'Fuel: ' + this.playerTank.fuel;
                }
            }
            this.playerTank.tankGUI.updateAngleText(this.playerTank.power, this.playerTank.tankTurret.angle);
            //this.updateTankGUI(this.playerTank.power, this.playerTank.tankTurret.angle);
        }

        if (this.turnTimer.running) {
            //this.turnTimerText = this.add.text(this.game.width / 2, 10, Math.round((this.turnTimerEvent.delay - this.turnTimer.ms)/1000), this.small_style);
            this.turnTimerText.setText(Math.round((this.turnTimerEvent.delay - this.turnTimer.ms) / 1000));
        }

        // Collision detection?
        this.game.physics.arcade.collide(this.projectiles, this.players, this.damageTank, null, this);//hit tank

    },

    damageTank: function (projectile, tank) {
        var calcDamage = this.DAMAGEMIN;
        projectile.destroy();

        //this.damageSmoke = this.game.add.sprite(tank.turretPositionXY.x - 16, tank.turretPositionXY.y - 30, 'shotSmoke');
        //tank.turretSmoke.animations.add('anim_damageSmoke', [8, 9, 10, 11, 12, 13, 14, 15]);
        //tank.turretSmoke.scale.setTo(2);

        if (tank.health - calcDamage <= 0) {
            //tank.turretSmoke.animations.play('anim_damageSmoke', 20, false, true);
            tank.health -= calcDamage;
            this.updatePlayerStats(2, calcDamage);
            this.destroy_sound.play();
            tank.alive = false;
        }
        else {
            //tank.turretSmoke.animations.play('anim_damageSmoke', 20, false, true);
            tank.health -= calcDamage;
            this.damage_sound.play();
            this.updatePlayerStats(2, calcDamage);

            if (this.isPlayerHost)
            {
                this.eventHub.server.collisionTrigger(this.playerTank.playerId, calcDamage);
            }
        }
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
        this.gameHub.client.launchProjectiles = function()
        {
        	_this.players.forEach(function (player)
        	{
        		player.launchProjectile();
        	});
        }

    	// Launch a projectile from a tank. - resets after 7 seconds
        this.gameHub.client.resetTurn = function ()
        {
            setTimeout(function()
            {
                _this.shotsFired = false;
                _this.fireButton.reset();
                _this.playerTank.fuel = _this.TURNFUEL;
                this.current_turn++;
                _this.nextTurnText = _this.add.text(_this.game.width / 2 - 50, 150, "NEXT TURN!", _this.large_style);
                setTimeout(function()
                {
                    _this.nextTurnText.destroy();
                }, 3000);
            }, 7000);

        }
    }
};


