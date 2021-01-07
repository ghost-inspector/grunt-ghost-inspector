const async = require('async')

module.exports = (grunt) => {
  // register "ghostinspector" task
  grunt.registerMultiTask('ghostinspector', 'Execute your Ghost Inspector tests', function () {
    // reference to Grunt done() function
    const gruntDone = this.async()
    // get options
    const options = this.options()
    // get suites to execute
    let { suites } = this.data
    if (typeof suites === 'string') {
      suites = [suites]
    } else if (!(suites instanceof Array)) {
      suites = []
    }
    // get tests to execute
    let { tests } = this.data
    if (typeof tests === 'string') {
      tests = [tests]
    } else if (!(tests instanceof Array)) {
      tests = []
    }
    // create Ghost Inspector object
    const GhostInspector = require('ghost-inspector')(options.apiKey)
    // execute any specified suites
    if (suites.length) {
      grunt.log.writeln('Executing suites...')
    }
    async.eachSeries(
      suites,
      (suiteId, done) => {
        // execute suite
        GhostInspector.executeSuite(suiteId, options, (err, data, passing) => {
          // evaluate api response
          if (err) {
            return done(`Error executing suite "${suiteId}": ${err}`)
          }
          if (passing) {
            grunt.log.ok(`Suite "${suiteId}" passed.`)
            return done()
          } else {
            return done(`Suite "${suiteId}" failed.`)
          }
        })
      },
      (err) => {
        // done with suites, bail if we hit an error/failure
        if (err) {
          grunt.log.error(err)
          return gruntDone(false)
        }
        // execute any specified tests
        if (tests.length) {
          grunt.log.writeln('Executing tests...')
        }
        async.eachSeries(
          tests,
          (testId, done) => {
            // execute test
            GhostInspector.executeTest(testId, options, (err, data, passing) => {
              // evaluate api response
              if (err) {
                return done(`Error executing test "${data.test.name}" (${testId}): ${err}`)
              }
              if (passing) {
                grunt.log.ok(`Test "${data.test.name}" (${testId}) passed.`)
                return done()
              } else {
                return done(`Test "${data.test.name}" (${testId}) failed`)
              }
            })
          },
          (err) => {
            // done with tests, bail if we hit an error/failure
            if (err) {
              grunt.log.error(err)
              return gruntDone(false)
            }
            // done with suites and tests
            return gruntDone()
          },
        )
      },
    )
  })
}
