module.exports = (grunt) => {
  // Grunt configuration
  grunt.initConfig({
    ghostinspector: {
      options: {
        apiKey: process.env.GHOST_INSPECTOR_API_KEY
      },
      test1: {
        suites: ['53cf58c0350c6c41029a11be']
      },
      test2: {
        tests: ['53cf58fc350c6c41029a11bf', '53cf59e0350c6c41029a11c0']
      },
      test3: {
        tests: ['53cf58fc350c6c41029a11bf'],
        options: {
          startUrl: 'https://www.google.com.br'
        }
      }
    }
  })
  // Load grunt modules
  grunt.loadTasks('tasks')
}
