// eslint-disable-next-line func-names
module.exports = function (grunt) {
	grunt.registerTask('default', [
		'devUpdate:check',
		'build',
		'watch',
	]);
};
