


export default function setupSockets(){
// object to store desktop sockets
    let desktopSocket = null;
    const serverURL = window.location.hostname + ":" +  window.location.port;
    const socket = io.connect(serverURL, {secure: true});
// register phone connection
    socket.emit('desktop-connect');


// the socket can be a phone or a desktop


        // receives a connect message from a desktop (for this example, we only have one yet)
        socket.on("desktop-connect", function () {
            console.log("Desktop Connected");
            desktopSocket = socket;
        });

        // receives a connect message from a phone
        socket.on("phone-connect", function () {
            console.log("Phone Connected");
            socket.desktop = false;
            if (desktopSocket) {
                // ... informs desktop that a phone has connected
                desktopSocket.emit('phone-connect');
            }
        });
        // receives a connect message from a phone
        socket.on("phone-move", function (data) {
            //if (desktopSocket) {

                //desktopSocket.emit('phone-move', data.beta);
                if (data < 0) {
                    console.log("Ezkerrra");
                    window.dispatchEvent(
                        new KeyboardEvent("keyup", {
                            code: "ArrowRight"
                        })
                    );


                    window.dispatchEvent(
                        new KeyboardEvent("keydown", {
                            code: "ArrowLeft"
                        })
                    );



                }else if (data > 0) {
                    window.dispatchEvent(
                        new KeyboardEvent("keyup", {
                            code: "ArrowLeft"
                        })
                    );



                    console.log("Eskuma");
                    window.dispatchEvent(
                        new KeyboardEvent("keydown", {
                            code: "ArrowRight"
                        })
                    );

                }

            //}
        });

}