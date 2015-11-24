WBT.Preloader = function(game){
	
	this.ready = false;

}

WBT.Preloader.prototype ={
	
	preload:function(){
		console.log("preloading should add background");
		
		this.game.load.image('bg', 'game_assets/scenery/background.png');
		this.game.load.image('middle_bg','game_assets/scenery/middle_background.png');
		this.game.load.image('middle_fg','game_assets/scenery/middle_foreground.png');
		
		this.game.load.image( 'main_menu_title', 'game_assets/scenery/main_menu_title.png');
		this.game.load.image('progress_bar', 'game_assets/scenery/main_menu_loading.png');
		
	//	this.preloader_bar = this.add.sprite(this.game.world.centerX , this.game.world.centerY + 100,'progress_bar');
	//	this.preloader_bar.anchor.setTo(0.5, 0.5);
	//	this.preloader_bar.scale.setTo(0.6);
		//this.load.setPreloadSprite(this.preloader_bar);

	/*

		
		this.preloader_bar = this.add.sprite(this.game.world.centerX -127.5, this.game.world.centerY, 'game_assets/scenery/main_menu_loading.png', 'progress');
		this.load.setPreloadSprite(this.preloader_bar);
		
	
		this.game.load.image('main_menu_bg', 'game_assets/scenery/main_menu.jpg');
		
		if(this.game.device.firefox || this.game.device.chrome || this.game.device.chromeOS){
			
			this.game.load.audiosprite('sound', 'game_assets/music/audio.mp3', 'game_assets/music/audio.json')
			
		}else{
			
		    this.game.load.audiosprite('sound', 'game_assets/music/audio.m4a', 'game_assets/music/audio.json')	
		
		}
	*/	
	},
	
	create:function(){

	    //this.main_menu_bg = this.add.sprite(0,0,'main_menu_bg');
		console.log(this);
		this.bg = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'bg');
        
		this.middle_bg = this.add.tileSprite(0,140, this.game.world.width, this.game.world.height, 'middle_bg');

		
		this.middle_fg = this.add.tileSprite(0,220, this.game.world.width, this.game.world.height, 'middle_fg');
		this.middle_fg.scale.setTo(1);         
		
		this.splash_screen = this.add.sprite(this.game.world.centerX ,this.game.world.centerY- 80 , 'main_menu_title');
		this.splash_screen.anchor.setTo(0.5, 0.5);
		this.splash_screen.scale.setTo(0.65);
		
		
		
	  
//		this.preloader_bar.cropEnabled = false;
		
	},
	
	update:function(){
          this.middle_bg.tilePosition.x += -1;
		this.middle_fg.tilePosition.x += -3;
		//if(this.cache.isSoundDecoded('sound') && this.ready == false  ){
			//console.log("i think everything is good for main menu")
			//this.state.start("Main_Menu");
		
		//}
		
	}
	
}