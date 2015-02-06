var autoprefixer = require('autoprefixer-core');

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dev: {
                expand: true,
                cwd: 'sass',
                src: ['**/*.scss'],
                dest: 'public',
                ext: '.css',
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                }
            },
            dist: {
                expand: true,
                cwd: 'sass',
                src: ['**/*.scss'],
                dest: 'public',
                ext: '.min.css',
                options: {
                    style: 'compressed'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['styles']
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
        },
        uglify: {
            js: {
                options: {
                    sourceMap: true
                },
                files: {
                    'public/script.min.js': ['public/script.js']
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    autoprefixer({ browsers: ['last 2 version'] }).postcss
                ]
            },
            dist: {
                src: 'public/*.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('scripts', ['jshint:before', 'concat', 'jshint:after', 'uglify:js']);
    grunt.registerTask('styles', ['sass', 'postcss']);
    grunt.registerTask('default', ['jshint:grunt', 'styles', 'scripts', 'watch']);
};