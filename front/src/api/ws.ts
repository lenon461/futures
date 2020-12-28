class Socket {
  public socket: WebSocket = new WebSocket("ws://localhost:5004");
  private events: Record<string, any> = {};

  // open – 커넥션이 제대로 만들어짐
  // message – data received,
  // error – 웹소켓 에러
  // close – 커넥션 종료

  init() {
    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onerror = this.onerror;
    this.socket.onclose = this.onclose;
  }
  onopen = () => {
    console.log("ONOPEN");
    console.log("");
  };
  onmessage = onmessage => {
    console.log("ONMESSAGE");
    this.messageHandler(onmessage.data);
    console.log("");
  };
  onerror = error => {
    console.log("onerror");
    console.log(error);
    console.log("");
  };
  onclose = event => {
    console.log("onclose");
    console.log(event);
    console.log("");
  };

  addEvent(eventName, callback?) {
    console.log("addEvent");
    if (!callback)
      callback = () => console.log(eventName + " callback is not registered");
    this.events[eventName] = callback;
    console.log("");
  }
  messageHandler(onmessage) {
    console.log("messageHandler");
    const { event, data } = JSON.parse(onmessage);
    const f: Function = this.events[event];
    f.call(this, data);
    console.log("");
  }
  on(eventName, callback?) {
    console.log("on");
    if (!Object.keys(this.events).find(event => event == eventName))
      this.addEvent(eventName, callback);
    console.log("");
  }
  emit(event, args) {
    this.socket.send(JSON.stringify({ event, data: { ...args } }));
  }
}

const socket = new Socket();

export default socket;
