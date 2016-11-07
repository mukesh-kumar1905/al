#!/usr/bin/env node
'use strict';

const json = require('jsonfile');
const join = require('path').join;
const home = process.env.HOME;
const cwd = process.cwd();
const file = require('fs');
var exec = require('child_process').execSync;
const aliasRegex = /(^|\n)\s*alias\s+(.*)=\s*\'(.+)\'/g;

const task = process.argv[2];

switch(task){
  case 'init':
    console.log('Setting up in path :', cwd);
    init();
    break;
  case 'load':
    console.log('loading ...');
    load();
    break;
  default:
   console.log('Say what?! command:', task);
}


function init() {
  json.writeFileSync(join(cwd,'path.json'), process.env.PATH.split(':'), {spaces: 2});
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

function load(){
  try{
    console.log('Trying to read paths');
    const paths = json.readFileSync(join(cwd,'path.json')).join(':');
    const alias = json.readFileSync(join(cwd,'alias.json'));
    const aliasScript = alias.map()
    console.log('found paths');
    console.log('Response:');
    file.writeFileSync(join(cwd,'.profile'), '#!/bin/bash \nexport PATH=' + paths + ';\n');
    console.log(exec('#!/bin/bash source ' + join(cwd,'path.sh')).toString('utf8'));
  }
  catch(e){
    console.log('path/alias file not found', e);
  }
  try{

  }
  catch(e){
    
  }
}
