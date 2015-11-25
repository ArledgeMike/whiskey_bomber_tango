WBT.Preloader = function(game){
	
	this.ready = false;

}

WBT.Preloader.prototype ={
	
	preload:function(){
		console.log("preloading should add background");
		
//		this.game.load.image('main_menu_bg', 'game_assets/scenery/main_menu_bg.jpg');
	    this.game.load.image('start_btn', 'game_assets/scenery/start_btn.png');
		this.game.load.image('start_btn_over', 'game_assets/scenery/start_btn_over.png');
		
		this.game.load.image('bg', 'game_assets/scenery/background.png');
		this.game.load.image('middle_bg','game_assets/scenery/middle_background.png');
		this.game.load.image('middle_fg','game_assets/scenery/middle_foreground.png');
		this.game.load.image('cloud', 'game_assets/scenery/cloud.png');
		

		this.game.load.spritesheet('whiskey_bomber', 'game_assets/player/skeleton_plane.png', 84, 75);
		this.game.load.image('bullet', 'game_assets/player/weapons/bullet/bullet.png');
		this.game.load.image('flask_bomb', 'game_assets/player/weapons/flask_bomb/flask_bomb.png');
		
			
	    if(this.game.device.firefox || this.game.device.chrome || this.game.device.chromeOS){
			
			//this.game.load.audiosprite('sound', 'game_assets/music/audio.mp3', 'game_assets/music/audio.json')
			
		}else{
			
		  //  this.game.load.audiosprite('sound', 'game_assets/music/audio.m4a', 'game_assets/music/audio.json')	
		
		}

	},
	
	create:function(){
		var t = this;
        this.main_menu_bg = this.add.sprite(0,0,'main_menu_bg');
		this.splash_screen = this.add.sprite(this.game.world.centerX ,this.game.world.centerY- 90 , 'main_menu_title');
		this.splash_screen.anchor.setTo(0.5, 0.5);
	    this.splash_screen.scale.setTo(0.8);
	 
		this.preloader_bar = this.add.sprite(this.game.world.centerX , this.game.world.centerY + 140,'progress_bar');
		this.preloader_bar.anchor.setTo(0.5, 0.5);
		this.preloader_bar.scale.setTo(0.6);
		
        this.load.setPreloadSprite(this.preloader_bar);
	    this.preloader_bar.cropEnabled = false;

	  
	},
	
	update:function(){
		var t = this;

		//if(this.cache.isSoundDecoded('sound') && this.ready == false  ){
console.log("we out of there")
			this.state.start("Main_Menu");
		
		//}
		
	
	}
	
}