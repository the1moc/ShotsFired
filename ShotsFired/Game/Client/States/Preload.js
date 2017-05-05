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
        var UI_DIR = IMG_DIR + "UI/";

        // Aesthetics
        this.load.image('game_bg1', BG_DIR + 'airadventurelevel1.png');
        this.load.image('game_bg2', BG_DIR + 'airadventurelevel2.png');
        this.load.image('menu_bg2', BG_DIR + 'preview.jpg');
        
        this.load.image('title', SPT_DIR + 'menu_title.png');

        // Tank
        this.load.image('turret', SPT_DIR + 'turret.png');
        this.load.image('tank', SPT_DIR + 'tank.png');		

        //spritesheet
        this.load.spritesheet('shotSmoke', SPT_DIR + 'Smoke &amp; Fire.png', 16, 15, 16);
        

        // Weapons
        this.load.image('wpn_shot', SPT_DIR + 'wpn_shot.png');
        this.load.image('wpn_bomb', SPT_DIR + 'wpn_bomb.png');
        this.load.image('wpn_flower', SPT_DIR + 'wpn_flower.png');
        this.load.image('wpn_pig', SPT_DIR + 'wpn_pig.png');

        // Buttons
        //this.load.image('btn_weaponList', BTN_DIR + 'btn_weaponsList.png');
        //this.load.image('btn_play', BTN_DIR + 'btn_play.png');
        //this.load.image('btn_save', BTN_DIR + 'btn_save.png');
        //this.load.image('btn_return', BTN_DIR + 'btn_return.png');
        //this.load.image('btn_ready', BTN_DIR + 'btn_ready.png');
        //this.load.image('btn_custom', BTN_DIR + 'btn_custom.png');
        //this.load.image('btn_customizeTank',BTN_DIR + 'btn_customizeTank.png');
        //this.load.image('btn_host', BTN_DIR + 'btn_host.png');
        //this.load.image('btn_join', BTN_DIR + 'btn_join.png');
        this.load.image('btn_flower', BTN_DIR + 'btn_flower.png');
        this.load.image('btn_bomb', BTN_DIR + 'btn_bomb.png');
        this.load.image('btn_shot', BTN_DIR + 'btn_shot.png');
        this.load.image('btn_pig', BTN_DIR + 'btn_pig.png');
        //this.load.image('btn_base', BTN_DIR + 'btn_menuBase.png');
        //this.load.image('btn_left', BTN_DIR + 'LeftArrow.png');
        //this.load.image('btn_right', BTN_DIR + 'RightArrow.png');
        this.load.image('btn_na', SPT_DIR + 'na.png');
        
        //banner
        this.load.image('lrgBanner_top', UI_DIR + 'large_banner_top.png');
        this.load.image('lrgBanner_row', UI_DIR + 'large_banner_row.png');
        this.load.image('lrgBanner_bottom', UI_DIR + 'large_banner_bottom.png');
        this.load.image('banner_tl', UI_DIR + 'banner_top_left.png');
        this.load.image('banner_tm', UI_DIR + 'banner_top_middle.png');
        this.load.image('banner_tr', UI_DIR + 'banner_top_right.png');
        this.load.image('banner_ml', UI_DIR + 'banner_middle_left.png');
        this.load.image('banner_m', UI_DIR + 'banner_middle.png');
        this.load.image('banner_mr', UI_DIR + 'banner_middle_right.png');
        this.load.image('banner_bl', UI_DIR + 'banner_bottom_left.png');
        this.load.image('banner_bm', UI_DIR + 'banner_bottom_middle.png');
        this.load.image('banner_br', UI_DIR + 'banner_bottom_right.png');

        //dividers
        this.load.image('div_t', UI_DIR + 'thick_divider_top.png');
        this.load.image('div_m', UI_DIR + 'thick_divider_middle.png');
        this.load.image('div_b', UI_DIR + 'thick_divider_bottom.png');

        //btn_up
        this.load.image('btnUP', UI_DIR + 'btn_click.png');
        this.load.image('btnUP_l', UI_DIR + 'btn_left_up.png');
        this.load.image('btnUP_m', UI_DIR + 'btn_middle_up.png');
        this.load.image('btnUP_r', UI_DIR + 'btn_right_up.png');
       //this.load.image('radio_on', UI_DIR + 'btn_radio_on.png');
        //this.load.image('radio_off', UI_DIR + 'btn_radio_off.png');

        //playerUI
        this.load.image('playerUI_bars', UI_DIR + 'player_ui_imgBars.png');
        this.load.image('playerUI_stylesBG', UI_DIR + 'player_ui_firingOptionsBG.png');
        this.load.image('player_well', UI_DIR + 'player_well.png');
        this.load.image('imgWell', UI_DIR + 'imgWell.png');

        //shot tiles
        this.load.image('btn_Normal', BTN_DIR + 'btn_NormalStyle.png');
        this.load.image('btn_Explosive',BTN_DIR + 'btn_ExplosiveStyle.png');
        this.load.image('btn_Bounce', BTN_DIR + 'btn_BounceStyle.png');
        
        

        //background url http://opengameart.org/content/background-2
        //dont preload the backgrounds - load them on game start up by passing in map name.

        // Audio
        this.load.audio('aud_fire', AUD_DIR + 'aud_shotFiredOrig.wav');
        this.load.audio('aud_damage', AUD_DIR + 'aud_damage.wav');
        this.load.audio('aud_destroy', AUD_DIR + 'aud_destroyed.wav');
        this.load.audio('aud_lobbyMusic',AUD_DIR + 'Elevator-music.mp3');

        // Data
        this.load.text('dat_projectile', DAT_DIR + 'projectileData.json');
        //this.load.text('dat_customization', DAT_DIR + 'customizationData.json');
        //this.load.text('dat_customization', DAT_DIR + 'settingsData.json');
        this.load.text('dat_firingStyles', DAT_DIR + 'firingStylesData.json');
    },

    create: function () {
        this.state.start('Menu', true, false);
    },

    
};

function stylePicker(i) {
    var style;
    switch (i) {
        case 1: style = { font: "20px Arial", fill: "#000000", align: "center" };
            break;
        case 2: style = { font: "12px Arial", fill: "#000000", align: "center" };
            break;
    }

    return style;
};
