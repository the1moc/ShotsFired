var Tanks = Tanks || {};

Tanks.Projectile = function(state,x,y, data){

    Phaser.Sprite.call(this,state.game, x, y, data.asset);

    this.state = state;
    this.game = state.game;
    this.projectiles = state.projectiles;

    //physics body
    this.game.physics.arcade.enable(this);

    this.projectiles.add(this);
};

Tanks.Projectile.prototype = Object.create(Phaser.Sprite.prototype);
Tanks.Projectile.prototype.constructor = Tanks.Projectile;

Tanks.Projectile.prototype.update = function () {
    if(this.x > 800 || this.x < 0){
        this.kill();
    }
};
