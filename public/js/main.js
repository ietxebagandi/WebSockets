import {loadBackground, loadBalls, loadBuster, loadHookManager, loadImage, loadLevel} from "./loaders.js";
import Keyboard from "./Keyboard.js";
import {setupKeyboard} from "./input.js";
import Settings from "./Settings.js";
import CollisionManager from "./collisions.js";
import setupSockets from "./sockets.js";

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Settings.SCREEN_HEIGHT=canvas.height;
Settings.SCREEN_WIDTH=canvas.width;



window.onload = setupSockets;

Promise.all([loadImage('img/player.png'),loadImage('img/hookRope.png'),loadLevel('1'),loadImage('img/backgrounds.png')])
    .then(([image,hookImage,levelSpec,backgrounds]) =>{

        const drawBackground = loadBackground(backgrounds);

        const buster=loadBuster(image,levelSpec.player);
        const balls=loadBalls(levelSpec.balls);

        const hooks = [];
        const hookManager = loadHookManager(hookImage, hooks);
       // const buster = loadBuster(playerImage, levelSpec.player);
        buster.setHookManager(hookManager);

        const collisionManager = new CollisionManager(hooks,balls);


        let deltaTime=0;
        let lastTime=0;
        function update(time) {

            deltaTime = time-lastTime;
            drawBackground(context);
            buster.draw(context);
            buster.update(deltaTime/1000);

            balls.forEach(ball =>{
                ball.draw(context);
                ball.update(deltaTime/1000);
            });
            hooks.forEach(hook =>{
                hook.draw(context);
                hook.update(deltaTime/1000)
            });
            collisionManager.checkCollisions();
            lastTime = time;

            requestAnimationFrame(update); // llamar lo mas rapido que pueda el navegador llama al metodo
        }
        const input = setupKeyboard(buster);
        input.listenTo(window);

        update(0);

    });


