'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (alias, to) {
  var aliases = _jsonfile2.default.readFileSync((0, _path.join)(_constants.cwd, 'alias.json'));
  aliases[alias] = to;
  _jsonfile2.default.writeFileSync((0, _path.join)(_constants.cwd, 'alias.json'), aliases, { spaces: 2 });
  console.log((0, _color.yellow)('Added alias ' + (0, _color.green)(alias) + ' for ' + (0, _color.green)(to) + ' to config'));
  console.log('Run ' + (0, _color.green)('al load') + ' to load config');
};

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _constants = require('../constants');

var _color = require('../color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }