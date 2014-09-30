module.exports = function(grunt) {
    //Load Grunt Tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    //Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            dev: {
                options: {
                    data: {
                        debug: true,
                    },
                    pretty: true,
                },
                files: {
                    "public/debug.html": "src/jade/index.jade",
                }
            },
            prod: {
                options: {
                    compileDebug: false,
                },
                files: {
                    "public/release.html": "src/jade/index.jade",
                }
            }
        },
        less: {
            dev: {
                files: {
                    "public/style.css": "src/less/manifest.less",
                }
            },
            prod: {
                options: {
                    cleancss: true,
                },
                files: {
                    "public/style.min.css": "src/less/manifest.less",
                }
            }
        },
        connect: {
            options: {
                port: 7029,
                hostname: 'localhost',
                base: 'public',
                livereload: true
            },
            prod: {
                options: {
                    open: 'http://localhost:7029/release.html'
                }
            },
            dev: {
                options: {
                    open: 'http://localhost:7029/debug.html'
                }
            }
        },
        watch: {
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                    reload: true
                }
            },
            jade: {
                files: 'src/jade/**/*.jade',
                tasks: ['jade'],
                options: {
                    livereload: true,
                }
            },
            less: {
                files: 'src/less/*.less',
                tasks: ['less'],
                options: {
                    livereload: true,
                }
            }
        }
    });

    grunt.registerTask('compile', ['jade', 'less']);
    grunt.registerTask('prod', ['compile', 'connect:prod', 'watch']);
    grunt.registerTask('default', ['compile', 'connect:dev', 'watch']);
};