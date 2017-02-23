var Tanks = Tanks || {};

Tanks.Tank = function(state,x,y, data){
    Phaser.Sprite.call(this,state.game, x, y, data.tankAsset);

    this.state = state;
    this.game = state.game;
    this.projectiles = state.projectiles;
    this.tankComposite = state.tankComposite;
    this.anchor.setTo(0.5);
    //physics
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

//not sure if this is needed but yh...
Tanks.Tank.prototype.reset = function (x,y,data) {
    Phaser.Sprite.prototype.reset.call(this,x,y,data);

    //apply tank sprite
    this.loadTexture('tank');

    //tank properties
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
    if(this.angle <= 0 || this.angle >= -180){
        this.tankTurret.angle += value;     // angle += +1 rotates clockwise
                                            // angle += -1 rotates anti-clockwise
    }
};

//need two constants here for max power and min power?
Tanks.Tank.prototype.adjustPower = function (adjustment) {
    this.power += adjustment;               //power += 1 increases power
                                            //power += -1 decreases power?
};

//had to move turret with the tank body as i can't seem to stick it to it
Tanks.Tank.prototype.movement = function (value) {
    this.body.x += value;                   //tank x axis += 1 moves right
    this.tankTurret.x += value;             //tank y axis += -1 moves left
};

Tanks.Tank.prototype.launchProjectile = function (projectileData) {
    //this would take the projectile data
    //would need to take the projectile asset

    //create new projectile
    this.projectile = new Tanks.Projectile(this,this.tankTurret.x, this.tankTurret.y, projectileData);

    //launch projectile on the angle of the turret
    var turretPositionXY = new Phaser.Point(this.tankTurret.x, this.tankTurret.y);
    turretPositionXY.rotate(turretPositionXY.x, turretPositionXY.y, this.tankTurret.angle,false);

    //add animation of puff of smoke at the barrel

    this.game.physics.arcade.velocityFromAngle(this.tankTurret.angle, this.power, this.projectile.body.velocity);
};

//not sure if this is needed?
// Tanks.Tank.prototype.scheduleProjectile = function () {
//     this.launchProjectile();
// };


