import Keyboard from "./Keyboard.js";

export function  setupKeyboard(buster){

    const input =new Keyboard(buster);

    ['Space','ArrowUp','ArrowDown','ArrowRight','ArrowLeft'].forEach( botoia => {
        input.addMapping(botoia, keyState => {
            console.log(keyState);
        });


    });
    return input;
}







