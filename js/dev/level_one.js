WBT.Level_One = function(game){
	
}

WBT.Level_One.prototype ={
	
	
	create:function(){
	    var t = this;
		
		this.bullets
		this.fire_rate = 100;
		this.next_shot = 0;
		
		this.bg = this.add.tileSprite(0,0, this.game.world.width, this.game.world.height, 'bg');
		this.middle_bg = this.add.tileSprite(0,300, this.game.world.width, this.game.world.height, 'middle_bg');
	    	
		this.cloud_sprites = this.game.add.group();
		this.game.time.events.loop(3200, create_cloud, this);
		
		this.middle_fg = this.add.tileSprite(0,390, this.game.world.width, this.game.world.height, 'middle_fg');

        this.player = this.add.sprite(300,300, 'whiskey_bomber');
        this.game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.anchor.set(0.2);
        this.player.scale.setTo(1.5);
		
        this.player.animations.add('run');
        this.player.animations.play('run', 15, true);

		this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.createMultiple(50, 'bullet');
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('outOfBoundsKill', true);
		
		
		
		function create_cloud(){
		  var cloud = t.cloud_sprites.create(t.game.world.width, t.game.world.randomY, 'cloud');
		  cloud.scale.setTo( ( Math.random()*.9)+.25  )
		}
	},
	update:function(){
		this.middle_bg.tilePosition.x -=2;
		this.middle_fg.tilePosition.x -=4;
	    this.cloud_sprites.setAll('x', -1, true, true, 1);
		this.cloud_sprites.forEach(this.check_cloud, this, true);
		
		if (this.game.physics.arcade.distanceToPointer(this.player, this.game.input.activePointer) > 8){
          this.game.physics.arcade.moveToPointer(this.player, 200);
        }else{
          this.player.body.velocity.set(0);
        }
        
		if (this.game.input.activePointer.isDown){
       // console.log("drop bombs and fire gun while this is down");
       // drop_bombs();
        this.fire_guns();
       }
		
	},
	fire_guns:function(){
      if (this.game.time.now > this.next_shot && this.bullets.countDead() > 0){
        
		this.next_shot = this.game.time.now + this.fire_rate;
        
		var bullet = this.bullets.getFirstDead();
        
		bullet.reset(this.player.x + 8, this.player.y - Math.random()*10);
        bullet.body.velocity.x = 670;
      } 
},
	check_cloud:function(cloud){
			
			try{
				if(cloud.x > t.game.width){
				
					this.cloud_sprites.remove(cloud);
				}
				
			}catch(e){
			
				
			}
			
		},
	
}