const config = {
	debug: process.env.REACT_APP_DEBUG === 'TRUE' || false,
	apiPath: process.env.REACT_APP_API_PATH || `${window.location.origin}/api`,
	wsPath: process.env.REACT_APP_WS_PATH || window.location.origin,
	basePath: process.env.REACT_APP_BASE_PATH || window.location.origin,
	googlePlacesKey: process.env.REACT_APP_PLACES_KEY,
	recaptchaKey: process.env.REACT_APP_RECAPTCHA_KEY,
};

export default config;