AI = function (state, x, y, data) {
	Phaser.Sprite.call(this, state.game, x, y, data.tankAsset);
};

AI.prototype = Object.create(Phaser.Sprite.prototype);
AI.prototype.constructor = AI;