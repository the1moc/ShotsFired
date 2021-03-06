// Seperate function to create each of the player tanks in a uniform way (will do turret etc later if needed).
function TankCreator(game)
{
	// Create a tank.
    this.createTank = function(data, playerId, tankSettings)
    {
        var tankAssetName;

        switch(tankSettings.BodyAssetId)
        {
            case 0:
                tankAssetName = "tank";
                break;
            case 1:
                tankAssetName = "tank2";
                break;
            default:
                console.log("No valid body asset id, revering to default");
                tankAssetName = "tank";
                break;
        }

        tank = new Tank(game, data.X, data.Y, tankAssetName);
        switch(tankSettings.BodyAssetColour)
        {
            case 1:
                // Red
                tank.tint = 0xFF99FF;
                break;
            case 2:
                // Yellow
                tank.tint = 0xFFFF00;
                break;
            case 3:
                // Blue
                tank.tint = 0x66CCFF;
                break;
            default:
                console.log("No valid tint, reverting to default");
                break;
        }

		tank.anchor.setTo(0.5,0.5);

		// Physics.
		game.physics.arcade.enable(tank);
		tank.body.collideWorldBounds = true;

		// Tank properties.
		tank.power    = data.Power;
		tank.health   = data.Health;
		tank.armour   = data.Armour;
		tank.fuel     = data.Fuel;
		tank.playerId = playerId;
		switch(tankSettings.ProjectileAssetId)
		{
		    case 0:
		        tank.projectileAsset = "wpn_shot";
		        break;
		    case 1:
		        tank.projectileAsset = "wpn_bomb";
		        break;
		    case 2:
		        tank.projectileAsset = "wpn_pig";
		        break;
		    case 3:
		        tank.projectileAsset = "wpn_apple";
		        break;
		    default:
		        tank.projectileAsset = "wpn_shot";
		        break;
		}

		tank.loadTexture('tank');
		return tank;
	};
}

// Tank constructor.
Tank = function(game, x, y, assetName) {
	Phaser.Sprite.call(this, game, x, y, assetName);
}

Tank.prototype = Object.create(Phaser.Sprite.prototype);
Tank.prototype.constructor = Tank;

// I hate this but a quick fix NOTICE ME PLSSSSSSSSSSSSSSSSSSSSSS - I notice?
// Add as a child of the tank etc.
Tank.prototype.update = function()
{
	this.tankTurret.x = this.body.x + (this.body.width / 2);
	this.tankTurret.y = this.body.y + 5;
    // Another quick fix.
	this.tankGUI.moveGUI(this.x, this.y);
}

Tank.prototype.damage = function (amount, data) {
	//I may try and DO damage against defense and minus away from the health
	Phaser.Sprite.prototype.damage.call(this.amount);
};

Tank.prototype.rotateTurret = function(value)
{
	if (value == 1)
	{
		if (this.tankTurret.angle < 0) {
			this.tankTurret.angle = Math.round(value + this.tankTurret.angle);
		}
	}
	else
	{
		if (this.tankTurret.angle > -180) {
			this.tankTurret.angle = Math.round(value + this.tankTurret.angle);
		}
	}
};

//TODO: Constants for max and min power.
Tank.prototype.adjustPower = function(adjustment)
{
	this.power += adjustment;
};

Tank.prototype.movement = function(value)
{
	this.x += value;
};

//resets fuel for new turn
Tank.prototype.resetFuel = function (data) {
    this.fuel = data.fuel
}

// Takes server projectile data and launches.
Tank.prototype.launchProjectile = function()
{
	// Create new projectile.
	this.projectile = new Projectile(this.game, this.tankTurret.x, this.tankTurret.y, this.projectileAsset);

	// Launch projectile on the angle of the turret.
	this.turretPositionXY = new Phaser.Point(this.tankTurret.x, this.tankTurret.y);
	this.turretPositionXY.rotate(this.turretPositionXY.x, this.turretPositionXY.y, this.tankTurret.angle, false);

	//TODO: Add animation of puff of smoke at the barrel

	// Set the bullet velocity.
	this.game.physics.arcade.velocityFromAngle(this.tankTurret.angle, this.power, this.projectile.body.velocity);
	
	this.game.launch_sound.play();
	this.turretSmoke = this.game.add.sprite(this.turretPositionXY.x - 16, this.turretPositionXY.y - 30, 'shotSmoke');
	
	this.turretSmoke.animations.add('anim_shotSmoke', [0, 1, 2, 3, 4, 5, 6, 7]);
	this.turretSmoke.scale.setTo(2);
	this.turretSmoke.animations.play('anim_shotSmoke', 20, false,true);
	
	//this.turretSmoke.visible = false;
};

Tank.prototype.damage = function (amount, data) {
    //I may try and DO damage against defense and minus away from the health
    Phaser.Sprite.prototype.damage.call(this.amount);
};