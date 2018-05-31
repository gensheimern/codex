const socketIO = require('socket.io');
const Auth = require('./routes/auth/Auth');

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
					socket.emit('err', 'Invalid token provided.');
				}

				const { token } = msg;

				Auth.validateJWT(token)
					.then((decoded) => {
						this.subscribe(socket, decoded.userId, msg.topic);

						user = decoded.userId;
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


/*module.exports = {
	createLiveMessage(server) {console.log('Live message created')
		liveMessage = new LiveMessages(server);
	},

	getLiveMessage() {
		console.log('Live message get:')
		console.log(liveMessage)
		return liveMessage;
	},
};*/

module.exports = (() => {
	let liveMessage = null;

	return {
		createLiveMessage(server) {
			liveMessage = new LiveMessages(server);
		},

		getLiveMessage() {
			return liveMessage;
		},
	};
})();
