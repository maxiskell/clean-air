import Phaser from "phaser"

const GAME_SPEED = 5

class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene")
  }

  preload() {
    this.load.image("ground", "./assets/ground.png")
    this.load.image("meeting", "./assets/meeting.png")
    this.load.image("cami-hurt", "./assets/cami-hurt.png")
    this.load.image("dome", "./assets/dome.png")
    this.load.image("pollen", "./assets/pollen.png")
    this.load.image("title", "./assets/title.png")
    this.load.image("order", "./assets/order.png")
    this.load.image("sarahblake", "./assets/sarahblake.png")

    this.load.spritesheet("cami", "./assets/cami.png", {
      frameWidth: 13,
      frameHeight: 21,
    })

    this.load.spritesheet("killer", "./assets/killer.png", {
      frameWidth: 19,
      frameHeight: 25,
    })

    this.load.image("go", "./assets/go.png")

    this.load.image("oh-no", "./assets/oh-no.png")
    this.load.image("restart", "./assets/restart.png")
  }

  create() {
    const { width, height } = this.game.config

    this.isGameRunning = false
    this.isGameEnding = false
    this.allowObstacleRespawn = false
    this.respawnTime = 0
    this.score = 0

    this.physics.world.setBounds(
      0,
      height - 15,
      width,
      10,
      false,
      false,
      false,
      true
    )

    this.ground = this.add
      .tileSprite(0, height, 800, 25, "ground")
      .setScale(1, 1)
      .setOrigin(0, 1)

    this.meeting = this.add.image(width, 0, "meeting").setOrigin(0, 0)

    this.cami = this.physics.add
      .sprite(13, height, "cami")
      .setDepth(1)
      .setScale(5, 5)
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setOrigin(0, 1)
      .setPosition(13, height - 13)

    this.cami.body.setSize(10, 21)

    this.obstacles = this.physics.add.group({
      immovable: true,
      collideWorldBounds: true,
    })

    this.initPollen()

    this.goBtn = this.add
      .image(width / 2, height / 2, "go")
      .setScale(5, 5)
      .setDepth(1)
      .setInteractive({ useHandCursor: true })

    this.gameOverScreen = this.add
      .container(width / 2, height / 2 - 50)
      .setDepth(1)
      .setAlpha(0)
    this.gameOverText = this.add.image(0, 0, "oh-no").setScale(5, 5)
    this.restartBtn = this.add
      .image(0, 80, "restart")
      .setScale(5, 5)
      .setInteractive({ useHandCursor: true })

    this.gameOverScreen.add([this.gameOverText, this.restartBtn])

    this.titleScreen = this.add
      .container(width * 0.8, height * 0.2)
      .setDepth(1)
      .setAlpha(0)
    this.titleText = this.add.image(0, 0, "title").setScale(5, 5)
    this.orderBtn = this.add
      .image(0, 90, "order")
      .setScale(5, 5)
      .setInteractive({ useHandCursor: true })
    this.sarahText = this.add.image(0, 180, "sarahblake").setScale(5, 5)
    this.titleScreen.add([this.titleText, this.orderBtn, this.sarahText])

    this.createControl()
    this.handleScore()
  }

  update(_time, delta) {
    if (this.isGameRunning || (this.isGameEnding && this.meeting.x > 0)) {
      this.ground.tilePositionX += GAME_SPEED
    }

    if (this.isGameEnding) {
      if (this.meeting.x > 0) {
        this.meeting.x -= GAME_SPEED
      } else {
        this.cami.anims.stop()
        this.cami.setTexture("cami-hurt")
        this.isGameRunning = false
        this.titleScreen.setAlpha(1)
      }
    }

    if (!this.isGameRunning) return

    Phaser.Actions.IncX(this.obstacles.getChildren(), -GAME_SPEED)

    this.respawnTime += delta * GAME_SPEED * 0.08

    if (this.respawnTime >= 1000 && this.allowObstacleRespawn) {
      this.placeObstacle()
      this.respawnTime = 0
    }

    this.obstacles.getChildren().forEach((obstacle) => {
      if (obstacle.getBounds().right < 0) {
        obstacle.destroy()
      }
    })

    // if jumping...
    if (this.cami.body.deltaAbsY() > 0) {
      this.cami.anims.stop()
    } else {
      this.cami.play("cami-run", true)
    }
  }

  initGame() {
    this.goBtn.setAlpha(0)
    this.isGameRunning = true
    this.allowObstacleRespawn = true
    this.initAnims()
    this.initColliders()

    this.cami.play("cami-run", true)
  }

  createControl() {
    this.goBtn.on("pointerdown", () => {
      this.initGame()
    })

    this.restartBtn.on("pointerdown", () => {
      this.cami.setVelocityY(0)
      this.physics.resume()
      this.obstacles.clear(true, true)
      this.isGameRunning = true
      this.allowObstacleRespawn = true
      this.gameOverScreen.setAlpha(0)
      this.anims.resumeAll()
    })

    this.orderBtn.on("pointerdown", () => {
      window.open("https://www.workman.com/products/clean-air/hardback")
    })

    const jump = () => {
      if (!this.isGameRunning) return

      // if jumping or game starting...
      if (!this.cami.body.onFloor() || this.cami.body.velocity.x > 0) return

      this.cami.setTexture("cami", 0)
      this.cami.setVelocityY(-1600)
    }

    this.input.on("pointerdown", jump)
    this.input.keyboard.on("keydown", jump)
  }

  removeControl() {
    this.input.on("pointerdown", null)
    this.input.keyboard.on("keydown", null)
  }

  initAnims() {
    this.anims.create({
      key: "cami-run",
      frames: this.anims.generateFrameNumbers("cami", { start: 0, end: 3 }),
      frameRate: 12,
      repeat: -1,
    })

    this.anims.create({
      key: "killer-knife",
      frames: this.anims.generateFrameNumbers("killer", { start: 0, end: 1 }),
      frameRate: 2,
      repeat: -1,
    })
  }

  initColliders() {
    this.physics.add.collider(
      this.cami,
      this.obstacles,
      () => {
        this.physics.pause()
        this.isGameRunning = false
        this.anims.pauseAll()
        this.cami.setTexture("cami-hurt")
        this.respawnTime = 0
        this.gameOverScreen.setAlpha(1)
        this.score = 0
      },
      null,
      this
    )
  }

  initPollen() {
    const offscreenRight = new Phaser.Geom.Rectangle(798, 0, 80, 300)
    const screenLeft = new Phaser.Geom.Rectangle(0, 0, 80, 350)

    const offscreenLeft = new Phaser.Geom.Rectangle(0, 0, 80, 300)
    const screenRight = new Phaser.Geom.Rectangle(0, 800, 80, 350)

    this.add
      .particles("pollen", [
        {
          scale: 5,
          emitZone: { source: offscreenRight },
          deathZone: { source: screenLeft },
          lifeSpan: 50000,
          speedX: { min: -80, max: -600 },
          speedY: { min: 15, max: 25 },
          frequency: 5,
        },
        {
          scale: 5,
          emitZone: { source: offscreenLeft },
          deathZone: { source: screenRight },
          lifeSpan: 50000,
          speedX: { min: 80, max: 600 },
          speedY: { min: 15, max: 25 },
          frequency: 5,
        },
      ])
      .setDepth(1)
  }

  placeObstacle() {
    const { width, height } = this.game.config

    const chance = Math.floor(Math.random() * 10) + 1

    const distance = Phaser.Math.Between(800, 1200)

    let obstacle

    if (chance > 7) {
      obstacle = this.obstacles
        .create(width + distance, height - 5, "killer")
        .setScale(5, 5)
        .setOrigin(0, 1)

      obstacle.body.setSize(10, 15)
      obstacle.body.offset.y = 5

      obstacle.play("killer-knife", true)
    } else {
      obstacle = this.obstacles
        .create(width + distance, height, "dome")
        .setScale(5, 5)
        .setOrigin(0, 1)

      obstacle.body.setSize(15, 10)
      obstacle.body.offset.x = 2
      obstacle.body.offset.y = 5
    }

    obstacle.setImmovable()
  }

  handleScore() {
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callbackScope: this,
      callback: () => {
        if (!this.isGameRunning) return

        if (this.score < 15) this.score += 1
        else this.handleEnding()
      },
    })
  }

  handleEnding() {
    this.allowObstacleRespawn = false

    if (this.obstacles.getLength() === 0) {
      this.isGameEnding = true
    }
  }
}

export default PlayScene
