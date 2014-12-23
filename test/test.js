var assert = require('assert');
var timeToTree = require('../');

describe('time-to-generate-tree', function() {
  it('returns the time it takes to generate dependency trees for all driver scripts', function(done) {
    timeToTree({
      directory: __dirname + '/example',
      success: function(err, timeData) {
        assert(!err);
        assert(timeData);
        done();
      }
    });
  });

  it('support profiling about a single filename', function(done) {
    timeToTree({
      filename: __dirname + '/example/driver.js',
      success: function(err, timeData) {
        assert(!err);
        assert(timeData);
        done();
      }
    });
  });

  it('throws if both the directory and filename are not given', function() {
    assert.throws(function() {
      timeToTree({
        success: function() {}
      });
    });
  });

  it('throws if the success callback is not given', function() {
    assert.throws(function() {
      timeToTree({
        directory: __dirname + '/example'
      });
    });
  });

  it('does not throw if the filename is given without a directory', function() {
    assert.doesNotThrow(function() {
      timeToTree({
        directory: __dirname + '/example',
        success: function() {}
      });
    });
  });

  it('does not throw if a directory is given without a filename', function() {
    assert.doesNotThrow(function() {
      timeToTree({
        filename: __dirname + '/example/driver.js',
        success: function() {}
      });
    });
  });
});