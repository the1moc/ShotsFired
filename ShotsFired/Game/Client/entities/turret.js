Turret = function(game, x, y, tankSettings)
{
    var turretAssetName;

    switch(tankSettings.TurretAssetId)
    {
        case 0:
            turretAssetName = "turret";
            break;
        case 1:
            turretAssetName = "turret2";
            break;
        default:
            console.log("No valid turret id, reverting to default");
            turretAssetName = "turret";
            break;
    }
	Phaser.Sprite.call(this, game, x, y, turretAssetName);
	this.anchor.setTo(0, 0.5);

	// Set the angle.
	this.angle = -90;

	switch (tankSettings.TurretAssetColour) {
	    case 1:
	        // Red
	        tank.tint = 0xFF99FF;
	        break;
	    case 2:
	        // Yellow
	        tank.tint = 0xFFFF00;
	        break;
	    case 3:
	        // Blue
	        tank.tint = 0x66CCFF;
	        break;
	    default:
	        console.log("No valid tint, reverting to default");
	}

	// Add to the game.
	game.add.existing(this);
};

Turret.prototype = Object.create(Phaser.Sprite.prototype);
Turret.prototype.constructor = Turret;

Turret.prototype.fire = function () {
};