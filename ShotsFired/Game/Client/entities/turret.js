Turret = function (game, x, y, data) {
	Phaser.Sprite.call(this, game, x, y, data.turretAsset);
	this.anchor.setTo(0, 0.5);

	// Add to the game.
	game.add.existing(this);
};

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.fire = function () {
};