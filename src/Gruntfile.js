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
          tasks: ["eslint","browserify","copy","uglify"], //running these tasks
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
      uglify: {
        options: {
          banner:
            "/*! <%= pkg.name %> <%= grunt.template.today('yyyy-mm-dd') %> */"
        },
        build: {
          files: [
            {
              expand: true,
              cwd: "../dist",
              src: "bundle.js",
              dest: "../dist",
              ext: ".min.js"
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
    grunt.loadNpmTasks("grunt-contrib-uglify-es");
    grunt.registerTask("default", ["eslint","browserify","copy","uglify", "watch"]); //same thing is true for registertasks
  };