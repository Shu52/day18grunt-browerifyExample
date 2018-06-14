module.exports = function(grunt) {
    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),
      watch: {
        scripts: {
          files: [              //files for grunt-watch to watch
            "./index.html",
            "./scripts/**/*.js",
            "./styles/**/*.css",
            "!node_modules/**/*.js"
          ],
          tasks: ["eslint","browserify","copy"], //running these tasks
          options: {
            spawn: false
          }
        }
      },
      browserify: {
        options: {
          browserifyOptions: {
            debug:true,
            paths: ["./scripts"]  //looks to scripts
          }
        },
        dist: {
          files: {
            "../dist/bundle.js": ["./scripts/**/*.js"] // going, source
          }
        }
      },
      copy: {    //grunt-copy
        main: {
          files: [
            {
              expand: true,       //each object is a file
              src: "index.html",
              dest: "../dist/"
            },
            {
              expand: true,
              src: "styles/*",
              dest: "../dist/"
            }

          ]
        }
      },
      eslint:{  //run eslint files to watch and files not to watch !
          src:["./scripts/**/*.js","!node_modules/**/*.js"]
      }
    });
    grunt.loadNpmTasks("grunt-eslint");    //method to lode tasks
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.registerTask("default", ["eslint","browserify","copy", "watch"]); //same thing is true for registertasks
  };