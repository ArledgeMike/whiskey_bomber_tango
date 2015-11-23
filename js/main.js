
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });



function preload() {


    game.load.spritesheet('bird', 'game_assets/enemies/bird/bird.png',50,50);
  //  game.load.image('moon', 'game_assets//sky.png');
    
    game.load.spritesheet('skeleton_plane', 'game_assets/player/skeleton_plane.png', 84, 75);
    game.load.image('bomb', 'game_assets/player/weapons/flask_bomb/flask_bomb.png');
    game.load.image('bullet', 'game_assets/player/weapons/bullet/bullet.png');
    

}
var player;
var bomb;
var bullets;
var birds;

var fire_rate=100;
var next_shot =0;

var bomb_rate =500;
var next_fire = 0;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  
 // var sky = game.add.sprite(0,0,'moon');
 
  
  bomb = game.add.group();
  bomb.enableBody = true;

  bomb.createMultiple(50, 'bomb');
  bomb.setAll('checkWorldBounds', true);
  bomb.setAll('outOfBoundsKill', true);
  
  
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.createMultiple(50, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
  
 
  birds = game.add.group();
  birds.enableBody = true;
  
  for(var i =0; i < 12; i++){
  
    var bird= birds.create(game.canvas.width - Math.random()*400  ,Math.random()* game.canvas.height, 'bird');  
    var flap = bird.animations.add('flap');
    var scale =1 + Math.random()* 0.8;
     
    bird.scale.setTo(scale,scale);
    bird.smoothed=false;
  
    bird.animations.play('flap', 7, true);
  
  }
  
  
  player = game.add.sprite(200, 250, 'skeleton_plane');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  player.anchor.set(0.5);

  var run =  player.animations.add("run");
  player.animations.play("run", 15,true);
  
  

}

function update() {

  game.physics.arcade.overlap(bullets, birds, shoot_bird, null, this);
  game.physics.arcade.overlap(bomb, birds, bomb_bird, null, this);

  if (game.physics.arcade.distanceToPointer(player, game.input.activePointer) > 8)
  {
    game.physics.arcade.moveToPointer(player, 200);
  }
  else
  {
    player.body.velocity.set(0);
  }
  
  if (game.input.activePointer.isDown)
      {
       // console.log("drop bombs and fire gun while this is down");
        drop_bombs();
        fire_guns();
       }
  
}
function fire_guns(){
  if (game.time.now > next_shot && bullets.countDead() > 0)
    {
        next_shot = game.time.now + fire_rate;

        var bullet = bullets.getFirstDead();

        bullet.reset(player.x + 8, player.y - Math.random()*10);
        bullet.body.velocity.x = 670;
    } 
}
function drop_bombs(){
  //console.log(bomb);
  if (game.time.now > next_fire && bomb.countDead() > 0)
    {
        next_fire = game.time.now + bomb_rate;

        var bombs = bomb.getFirstDead();

        bombs.reset(player.x + 8, player.y - 8);
        bombs.body.gravity.y = 500;
        bombs.anchor.set(0.5);
           game.add.tween(bombs).to({angle: 360}, 1600, Phaser.Easing.Cubic.In, true, 0, true);
    }
}

function shoot_bird(bullet, bird){
  bullet.kill();
  bird.kill();
  
  
}
function bomb_bird(bomb, bird){
  bomb.kill();
  bird.kill();
  
  
}
