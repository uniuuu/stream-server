var os = require("os");

// Default config
var config = {
	dev: false,
	logLevel: 'info',
	hostname: os.hostname().split('.')[0],
	httpPort: 8080,
	proxyProtocol: false,
	https: false,
	trustedProxies: [],
	statusInterval: 10,
	keepaliveInterval: 25,
	retryTime: 10,
	redis: {
		host: '',
		prefix: ''
	},
	apiURL: 'https://api.zotero.org/',
	apiVersion: 3,
	apiRequestHeaders: {},
	globalTopics: [
		'styles',
		'translators'
	],
	// Minimum delay before clients should act on global topic notifications -- since these are triggered
	// by webhooks or other queued notifications, they need time to be processed elsewhere
	globalTopicsMinDelay: 60 * 1000,
	// Notification action period -- clients are given a randomly chosen delay within this time
	// period before they should act upon the notification, so that we don't DDoS ourselves
	globalTopicsDelayPeriod: 1800 * 1000,
	defaultDelay: 3 * 1000,
	continuedDelay: 30 * 1000,
	notContinuedDelay: 250,
	statsD: {
		host: ''
	}
};

module.exports = config;
