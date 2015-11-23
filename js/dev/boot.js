WBT = {
    music: null,
    /* Your game can check CanyonRunner.orientated in internal loops to know if it should pause or not */
    orientated: false
};

WBT.Boot = function (game) {

    game.state.add('Preloader', WBT.Preloader);
    game.state.add('MainMenu', WBT.Main_Menu);
   
};

CanyonRunner.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;

        if (this.game.device.desktop)
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }
        else
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(true, false);
            this.scale.setResizeCallback(this.gameResized, this);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
            this.scale.setScreenSize(true);
            this.scale.refresh();
        }

    },

    preload: function () {
        //Load Texture Atlas and Tilemap
      //  this.game.load.atlasJSONHash('sprites', 'assets/sprites/sprites.png', 'assets/sprites/sprites.json');
      //  this.game.load.image('desert-open', 'assets/backgrounds/desert-open.png');
    },

    create: function () {

        this.state.start('Preloader');

    },

    game_resized: function (width, height) {

    },

    enter_incorrect_orientation: function () {

       WBT.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leave_incorrect_orientation: function () {

        WBT.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};