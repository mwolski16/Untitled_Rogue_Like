interface BulletConfigInterface {
    scene: Phaser.Scene | null;
    x: number;
    y: number;
    texture: string;
    direction: number;
    speed: number;
}

export default class BulletConfig implements BulletConfigInterface {
    
        scene!: Phaser.Scene;
        x: number = 0;
        y: number = 0;
        texture: string = '';
        direction: number = 0;
        speed: number = 0;
    
       withScene(scene: Phaser.Scene): BulletConfig {
            this.scene = scene;
            return this;
        }

        withX(x: number): BulletConfig {
            this.x = x;
            return this;
        }

        withY(y: number): BulletConfig {
            this.y = y;
            return this;
        }

        withPosition(x: number, y: number): BulletConfig {
            this.x = x;
            this.y = y;
            return this;
        }

        withTexture(texture: string): BulletConfig {
            this.texture = texture;
            return this;
        }

        withDirection(direction: number): BulletConfig {
            this.direction = direction;
            return this;
        }

        withSpeed(speed: number): BulletConfig {
            this.speed = speed;
            return this;
        }

        build(): BulletConfig {
            return this;
        }
}