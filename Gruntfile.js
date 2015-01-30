module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            compile: {
                expand: true,
                cwd: 'sass',
                src: ['**/*.scss'],
                dest: 'public',
                ext: '.css',
                style: 'expanded'
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass']
            },
            js: {
                files: 'javascript/**/*.js',
                tasks: ['scripts']
            },
            php: {
                files: ['public/*.php', 'templates/*.php']
            }

        },
        jshint: {
            grunt: ['Gruntfile.js'],
            before: ['javascript/**/*.js'],
            after: ['public/script.js']
        },
        concat: {
            js: {
                src: ['javascript/**/*.js'],
                dest: 'public/script.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('scripts', ['jshint:before', 'concat', 'jshint:after']);
    grunt.registerTask('styles', ['sass']);
    grunt.registerTask('default', ['jshint:grunt', 'styles', 'scripts', 'watch']);
};