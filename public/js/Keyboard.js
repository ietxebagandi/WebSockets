import Vec2D from "./math.js";
import Settings from "./Settings.js";
import Player from "./Player.js";

const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState{

    constructor(buster){
        //guarda el estado de cada tecla
        this.keyStates=new Map();

        //guarda el callback de cada tecla
        this.keyMap=new Map();

        this.buster=buster;
    }
    addMapping(keyCode,callback){
        this.keyMap.set(keyCode,callback);
    }
    handleEvent(event){
        const {code} =event;
        if(!this.keyMap.has(code)){
            return;
        }
        event.preventDefault();
        const keyState = event.type==='keydown' ? PRESSED: RELEASED;

        if(this.keyStates.get(code) === keyState){
            return;
        }
        this.keyStates.set(code,keyState);
        this.keyMap.get(code)(keyState);
        console.log(this.keyStates);

        if(event.type==='keydown'){
            if(event.code==="ArrowLeft"){
                this.buster.direction=new Vec2D(-1 ,0);
            }else if(event.code==="ArrowRight"){
                this.buster.direction=new Vec2D(1,0);
            }else if(event.code==="ArrowUp"){
                this.buster.direction=new Vec2D(0,1);
            }else if(event.code==="ArrowDown"){
                this.buster.direction=new Vec2D(0,-1);
            }else if(event.code==="Space"){
                this.buster.shoot();
            }
        }
        if(event.type==='keyup'){
            this.buster.direction=new Vec2D(0,0);
        }
        console.log(event.key);

    }
    listenTo(window){
        ['keydown','keyup'].forEach( eventName =>{
            window.addEventListener(eventName, event =>{
                this.handleEvent(event);
            })
        })
    }
}



