Turret = function (game, x, y) {
	Phaser.Sprite.call(this, game, x, y, "turret");
	this.anchor.setTo(0, 0.5);

	// Set the angle.
	this.angle = -90;

	// Add to the game.
	game.add.existing(this);
};

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.fire = function () {
};