// eslint-disable-next-line func-names
module.exports = function (grunt) {
	grunt.registerTask('codeCheck', [
		'phplint',
		'phpcbf',
		'phpcs',
		'eslint',
	]);
};
