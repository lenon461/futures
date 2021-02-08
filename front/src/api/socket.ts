import { Manager } from "socket.io-client";
import Store from "../store";
class Socket {
  public manager = new Manager("ws://localhost:5004");
  public socket = this.manager.socket("/");

  init() {
    this.socket.on("connect", () => {
      console.log(`connect ${this.socket.id}`);
    });

    this.socket.on("disconnect", () => {
      console.log(`disconnect`);
    });

    const start = Date.now();
    this.socket.emit("ping", () => {
      console.log(`pong (latency: ${Date.now() - start} ms)`);
    });

    this.socket.emit("subscribe", "ticker", () => {
      // console.log(`pong (latency: ${Date.now() - start} ms)`);
    });
  }

  on(event, callback) {
    this.socket.on(event, callback);
  }
  emit(event, payload) {
    this.socket.emit(event, payload);
  }
}

const socket = new Socket();

export default socket;
