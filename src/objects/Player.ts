import { CustomGameObject } from "../core/Core";
import { KeyBindings } from "../util/KeyBindings";

export default class Player extends CustomGameObject {

    keyboard = this.scene.input.keyboard;
    playerBody!: Phaser.Physics.Arcade.Body;
    keyBindings = KeyBindings;
    keys!: Map<string, Phaser.Input.Keyboard.Key>;

    ACCELERATION: number = 500; 
    DECELERATION: number = 15000; 

    currentVelocityX: number = 0; 
    currentVelocityY: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }
    
    preload(): void {

    }

    create(): void {
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.initialize();
    }

    update(time: number, delta: number): void {
        this.updateMovement();
    }

    destroy(): void {

    }

    getGameObject(): Phaser.GameObjects.GameObject {
        return this;
    }

    initialize(): void {
        this.keys = new Map([])
        this.playerBody = this.body as Phaser.Physics.Arcade.Body;

        if(!this.keyboard) { 
            throw new Error('Keyboard not found'); 
        }
        
        this.keyBindings.forEach((value, key) => {
            this.keys.set(key, this.keyboard!.addKey(new Phaser.Input.Keyboard.Key(this.keyboard!, value.charCodeAt(0))));
        });

    }

    updateMovement() {
        this.areAnyElementsMissing();
        this.movePlayer();
        this.scene.input.on('pointermove', () => {
            this.lookAtMouse();
        });
       
    }

    areAnyElementsMissing(): Error | void {
        if (!this.keyboard) {
            throw new Error('Keyboard not found');
        }

        if (!this.body) {
            throw new Error('Body not found');
        }

        if (!this.keyBindings) {
            throw new Error('KeyBindings not found');
        }
    }

    movePlayer() {
        const acceleration = this.ACCELERATION;
        const deceleration = this.DECELERATION;
        
        if (this.keys.get('up')!.isDown) {
            this.playerBody.setAccelerationY(-acceleration);
        } else if (this.keys.get('down')!.isDown) {
            this.playerBody.setAccelerationY(acceleration);
        } else {
            this.playerBody.setAccelerationY(0);
            this.playerBody.setDragY(deceleration); 
        }
    
        if (this.keys.get('left')!.isDown) {
            this.playerBody.setAccelerationX(-acceleration);
        } else if (this.keys.get('right')!.isDown) {
            this.playerBody.setAccelerationX(acceleration);
        } else {
            this.playerBody.setAccelerationX(0);
            this.playerBody.setDragX(deceleration); 
        }
    }

    lookAtMouse() {
        const mouse = this.scene.input.activePointer;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, mouse.x, mouse.y);
        this.setRotation(angle);
    }

}