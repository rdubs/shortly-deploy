module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: { 
        separator: ';',
      },
      clientjs: {
        src: 'public/client/*.js',
        dest: 'public/dist/client.js'
      },
      lib: {
        src: 'public/lib/*.js',
        dest: 'public/dist/lib.js'
      }

    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      'my_target': {
        files: {
          'public/dist/output.min.js': ['public/dist/lib.js', 'public/dist/client.js']
        }
      }
    },

    eslint: {
      // target: [
      //   // Add list of files to lint here

      // ]
      target: './'
    },

    // cssmin: {
    // },

    watch: {
      scripts: {
        files: [
          'public/client/*.js',
          'public/lib/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      }
      // css: {
      //   files: 'public/*.css',
      //   tasks: ['cssmin']
      // }
    },

    shell: {
      prodServer: {
      }
    },
    gitpush: {
      'your_target': {
        options: {
          remote: 'live',
          branch: 'master'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('push', 'gitpush');

  grunt.registerTask('build', ['concat', 'uglify', 'eslint', 'test']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', ['build']
    // add your deploy tasks here
  );


};
