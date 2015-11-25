WBT.Level_One = function(game){
	
}

WBT.Level_One.prototype ={
	
	
	create:function(){
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
	
		
		this.bg = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'bg');
		this.middle_bg = this.add.tileSprite(0,300, this.game.world.width, this.game.world.height, 'middle_bg');
	    
		this.cloud_rate = 1900;
		this.next_cloud = 100;
			
		this.cloud_sprites = this.game.add.group();
		this.cloud_sprites.enableBody = true;
		this.cloud_sprites.createMultiple(10,'cloud');
		this.cloud_sprites.setAll('checkWorldBounds',true);
		this.cloud_sprites.setAll('outOfBoundsKill',true);
		//this.game.time.events.loop(3200, create_cloud, this);
		
		console.log(this.cloud_sprites)
		
		this.middle_fg = this.add.tileSprite(0,390, this.game.world.width, this.game.world.height, 'middle_fg');

        this.player = this.add.sprite(300,300, 'whiskey_bomber');
        this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.anchor.set(0.2);
        this.player.scale.setTo(1.5);
		
        this.player.animations.add('run');
        this.player.animations.play('run', 15, true);
        
		
	    this.fire_rate = 100;
		this.next_shot = 0;
		
		this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
		
		this.bomb_rate = 100;
		this.next_bomb = 0;
		
		this.flask_bombs = this.game.add.group();
		this.flask_bombs.enableBody = true;
		this.flask_bombs.createMultiple(10, 'flask_bomb');
		this.flask_bombs.setAll('checkWorldBounds', true);
		this.flask_bombs.setAll('outOfBoundsKill', true);
		
		this.score = 0;
		this.player_stats_text_style = {
				font: '40px Helvetica',
				fill:'#fff',
				stroke:'#000',
				strokeThickness: 5,
				align:'center'
				
				
			}
		//}
		this.high_score_string = "Score:"
		this.score =  this.score; 
		this.game.add.text(25, 25, this.high_score_string, this.player_stats_text_style); 
		this.score_counter = this.game.add.text(25, 75, this.score, this.player_stats_text_style);
		
		var spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceBar.onDown.add(this.drop_bombs, this);
	},
	
	update:function(){
		
		this.game.physics.arcade.overlap(this.bullets, this.cloud_sprites, this.destroy_cloud, null, this);
	    this.game.physics.arcade.overlap(this.flask_bombs, this.cloud_sprites, this.destroy_cloud, null, this);
        this.game.physics.arcade.overlap(this.player, this.cloud_sprites, this.destroy_player, null, this);
		
		this.middle_bg.tilePosition.x -=2;
		this.middle_fg.tilePosition.x -=4;

		this.create_clouds();
		
		if (this.game.physics.arcade.distanceToPointer(this.player, this.game.input.activePointer) > 8){
          this.game.physics.arcade.moveToPointer(this.player, 200);
        }else{
          this.player.body.velocity.set(0);
        }
        
		if (this.game.input.activePointer.isDown){
       // console.log("drop bombs and fire gun while this is down");
       // drop_bombs();
          this.fire_guns();
		  //this.drop_bombs();
        }
	
		
	},
	create_clouds:function(){
		
      if (this.game.time.now > this.next_cloud && this.cloud_sprites.countDead() > 0){		
		this.next_cloud = this.game.time.now + this.cloud_rate;
		var cloud = this.cloud_sprites.getFirstDead();
		cloud.reset(this.game.world.width, this.game.world.randomY -100);
		cloud.body.velocity.x = (Math.random()* 600)*-1;

	  }
	  
	},
	//Change Kill enemies
	destroy_cloud:function(bullet, cloud){
		bullet.kill();
		cloud.kill();
		this.score =  this.score + 20;
		this.score_counter.setText(this.score);// this.game.add.text(25, 75, this.score, this.player_stats_text_style);
		
		
	},
	destroy_player:function(player, cloud){
		this.player.kill();
		
		//this.player_stats.topScore = this.score;

        //Set Highest Level Completed by Player

        this.player_stats.top_score = this.score;
        localStorage.setItem('WBT_3182_playerstats', JSON.stringify(this.player_stats));
		
		
		this.state.start('Main_Menu');


	},
	fire_guns:function(){
      if (this.game.time.now > this.next_shot && this.bullets.countDead() > 0){
        
		this.next_shot = this.game.time.now + this.fire_rate;
        
		var bullet = this.bullets.getFirstDead();
        
		bullet.reset(this.player.x + 8, this.player.y - Math.random()*10);
        bullet.body.velocity.x = 670;
      } 
},
drop_bombs:function(){
	if (this.game.time.now > this.next_bomb && this.flask_bombs.countDead() > 0)
    {
        this.next_bomb = this.game.time.now + this.bomb_rate;

        var bomb = this.flask_bombs.getFirstDead();

        bomb.reset(this.player.x + 8, this.player.y - 8);
        bomb.body.gravity.y = 500;
        bomb.anchor.set(0.5);
        this.game.add.tween(bomb).to({angle: 360}, 1600, Phaser.Easing.Cubic.In, true, 0, true);
    }
},
	
    handleUserDataGameLoss: function() {
        //Handle Player Scores and Times
        this.interval = 0; 
        this.step = this.playerStats.topScore - this.interval; 
        if (this.score > this.step) {
            this.playerStats.topScore = this.interval + this.score;
        }
        this.playerStats.topTime = this.playerStats.topTime + this.survivalTimer.seconds;
       
        localStorage.setItem('Canyon_Runner_9282733_playerStats', JSON.stringify(this.playerStats));
        //Reset Game After Pause
        this.resetTimer = this.game.time.create(this.game);
        this.resetTimer.add(4000, function(){
            this.explosion.kill();
            this.game.state.start('MainMenu');
        }, this);
        this.resetTimer.start();
    },
    handleUserDataLevelComplete: function() {
        //Handle Player Scores and Times
        this.playerStats.topScore = 50;
        this.playerStats.topTime = this.playerStats.topTime + this.survivalTimer.seconds;
        //Set Highest Level Completed by Player
        this.playerStats.returnPlayerToState = 'NavigationBandit';

        localStorage.setItem('Canyon_Runner_9282733_playerStats', JSON.stringify(this.playerStats));

        this.buttonAdvance = this.game.add.button(350, 500, 'sprites', this.nextLevel, this, 'advance-button', 'advance-button', 'advance-button');
        this.buttonAdvance.fixedToCamera = true;
    },
	
}