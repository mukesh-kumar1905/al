'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    // read paths and aliases
    var paths = _fs2.default.existsSync((0, _path.join)(_constants.cwd, 'path.json')) ? _jsonfile2.default.readFileSync((0, _path.join)(_constants.cwd, 'path.json')).join(':') : {};
    var alias = _fs2.default.existsSync((0, _path.join)(_constants.cwd, 'alias.json')) ? _jsonfile2.default.readFileSync((0, _path.join)(_constants.cwd, 'alias.json')) : {};

    // source to be written to bash files for changes
    var source = '';
    // if paths found write paths
    source += paths.length ? 'export PATH=' + paths + ';\n' : '';
    //write aliases
    Object.keys(alias).forEach(function (key) {
        source += 'alias ' + key + '=\'' + alias[key] + '\';\n';
    });

    // write changes for parent process
    _fs2.default.writeFileSync((0, _path.join)(_constants.cwd, '.profile'), '#!/usr/bin/env bash\n' + source);

    var contents = _fs2.default.existsSync((0, _path.join)(_constants.home, '.bash_profile')) ? _fs2.default.readFileSync((0, _path.join)(_constants.home, '.bash_profile'), 'utf-8') : '';
    // replace existing path
    contents = contents.replace(_constants.aliasRegex, '');
    //replace existing contnts
    contents = contents.replace(_constants.pathRegex, '');

    _fs2.default.writeFileSync((0, _path.join)(_constants.home, '.bash_profile'), contents + '\n' + source);
    console.log((0, _color.green)((0, _path.join)(_constants.home, '.bash_profile') + ' updated'));

    console.log('To update current console run `' + (0, _color.green)('source .profile') + '`');
};

var _constants = require('../constants');

var _color = require('../color');

var _jsonfile = require('jsonfile');

var _jsonfile2 = _interopRequireDefault(_jsonfile);

var _path = require('path');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }