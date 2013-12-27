module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'node-inspector': {
      dev: {}
    }
  });

  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.registerTask('default', ['node-inspector']);
};