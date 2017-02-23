var Tanks = Tanks || {};
/*
Arcade Physics: Ship trail
follow for singleplayer
add targets for single player
menu: single player - vs ai or targets
      multiplayer - host or join

 */
Tanks.Game = {
    init:function () {
        //difficulty

        //level

        //physics & gravity
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 100;

        //constants

        //variables
    },
    preload: function () {

    },


    create: function () {
        //game assets
        this.background = this.add.sprite(0, 0, 'game_background');

        //groups
        this.players = this.add.group();
        this.tankComposite = this.add.group();
        this.projectiles = this.add.group();

        //variables
        this.shotsFired = false;

        //  A single bullet that the tank will fire
        // this.bullet = this.add.sprite(0, 0, 'bullet');
        // this.bullet.exists = false;
        // this.physics.arcade.enable(this.bullet);

        //test tank entity with data
        var testTankData = {
            tankAsset: 'tank',
            turretAsset: 'turret',
            health: 100,
            armour: 100,
            fuel: 300
        };
        this.testTank = new Tanks.Tank(this, 400, 600, testTankData);
        this.players.add(this.testTank);

        this.testTank2 = new Tanks.Tank(this, 300, 600, testTankData);
        this.players.add(this.testTank2);


        // //  Hardcoded tank & turret
        // this.tank1 = this.add.sprite(10, 570, 'tank');
        // this.turret = this.add.sprite(this.tank1.x + 20, this.tank1.y, 'turret');
        // this.turret.anchor.setTo(0.1,0.5);

        //buttons
        // fire controls
        this.fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // this.fireButton.onDown.add(this.fire, this);

        //angle controls
        this.angleLeft = this.input.keyboard.addKey(Phaser.Keyboard.Q);
        // this.angleLeft.onDown.add(this.rotateTurret, this,0);
        this.angleRight = this.input.keyboard.addKey(Phaser.Keyboard.E);

        //power controls
        this.powerUp = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.powerDown = this.input.keyboard.addKey(Phaser.Keyboard.S);

        //movement controls
        this.moveLeft = this.input.keyboard.addKey(Phaser.Keyboard.A);
        this.moveRight = this.input.keyboard.addKey(Phaser.Keyboard.D);

        //create turn timer
        this.turnTimer = this.game.time.create(false);

        //required functions
        this.createGUI();


    },
    //i think i will make a text entity to handle all of these duplicates
    createGUI: function () {
        var font_style = {
            font: "12px Arial",
            fill: "#ffffff"
        };
        this.turnTimerText = this.add.text(400, 32, this.turnTimer, font_style);
        this.turnTimerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.powerText = this.add.text(8, 8, 'Power: ' + this.testTank.power, font_style);
        this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.angleText = this.add.text(8,32, 'Angle: ' + this.testTank.tankTurret.angle,font_style);
        this.angleText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.fuelText = this.add.text(8,56, 'Fuel:' + this.testTank.fuel,font_style);
        this.fuelText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.readyText = this.add.text(200, 16, 'Ready?: ' + this.shotsFired, font_style);
        this.readyText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
    },
    // removeBullet: function () {
    //
    //     this.bullet.kill();
    //     this.camera.follow();
    //     this.add.tween(this.camera).to( { x: 0 }, 1000, "Quint", true, 1000);
    //
    // },
    update: function () {
        // if (this.bullet.exists)
        // {
        //     if (this.bullet.y > 600 || this.bullet.x > this.game.width || this.bullet.x < 0)
        //     {
        //         //  Simple check to see if it's fallen too low
        //         this.removeBullet();
        //     }
        // }
        if(this.fireButton.isDown && this.shotsFired == false){//need a timer for each turn -- 30 seconds should do
            //test projectile data
            var testProjectileData = {
                asset: 'bullet'
            };

            //fire bullet from tank turret
            this.testTank.launchProjectile(testProjectileData);
            this.shotsFired = true;
            console.log('Shots Fired');
            this.readyText.text = 'Ready?: ' + this.shotsFired;

        }
        else if(!this.shotsFired){
            //player can only change the angle and power before shooting. Not during and not after
            if(this.powerUp.isDown && this.testTank.power < 500){
                this.testTank.adjustPower(1);
                console.log('increase power');
                this.powerText.text = 'Power: ' + this.testTank.power;
            }
            else if(this.powerDown.isDown && this.testTank.power > 100){
                this.testTank.adjustPower(-1);
                console.log('decrease power');
                this.powerText.text = 'Power: ' + this.testTank.power;
            }

            if(this.angleLeft.isDown && this.testTank.tankTurret.angle > -180){
                this.testTank.rotateTurret(-1);
                console.log('angle left');
                this.angleText.text = 'Angle: ' + (this.testTank.tankTurret.angle).toFixed();
            }
            else if(this.angleRight.isDown && this.testTank.tankTurret.angle < 0){
                this.testTank.rotateTurret(+1);
                console.log('angle right');
                this.angleText.text = 'Angle: ' + (this.testTank.tankTurret.angle).toFixed();
            }

            //movement requires fuel
            if(this.testTank.fuel>0){
                //only when projectile isn't active and when you have fuel
                if (this.moveLeft.isDown && this.testTank.x >20)
                {
                    // this.testTank.x--;
                    this.testTank.movement(-1);

                    console.log('move left');
                    this.testTank.fuel--;
                    this.fuelText.text = 'Fuel: ' + this.testTank.fuel;
                }
                else if (this.moveRight.isDown && this.testTank.x < this.game.width-40)
                {

                    this.testTank.movement(+1);
                    // this.testTank.x++;
                    console.log('move right');
                    this.testTank.fuel--;
                    this.fuelText.text = 'Fuel: ' + this.testTank.fuel;
                }
            }
        }

        //collision detection?


    }

    //turnReset
    //fuel...

};


