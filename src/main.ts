
import getConfig from './core/Config';
import Player from './objects/Player';
import './style.css';
import { Scene, Game, WEBGL, GameObjects } from 'phaser';

const canvas = document.getElementById('game') as HTMLCanvasElement;

class MainScene extends Scene {
  private player!: Player;

  constructor() {
    super('scene-game');
  }

  create() {
    this.player = new Player(this, 100, 100, '');
    this.player.create();
}
  

  update(time: number, delta: number) {
    this.updateMovement();
    this.player.update(time, delta);
  }

  updateMovement() {
   
    
  }
}

const config = getConfig(new MainScene());

new Game(config);
