const socket = new WebSocket("ws://shopsite.perttula.co/ws/messages");

const generate_id = _ => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

class Instance {
    constructor() {
        this.id = null;
        this.id_generated = false;
        this.socket = new WebSocket("ws://shopsite.perttula.co/ws/messages");
        this.socket.onmessage = this.onmessage;
        this.socket.onopen = this.onopen;
        this.socket.onclose = this.onclose;
        this.socket.onerror = this.onerror;
        this._generate_id.bind(this);
        this._subscribe.bind(this);
        this.socket.on('message', this.onmessage(e));
    }
    _generate_id() {
        if (this.id_generated) {
            return;
        }
        this.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        this.id_generated = true;
    }
    _subscribe() {
        this.socket.send(JSON.stringify({
            id: this.id,
            type: "subscribe",
            model: "messaging.Message",
            action: "retrieve",
            lookup_by: "id",
        }));
    }
    onmessage(e) {
        console.log("message received", JSON.parse(e.data));
    }

    onopen(e) {
        console.log(e);
    }

    onclose(e) {
        console.log(e);
    }

    onerror(e) {
        console.log(e);
    }
}

$(socket).on("message", function (e) {
    const data = JSON.parse(e.originalEvent.data);
    const message = data["message"];
    console.log(message);
});
