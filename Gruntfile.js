module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      // options: {
       // banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      //},
      build: {
        src: ['js/global.js', 'js/libs/*.js'], //imput 
        dest: 'build/js/global.min.js' //output
      }
    },

});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Load the plugin that provides the "sass compiler" task.
  // grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);


// Live reloads of grunt commands
  grunt.loadNpmTasks('grunt-contrib-watch');

};