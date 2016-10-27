/* eslint-disable */
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      sass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass', 'postcss']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['eslint', 'uglify']
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
      livereload: {
        options: { livereload: true },
        files: ['dist/**/*']
      }
    },
    sass: {
      dev: {
        expand: true,
        cwd: 'src/scss',
        src: ['**/*.scss'],
        dest: 'dist',
        ext: '.css',
        options: {
          style: 'expanded',
          sourcemap: 'none'
        }
      },
      prod: {
       expand: true,
       cwd: 'src/scss',
       src: ['**/*.scss'],
       dest: 'dist',
       ext: '.min.css',
       options: {
        style: 'compressed'
      }
    }
  },
  postcss: {
    options: {
      processors: [
      require('autoprefixer')({browsers: 'last 2 versions'})
      ]
    },
    dev: {
      src: 'dist/style.css',
      map: true
    },
    prod: {
      src: 'dist/style.min.css'
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
        'dist/script.js': ['src/js/**/*.js']
      }
    },
    prod: {
      options: {
        sourceMap: true
      },
      files: {
        'dist/script.min.js': ['src/js/**/*.js']
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
      src: 'vendor/**',
      dest: 'dist/'
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
    }
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
    ['sass', 'postcss']
    );
  grunt.registerTask(
    'build',
    'Build project',
    ['clean', 'copy', 'build-js', 'build-css']
    );
  grunt.registerTask(
    'default',
    'Build development version and run watch server',
    ['build', 'watch']
    );
};
