module.exports = function (grunt) {
	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			expand: true,
            src: '*.css',
            dest: 'release/css/',
            ext: '.min.css'	
		},
        jshint: {
            ignore_warning: {
            options: {
                '-W015': true,
            },
            src: ['**.js'],
            },
        },
        uglify: {
            my_target: {
                files: {
                    'dest/output.min.js': ['src/css/main.js']
                }
            }
        }
	});
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.registerTask('default', ["cssmin"]);
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.registerTask('default', ["uglify"]);
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.registerTask('default', ["jshint"]);
};