import { CustomGameObject } from "../../core/CustomGameObject";
import Bullet from "./Bullet";
import BulletConfig from "./BulletConfig";
import WeaponConfig from "./WeaponConfig";

export default class Weapon extends CustomGameObject {

    bulletConfig!: BulletConfig;

    constructor(weaponConfig: WeaponConfig) {
        super(weaponConfig.scene, weaponConfig.x, weaponConfig.y, weaponConfig.texture);
        this.create();
    }

    public preload(): void {

    }

    public create(): void {
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
        this.setCollideWorldBounds(true);
        this.scaleX = 1.5;
        this.scaleY = 0.5;
        this.initialize();
    }

    public update(time: number, delta: number): void {
        this.lookAtMouse();
        this.setPosition(this.scene.input.activePointer.x, this.scene.input.activePointer.y);
    }

    public destroy(): void {

    }

    public getGameObject(): Phaser.GameObjects.GameObject {
        return this;
    }

    public initialize(): void {
        
    }

    public shoot(): Bullet {
        const direction = this.rotation;
        this.bulletConfig = new BulletConfig()
        .withScene(this.scene)
        .withPosition(this.x, this.y)
        .withTexture('bullet')
        .withDirection(direction)
        .withSpeed(100)
        .build();
        const bullet = new Bullet(this.bulletConfig);
        return bullet;
    }


    public lookAtGameObject(gameObject: Phaser.GameObjects.GameObject): void {

    }

    public lookAtMouse(): void {
        const mouse = this.scene.input.activePointer;
        const angle = Phaser.Math.Angle.Between(this.x, this.y, mouse.x, mouse.y);
        this.setRotation(angle);
    }


    public lookAtPoint(x: number, y: number): void {

    }

}