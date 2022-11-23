module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,ico,html,png,txt,css,js}'
	],
	swDest: 'build/sw.js',
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ],
	// ya no se puede usar el comando workbox generateSW workbox-config.js
	// se tiene que usar el comando workbox injectManifest
	swSrc: 'src/sw-template.js'
};
