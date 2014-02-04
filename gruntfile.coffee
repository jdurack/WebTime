module.exports = (grunt) =>

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      app:
        expand: true
        cwd: "src/coffee"
        src: ["**/*.coffee"]
        dest: "app/js"
        ext: ".js"
    copy:
      html:
        files: [
          expand: true
          cwd: 'src/html'
          src: ['**/*.html']
          dest: 'app/html/'
          filter: 'isFile'
        ]
      img:
        files: [
          expand: true
          cwd: 'src/img'
          src: ['*']
          dest: 'app/img/'
          filter: 'isFile'
        ]
      manifest:
        files: [
          expand: true
          cwd: 'src'
          src: ['manifest.json']
          dest: 'app/'
        ]
    watch:
      app:
        files: 'src/coffee/**/*.coffee'
        tasks: ['coffee:app']
      copyHTML:
        files: 'src/html/**/*.html'
        tasks: ['copy:html']
      copyIMG:
        files: 'src/img/*'
        tasks: ['copy:img']
      copyManifest:
        files: 'src/manifest.json'
        tasks: ['copy:manifest']

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', [
    'coffee:app'
    'copy'
    'watch'
  ]