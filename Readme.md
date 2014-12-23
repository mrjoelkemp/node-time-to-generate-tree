### time-to-generate-tree [![npm](http://img.shields.io/npm/v/time-to-generate-tree.svg)](https://npmjs.org/package/time-to-generate-tree) [![npm](http://img.shields.io/npm/dm/time-to-generate-tree.svg)](https://npmjs.org/package/time-to-generate-tree)

> Computes the time it takes to generate the dependency trees for all application entry points within a directory

`npm install time-to-generate-tree`

### Usage

```js
var timeToTrees = require('time-to-generate-tree');

timeToTrees({
  // If you want to profile all entry points to your application (optional)
  directory: 'path/to/my/js/files',
  // If you want to profile a single file (optional)
  filename: 'path/to/a/file',
  success: function(err, timeData) {

  }
});
```

* You must supply either the `directory` or a `filename`
* The returned `timeData` is an object where the keys are the filenames and the values are the time it took to generate the
dependency trees.

* You may pass additional options supported by [`get-driver-scripts`](https://github.com/mrjoelkemp/node-get-driver-scripts)
to handle pulling driver scripts from a RequireJS build config or resolving aliased
paths via a requirejs config.

### Shell command

> Prints the time data in tabular form

*Requires a global install `npm install -g time-to-generate-trees`*

`time-to-generate-tree <directory>`