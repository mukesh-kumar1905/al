'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // write paths to paths.json
  _jsonfile2.default.writeFileSync((0, _path.join)(_constants.cwd, 'path.json'), process.env.PATH.split(':'), { spaces: 2 });
  // read from bash profile
  var contents = _fs2.default.existsSync((0, _path.join)(_constants.home, '.bash_profile')) ? _fs2.default.readFileSync((0, _path.join)(_constants.home, '.bash_profile')) : '';
  //check for aliases
  var matches = getAliases(contents);
  // write .bash_profile aliases to alias.json
  _jsonfile2.default.writeFileSync((0, _path.join)(_constants.cwd, 'alias.json'), matches, { spaces: 2 });
  console.log((0, _color.yellow)('done! you should have ' + (0, _color.green)('path.json') + ' & ' + (0, _color.green)('alias.json') + ' in your current directory'));
};

var _constants = require('../constants');

var _color = require('../color');

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAliases(contents) {
  var matches = {};
  var match;
  //loop through matches for aliases and return alias object
  while ((match = _constants.aliasRegex.exec(contents)) !== null) {
    matches[match[2]] = match[3];
  }
  return matches;
}