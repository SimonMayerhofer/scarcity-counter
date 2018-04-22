/* eslint import/no-dynamic-require:0 */
/* eslint global-require:0 */
/* eslint-disable-next-line func-names */
module.exports = function (grunt) {
	// Utility to load the different option files
	// based on their names
	function loadConfig(path) {
		const glob = require('glob');
		const object = {};
		let key;
		glob.sync('*', { cwd: path }).forEach((option) => {
			key = option.replace(/\.js$/, '');
			object[key] = require(path + option);
		});
		return object;
	}

	// Initial config
	const config = {
		pkg: grunt.file.readJSON('package.json'),
		env: process.env,
		paths: {
			// PHP assets
			php: {
				files_std: [ // Standard file match
					'**/*.php',
					'!node_modules/**',
					'!vendor/**',
				],
				files: '<%= paths.php.files_std %>', // Dynamic file match
			},

			// JavaScript assets
			js: {
				grunt: {
					tasks: 'tasks/**/*.js',
					gruntfile: 'Gruntfile.js',
				},
				src: 'js', // Development code
				dest: 'js/build', // Production code
				dist_file_name: 'build.js',
				files_std: [ 						// Standard file match
					'<%= paths.js.src %>/**/*.js',
					'!<%= paths.js.dest %>/**/*',
					'<%= paths.js.grunt.tasks %>',
					'<%= paths.js.grunt.gruntfile %>',
				],
				files: '<%= paths.js.files_std %>', // Dynamic file match
			},
		},
	};

	// Load tasks from the tasks folder
	grunt.loadTasks('tasks');

	// Load all task options in tasks/options
	grunt.util._.extend(config, loadConfig('./tasks/options/'));

	/**
	 * Adds input source map for babel task.
	 * Because grunt tries to read the map before it was generated, this has to be done
	 * in a task. configureBabelInputSourceMap task must always be called before babel task.
	 */
	function setBabelInputSourceMap() {
		config.babel.options.inputSourceMap = grunt.file.readJSON(`${config.paths.js.dest}/${config.paths.js.dist_file_name}.js.map`);
	}
	grunt.task.registerTask('configureBabelInputSourceMap', 'configures babel input source map', setBabelInputSourceMap);

	grunt.initConfig(config);

	grunt.event.on('watch', (action, filepath) => {
		// Determine task based on filepath
		function getExt(path) {
			let ret = '';
			const i = path.lastIndexOf('.');
			if (i !== -1 && i <= path.length) {
				ret = path.substr(i + 1);
			}
			return ret;
		}

		switch (getExt(filepath)) {
		// PHP
		case 'php':
			grunt.config('paths.php.files', [filepath]);
			break;
			// JavaScript
		case 'js':
			grunt.config('paths.js.files', [filepath]);
			break;
		default:
			break;
		}
	});

	// loads any tasks listed in devDependencies in package.json
	require('load-grunt-tasks')(grunt);
};
