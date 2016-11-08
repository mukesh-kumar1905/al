'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (path) {
  // add path to current paths
  var paths = _jsonfile2.default.readFileSync((0, _path.join)(_constants.cwd, 'path.json'));
  if (paths.indexOf(path) !== -1) {
    console.log((0, _color.red)('Path ' + path + ' already exists in paths'));
    return;
  }
  paths.push(path);
  _jsonfile2.default.writeFileSync((0, _path.join)(_constants.cwd, 'path.json'), paths, { spaces: 2 });

  // give instruction on how to load
  console.log((0, _color.yellow)('Added ' + path + ' to paths config'));
  console.log('Run ' + (0, _color.green)('al load') + ' to load config');
};

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _constants = require('../constants');

var _color = require('../color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }