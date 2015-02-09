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
                tasks: ['sass:dev', 'autoprefixer']
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
            options: {
                map: true
            },
            all: {
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


    grunt.registerTask('static', 'Build HTML from PHP templates', function() {
        var contents = "";
        var dir = 'templates/';
        var dest = 'public/index.html';
        var srcs = [
            'head.php',
            'heading.php',
            '<!-- Main Content -->\n<main class="content" role="main">',
            'info.php',
            '<div class="panel-1"></div>',
            'staff.php',
            '<div class="panel-2"></div>',
            'donate.php',
            '</main>',
            'footer.php',
            'scripts.php'
        ];

        // Build Buffer Content
        for (var i in srcs) {
            var path = dir + srcs[i];
            if(grunt.file.isFile(path)) {
                contents += grunt.file.read(path);
            }
            else {
                contents += srcs[i];
            }
            contents += "\n";
        }

        // Save Buffer to file
        grunt.file.write(dest, contents);
    });
    grunt.registerTask('dev', ['clean', 'copy', 'jshint', 'uglify:dev', 'sass:dev' , 'autoprefixer']);
    grunt.registerTask('prod', [ 'clean', 'copy:pics', 'static', 'jshint', 'uglify:prod', 'sass:prod', 'autoprefixer']);
    grunt.registerTask('default', ['dev', 'watch']);
};