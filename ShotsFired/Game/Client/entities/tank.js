// Seperate function to create each of the player tanks in a uniform way (will do turret etc later if needed).
function TankCreator(game)
{
	// Create a tank.
	this.createTank = function(x, y, data) {
		tank = new Tank(game, x, y);

		tank.anchor.setTo(0.5);

		// Physics.
		game.physics.arcade.enable(tank);
		tank.body.collideWorldBounds = true;

		// Tank properties.
		tank.power  = 250;
		tank.health = data.health;
		tank.armour = data.armour;
		tank.fuel   = data.fuel;
		tank.power  = 250;

		tank.loadTexture('tank');

		return tank;
	};
}

// Tank constructor.
Tank = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, "tank");

    this.move = function() {
        //console.log("penis");

        
    }
}

Tank.prototype = Object.create(Phaser.Sprite.prototype);
Tank.prototype.constructor = Tank;

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
	this.body.x += value;
	this.tankTurret.x += value;
	this.tankGUI.moveGUI(value);
};

// Takes server projectile data and launches.
Tank.prototype.launchProjectile = function(projectileData)
{
	// Create new projectile.
	this.projectile = new Projectile(this.game, this.tankTurret.x, this.tankTurret.y, projectileData);

	// Launch projectile on the angle of the turret.
	var turretPositionXY = new Phaser.Point(this.tankTurret.x, this.tankTurret.y);
	turretPositionXY.rotate(turretPositionXY.x, turretPositionXY.y, this.tankTurret.angle, false);

	//TODO: Add animation of puff of smoke at the barrel

	// Set the bullet velocity.
	this.game.physics.arcade.velocityFromAngle(this.tankTurret.angle, this.power, this.projectile.body.velocity);
};