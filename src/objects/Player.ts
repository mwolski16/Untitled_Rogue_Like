import { CustomGameObject } from "../core/Core";
import { KeyBindings } from "../util/KeyBindings";
import { MovementComponent } from "./components/MovementComponent";
import { MovementComponentConfig } from "./components/MovementComponentConfig";
import Bullet from "./main/Bullet";
import Weapon from "./main/Weapon";
import WeaponConfig from "./main/WeaponConfig";

export default class Player extends CustomGameObject {

    movementComponent!: MovementComponent;

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
        const movementComponentConfig = new MovementComponentConfig()
                                            .withAcceleration(this.ACCELERATION)
                                            .withDeceleration(this.DECELERATION)
                                            .withVelocityMax(500)
                                            .withDampening(0.85)
                                            .build();

        this.movementComponent = new MovementComponent(this, movementComponentConfig);

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

    movePlayer(delta: number): void {
       
        if (this.keys.get('left')!.isDown) {
            this.movementComponent.moveLeft(delta);
        } else if (this.keys.get('right')!.isDown) {
            this.movementComponent.moveRight(delta);
        } else {
            this.movementComponent.stopX(delta);
        }

        if (this.keys.get('up')!.isDown) {
            this.movementComponent.moveUp(delta);
        } else if (this.keys.get('down')!.isDown) {
            this.movementComponent.moveDown(delta);
        } else {
            this.movementComponent.stopY();
        }

    }

    shoot(): void {
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