#!/usr/bin/env node
'use strict';

var _constants = require('./constants');

var _color = require('./color');

var _tasks = require('./tasks');

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