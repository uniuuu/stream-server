"use strict";

var config = require('config');
var log = require('./log');

module.exports = function () {
	// IP -> array of request timestamps
	var requests = {};

	// Periodically clean up stale entries to prevent memory leaks
	var cleanupInterval = setInterval(function () {
		let now = Date.now();
		let windowMS = config.get('rateLimitWindow') * 1000;
		for (let ip in requests) {
			// Remove timestamps outside the window
			requests[ip] = requests[ip].filter(function (ts) {
				return now - ts < windowMS;
			});
			// Remove empty entries
			if (!requests[ip].length) {
				delete requests[ip];
			}
		}
	}, 60 * 1000);
	// Don't prevent process exit
	if (cleanupInterval.unref) {
		cleanupInterval.unref();
	}

	return {
		/**
		 * Check whether a request from the given IP is within the rate limit.
		 *
		 * @param {String} ip
		 * @returns {Boolean} -- true if allowed, false if rate limited
		 */
		checkLimit: function (ip) {
			let now = Date.now();
			let maxRequests = config.get('rateLimitRequests');
			let windowMS = config.get('rateLimitWindow') * 1000;

			if (!requests[ip]) {
				requests[ip] = [];
			}

			// Remove timestamps outside the sliding window
			requests[ip] = requests[ip].filter(function (ts) {
				return now - ts < windowMS;
			});

			if (requests[ip].length >= maxRequests) {
				log.warn("Rate limit exceeded", { remoteAddress: ip });
				return false;
			}

			requests[ip].push(now);
			return true;
		},

		/**
		 * Reset all tracked state. Used by tests.
		 */
		reset: function () {
			requests = {};
		}
	};
}();
