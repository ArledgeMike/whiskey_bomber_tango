WBT.Main_Menu = function(game){
	
}

WBT.Main_Menu.prototype ={
	
	create:function(){
		console.log("we in the main menu")
		//this.sound = this.game.add.audioSprite('sound');
		var t = this;
		this.player_stats;
		
		if(localStorage.getItem('WBT_3182_playerstats') != null  ){
			
			this.player_stats = JSON.parse(localStorage.getItem('WBT_3182_playerstats'));
			
		}else{
			
			this.player_stats = {
				
				top_score:0,
				top_time:0,
				return_to_state: 'Instructions'
				
			}
			
		}
		
			var t = this;
        this.main_menu_bg = this.add.sprite(0,0,'main_menu_bg');
		this.splash_screen = this.add.sprite(this.game.world.centerX ,this.game.world.centerY- 90 , 'main_menu_title');
		this.splash_screen.anchor.setTo(0.5, 0.5);
	    this.splash_screen.scale.setTo(0.8);
	    this.start_btn = this.add.button(425,this.game.world.height,'start_btn', this.start_game, this);
        this.game.time.events.add(300, this.start_btn_in, this);
		
		
	   // if(this.player_stats.top_score > 0 && this.player_stats.top_time > 0){
			console.log("set styles for scores")
			this.player_stats_text_style = {
				font: '40px Helvetica',
				fill:'#fff',
				stroke:'#000',
				strokeThickness: 5,
				align:'center'
				
				
			}
		//}
		this.high_score_string = "High Score:"
		this.high_score_score =  this.player_stats.top_score 
		this.game.add.text(25, 25, this.high_score_string, this.player_stats_text_style); 
		this.game.add.text(25, 75, this.high_score_score, this.player_stats_text_style);
		
		this.best_time_string = "Best Time:";
		this.best_time_time = "02:35:24";//this.player_stats.top_time;
		this.game.add.text(1000, 25, this.best_time_string, this.player_stats_text_style); 
		this.game.add.text(1000, 75, this.best_time_time, this.player_stats_text_style);
		
		//this.player_stats_string = "High Score: \n " + this.player_stats.top_score + " Best Time: \n " + this.player_stats.top_time;
		//this.player_stats_text = this.game.add.text(this.game.world.centerX - 350, this.game.world.centerY - 275, this.player_stats_string, this.player_stats_text_style);
		
		
		/*
	    this.bg = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'bg');
		this.middle_bg = this.add.tileSprite(0,300, this.game.world.width, this.game.world.height, 'middle_bg');
		
    
		

		//this.cloud_sprites = this.game.add.group();
		this.game.time.events.loop(3200, create_cloud, this);
		this.middle_fg = this.add.tileSprite(0,390, this.game.world.width, this.game.world.height, 'middle_fg');
		this.middle_fg.scale.setTo(1);     
		this.splash_screen = this.add.sprite(this.game.world.centerX ,this.game.world.centerY- 90 , 'main_menu_title');
		this.splash_screen.anchor.setTo(0.5, 0.5);
		this.splash_screen.scale.setTo(0.8);
		function create_cloud(){
	
			var cloud = t.cloud_sprites.create(t.game.world.width, t.game.world.randomY, 'cloud');
			cloud.scale.setTo( ( Math.random()*.9)+.25  )
		}
		*/

		
		/*
		this.sound.play('main_music');
		
		this.sound_btn = this.game.add.button(this.game.world.centerX + 335, this.game.world.centerY - 285, '/game_assets/scenery/start_btn.png', this.toggle_mute, this, 'sound-icon', 'sound-icon','sound-icon');
		this.sound_btn.fixedToCamera = true;
		
		if(!this.game.sound.mute){
			this.sound_btn.tint = 16777215;
		}else{
			this.sound_btn.tint = 16711680
		}
		
	
		
		this.player = this.game.add.sprite(64,64, '/game_assets/player/skeleton_plane.png', 'player');
		this.player.y = 320;
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.bounce.y =0.2;
		this.player.body.collideWorldBounds = true;
		this.player.body.setSize(64,34,0,15);
		
	
		

		
			*/
	},
	
	update:function(){
		//this.cloud_sprites.setAll('x', -2, true, true, 1);
		//this.cloud_sprites.forEach(this.check_cloud, this, true);
		
		

        /*
		if(!this.jets_fired){
			
			this.background.tilePosition.x -=2;
			
		}else{
			
			this.background.tilePosition.x -=10;
		}
		
		if(this.burn_engines){
			this.emitter.emitX = this.player.x -25;
			this.emitter.emitY = this.player.y + 30;
		}
		
	},
	
	toggle_mute: function(){
		
		if(!this.mute){
			
			this.game.sound.mute = true;
			this.mute = true;
			this.sound_btn.tint = 16777215;
			
		}else{
			
			this.game.sound.mute = false;
			this.mute = false;
			this.sound_btn.tinit = 16777215;
			
		}
		*/
	},
	
	start_btn_in:function(){
		
		this.intro_tween = this.game.add.tween( this.start_btn);
		this.intro_tween.to({
			y:550
		}, 2000);
		
		this.intro_tween.start();
		
		

		
	},
	
	start_game: function(){

	 this.state.start('Level_One');	
		
	}
	
}