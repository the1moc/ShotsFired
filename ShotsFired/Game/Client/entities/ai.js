var Tanks = Tanks || {};

Tanks.AI = function (state, x, y, data) {
    Phaser.Sprite.call(this, state.game, x, y, data.tankAsset);


};

Tanks.AI.prototype = Object.create(Phaser.Sprite.prototype);
Tanks.AI.prototype.constructor = Tanks.AI;