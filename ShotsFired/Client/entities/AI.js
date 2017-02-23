var ShotsFired = ShotsFired || {};

ShotsFired.AI = function (state, x, y, data) {
    Phaser.Sprite.call(this, state.game, x, y, data.tankAsset);


};

ShotsFired.AI.prototype = Object.create(Phaser.Sprite.prototype);
ShotsFired.AI.prototype.constructor = ShotsFired.AI;
