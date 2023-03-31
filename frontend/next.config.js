/*
| Developed by Starton
| Filename : next.config.js
*/

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	webpack: (config, { isServer, webpack }) => {
		return config
	},
}

module.exports = nextTranslate(nextConfig)
