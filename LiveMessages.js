const socketIO = require('socket.io');
const Auth = require('./routes/auth/Auth');

let liveMessage = null;

class LiveMessages {
	constructor(http) {
		this.io = socketIO(http);
		this.subscribers = [];

		this.io.on('connection', (socket) => {
			let user = null;

			socket.on('disconnect', () => {
				this.unsubscribe(user);
			});

			socket.on('unsubscribe', (topic) => {
				this.unsubscribe(user, topic);
			});

			socket.on('subscribe', (msg) => {
				if (!msg || !msg.token || !msg.topic) {
					socket.emit('error', new Error('Invalid token provided.'));
				}

				const { token } = msg;

				Auth.validateJWT(token)
					.then((decoded) => {
						this.subscribe(socket, decoded.userId, msg.topic);

						user = decoded.userId;
					});
			});
		});

		setInterval(() => {
			this.publish('test', 'Hi', 1);
			this.publish('test', 'Ho', 2);
			this.publish('test2', 'Hu', 1);
		}, 1000);
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


module.exports = {
	createLiveMessage(server) {
		liveMessage = new LiveMessages(server);
	},

	getLiveMessage() {
		return liveMessage;
	},
};
