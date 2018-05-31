import openSocket from 'socket.io-client';
import config from './config';

let socket = null;

class Socket {
	constructor() {
		this.connection = openSocket(config.wsPath);
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

function getSocket()  {
	return socket || new Socket();
}

export default getSocket;
