var async;

async = require('async');

module.exports = function(grunt) {
  return grunt.registerTask('ghostinspector', 'Execute your Ghost Inspector tests', function() {
    var GhostInspector, gruntDone, options;
    gruntDone = this.async();
    options = this.options();
    if (typeof options.suites === 'string') {
      options.suites = [options.suites];
    } else if (!(options.suites instanceof Array)) {
      options.suites = [];
    }
    if (typeof options.tests === 'string') {
      options.tests = [options.tests];
    } else if (!(options.tests instanceof Array)) {
      options.tests = [];
    }
    GhostInspector = require('ghost-inspector')(options.apiKey);
    if (options.suites.length) {
      grunt.log.writeln('Executing suites...');
    }
    return async.eachSeries(options.suites, function(suiteId, done) {
      return GhostInspector.executeSuite(suiteId, function(err, data, passing) {
        if (err) {
          return done('Error executing suite "' + suiteId + '": ' + err);
        }
        if (passing) {
          grunt.log.ok('Suite "' + suiteId + '" passed.');
          return done();
        } else {
          return done('Suite "' + suiteId + '" failed.');
        }
      });
    }, function(err) {
      if (err) {
        grunt.log.error(err);
        return gruntDone(false);
      }
      if (options.suites.length) {
        grunt.log.writeln('Executing tests...');
      }
      return async.eachSeries(options.tests, function(testId, done) {
        return GhostInspector.executeTest(testId, function(err, data, passing) {
          if (err) {
            return done('Error executing test "' + data.test.name + '" (' + testId + '): ' + err);
          }
          if (passing) {
            grunt.log.ok('Test "' + data.test.name + '" (' + testId + ') passed.');
            return done();
          } else {
            return done('Test "' + data.test.name + '" (' + testId + ') failed');
          }
        });
      }, function(err) {
        if (err) {
          grunt.log.error(err);
          return gruntDone(false);
        }
        return gruntDone();
      });
    });
  });
};
