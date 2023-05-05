import { CustomGameObject } from "../../core/Core";
import BulletConfig from "./BulletConfig";

export default class Bullet extends CustomGameObject {

    speed: number = 0;
    direction: number = 0;

    constructor(bulletConfig: BulletConfig) {
        super(bulletConfig.scene, bulletConfig.x, bulletConfig.y, bulletConfig.texture);
        this.speed = bulletConfig.speed;
        this.direction = bulletConfig.direction;
        this.create();
    }

    public preload(): void {

    }


    public create(): void {
        this.initialize()
    }


    public update(time: number, delta: number): void {
        const angle = this.direction;
        const velocityX = Math.cos(angle) * this.speed/100 * delta;
        const velocityY = Math.sin(angle) * this.speed/100 * delta;

        this.x += velocityX;
        this.y += velocityY;

        this.rotation = angle;


        if (this.x > this.scene.game.canvas.width || this.x < 0 || this.y > this.scene.game.canvas.height || this.y < 0) {
            this.destroy();
        }
    }

    public initialize(): void {
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }

    public destroy(): void {

    }

    public getGameObject(): Phaser.GameObjects.GameObject {
        return this;
    }

    public lookAtMouse() {
        const mouse = this.scene.input.activePointer;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, mouse.x, mouse.y);
        this.setRotation(angle);
    }

    public lookAtPoint(x: number, y: number): void {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, x, y);
        this.setRotation(angle);
    }

    public lookAtGameObject(gameObject: CustomGameObject): void {
        const angle = Phaser.Math.Angle.Between(this.x, this.y, gameObject.x, gameObject.y);
        this.setRotation(angle);
    }
}