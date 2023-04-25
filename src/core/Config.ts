import { Scene, WEBGL } from "phaser";
const canvas = document.getElementById('game') as HTMLCanvasElement;
export default function getConfig(scene: Scene) {
    return {
        type: WEBGL,
        width: window.innerWidth,
        height: window.innerHeight,
        canvas,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 0 },
            // debug: true
          }
        },
        scene: [
            scene
        ]
      }
      
}