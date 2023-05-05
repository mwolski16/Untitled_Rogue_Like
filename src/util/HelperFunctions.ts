import { CustomGameObject } from "../core/CustomGameObject";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomFloat = (min: number, max: number) => Math.random() * (max - min) + min;
export function getAngleToMouse(gameObject: CustomGameObject): number {
    const mouse = gameObject.scene.input.activePointer;
    const angle = Phaser.Math.Angle.Between(gameObject.x, gameObject.y, mouse.x, mouse.y);
    return angle;
}