import {Object2D, Vec2D} from './math.js';
import Settings from './Settings.js';

class Ball extends Object2D {
    
    constructor(radius, position, force) {
        super(new Vec2D(radius * 2, radius * 2), position);
        this.radius = radius;
        this.position = position;
        this.force = force;
        this.falling = this.force.y >= 0;
        this.max_height = Settings.SCREEN_HEIGHT - 150 - radius * 4;
        this.gravity=0.2;
        this.traction=0.8;
        this.damping=0.9;
        
    }


    update(time_passed) {
/*
        this.force.add(new Vec2D(0, Settings.GRAVITY * time_passed));
        this.position.add(this.force._mul(time_passed));

        if (this.x < this.radius || this.x > Settings.SCREEN_WIDTH - this.radius) {
            this.force = new Vec2D(-this.force.x, this.force.y);

            if (this.x < this.radius)
                this.position = new Vec2D(2 * this.radius - this.x, this.y);
            else
                this.position = new Vec2D(2 * (Settings.SCREEN_WIDTH - this.radius) - this.x, this.y);
        }
        if (this.y > Settings.SCREEN_HEIGHT - this.radius) {
            this.position = new Vec2D(this.x, 2 * (Settings.SCREEN_HEIGHT - this.radius) - this.y);
            this.force = new Vec2D(this.force.x, -(((this.y - this.max_height) * 2 * Settings.GRAVITY) ** .5));
        }
        this.falling = this.force.y > 0;

 */
        if (this.position.x + this.radius >= Settings.SCREEN_WIDTH) {
            this.size.x = -this.size.x * this.damping;
            this.position.x = Settings.SCREEN_WIDTH - this.radius;
        } else if (this.position.x - this.radius <= 0) {
            this.size.x = -this.size.x * this.damping;
            this.position.x = this.radius;
        }
        if (this.position.y + this.radius >= Settings.SCREEN_HEIGHT) {
            this.size.y = -this.size.y * this.damping;
            this.position.y = Settings.SCREEN_HEIGHT - this.radius;
            // traction here
            this.size.x *= this.traction;
        } else if (this.position.y - this.radius <= 0) {
            this.size.y = -this.size.y * this.damping;
            this.position.y = this.radius;
        }

        this.size.y += this.gravity; // <--- this is it

        this.position.x += this.size.x;
        this.position.y += this.size.y;
    }

    draw(context){
        context.beginPath()
        context.fillStyle = "#c82124";
        context.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }

    get pos(){
        return this.position;
    }

    get vel(){
        return this.force;
    }
}

export {Ball};