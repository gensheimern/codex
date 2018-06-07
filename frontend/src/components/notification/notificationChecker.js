import Push from '../Push';
import getSocket from '../../Socket';

const notifications = {
	enable(type, cb) {
		getSocket().subscribe(type, (notification) => {
			const { title, message } = notification;

			Push.sendPush(title, message);

			cb(notification);
		});
	},

	disable(type) {
		getSocket().unsubscribe(type);
	},
};

export default notifications;
