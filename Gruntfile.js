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
                }
            },
            prod: {
                expand: true,
                cwd: 'sass',
                src: ['**/*.scss'],
                dest: 'public',
                ext: '.css',
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass:dev', 'autoprefixer:dev']
            },
            js: {
                files: 'javascript/**/*.js',
                tasks: ['jshint', 'uglify:dev']
            },
            php: {
                files: ['templates/**/*.php']
            }

        },
        jshint: {
            all: ['javascript/**/*.js']
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    mangle: false,
                    beautify: true,
                    preserveComments: 'all',
                    compress: false
                },
                files: {
                    'public/script.js': ['javascript/**/*.js']
                }
            },
            prod: {
                files: {
                    'public/script.js': ['javascript/**/*.js']
                }
            }
        },
        clean: {
            all: ["public/"]
        },
        copy: {
            pics: {
                cwd: 'pics',
                src: '*.jpg',
                dest: 'public',
                expand: true
            },
            php: {
                cwd: 'templates',
                src: 'index.php',
                dest: 'public',
                expand: true
            }
        },
        autoprefixer: {
            dev: {
                src: 'public/style.css',
                map: true
            },
            prod: {
                src: 'public/style.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('dev', ['clean', 'copy', 'jshint', 'uglify:dev', 'sass:dev' , 'autoprefixer:dev']);
    grunt.registerTask('prod', [ 'clean', 'copy', 'jshint', 'uglify:prod', 'sass:prod', 'autoprefixer:prod']);
    grunt.registerTask('default', ['dev', 'watch']);
};