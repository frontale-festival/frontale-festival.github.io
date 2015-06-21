module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bower_concat: {
      all: {
        dest: 'bower_components/.dist/bower.js',
        cssDest: 'bower_components/.dist/bower.css',
        exclude: ['lesshat']
      }
    },
    uglify: {
      all: {
        options: {
          sourceMap: true,
          sourceMapIncludeSources: true
        },
        files: {
          'dist/<%= pkg.name %>.js': ['<%= bower_concat.all.dest %>', 'js/**/*.js']
        }
      }
    },
    less: {
      all: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']})
          ]
        },
        files: {
          "dist/<%= pkg.name %>.css": "css/main.less"
        }
      }
    },
    pages: {
      options: {
        bundleExec: true,
        config: '_config.yml',
        src: '.',
        dest: '.jekyll'
      },
      build: {}
    },
    copy: {
      dist: {
        files: [
          // Copy assets instead of building full site with 'jekyll'
          {expand: true, src: ['dist/*'], dest: '<%= pages.options.dest %>/'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          hostname: '*',
          base: '<%= pages.options.dest %>',
          livereload: true
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },
      bower_components: {
        files: ['bower_components/**/*.js'],
        tasks: ['bower_concat']
      },
      javascript: {
        files: ['<%= bower_concat.all.dest %>', 'js/**/*.js'],
        tasks: ['uglify', 'copy:dist'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['css/**/*'],
        tasks: ['less', 'copy:dist'],
        options: {
          livereload: true
        }
      },
      html: {
        files: ['layouts/**/*', 'img/**/*', '*.html'],
        tasks: ['pages:build'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-jekyll-pages');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['bower_concat', 'uglify', 'less', 'pages']);
  grunt.registerTask('develop', ['build', 'connect', 'watch']);
};
