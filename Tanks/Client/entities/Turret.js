var Tanks = Tanks || {};

Tanks.Turret = function (state,x,y,data) {
    Phaser.Sprite.call(this,state.game, x, y, data.turretAsset);

    this.state = state;
    this.game = state.game;
    this.anchor.setTo(0,0.5);

    //physics
    // this.game.physics.arcade.enable(this);
    this.reset(x,y);

};

Tanks.Turret.prototype = Object.create(Phaser.Sprite.prototype);
Tanks.Turret.prototype.constructor = Tanks.Turret;

Tanks.Turret.prototype.fire = function () {

};