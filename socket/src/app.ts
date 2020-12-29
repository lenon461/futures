import { Server, Socket } from "socket.io";
import Subscribe from './Sub';

const io = new Server(5004, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
    },
});
Subscribe(io)
io.on("connect", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("ping", (cb) => {
        console.log("ping");
        cb();
    });
    socket.on('subscribe', function(room) { 
        console.log('joining room', room);
        socket.join(room); 
    })
    
    socket.on('unsubscribe', function(room) {  
        console.log('leaving room', room);
        socket.leave(room); 
    })

    

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});

export default io