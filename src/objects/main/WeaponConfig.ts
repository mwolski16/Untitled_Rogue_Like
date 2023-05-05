interface WeaponConfigInterface {
    scene: Phaser.Scene | null;
    x: number;
    y: number;
    texture: string;
}

export default class WeaponConfig implements WeaponConfigInterface {
    
        scene!: Phaser.Scene;
        x: number = 0;
        y: number = 0;
        texture: string = '';
    
       withScene(scene: Phaser.Scene): WeaponConfig {
            this.scene = scene;
            return this;
        }

        withX(x: number): WeaponConfig {
            this.x = x;
            return this;
        }

        withY(y: number): WeaponConfig {
            this.y = y;
            return this;
        }

        withPosition(x: number, y: number): WeaponConfig {
            this.x = x;
            this.y = y;
            return this;
        }

        withTexture(texture: string): WeaponConfig {
            this.texture = texture;
            return this;
        }

        build(): WeaponConfig {
            return this;
        }
}