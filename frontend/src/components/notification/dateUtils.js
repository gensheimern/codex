const dateUtils = {
	/**
	 * Returns the formatted value of the date.
	 * @param {Date} date Date to format.
	 * @returns {string} The date in the format dd.mm.yyyy or Today or Yesterday.
	 */
	formatDate(date) {
		const msPerDay = 24 * 60 * 60 * 1000;
		const today = new Date();
		const yesterday = new Date(today.getTime() - msPerDay);

		if (today.getDate() === date.getDate()
			&& today.getMonth() === date.getMonth()
			&& today.getFullYear() === date.getFullYear()) {
			return 'Today';
		} else if (yesterday.getDate() === date.getDate()
			&& yesterday.getMonth() === date.getMonth()
			&& yesterday.getFullYear() === date.getFullYear()) {
			return 'Yesterday';
		}

		return `${date.getDate() + 1}.${date.getMonth() + 1}.${date.getFullYear()}`;
	},

	/**
	 * Returns the time of a date.
	 * @param {Date} date The date to get the time of.
	 * @returns {string} The time in the format hh:mm.
	 */
	formatTime(date) {
		const hour = date.getHours();
		const minutes = date.getMinutes();

		return `${hour}:${minutes}`;
	},
};

module.exports = dateUtils;
