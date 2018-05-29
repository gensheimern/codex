import openSocket from 'socket.io-client';

class Socket {
	constructor() {
		this.connection = openSocket();
	}

	subscribe(topic, callback) {
		this.connection.on(topic, callback);

		this.connection.emit('subscribe', {
			topic,
			token: localStorage.getItem('apiToken'),
		});
	}

	unsubscribe(topic) {
		this.connection.emit('unsubscribe', topic);
	}
}

export default Socket;
