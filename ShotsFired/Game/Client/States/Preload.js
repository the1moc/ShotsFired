var Preload = {
    preload: function () {
        // Display loading bar here, centre screen and fairly visible
        
        //Directory Shortcuts
        var IMG_DIR = "Game/Client/assets/images/";
        var BTN_DIR = IMG_DIR + "buttons/";
        var SPT_DIR = IMG_DIR + "sprites/";
        var BG_DIR = IMG_DIR + "backgrounds/";
        var AUD_DIR = "Game/Client/assets/audio/";
        var DAT_DIR = "Game/Client/assets/data/";
        var FNT_DIR = "Game/Client/assets/fonts/";//unused

        // Aesthetics
        this.load.image('menu_bg',          BG_DIR + 'menu_background.png');
        this.load.image('game_bg1',         BG_DIR + 'airadventurelevel1.png');
        this.load.image('game_bg2',         BG_DIR + 'airadventurelevel2.png');
        this.load.image('game_bg3',         BG_DIR + 'airadventurelevel3.png');
        this.load.image('game_bg4',         BG_DIR + 'airadventurelevel4.png');
        //this.load.image('game_background', BG_DIR + 'temp_background.png');
        
        this.load.image('title',            SPT_DIR + 'menu_title.png');

        // Tank
        this.load.image('turret',           SPT_DIR + 'turret.png');
        this.load.image('tank',             SPT_DIR + 'tank.png');		

        // Weapons
        this.load.image('wpn_shot',         SPT_DIR + 'wpn_shot.png');
        this.load.image('wpn_bomb',         SPT_DIR + 'wpn_bomb.png');
        this.load.image('wpn_flower',       SPT_DIR + 'wpn_flower.png');
        this.load.image('wpn_pig',          SPT_DIR + 'wpn_pig.png');

        // Buttons
        this.load.image('btn_weaponList',   BTN_DIR + 'btn_weaponsList.png');
        this.load.image('btn_play',         BTN_DIR + 'btn_play.png');
        this.load.image('btn_ready',        BTN_DIR + 'btn_ready.png');
        this.load.image('btn_custom',       BTN_DIR + 'btn_custom.png');
        this.load.image('btn_host',         BTN_DIR + 'btn_host.png');
        this.load.image('btn_join',         BTN_DIR + 'btn_join.png');
        this.load.image('btn_flower',       BTN_DIR + 'btn_flower.png');
        this.load.image('btn_bomb',         BTN_DIR + 'btn_bomb.png');
        this.load.image('btn_shot',         BTN_DIR + 'btn_shot.png');
        this.load.image('btn_pig',          BTN_DIR + 'btn_pig.png');
        this.load.image('btn_base',         BTN_DIR + 'btn_menuBase.png');
        this.load.image('btn_left',         BTN_DIR + 'LeftArrow.png');
        this.load.image('btn_right',        BTN_DIR + 'RightArrow.png');

        //Tiles for the GUI
        this.load.image('btn_Health',       SPT_DIR + 'healthTile.png');
        this.load.image('btn_Armour',       SPT_DIR + 'armourTile.png');
        this.load.image('btn_Fuel',         SPT_DIR + 'fuelTile.png');
        this.load.image('btn_Overlay',      SPT_DIR + 'tile_overlay.png');

        //shot tiles
        this.load.image('btn_normal',       BTN_DIR + 'NormalShot.png');
        this.load.image('btn_explosive',    BTN_DIR + 'ExplosiveShot.png');
        this.load.image('btn_bounce',       BTN_DIR + 'BounceShot.png');
        this.load.image('btn_direct',       BTN_DIR + 'StraightShot.png');
        

        //background url http://opengameart.org/content/background-2
        //dont preload the backgrounds - load them on game start up by passing in map name.

        // Audio
        this.load.audio('aud_fire',         AUD_DIR + 'aud_shotFiredOrig.wav');
        this.load.audio('aud_damage',       AUD_DIR + 'aud_damage.wav');
        this.load.audio('aud_destroy',      AUD_DIR + 'aud_destroyed.wav');
        this.load.audio('aud_lobbyMusic',   AUD_DIR + 'Elevator-music.mp3');

        // Data
        this.load.text('dat_projectile',    DAT_DIR + 'projectileData.json');
        //this.load.text('dat_customization', DAT_DIR + 'customizationData.json');
        this.load.text('dat_customization', DAT_DIR + 'settingsData.json');
        this.load.text('dat_firingStyles', DAT_DIR + 'firingStylesData.json');
    },

    create: function () {
        this.style = { font: "50px Arial", fill: "#000000", align: "center" };

        this.state.start('Menu', true, false);
    }
};
