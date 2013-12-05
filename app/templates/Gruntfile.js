module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        atBegin: true
      },

      css: {
        files: ['sass/**/*.scss'],
        tasks: ['compass', 'cssmin']
      },
    },

    compass: {
      compile: {
        options: {
          httpPath: '/',
          sassDir: 'sass',
          cssDir: 'css',
          javascriptsDir: 'js',
          imagesDir: 'images',
          fontsDir: 'fonts',
          outputStyle: 'expanded',
          require: [
            'sass-globbing'
          ]
        }
      }
    },

    cssmin: {
      options: {
        report: 'min'
      },

      minify: {
        expand: true,
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "js/modules/",
          name: 'main',
          out: "js/main.js",
          optimize: 'none'
        }
      }
    },

    uglify: {
      options: {
        report: 'min',
        preserveComments: 'some'
      },

      build: {
        src: 'js/main.js',
        dest: 'js/main.min.js'
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: 'images-imagemin/'
        }]
      }
    }

  });

  grunt.registerTask('default', ['watch']);
};