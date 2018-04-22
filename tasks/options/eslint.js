module.exports = {
	options: {
		configFile: '.eslintrc',
		useEslintrc: false,
		fix: true,
	},
	target: ['<%= paths.js.files %>'],
};
