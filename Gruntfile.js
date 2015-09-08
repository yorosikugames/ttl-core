module.exports = function(grunt) {
	grunt.initConfig({
		meta: {
			package: grunt.file.readJSON('package.json'),
			src: {
				main: 'lib',
				test: 'spec'
			},
			bin: {
				coverage: 'bin/coverage'
			}
		},
		jasmine: {
			coverage: {
				src: '<%= meta.src.main %>/**/*.js',
				options: {
					specs: '<%= meta.src.test %>/**/*[sS]pec.js',
					helpers: ['<%= meta.src.test %>/helpers/**/*.js'],
					template: require('grunt-template-jasmine-istanbul'),
					templateOptions: {
						coverage: '<%= meta.bin.coverage %>/coverage.json',
						report: [
							{
								type: 'html',
								options: {
									dir: '<%= meta.bin.coverage %>/html'
								}
							},
							{
								type: 'cobertura',
								options: {
									dir: '<%= meta.bin.coverage %>/cobertura'
								}
							},
							{
								type: 'text-summary'
							}
						]
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	grunt.registerTask('test:coverage', ['jasmine:coverage']);
};
