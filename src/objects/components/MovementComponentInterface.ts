export interface MovementComponentInterface {
    acceleration: number;
    deceleration: number;
    velocityMax: number;
    currentVelocityX: number;
    currentVelocityY: number;
    dampening: number;
    moveLeft(delta: number): void;
    moveRight(delta: number): void;
    moveUp(delta: number): void;
    moveDown(delta: number): void;
    stopX(delta: number): void;
    stopY(): void;
  }