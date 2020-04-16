import {Vec2D} from "./math.js";
import {Object2D} from "./math.js";
import Settings from "./Settings.js";

let HookType = {
    rope: 0,
    chain: 1,
};

class Hook extends Object2D {

    constructor(height, position, hook_type, buffer) {
        super(new Vec2D(6, height), position);
        this.hook_type = hook_type;
        this.expand = true;
        this.timer = Settings.HOOK_DURATION;
        this.buffer = buffer;
        this.toKill=false;
    }
    draw(ctx){
        // pintar el hook de buffer en la posición x,y de este objeto
        ctx.drawImage(this.buffer,this.position.x,this.position.y);
    }

    update(time_passed) {
        // si el hook no está en expansión -> decrementa el timer en time_passed unidades.
        // Si el timer es < 0 --> to_kill = true
        if(!this.expand){
            this.timer =this.timer-time_passed;
        }
        if(this.timer<0){
            this.toKill=true;
        }
        // si está en expansión y subiendo, incrementar tamaño y posición em increment unidades
        if (this.expand && this.position.y>0) {
            let increment = Settings.HOOK_SPEED * time_passed;
            this.size.add(new Vec2D(0,increment));
            this.position.add(new Vec2D(0,-increment));
        }
        // si sube hasta arriba, marcarlo para eliminar si es de tipo rope....
        // o marcarlo para que quede enganchado si es de tipo chain (reset de size 0 y position altura 0)
        if (this.position.y<=0){
            if (this.hook_type===0){
                this.toKill=true;
            }
            else if (this.hook_type===1) {
                this.size= new Vec2D(0,0);
                this.position.y=new Vec2D(this.position.x,0);
            }
        }
    }
}
export {HookType, Hook};



