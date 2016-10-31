#!/usr/bin/env node
'use strict';

const json = require('jsonfile');
const join = require('path').join;
const home = process.env.HOME;
const cwd = process.cwd();
const fs = require('fs');
const file = require('fs');
const paths = process.env.PATH.split(':');
const aliasRegex = /(^|\n)\s*alias\s+(.*)=\s*\'(.+)\'/g;

const task = process.argv[2];

switch(task){
  case 'init':
    console.log('Setting up');
    init();
    break;
  case 'load':
    console.log('loading ...');
    break;
  default:
   console.log('Say what?! command: ' + task);
}

function init() {
  json.writeFileSync(join(cwd,'path.json'), paths, {spaces: 2});
  let contents = file.readFileSync(join(home,'.bash_profile'));
  let matches = [];
  var match;
  while ( ( match = aliasRegex.exec(contents) ) != null )
  {
      let x = {};
      x[match[2]] = match[3];
      matches.push(x);
  }
  json.writeFileSync(join(cwd,'alias.json'), matches, {spaces: 2});
}
