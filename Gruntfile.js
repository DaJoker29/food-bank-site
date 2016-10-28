/* eslint-disable */
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      sass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['build-css']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['build-js']
      },
      html: {
        files: ['src/html/**/*.html'],
        tasks: ['copy:html']
      },
      vendor: {
        files: ['vendor/**'],
        tasks: ['copy:vendor']
      },
      assets: {
        files: ['assets/**'],
        tasks: ['copy:assets']
      },
      'bootstrap-js': {
        files: ['bootstrap/js/**/*.js'],
        tasks: ['bootstrap-js']
      },
      'bootstrap-css': {
        files: ['bootstrap/scss/**/*.scss'],
        tasks: ['bootstrap-css']
      },
      livereload: {
        options: { livereload: true },
        files: ['dist/**/*']
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/css/style.css': ['src/scss/style.scss']
        }
      }
    },
    postcss: {
      options: {
        processors: [
        require('autoprefixer')({browsers: 'last 2 versions'})
        ]
      },
      dist: {
        src: 'dist/css/style.css',
        map: true
      }
    },
    cssmin: {
      options: {
        sourceMap: true
      },
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: 'style.css',
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
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
          'dist/js/script.js': ['src/js/**/*.js']
        }
      },
      prod: {
        options: {
          sourceMap: true
        },
        files: {
          'dist/js/script.min.js': ['src/js/**/*.js']
        }
      }
    },
    eslint: {
      target: ['src/js/**/*.js']
    },
    clean: [ 'dist' ],
    copy: {
      vendor: {
        expand: true,
        cwd: 'vendor',
        src: '**/*',
        dest: 'dist/vendor'
      },
      assets: {
        expand: true,
        src: 'assets/**',
        dest: 'dist/'
      },
      html: {
        expand: true,
        cwd: 'src/html',
        src: '**',
        dest: 'dist/'
      },
      bootstrap: {
        expand: true,
        cwd: 'bootstrap/dist',
        src: '**/*',
        dest: 'dist/vendor/bootstrap'
      },
      'bootstrap-js': {
        expand: true,
        cwd: 'bootstrap/dist/js',
        src: '**/*',
        dest: 'dist/vendor/bootstrap/js'
      },
      'bootstrap-css': {
        expand: true,
        cwd: 'bootstrap/dist/css',
        src: '**/*',
        dest: 'dist/vendor/bootstrap/css'
      },
    },
    exec: {
      'compile-bs': {
        command: 'npm run bootstrap'
      },
      'compile-bs-js': {
        command: 'npm run bootstrap-js'
      },
      'compile-bs-css': {
        command: 'npm run bootstrap-css'
      },
    }
  });

  // JS Build Tasks
  grunt.registerTask(
    'build-js',
    'Compile Scripts',
    ['eslint', 'uglify']
    );
  grunt.registerTask(
    'build-css',
    'Compile CSS',
    ['sass', 'postcss', 'cssmin']
    );
  grunt.registerTask(
    'bootstrap-js',
    'Compile Bootstrap JavaScript source files',
    ['exec:compile-bs-js', 'copy:bootstrap-js']
  );
  grunt.registerTask(
    'bootstrap-css',
    'Compile Bootstrap Sass source files',
    ['exec:compile-bs-css', 'copy:bootstrap-css']
  );
  grunt.registerTask(
    'bootstrap',
    'Compile Bootstrap',
    ['exec:compile-bs', 'copy:bootstrap']
  );
  grunt.registerTask(
    'build',
    'Build project',
    ['clean', 'copy', 'bootstrap', 'build-js', 'build-css',]
    );
  grunt.registerTask(
    'default',
    'Build development version and run watch server',
    ['build', 'watch']
    );
};
