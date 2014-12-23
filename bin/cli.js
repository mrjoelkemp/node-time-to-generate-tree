#!/usr/bin/env node

'use strict';

var trees     = require('../');
var directory = process.argv[2];
var columnify = require('columnify');
var fs = require('fs');

var isDirectory = fs.lstatSync(directory).isDirectory();

try {
  trees({
    directory: isDirectory ? directory : undefined,
    filename: !isDirectory ? directory : undefined,
    success: function(err, tableData) {
      if (err) { throw err; }

      console.log(columnify(tableData, {
        columns: ['Module', 'Time to Tree']
      }));
    }
  });
} catch (e) {
  console.log(e);
}
