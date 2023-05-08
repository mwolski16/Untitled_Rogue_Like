import { MovementComponentConfig } from "./MovementComponentConfig";
import { MovementComponentInterface } from "./MovementComponentInterface";

export class MovementComponent implements MovementComponentInterface  {

    parent: Phaser.Physics.Arcade.Sprite;
    config: MovementComponentConfig;
    body: Phaser.Physics.Arcade.Body;
    acceleration: number = 0;
    deceleration: number = 0;
    velocityMax: number = 0;
    currentVelocityX: number = 0;
    currentVelocityY: number = 0;
    dampening: number = 0;

    constructor(parent: Phaser.Physics.Arcade.Sprite, config: MovementComponentConfig) {
        this.parent = parent;
        this.body = parent.body as Phaser.Physics.Arcade.Body;
        this.config = config;
        this.acceleration = config.acceleration;
        this.deceleration = config.deceleration;
        this.velocityMax = config.velocityMax;
        this.currentVelocityX = config.currentVelocityX;
        this.currentVelocityY = config.currentVelocityY;
        this.dampening = config.dampening;
    }

    moveLeft(delta: number): void {
        this.currentVelocityX = Math.max(this.currentVelocityX - this.acceleration * delta / 1000, -this.velocityMax);
        this.body.setVelocityX(this.currentVelocityX);
    }

    moveRight(delta: number): void {
        this.currentVelocityX = Math.min(this.currentVelocityX + this.acceleration * delta / 1000, this.velocityMax);
        this.body.setVelocityX(this.currentVelocityX);
    }

    moveUp(delta: number): void {
        this.currentVelocityY = Math.max(this.currentVelocityY - this.acceleration * delta / 1000, -this.velocityMax);
        this.body.setVelocityY(this.currentVelocityY);
    }

    moveDown(delta: number): void {
        this.currentVelocityY = Math.min(this.currentVelocityY + this.acceleration * delta / 1000, this.velocityMax);
        this.body.setVelocityY(this.currentVelocityY);
    }

    stopX(delta: number): void {
        const velocityX = this.body.velocity.x;
        if (velocityX > 0) {
            this.currentVelocityX = Math.max(velocityX - this.deceleration * delta / 1000, 0);
        } else if (velocityX < 0) {
            this.currentVelocityX = Math.min(velocityX + this.deceleration * delta / 1000, 0);
        }
        this.currentVelocityX *= this.dampening;
        this.body.setVelocityX(this.currentVelocityX);
    }

    stopY(): void {
        const velocityY = this.body.velocity.y;
        if (velocityY > 0) {
            this.currentVelocityY = Math.max(velocityY - this.deceleration, 0);
        } else if (velocityY < 0) {
            this.currentVelocityY = Math.min(velocityY + this.deceleration, 0);
        }
        this.currentVelocityY *= this.dampening;
        this.body.setVelocityY(this.currentVelocityY);
    }
}
