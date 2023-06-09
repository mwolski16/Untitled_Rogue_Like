export abstract class CustomGameObject extends Phaser.Physics.Arcade.Sprite {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
    }

    public abstract preload(): void;

    public abstract create(): void;

    public abstract update(time: number, delta: number): void;

    public abstract destroy(): void;

    public abstract getGameObject(): Phaser.GameObjects.GameObject;

    public abstract lookAtGameObject(gameObject: Phaser.GameObjects.GameObject): void;

    public abstract lookAtMouse(): void;

    public abstract lookAtPoint(x: number, y: number): void;

}