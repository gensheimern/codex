const dateUtils = {
	formatDate(date) {
		const msPerDay = 24 * 60 * 60 * 1000;
		const today = new Date();
		const yesterday = new Date(today.getTime() - msPerDay);

		if (today.getDate() === date.getDate()
			&& today.getMonth() === date.getMonth()
			&&today.getFullYear() === date.getFullYear()) {
			return 'Today';
		} else if (yesterday.getDate() === date.getDate()
			&& yesterday.getMonth() === date.getMonth()
			&&yesterday.getFullYear() === date.getFullYear()) {
			return 'Yesterday';
		} else {
			return `${date.getDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`;
		}
	}
};

module.exports = dateUtils;
