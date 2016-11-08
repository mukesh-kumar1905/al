"use strict";

// constants that are used across tasks
module.exports = {
  cwd: process.cwd(),
  home: process.env.HOME,
  aliasRegex: /(^|\n)\s*alias\s+([^\s]*)\s*=\s*\'(.+)\'\s*(\n|;|&&)?/g,
  pathRegex: /(^|\n)\s*export\s+PATH\s*=\s*(.+)\s*(\n|;|&&)?/g
};