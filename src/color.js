'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// colors for console output
exports.green = green;
exports.red = red;
exports.yellow = yellow;


function green(s) {
  return '\x1B[32m' + s + '\x1B[0m';
}
function yellow(s) {
  return '\x1B[33m' + s + '\x1B[0m';
}
function red(s) {
  return '\x1B[31m' + s + '\x1B[0m';
}