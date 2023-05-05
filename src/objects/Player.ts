import { CustomGameObject } from "../core/Core";
import { KeyBindings } from "../util/KeyBindings";
import Bullet from "./main/Bullet";
import Weapon from "./main/Weapon";
import WeaponConfig from "./main/WeaponConfig";

export default class Player extends CustomGameObject {

    keyboard = this.scene.input.keyboard;
    playerBody!: Phaser.Physics.Arcade.Body;
    keyBindings = KeyBindings;
    keys!: Map<string, Phaser.Input.Keyboard.Key>;

    weapon!: Weapon | null;

    ACCELERATION: number = 2500; 
    DECELERATION: number = 15000; 

    currentVelocityX: number = 0; 
    currentVelocityY: number = 0;

    bulletsArray: Array<Bullet> = [];

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
        const testWeaponConfig = new WeaponConfig()
                                .withScene(this.scene)
                                .withPosition(this.x, this.y)
                                .withTexture('weapon')
                                .build();
        this.weapon = new Weapon(testWeaponConfig);
    }

    update(time: number, delta: number): void {
        this.updateMovement(time, delta);
        this.updateWeapon(time, delta);
        this.updateBullets(time, delta);
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

        this.scene.input.on('pointermove', () => {
            //this.lookAtMouse();
        });

        this.scene.input.on('pointerdown', () => {
            console.log("click");
            this.shoot();
        });
       

    }

    updateMovement(time: number, delta: number) {
        this.areAnyElementsMissing();
        this.movePlayer(delta);
        this.lookAtMouse();
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

    movePlayer(delta: number) {
        const acceleration = this.ACCELERATION;
        const deceleration = this.DECELERATION;
        
        const velocityX = this.playerBody.velocity.x;
        const velocityY = this.playerBody.velocity.y;
        const velocityMax = 1500;

        if (Math.abs(this.playerBody.velocity.x) > velocityMax) {
            this.playerBody.velocity.x = Math.sign(this.playerBody.velocity.x) * velocityMax;
        }

        if (Math.abs(this.playerBody.velocity.y) > velocityMax) {
            this.playerBody.velocity.y = Math.sign(this.playerBody.velocity.y) * velocityMax;
        }

        if (this.keys.get('left')!.isDown) {
            this.currentVelocityX = Math.max(this.currentVelocityX - acceleration * delta / 1000, -velocityMax);
        } else if (this.keys.get('right')!.isDown) {
            this.currentVelocityX = Math.min(this.currentVelocityX + acceleration * delta / 1000, velocityMax);
        } else {
            if (velocityX > 0) {
                this.currentVelocityX = Math.max(velocityX - deceleration * delta / 1000, 0);
            } else if (velocityX < 0) {
                this.currentVelocityX = Math.min(velocityX + deceleration * delta / 1000, 0);
            }
        }

        if (this.keys.get('up')!.isDown) {
            this.currentVelocityY = Math.max(this.currentVelocityY - acceleration * delta / 1000, -velocityMax);
        } else if (this.keys.get('down')!.isDown) {
            this.currentVelocityY = Math.min(this.currentVelocityY + acceleration * delta / 1000, velocityMax);
        } else {
            if (velocityY > 0) {
                this.currentVelocityY = Math.max(velocityY - deceleration * delta / 1000, 0);
            } else if (velocityY < 0) {
                this.currentVelocityY = Math.min(velocityY + deceleration * delta / 1000, 0);
            }
        }
        const dampening = 0.95;
        this.currentVelocityX *= dampening;
        this.currentVelocityY *= dampening;

        this.playerBody.setVelocityX(this.currentVelocityX);
        this.playerBody.setVelocityY(this.currentVelocityY);
    }

    shoot() {
        if(!this.weapon) {
            throw new Error('Weapon not found');
        }
        this.bulletsArray.push(this.weapon.shoot());
    }

    updateBullets(time: number, delta: number) {
        this.bulletsArray.forEach((bullet) => {
            bullet.update(time, delta);
        });
    }

    updateWeapon(time: number, delta: number) {
        if(!this.weapon) {
            throw new Error('Weapon not found');
        }
        this.weapon.update(time, delta);
        this.weapon.setPosition(this.x+5, this.y);
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