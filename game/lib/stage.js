import Boss from './boss';
import Enemy from './enemies';

class StageView {

  constructor(stage) {
    this.stage = stage;
    this.addBoss();
    this.enemies = [];
    this.addEnemies();
    this.slain_enemies = [];
    this.addKeyEvents();
    this.start();
  }

  addBoss() {
    this.boss = new Boss();
  }

  addEnemies() {
    for (let i = 0; i < 3 ; i++) {
      this.enemies.push(new Enemy());
    }
  }

  detectCollisions() {
    this.enemies.forEach((enemy) => {
      if (!((enemy.x_pos > this.boss.x_offset || enemy.x_offset < this.boss.x_pos) ||
      (enemy.y_pos > this.boss.y_offset || enemy.y_offset < this.boss.y_pos))) {
        if (enemy.alive) {this.slain_enemies.push(enemy);}
        enemy.alive = false;
      }
    });
  }

  addKeyEvents() {
    document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
      this.boss.keys[e.keyCode] = true;
    });
    document.getElementsByTagName("body")[0].addEventListener("keyup", (e) => {
      this.boss.keys[e.keyCode] = false;
    });
  }

  start() {
     requestAnimationFrame(this.animate.bind(this));

  }

  animate(time) {
    this.stage.clearRect(0, 0, 1300, 500);
    this.enemies.forEach((enemy) => {
      if (enemy.alive) {
        enemy.draw(this.stage);
      }
    });
    // console.log(this.slain_enemies);
    if (this.slain_enemies.length === this.enemies.length) {
      this.refresh_enemies();
    }
    this.boss.draw(this.stage);
    this.detectCollisions();
    requestAnimationFrame(this.animate.bind(this));
  }

  refresh_enemies() {
    this.slain_enemies = [];
    this.enemies.forEach((enemy) => {
      enemy.reposition();
    });
  }




}

export default StageView;
