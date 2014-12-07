module.exports = (grunt) ->

  # Grunt configuration
  grunt.initConfig

    bump:
      options:
        files: ['package.json']
        push: false

    coffee:
      options:
        bare: true
      source:
        expand: true
        cwd: './'
        src: ['tasks/ghostinspector.coffee']
        dest: './'
        ext: '.js'

    watch:
      backend:
        files: ['tasks/ghostinspector.coffee']
        tasks: ['coffee']

    ghostinspector:
      options:
        apiKey: 'ff586dcaaa9b781163dbae48a230ea1947f894ff'
      test1:
        suites: ['53cf58c0350c6c41029a11be']
      test2:
        tests: ['53cf58fc350c6c41029a11bf', '53cf59e0350c6c41029a11c0']
      test3:
        tests: ['53cf58fc350c6c41029a11bf']
        options:
          startUrl: 'https://www.google.com.br'


  # Build project
  grunt.registerTask 'build', ['coffee']

  # Load grunt modules
  grunt.loadNpmTasks('grunt-bump')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadTasks('tasks')
