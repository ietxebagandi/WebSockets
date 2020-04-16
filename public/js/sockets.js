export default function setupSockets(){
// object to store desktop sockets
    let desktopSocket = null;

// the socket can be a phone or a desktop
    realtimeListener.on('connection', function (socket){

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
            console.log("Phone moved:" + data.beta  );
            if (desktopSocket)
                desktopSocket.emit('phone-move', data.beta);
                console.log("PROBA")
                if(data.beta <0) {
                    console.log("Negativo Iñi")
                    window.dispatchEvent(
                        new KeyboardEvent("keydown", {
                            code: "ArrowLeft"
                        })
                    );
                }else if(data.beta >0){
                    window.dispatchEvent(
                        new KeyboardEvent("keydown", {
                            code: "ArrowRight"
                        })
                    );
                }
        });
    });

}