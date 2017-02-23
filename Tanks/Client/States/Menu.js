var Tanks = Tanks || {};

Tanks.Menu = {
    preload: function () {
        //?
    },
    create: function () {
        //set menu background
        this.background = this.add.sprite(0,0,'menu_background');
        this.title = this.add.sprite(this.game.width/2, this.game.height/2, 'title');//Title image
        this.title.anchor.setTo(0.5, 0.5);

        //music


        //buttons
        this.button1 = this.add.button(40,40,'Set up game','function name goes here', this,2,1,0);
    }
};