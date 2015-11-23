WBT.Preloader = function(game){
	this.ready = false;
}

WBT.Preloader.prototype ={
	
	preload:function(){
		
		this.background = this.add.sprite(0,0, 'main_menu_bg');
		this.splash_screen = this.add.sprite(0,0, 'sprites', 'main_menu_title');
		
		this.preloader_bar = this.add.sprite(this.game.world.centerX -127.5, this.game.world.centerY, 'sprites', 'progress');
		this.load.setPreloadSprite(this.preloader_bar);
		
		this.game.load.image('main_menu_bg', 'game_assets/scenery/main_menu.jpg');
		
		if(this.game.device.firefox || this.game.device.chrome || this.game.device.chromeOS){
			
			this.game.load.audiosprite('sound', '/game_assets/music/audio.mp3', 'game_assets/music/audio.json')
			
		}else{
			
		    this.game.load.audiosprite('sound', '/game_assets/music/audio.m4a', 'game_assets/music/audio.json')	
		
		}
		
	},
	
	create:function(){
		
		this.preloader_bar.cropEnabled = false;
		
	},
	
	update:function(){
		
		if(this.cache.isSoundDecoded('sound') && this.ready == false  ){
			
			this.state.start("Main_Menu");
		
		}
		
	}
	
}