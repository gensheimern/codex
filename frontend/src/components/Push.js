import config from '../config';

/**
 * Handling the push messages sent over the browser api to notify the user.
 */
class Push {
	static sendPush(title, body) {
		// Check browser support for notifications
		if (!("Notification" in window)) {
			return;
		} else if (Notification.permission === "granted") {
			this.formatPush(title, body);
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission((permission) => {
				if (permission === "granted") {
					this.formatPush(title, body);
				}
			});
		}
	}

	static formatPush(title, body) {
		const icon = config.basePath + '/favicon.ico';
		const website = config.basePath;

		const notification = new Notification(title, {
			body,
			icon,
		});

		setTimeout(notification.close.bind(notification), 4000);

		notification.onClick = () => {
			window.open(website);
		}
	}
};

export default Push;