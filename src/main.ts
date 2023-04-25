
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
  // You can also set additional properties for the sprite, such as scale, rotation, and alpha
    //this.player.setPosition(100, 100);
    //this.player.setCollideWorldBounds(true); // Set the sprite to collide with the world bounds

    //set velocity of spirite
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
