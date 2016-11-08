#!/usr/bin/env node
'use strict';

var _constants = require('./constants');

var _color = require('./color');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _tasks = require('./tasks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var existsInCWD = function existsInCWD(name) {
  return _fs2.default.existsSync((0, _path.join)(_constants.cwd, name));
};

var task = process.argv[2];

switch (task) {
  case 'init':
    {
      console.log((0, _color.yellow)('Setting up in ' + _constants.cwd));
      (0, _tasks.init)();
      break;
    }
  case 'load':
    {
      console.log((0, _color.yellow)('loading profile from ' + _constants.cwd));
      (0, _tasks.load)();
      break;
    }
  case 'add':
    {
      if (!existsInCWD('alias.json')) {
        console.log((0, _color.red)('alias file does not exist. Are you in the correct folder ? Did you run `al init`?'));
        process.exit();
      }
      var alias = process.argv[3];
      var to = process.argv[4];
      if (!alias || !to) {
        console.log((0, _color.red)('Missing arguments. To add an alias, correct format is ' + (0, _color.green)('al add $ALIAS \'$TO\'')));
        process.exit();
      }
      console.log((0, _color.yellow)('adding alias ' + alias + ' => ' + to));
      (0, _tasks.add)(alias, to);
      break;
    }
  case 'addp':
    {
      if (!existsInCWD('path.json')) {
        console.log((0, _color.red)('path file does not exist. Are you in the correct folder ? Did you run `al init`?'));
        process.exit();
      }
      var path = process.argv[3];
      if (!path) {
        console.log((0, _color.red)('Missing arguments. To add a path, correct format is ' + (0, _color.green)('al addp $PATH')));
        process.exit();
      }
      console.log((0, _color.yellow)('adding ' + path + ' to paths'));
      (0, _tasks.addp)(path);
      break;
    }
  default:
    {
      console.log('al doesnt know what to do with', (0, _color.red)(task || '""'), '. Did you mean \'' + (0, _color.green)('al init') + '\'?');
    }
}