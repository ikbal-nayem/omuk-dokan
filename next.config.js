// const withPWA = require('next-pwa');

// module.exports = withPWA({
module.exports = {
	i18n: {
		locales: ['en', 'bn'],
		defaultLocale: 'en',
		localeDetection: false,
	},
	reactStrictMode: false,
	// swcMinify: true,
	// compiler: {
	// 	removeConsole: true,
	// },
	images: {
		domains: [
			'robohash.org',
			'res.cloudinary.com',
			'i.pinimg.com',
			'node-ecommerce-backend-sn29.onrender.com',
			'img.drz.lazcdn.com',
		],
	},
	// pwa: {
	//   dest: "public",
	//   skipWaiting: true,
	//   disable: process.env.NODE_ENV === "development",
	// },
};
// });
