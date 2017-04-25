//<a href='http://www.freepik.com/free-vector/polygonal-camouflage-background_834791.htm'>Designed by Freepik</a>
//reference for the background by attribution?

var Customization = {
    create: function () {
        // Set menu background (using menu layout for now)
        //this.background = this.add.sprite(0, 0, 'menu_bg');
        this.background = this.add.sprite(0, 0, 'menu_bg2');
        var bgScale = 600.0 / 1080;
        this.background.scale.setTo(1, bgScale);

        this.setChanges = this.add.button(250, 500, "btn_save", this.sendSelections, this)
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

        //this.headingXPos = 160;
        //this.centreXPos = 250;
        //this.rightXPos = 550;
        //this.custYPos = this.title.bottom + 25;

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

        var mockSelections = {
            bodyAsset: 1,
            bodyAssetColour: 2,
            turretAsset: 3,
            turretAssetColour: 0,
            projectileAsset: 0
        };

        gameHub.server.saveSelections(mockSelections);
    },

    generateUIButtons: function () {
        //section buttons & return button
        this.tankCustomizationButton = this.add.button(this.leftXPos, this.yPos, 'btnUP', this.showTankSection, this);
        this.tankCustomizationLabel = this.add.text(26, 0, "Tank", stylePicker(1));
        this.tankCustomizationButton.addChild(this.tankCustomizationLabel);

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

        //call button generation
        this.generateUIButtons();

        //divider
        var divTop = this.add.sprite(this.tankCustomizationButton.right + 15, this.tankCustomizationButton.y - 5, 'div_t');
        for (var i = 0; i < this.rows - 1; i++) {
            var divMid = this.add.sprite(divTop.x, divTop.bottom + 32 * i, 'div_m');
        }
        var divBot = this.add.sprite(divTop.x, divMid.bottom, 'div_b');




        //data
        this.cData = JSON.parse(this.game.cache.getText("dat_customization"));

        //organize data
        //turret assets
        this.turDataLength = Object.keys(this.cData.TurretOptions).length;
        //body assets
        this.bodyData = Object.keys(this.cData.TankOptions).length;
        //colours
        this.colourData = Object.keys(this.cData.ColourOptions).length;
        //shot assets
        this.shotData = Object.keys(this.cData.ProjectileOptions).length;

        //create main section buttons
        //sections
        
        //this.upgradeSection = this.add.button(this.leftXPos, this.tankSection.bottom + 10, 'btn_join', this.showUpgradeSection, this);

        



        //Heading, Centre = stuff, right = info
        this.typeHeading = this.add.text(this.headingXPos, this.custYPos, "Type", { font: "14px Arial", fill: "#000000", align: "center" });
        this.custHeading = this.add.text(this.centreXPos, this.custYPos, "Options", { font: "14px Arial", fill: "#000000", align: "center" });
        this.infoHeading = this.add.text(this.rightXPos, this.custYPos, "Information", { font: "14px Arial", fill: "#000000", align: "center" });
        this.tankSecGroup.add(this.typeHeading);
        this.tankSecGroup.add(this.custHeading);
        this.tankSecGroup.add(this.infoHeading);
        // draw horizontal line here

        //line 1: Turret
        this.turretHeading = this.add.text(this.headingXPos, this.typeHeading.bottom + 20, "Turret", { font: "14px Arial", fill: "#000000", align: "center" });

        this.turLeftAsset = this.add.button(this.centreXPos, this.turretHeading.x, 'btn_left', this.doT, this); this.turLeftAsset.visible = true;//button
        this.turLeftAsset.direction = 'left';
        this.turAsset = this.add.sprite(this.turLeftAsset.right + 5, this.turretHeading.centerX, 'turret');//loop through data
        this.turAsset.scale.setTo(2);
        this.turRightAsset = this.add.button(this.turAsset.right + 5, this.turretHeading.x, 'btn_right', this.doT, this); this.turRightAsset.visible = true;//button
        this.turLeftAsset.direction = 'right';

        this.turLeftColour = this.add.button(this.centreXPos, this.turLeftAsset.bottom + 10, 'btn_left', this.doT, this);//button
        var turBMD = game.add.bitmapData(50,50);
        turBMD.ctx.beginPath();
        turBMD.ctx.rect(0, 0, 50, 50);
        turBMD.ctx.fillStyle = '#000000';
        turBMD.ctx.fill();
        this.turColour = game.add.sprite(this.turLeftColour.right + 5, this.turLeftColour.y, turBMD);
        this.turRightColour = this.add.button(this.turColour.right + 5, this.turLeftColour.y, 'btn_right', this.doT, this);//button

        this.tankSecGroup.add(this.turretHeading);
        this.tankSecGroup.add(this.turLeftAsset);
        this.tankSecGroup.add(this.turAsset);
        this.tankSecGroup.add(this.turRightAsset);
        this.tankSecGroup.add(this.turLeftColour);
        this.tankSecGroup.add(this.turColour);
        this.tankSecGroup.add(this.turRightColour);

        //line 2: Body
        this.bodyHeading = this.add.text(this.headingXPos, this.turRightColour.bottom + 20, "Body", { font: "14px Arial", fill: "#000000", align: "center" });
        this.bodyLeftAsset = this.add.button(this.centreXPos, this.bodyHeading.y, 'btn_left', this.doT, this); this.bodyLeftAsset.visible = true;//button
        this.bodyAsset = this.add.sprite(this.bodyLeftAsset.right + 5, this.bodyHeading.y, 'tank');//loop through data
        this.bodyAsset.scale.setTo(2);
        this.bodyRightAsset = this.add.button(this.bodyAsset.right + 5, this.bodyHeading.y, 'btn_right', this.doT, this); this.bodyRightAsset.visible = true;//button

        this.bodyLeftColour = this.add.button(this.centreXPos, this.bodyLeftAsset.bottom + 10, 'btn_left', this.doT, this);//button
        var bodyBMD = game.add.bitmapData(50, 50);
        bodyBMD.ctx.beginPath();
        bodyBMD.ctx.rect(0, 0, 50, 50);
        bodyBMD.ctx.fillStyle = '#8b5a00';
        bodyBMD.ctx.fill();
        this.bodyColour = game.add.sprite(this.bodyLeftColour.right + 5, this.bodyLeftColour.y, bodyBMD);
        this.bodyRightColour = this.add.button(this.bodyColour.right + 5, this.bodyLeftColour.y, 'btn_right', this.doT, this);//button

        this.tankSecGroup.add(this.bodyHeading);
        this.tankSecGroup.add(this.bodyLeftAsset);
        this.tankSecGroup.add(this.bodyAsset);
        this.tankSecGroup.add(this.bodyRightAsset);
        this.tankSecGroup.add(this.bodyLeftColour);
        this.tankSecGroup.add(this.bodyColour);
        this.tankSecGroup.add(this.bodyRightColour);

        //Line 3: Projectile asset
        this.shotHeading = this.add.text(this.headingXPos, this.bodyRightColour.bottom + 20, "Shot", { font: "14px Arial", fill: "#000000", align: "center" });
        this.shotLeftAsset = this.add.button(this.centreXPos, this.shotHeading.y, 'btn_left', this.doT, this); this.shotLeftAsset.visible = true;//button
        this.shotAsset = this.add.sprite(this.shotLeftAsset.right + 5, this.shotHeading.y, 'btn_pig');//loop through data
        this.shotRightAsset = this.add.button(this.shotAsset.right + 5, this.shotHeading.y, 'btn_right', this.doT, this); this.shotRightAsset.visible = true;//button

        this.tankSecGroup.add(this.shotHeading);
        this.tankSecGroup.add(this.shotLeftAsset);
        this.tankSecGroup.add(this.shotAsset);
        this.tankSecGroup.add(this.shotRightAsset);


        //this.healthBarText = this.add.text(this.textGenerator(this.healthBar_val.x + 20, this.healthBar_val.y + 1, this.playerTank.health + "/" + this.playerTank.data.health, 'small'));
        //this.host = this.add.button(this.lobbyLeftXPos, this.title.height + 100, 'btn_host', this.host, this);
        
        //this.tankText = this.add.text(this.headingXPos, this.custYPos, "Tank", { font: "18px Arial", fill: "#000000", align: "center" });
        //this.tankAssetText = this.add.text(this.centreXPos, this.custYPos, "Asset", { font: "14px Arial", fill: "#000000", align: "center" });
        //this.tankColourText = this.add.text(this.centreXPos, this.custYPos, "Colour", { font: "14px Arial", fill: "#000000", align: "center" });
        
        //this.turretText = this.add.text(this.headingXPos, this.tankText.bottom + 20, "Turret", { font: "18px Arial", fill: "#000000", align: "center" });
        //this.turretAssetText = this.add.text(this.centreXPos, this.tankText.bottom + 20, "Asset", { font: "14px Arial", fill: "#000000", align: "center" });
        //this.turretColourText = this.add.text(this.centreXPos, this.tankText.bottom + 20, "Colour", { font: "14px Arial", fill: "#000000", align: "center" });

        //this.tankSecGroup.add(this.tankText);
        //this.tankSecGroup.add(this.tankAssetText);
        //this.tankSecGroup.add(this.tankColourText);
        //this.tankSecGroup.add(this.turretText);
        //this.tankSecGroup.add(this.turretAssetText);
        //this.tankSecGroup.add(this.turretColourText);

        

        //this.barrelText = this.add.text(this.centreXPos, this.custYPos, "Tank", { font: "18px Arial", fill: "#000000", align: "center" });
        //this.tankAssetText = this.add.text(this.centreXPos, this.tankText.bottom + 10, "Asset", { font: "14px Arial", fill: "#000000", align: "center" });
        //this.tankColourText = this.add.text(this.centreXPos, this.tankText.bottom + 10, "Colour", { font: "14px Arial", fill: "#000000", align: "center" });

        //this.turretText = this.add.text(this.centreXPos, this.tankAssetText.bottom + 10, "Turret", { font: "18px Arial", fill: "#000000", align: "center" });
        //this.turretAssetText = this.add.text(this.centreXPos, this.turretText.bottom + 10, "Asset", { font: "14px Arial", fill: "#000000", align: "center" });
        //this.turretColourText = this.add.text(this.centreXPos, this.turretText.bottom + 10, "Colour", { font: "14px Arial", fill: "#000000", align: "center" });



        //this.fuelTile = this.add.sprite(10, 110, 'btn_Fuel');
        //this.healthBarText = this.add.text(this.textGenerator(this.healthBar_val.x + 20, this.healthBar_val.y + 1, this.playerTank.health + "/" + this.playerTank.data.health, 'small'));
        //this.host = this.add.button(this.lobbyLeftXPos, this.title.height + 100, 'btn_host', this.host, this);

        //firing styles
        //this.firStyleText = this.add.text(this.centreXPos, this.custYPos, "Firing Styles", { font: "50px Arial", fill: "#000000", align: "center" });
        //this.firStyleText.anchor.setTo(0.5);
        //make a foreach button
        //this.fSNormal = this.add.sprite(this.custLeftXPos, this.firStyleText.bottom + 10, 'btn_base');
        //this.fSBounce = this.add.sprite(this.fSNormal.right+10, this.firStyleText.bottom + 10, 'btn_base');
        //this.fSShrapnel = this.add.sprite(this.fSBounce.right + 10, this.firStyleText.bottom + 10, 'btn_base');
        //this.fSStraight = this.add.sprite(this.fSShrapnel.right + 10, this.firStyleText.bottom + 10, 'btn_base');

        //firing asset
       // this.firAssetsText = this.add.text(this.centreXPos, this.custYPos, "Firing Asset", { font: "50px Arial", fill: "#000000", align: "center" });
       // this.firAssetsText.anchor.setTo(0.5);
        //make a foreach thing here - buttons for each of the assets
       // this.fASelected = this.add.sprite(this.custLeftXPos, this.firStyleText.bottom + 10, 'btn_base');
      //  this.fABomb = this.add.sprite(this.custLeftXPos, this.fASelected.bottom + 10, 'btn_base');
      //  this.fAFlower = this.add.sprite(this.fABomb.right + 10, this.fASelected.bottom + 10, 'btn_base');
      //  this.fAPig = this.add.sprite(this.fAFlower.right + 10, this.fASelected.bottom + 10, 'btn_base');
      //  this.fAShot = this.add.sprite(this.fAPig.right + 10, this.fASelected.bottom + 10, 'btn_base');


        

    },

    showTankSection: function () {
        this.clearSelection();
        this.tankSecGroup.visible = true;
    },

    showUpgradeSection: function () {
        this.clearSelection();
        this.upgSecGroup.visible = true;
    },

    clearSelection: function () {
        if (this.tankSecGroup.visible) {
            this.tankSecGroup.visible = false;
        }
        else if (this.upgSecGroup.visible) {
            this.upgSecGroup.visible = false;
        }
    },

    changeAsset: function (input) {

    },

    changeColour: function(input){
        if (input.type == 'tank') {

        }

        //respray assets
    },

    doT: function () {},

    updateAsset: function () {
        cBMD = game.add.bitmapData(60, 40);
        cBMD.ctx.beginPath();
        cBMD.ctx.rect(0, 0, 180, 30);
        cBMD.ctx.beginPath();
        cBMD.ctx.beginPath();
    },

    backToLobby: function () {
        this.state.start("Lobby");
    }
};