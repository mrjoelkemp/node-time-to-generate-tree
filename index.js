var getDrivers = require('get-driver-scripts');
var q = require('q');
var timer = require('node-tictoc');
var getTreeAsList = require('dependency-tree').getTreeAsList;
var path = require('path');

/**
 * Returns how long it takes to generate the dependency trees for each of the
 * modules in the given root directory
 *
 * @param {Object} options
 * @param {String} [options.directory] - Path where your JavaScript files exist
 * @param {String} [options.filename] - A JS file to profile
 * @param {String} options.success - Executed with {Object} containing the module name and time to tree
 */
module.exports = function(options) {
  options = options || {};

  if (!options.directory && !options.filename) { throw new Error('directory or filename not given'); }
  if (!options.success) { throw new Error('success callback not given'); }

  var table = {};
  var success = options.success;

  // Avoid our success callback being confused with that of getDrivers
  options.success = function(err, drivers) {
    getTrees({
      drivers: drivers,
      directory: options.directory,
      table: table
    })
    .then(function() {
      success(null, table)
    },
    function(err) {
      success(err);
    });
  };

  if (options.filename && !options.directory) {
    options.directory = path.dirname(options.filename);
    options.success(null, [options.filename]);

  } else {
    getDrivers(options);
  }
};

/**
 * Gets the dependency tree for each of the given files
 * @param  {Object}     options
 * @param  {String[]}   options.drivers
 * @param  {String}     options.directory
 * @param  {cli-table}  [options.table]   - data store for pretty output
 * @return {Promise}    (String[]) => null Resolves with a list of trees for each file in the list
 */
function getTrees(options) {
  var cache = {};

  return q.all(options.drivers.map(function(driver) {
    var deferred = q.defer();
    var success = function(tree) {
      deferred.resolve(tree);
    };
    var time;

    timer.tic();

    getTreeAsList(driver, options.directory, success, cache);

    time = timer.toct();

    var message = (time.seconds ? time.seconds + 's ' : '') + time.ms + 'ms';

    options.table[driver.split(options.directory)[1]] = message;

    return deferred.promise;
  }));
}
