export class MovementComponentConfig {
    acceleration: number = 0;
    deceleration: number = 0;
    velocityMax: number = 0;
    currentVelocityX: number = 0;
    currentVelocityY: number = 0;
    dampening: number = 0;

    withAcceleration(acceleration: number): MovementComponentConfig {
        this.acceleration = acceleration;
        return this;
    }

    withDeceleration(deceleration: number): MovementComponentConfig {
        this.deceleration = deceleration;
        return this;
    }

    withVelocityMax(velocityMax: number): MovementComponentConfig {
        this.velocityMax = velocityMax;
        return this;
    }

    withCurrentVelocityX(currentVelocityX: number): MovementComponentConfig {
        this.currentVelocityX = currentVelocityX;
        return this;
    }

    withCurrentVelocityY(currentVelocityY: number): MovementComponentConfig {
        this.currentVelocityY = currentVelocityY;
        return this;
    }

    withDampening(dampening: number): MovementComponentConfig {
        this.dampening = dampening;
        return this;
    }

    build(): MovementComponentConfig {
        return this;
    }
}