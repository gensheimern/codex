const socketIO = require('socket.io');
const Auth = require('./routes/auth/Auth');

class LiveMessages {
	constructor(http) {
		this.io = socketIO(http);
		this.sockets = [];
		this.subscribers = [];

		this.subscribe = this.subscribe.bind(this);
		this.unsubscribe = this.unsubscribe.bind(this);
		this.publish = this.publish.bind(this);
		this.initialize = this.initialize.bind(this);
	}

	initialize() {
		this.io.on('connection', (socket) => {
			socket.on('disconnect', (msg) => {
				if (!msg || !msg.token) {
					socket.emit('err', 'Invalid token provided.');
				}

				const { token } = msg;
				Auth.validateJWT(token)
					.then((decoded) => {
						this.unsubscribe(decoded.userId);
					})
					.catch(() => {
						socket.emit('err', 'Invalid token provided.');
					});
			});

			socket.on('unsubscribe', (msg) => {
				if (!msg || !msg.token || !msg.topic) {
					socket.emit('err', 'Invalid token provided.');
				}

				const { topic, token } = msg;
				Auth.validateJWT(token)
					.then((decoded) => {
						this.unsubscribe(decoded.userId, topic);
					})
					.catch(() => {
						socket.emit('err', 'Invalid token provided.');
					});
			});

			socket.on('subscribe', (msg) => {
				if (!msg || !msg.token || !msg.topic) {
					socket.emit('err', 'Invalid token provided.');
				}

				const { topic, token } = msg;

				Auth.validateJWT(token)
					.then((decoded) => {
						this.subscribe(socket, decoded.userId, topic);
					})
					.catch(() => {
						socket.emit('err', 'Invalid token provided.');
					});
			});
		});
	}

	subscribe(socket, userId, topic) {
		this.subscribers.push({
			socket,
			userId,
			topic,
		});
	}

	unsubscribe(userId, topic) {
		const filterFunction = topic
			? sub => sub.userId !== userId || sub.topic !== topic
			: sub => sub.userId !== userId;
		this.subscribers = this.subscribers.filter(filterFunction);
	}

	publish(topic, message, rec) {
		const receiver = (rec instanceof Array) ? rec : [rec];

		this.subscribers
			.filter(sub =>
				(receiver.includes(sub.userId) || rec === 'all')
				&& (sub.topic === topic || sub.topic === 'all'))
			.forEach(sub => sub.socket.emit(topic, message));
	}
}

module.exports = (() => {
	let liveMessage = null;

	return {
		createLiveMessage(server) {
			liveMessage = new LiveMessages(server);
			return liveMessage;
		},

		getLiveMessage() {
			return liveMessage;
		},
	};
})();
