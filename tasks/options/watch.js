module.exports = {
	options: {
		livereload: true,
		spawn: false,
	},

	scripts: {
		files: ['<%= paths.js.files_std %>'],
		tasks: [
			'eslint',
			'webpack',
		],
	},

	php: {
		files: ['<%= paths.php.files_std %>'],
		tasks: [
			'phplint',
			'phpcbf',
			'phpcs',
		],
	},
};
