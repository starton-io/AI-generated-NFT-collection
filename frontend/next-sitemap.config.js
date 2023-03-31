/*
| Developed by Starton
| Filename : next-sitemap.js
*/

module.exports = {
	siteUrl: process.env.HOST || 'https://localhost:3000',
	generateRobotsTxt: true,
	exclude: ['/404', '/500'],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: '*',
				disallow: '/',
			},
		],
	},
}
