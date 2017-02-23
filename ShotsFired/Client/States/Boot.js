var Tanks = Tanks || {};

Tanks.Boot = {
    init: function () {
        //background colour
        this.game.stage.backgroundColor = '#FFF';
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        //center the game horizontally
        this.scale.pageAlignHorizontally=true;
        this.scale.pageAlignVertically = true;

        //physics p2 and ARCADE??
        this.game.physics.startSystem(Phaser.Physics.p2);

        //game pause
        this.stage.disableVisibilityChange = false;

        //minimum h/w -- NOT SURE IF WORKS
        this.scale.minWidth = 270;
        this.scale.minHeight= 480;

        //force landscape?
        //this.stage.forceLandscape = true;
    },

    preload: function () {
        //preload loading bar in here
    },

    create: function () {
        //start preload state
        this.state.start('Preload');
    }
};
