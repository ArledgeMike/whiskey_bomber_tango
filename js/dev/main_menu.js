WBT.Main_Menu = function(game){
	
}

WBT.Main_Menu.prototype ={
	
	create:function(){
		
		this.sound = this.game.add.audioSprite('sound');
		
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
	    
		this.background = this.game.add.tileSprite(0,0,1200,600, 'main_menu_bg');
		this.background.fixedToCamera = true;
		this.splash_screen = this.add.sprite(0,0,'/game_assets/scenery/main_menu_title.png', 'main_menu_title');
		
		this.sound.play('main_music');
		
		this.sound_btn = this.game.add.button(this.game.world.centerX + 335, this.game.world.centerY - 285, '/game_assets/scenery/start_btn.png', this.toggle_mute, this, 'sound-icon', 'sound-icon','sound-icon');
		this.sound_btn.fixedToCamera = true;
		
		if(!this.game.sound.mute){
			this.sound_btn.tint = 16777215;
		}else{
			this.sound_btn.tint = 16711680
		}
		
		if(this.player_stats.top_score > 0 && this.player_stats.top_time > 0){
			this.player_stats_text_style = {
				font: '30px Helvetica',
				fill:'#fff',
				stroke:'#000',
				strokeThickness: 5,
				align:'center'
				
				
			}
		}
		
		this.player_stats_string = "Your top score is: " + this.player_stats.top_score + " and your top time is: " + this.player_stats.top_time;
		this.player_stats_text = this.game.add.text(this.game.world.centerX - 350, this.game.world.centerY - 275, this.player_stats_string, this.player_stats_text_style);
		
		
		this.player = this.game.add.sprite(64,64, '/game_assets/player/skeleton_plane.png', 'player');
		this.player.y = 320;
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.bounce.y =0.2;
		this.player.body.collideWorldBounds = true;
		this.player.body.setSize(64,34,0,15);
		
		this.game.time.events.add(300, this.intro_flying_scene, this);
		
		this.start_btn = this.add.button(350,500,'/game_assets/player/skeleton_plane.png', this.start_game, this, 'start_btn', 'start_btn', 'start_btn' );
		
			
	},
	
	update:function(){
        
		if(!this.jet_fired){
			
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
		
	},
	
	intro_flying_scene:function(){
		
		this.intro_tween = this.game.add.tween(this.player);
		this.intro_tween.to({
			x:420
		}, 2000);
		
		this.intro_tween.start();
		
		
	}
	
}