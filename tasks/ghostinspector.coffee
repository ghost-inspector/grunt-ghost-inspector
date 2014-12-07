async = require('async')

module.exports = (grunt) ->

  # register "ghostinspector" task
  grunt.registerTask 'ghostinspector', 'Execute your Ghost Inspector tests', () ->

    # reference to Grunt done() function
    gruntDone = @async()

    options = @options()
    # get suites to execute
    if typeof options.suites is 'string'
      options.suites = [options.suites]
    else if options.suites not instanceof Array
      options.suites = []
    # get tests to execute
    if typeof options.tests is 'string'
      options.tests = [options.tests]
    else if options.tests not instanceof Array
      options.tests = []

    # create Ghost Inspector object
    GhostInspector = require('ghost-inspector')(options.apiKey)

    # execute any specified suites
    if options.suites.length then grunt.log.writeln('Executing suites...')
    async.eachSeries options.suites, (suiteId, done) ->
      # execute suite
      GhostInspector.executeSuite suiteId, (err, data, passing) ->
        # evaluate api response
        if err then return done('Error executing suite "' + suiteId + '": ' + err)
        if passing
          grunt.log.ok('Suite "' + suiteId + '" passed.')
          done()
        else
          done('Suite "' + suiteId + '" failed.')
    , (err) ->
      # done with any suites, bail if we hit an error/failure
      if err
        grunt.log.error(err)
        return gruntDone(false)

      # execute any specified tests
      if options.suites.length then grunt.log.writeln('Executing tests...')
      async.eachSeries options.tests, (testId, done) ->
        # execute test
        GhostInspector.executeTest testId, (err, data, passing) ->
          # evaluate api response
          if err then return done('Error executing test "' + data.test.name + '" (' + testId + '): ' + err)
          if passing
            grunt.log.ok('Test "' + data.test.name + '" (' + testId + ') passed.')
            done()
          else
            done('Test "' + data.test.name + '" (' + testId + ') failed')
      , (err) ->
        # done with any tests, bail if we hit an error/failure
        if err
          grunt.log.error(err)
          return gruntDone(false)

        # done with suites and tests
        gruntDone()
