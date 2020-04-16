import SpriteSheet from "./SpriteSheet.js";
import Player from "./Player.js";
import {Vec2D} from "./math.js"
import Settings from "./Settings.js";
import {Ball} from "./Ball.js";
import {Hook} from "./Hook.js";

export  function  loadLevel(currentLevel) {
    return fetch(`levels/${currentLevel}.json`).then(r =>r.json()); //devuelve el 1.json en primer instancia
}
export function loadImage(url){
    return new Promise(resolve => {
        const image=new Image();
        image.addEventListener('load', () =>{
            resolve(image);
        });
        image.src=url;
    })
}
export function  loadBuster(image,playerSpec) {
    const spritSheet=new SpriteSheet(image,32,32);
    spritSheet.define('idle',5,0)
    spritSheet.define('buster-1',2,0);
    spritSheet.define('buster-2',3,0);
    spritSheet.define('buster-3',4,0);

    const pos=new Vec2D(playerSpec.pos[0],playerSpec.pos[1]);
    const size = new Vec2D(32,32);

    return new Player(size,pos,spritSheet);
}

export function loadBalls(balls) {
    var bolas = [];
    balls.forEach(bola =>{
        bolas.push(new Ball(bola.radius, new Vec2D(bola.pos[0],bola.pos[1]), new Vec2D(bola.force[0], bola.force[1])));
    });
    return bolas;
}

export function loadHookManager(hookImage,hooks) {
    const spriteSheet= new SpriteSheet(hookImage,5,700);
    spriteSheet.define('rope',1,0);
    return function hookManager(x,y) {
        if(hooks.length<Settings.MAX_HOOKS){
            hooks.push(new Hook(6 ,new Vec2D(x,y),0,hookImage));
        }

    }
}
export function loadBackground(backgrounds) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 192;
// recortar super-sprite y dejarlo preparado en un buffer
    const context = buffer.getContext("2d");
    context.drawImage(backgrounds, 0, 0,
        buffer.width, buffer.height,
        0, 0, buffer.width, buffer.height,);
    return function (ctx) {
        ctx.drawImage(buffer,
            0, 0,
            buffer.width, buffer.height,
            0, 0,
            Settings.SCREEN_WIDTH, Settings.SCREEN_HEIGHT);
    }
}