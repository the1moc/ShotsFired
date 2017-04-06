var settings = {
    create: function () {
        // Set menu background (using menu layout for now)
        this.background = this.add.sprite(0, 0, 'menu_bg');

        this.stage.disableVisibilityChange = true;

        this.lobbyLeftXPos = 50;
        this.lobbyCentreXPos = 200;
        this.lobbyRightXPos = 550;

        // Title image.
        this.title = game.add.text(this.lobbyLeftXPos, 50, "Game Settings", { font: "50px Arial", fill: "#000000", align: "center" });

        this.lobbyYPos = this.title.bottom + 25;


        this.createGUI();
    },
    createGUI: function () {

    }
};