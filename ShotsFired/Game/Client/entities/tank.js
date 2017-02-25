var Tanks = Tanks || {};

Tanks.Tank = function(state,x,y, data){
	Phaser.Sprite.call(this,state.game, x, y, data.tankAsset);

	this.state = state;
	this.game = state.game;
	this.projectiles = state.projectiles;
	this.tankComposite = state.tankComposite;
	this.anchor.setTo(0.5);

	// Physics.
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;

	this.power=250;
	this.tankComposite.add(this);
	this.tankTurret = new Tanks.Turret(this,x, y-30, data);
	this.tankComposite.add(this.tankTurret);
	this.reset(x,y,data);
};

Tanks.Tank.prototype = Object.create(Phaser.Sprite.prototype);
Tanks.Tank.prototype.constructor = Tanks.Tank;

Tanks.Tank.prototype.reset = function (x,y,data) {
	Phaser.Sprite.prototype.reset.call(this,x,y,data);

	// Apply tank sprite.
	this.loadTexture('tank');

	// Tank properties.
	this.health = data.health;
	this.armour = data.armour;
	this.fuel = data.fuel;//fuel limitation

	this.power = 250;
	this.angle = 0;
};

// Tanks.Tank.prototype.damage = function (amount, data) {
//     //I may try and DO damage against defense and minus away from the health
//
//     Phaser.Sprite.prototype.damage.call(this.amount);
//     //explosion effect
//
//     //dead tank asset?
// };

Tanks.Tank.prototype.rotateTurret = function (value) {
	if(this.angle <= 0 || this.angle >= -180) {
		this.tankTurret.angle += value;
	}
};

//TODO: Constants for max and min power.
Tanks.Tank.prototype.adjustPower = function (adjustment) {
	this.power += adjustment;
};

Tanks.Tank.prototype.movement = function (value) {
	this.body.x       += value;
	this.tankTurret.x += value;
};

// Takes server projectile data and launches.
Tanks.Tank.prototype.launchProjectile = function (projectileData) {
	// Create new projectile.
	this.projectile = new Tanks.Projectile(this, this.tankTurret.x, this.tankTurret.y, projectileData);

	// Launch projectile on the angle of the turret.
	var turretPositionXY = new Phaser.Point(this.tankTurret.x, this.tankTurret.y);
	turretPositionXY.rotate(turretPositionXY.x, turretPositionXY.y, this.tankTurret.angle,false);

	//TODO: Add animation of puff of smoke at the barrel

	// Set the bullet velocity.
	this.game.physics.arcade.velocityFromAngle(this.tankTurret.angle, this.power, this.projectile.body.velocity);
};


