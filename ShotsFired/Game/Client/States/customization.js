//<a href='http://www.freepik.com/free-vector/polygonal-camouflage-background_834791.htm'>Designed by Freepik</a>
//reference for the background by attribution?

var Customization = {
    create: function()
    {
        this.sendSelections();

        this.background = this.add.sprite(0, 0, 'menu_bg2');
        var bgScale = 600.0 / 1080;
        this.background.scale.setTo(1, bgScale);

        this.setChanges = this.add.button(250, 500, "btn_save", this.sendSelections, this);
        this.stage.disableVisibilityChange = true;

        // Title image.
        this.customizationTitle = game.add.text(this.game.width / 2, 40, "Shots Fired!", { font: "50px Arial", fill: "#000000", align: "center" });
        this.customizationTitle.anchor.setTo(0.5, 0.5);
        this.customizationSubTitle = game.add.text(this.game.width / 2, this.customizationTitle.bottom + 15, "Customization Menu", { font: "20px Arial", fill: "#000000", align: "center" });
        this.customizationSubTitle.anchor.setTo(0.5, 0.5);
        this.leftXPos = 100;
        this.centreXPos = 240;
        this.rightXPos = 500;
        this.yPos = 162;

        // Groups
        this.tankSecGroup = this.add.group();
        this.upgSecGroup = this.add.group();
        this.tankSecGroup.visible = false;
        this.upgSecGroup.visible = false;

        this.currentSelection = 0;

        this.selectedShot;
        this.selectedTurret;
        this.selectedBody;
        this.selectedBodyColour;
        this.selectedTurretColour;

        this.initial_Value = 0;

        this.createGUI();
    },

    sendSelections: function () {
        var gameHub = $.connection.gameHub;

        gameHub.server.saveSelections(this.selections);
    },

    generateUIButtons: function () {
        //section buttons & return button
        this.tankCustomizationButton = this.add.button(this.leftXPos, this.yPos, 'btnUP', this.showTankSection, this);
        this.tankCustomizationLabel = this.add.text(26, 0, "Tank", stylePicker(1));
        this.tankCustomizationButton.addChild(this.tankCustomizationLabel);

        //this.returnButton = this.add.button(this.leftXPos, this.bottomBG.top - 10, 'btnUP', this.sendSelections, this);
        this.returnButton = this.add.button(this.leftXPos, this.bottomBG.top - 10, 'btnUP', this.backToLobby, this);
        this.returnLabel = this.add.text(18, 0, "Return", stylePicker(1));
        this.returnButton.addChild(this.returnLabel);
        
    },

    createGUI: function () {
        //create background UI
        var ex = 80; var ey = 100; this.rows = 10;
        var top = this.add.sprite(ex, ey, 'lrgBanner_top');
        for (var i = 0; i < this.rows; i++) {
            var row = this.add.sprite(ex, top.bottom + 32 * i, 'lrgBanner_row');
        }
        this.bottomBG = this.add.sprite(ex, top.bottom + 32 * this.rows, 'lrgBanner_bottom');


        //call button generation for sections
        this.generateUIButtons();


        //divider
        var divTop = this.add.sprite(this.tankCustomizationButton.right + 15, this.tankCustomizationButton.y - 5, 'div_t');
        for (var i = 0; i < this.rows - 1; i++) {
            var divMid = this.add.sprite(divTop.x, divTop.bottom + 32 * i, 'div_m');
        }
        var divBot = this.add.sprite(divTop.x, divMid.bottom, 'div_b');


        //current options selected
        this.defaultSelection = 0;
        this.currentTurretSelected = this.defaultSelection;
        this.currentBodySelected = this.defaultSelection;
        this.currentShotSelected = this.defaultSelection;

        this.contentassetX = this.centreXPos;
        this.contentColourX = this.contentassetX + 250;
        var spacer = 10;
        
        
        //rows
        this.turretTypeText = game.add.text(this.contentassetX, this.yPos, "Turret:", stylePicker(1));
        this.turretTypeChoiceBG = game.add.sprite(this.contentassetX, this.turretTypeText.bottom + spacer, 'playerUI_stylesBG');
        this.turretColourText = game.add.text(this.contentColourX, this.yPos, "Colour:", stylePicker(1));
        this.turretColourChoiceBG = game.add.sprite(this.contentColourX, this.turretTypeText.bottom + spacer, 'playerUI_stylesBG');
        
        this.bodyTypeText = game.add.text(this.contentassetX, this.turretColourChoiceBG.bottom + spacer, "Body:", stylePicker(1));
        this.bodyTypeChoiceBG = game.add.sprite(this.contentassetX, this.bodyTypeText.bottom + spacer, 'playerUI_stylesBG');
        this.bodyColourText = game.add.text(this.contentColourX, this.turretColourChoiceBG.bottom + spacer, "Colour:", stylePicker(1));
        this.bodyColourChoiceBG = game.add.sprite(this.contentColourX, this.bodyTypeText.bottom + spacer, 'playerUI_stylesBG');

        this.shotTypeText = game.add.text(this.contentassetX, this.bodyColourChoiceBG.bottom + spacer, "Projectile:", stylePicker(1));
        this.shotTypeChoiceBG = game.add.sprite(this.contentassetX, this.shotTypeText.bottom + spacer, 'playerUI_stylesBG');

        //buttons and na blocks - turret
        this.tb1 = game.add.button(this.turretTypeChoiceBG.x + 24, this.turretTypeChoiceBG.y + 8, 'turret', this.doT, this);
        this.tb2 = game.add.button(this.turretTypeChoiceBG.x + 74, this.turretTypeChoiceBG.y + 8, 'turret', this.doT, this);
        this.tb3 = game.add.sprite(this.turretTypeChoiceBG.x + 124, this.turretTypeChoiceBG.y + 8, 'btn_na');

        this.tc1 = game.add.button(this.turretColourChoiceBG.x + 24, this.turretColourChoiceBG.y + 8, 'turret', this.doT, this);
        this.tc1 = game.add.button(this.turretColourChoiceBG.x + 74, this.turretColourChoiceBG.y + 8, 'turret', this.doT, this);
        this.tc3 = game.add.button(this.turretColourChoiceBG.x + 124, this.turretColourChoiceBG.y + 8, 'turret', this.doT, this);

        //buttons and na blocks - body
        this.tb1 = game.add.button(this.bodyTypeChoiceBG.x + 24, this.bodyTypeChoiceBG.y + 8, 'turret', this.doT, this);
        this.tb2 = game.add.button(this.bodyTypeChoiceBG.x + 74, this.bodyTypeChoiceBG.y + 8, 'turret', this.doT, this);
        this.tb3 = game.add.sprite(this.bodyTypeChoiceBG.x + 124, this.bodyTypeChoiceBG.y + 8, 'btn_na');

        this.tc1 = game.add.button(this.bodyColourChoiceBG.x + 24, this.bodyColourChoiceBG.y + 8, 'turret', this.doT, this);
        this.tc1 = game.add.button(this.bodyColourChoiceBG.x + 74, this.bodyColourChoiceBG.y + 8, 'turret', this.doT, this);
        this.tc3 = game.add.button(this.bodyColourChoiceBG.x + 124, this.bodyColourChoiceBG.y + 8, 'turret', this.doT, this);

        //buttons and na blocks - shot assets
        this.tb1 = game.add.button(this.shotTypeChoiceBG.x + 24, this.shotTypeChoiceBG.y + 8, 'turret', this.doT, this);
        this.tb2 = game.add.button(this.shotTypeChoiceBG.x + 74, this.shotTypeChoiceBG.y + 8, 'turret', this.doT, this);
        this.tb3 = game.add.sprite(this.shotTypeChoiceBG.x + 124, this.shotTypeChoiceBG.y + 8, 'btn_na');

    },

    doT: function () {},

    backToLobby: function () {
        this.state.start("Lobby");
    }
};