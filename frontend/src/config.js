const config = {
	debug: process.env.REACT_APP_DEBUG === 'TRUE',
	apiPath: process.env.REACT_APP_API_PATH,
	wsPath: process.env.REACT_APP_WS_PATH,
	basePath: process.env.REACT_APP_BASE_PATH,
}

export default config;