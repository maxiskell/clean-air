!function(e){function t(t){for(var s,r,o=t[0],h=t[1],l=t[2],d=0,m=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&m.push(a[r][0]),a[r]=0;for(s in h)Object.prototype.hasOwnProperty.call(h,s)&&(e[s]=h[s]);for(c&&c(t);m.length;)m.shift()();return n.push.apply(n,l||[]),i()}function i(){for(var e,t=0;t<n.length;t++){for(var i=n[t],s=!0,o=1;o<i.length;o++){var h=i[o];0!==a[h]&&(s=!1)}s&&(n.splice(t--,1),e=r(r.s=i[0]))}return e}var s={},a={0:0},n=[];function r(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=s,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(i,s,function(t){return e[t]}.bind(null,s));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var o=window.webpackJsonp=window.webpackJsonp||[],h=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var c=h;n.push([1,1]),i()}([,function(e,t,i){"use strict";i.r(t);var s=i(0),a=i.n(s);class n extends a.a.Scene{constructor(){super("PlayScene")}preload(){this.load.image("ground","./assets/ground.png"),this.load.image("meeting","./assets/meeting.png"),this.load.image("cami-hurt","./assets/cami-hurt.png"),this.load.image("dome","./assets/dome.png"),this.load.image("pollen","./assets/pollen.png"),this.load.image("title","./assets/title.png"),this.load.image("order","./assets/order.png"),this.load.image("sarahblake","./assets/sarahblake.png"),this.load.spritesheet("cami","./assets/cami.png",{frameWidth:13,frameHeight:21}),this.load.spritesheet("killer","./assets/killer.png",{frameWidth:19,frameHeight:25}),this.load.image("go","./assets/go.png"),this.load.image("oh-no","./assets/oh-no.png"),this.load.image("restart","./assets/restart.png")}create(){const{width:e,height:t}=this.game.config;this.isGameRunning=!1,this.isGameEnding=!1,this.allowObstacleRespawn=!1,this.respawnTime=0,this.score=0,this.physics.world.setBounds(0,t-15,e,10,!1,!1,!1,!0),this.ground=this.add.tileSprite(0,t,800,25,"ground").setScale(1,1).setOrigin(0,1),this.meeting=this.add.image(e,0,"meeting").setOrigin(0,0),this.cami=this.physics.add.sprite(13,t,"cami").setDepth(1).setScale(5,5).setCollideWorldBounds(!0).setGravityY(5e3).setOrigin(0,1).setPosition(13,t-13),this.cami.body.setSize(10,21),this.obstacles=this.physics.add.group({immovable:!0,collideWorldBounds:!0}),this.initPollen(),this.goBtn=this.add.image(e/2,t/2,"go").setScale(5,5).setDepth(1).setInteractive({useHandCursor:!0}),this.gameOverScreen=this.add.container(e/2,t/2-50).setDepth(1).setAlpha(0),this.gameOverText=this.add.image(0,0,"oh-no").setScale(5,5),this.restartBtn=this.add.image(0,80,"restart").setScale(5,5).setInteractive({useHandCursor:!0}),this.gameOverScreen.add([this.gameOverText,this.restartBtn]),this.titleScreen=this.add.container(.8*e,.2*t).setDepth(1).setAlpha(0),this.titleText=this.add.image(0,0,"title").setScale(5,5),this.orderBtn=this.add.image(0,90,"order").setScale(5,5).setInteractive({useHandCursor:!0}),this.sarahText=this.add.image(0,180,"sarahblake").setScale(5,5),this.titleScreen.add([this.titleText,this.orderBtn,this.sarahText]),this.createControl(),this.handleScore()}update(e,t){(this.isGameRunning||this.isGameEnding&&this.meeting.x>0)&&(this.ground.tilePositionX+=5),this.isGameEnding&&(this.meeting.x>0?this.meeting.x-=5:(this.cami.anims.stop(),this.cami.setTexture("cami-hurt"),this.isGameRunning=!1,this.titleScreen.setAlpha(1))),this.isGameRunning&&(a.a.Actions.IncX(this.obstacles.getChildren(),-5),this.respawnTime+=5*t*.08,this.respawnTime>=1e3&&this.allowObstacleRespawn&&(this.placeObstacle(),this.respawnTime=0),this.obstacles.getChildren().forEach((e=>{e.getBounds().right<0&&e.destroy()})),this.cami.body.deltaAbsY()>0?this.cami.anims.stop():this.cami.play("cami-run",!0))}initGame(){this.goBtn.setAlpha(0),this.isGameRunning=!0,this.allowObstacleRespawn=!0,this.initAnims(),this.initColliders(),this.cami.play("cami-run",!0)}createControl(){this.goBtn.on("pointerdown",(()=>{this.initGame()})),this.restartBtn.on("pointerdown",(()=>{this.cami.setVelocityY(0),this.physics.resume(),this.obstacles.clear(!0,!0),this.isGameRunning=!0,this.allowObstacleRespawn=!0,this.gameOverScreen.setAlpha(0),this.anims.resumeAll()})),this.orderBtn.on("pointerdown",(()=>{window.open("https://www.hachettebookgroup.com/titles/sarah-blake/clean-air/9781643753416/")}));this.input.on("pointerdown",(()=>{this.isGameRunning&&(!this.cami.body.onFloor()||this.cami.body.velocity.x>0||(this.cami.setTexture("cami",0),this.cami.setVelocityY(-1600)))})),this.input.keyboard.on("keydown",(e=>{e.preventDefault(),this.isGameRunning&&(!this.cami.body.onFloor()||this.cami.body.velocity.x>0||(this.cami.setTexture("cami",0),this.cami.setVelocityY(-1600)))}))}removeControl(){this.input.on("pointerdown",null),this.input.keyboard.on("keydown",null)}initAnims(){this.anims.create({key:"cami-run",frames:this.anims.generateFrameNumbers("cami",{start:0,end:3}),frameRate:12,repeat:-1}),this.anims.create({key:"killer-knife",frames:this.anims.generateFrameNumbers("killer",{start:0,end:1}),frameRate:2,repeat:-1})}initColliders(){this.physics.add.collider(this.cami,this.obstacles,(()=>{this.physics.pause(),this.isGameRunning=!1,this.anims.pauseAll(),this.cami.setTexture("cami-hurt"),this.respawnTime=0,this.gameOverScreen.setAlpha(1),this.score=0}),null,this)}initPollen(){const e=new a.a.Geom.Rectangle(798,0,80,300),t=new a.a.Geom.Rectangle(0,0,80,350),i=new a.a.Geom.Rectangle(0,0,80,300),s=new a.a.Geom.Rectangle(0,800,80,350);this.add.particles("pollen",[{scale:5,emitZone:{source:e},deathZone:{source:t},lifeSpan:5e4,speedX:{min:-80,max:-600},speedY:{min:15,max:25},frequency:5},{scale:5,emitZone:{source:i},deathZone:{source:s},lifeSpan:5e4,speedX:{min:80,max:600},speedY:{min:15,max:25},frequency:5}]).setDepth(1)}placeObstacle(){const{width:e,height:t}=this.game.config,i=Math.floor(10*Math.random())+1,s=a.a.Math.Between(800,1200);let n;i>7?(n=this.obstacles.create(e+s,t-5,"killer").setScale(5,5).setOrigin(0,1),n.body.setSize(10,15),n.body.offset.y=5,n.play("killer-knife",!0)):(n=this.obstacles.create(e+s,t,"dome").setScale(5,5).setOrigin(0,1),n.body.setSize(15,10),n.body.offset.x=2,n.body.offset.y=5),n.setImmovable()}handleScore(){this.time.addEvent({delay:1e3,loop:!0,callbackScope:this,callback:()=>{this.isGameRunning&&(this.score<15?this.score+=1:this.handleEnding())}})}handleEnding(){this.allowObstacleRespawn=!1,0===this.obstacles.getLength()&&(this.isGameEnding=!0)}}var r=n;const o={type:a.a.AUTO,width:800,height:350,pixelArt:!0,backgroundColor:"#81cbcc",physics:{default:"arcade",arcade:{debug:!1}},scene:[r]};new a.a.Game(o)}]);