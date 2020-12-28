import { Server, Socket } from "socket.io";
import Subscribe, { tickers } from './Sub';

const io = new Server(5004, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
    },
});

Subscribe()
io.on("connect", (socket: Socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("ping", (cb) => {
        console.log("ping");
        cb();
    });

    io.emit('ticker', JSON.stringify(tickers))
    setInterval(() => {
        io.emit('ticker', JSON.stringify(tickers))
    }, 1000);

    socket.on("disconnect", () => {
        console.log(`disconnect ${socket.id}`);
    });
});

export default io