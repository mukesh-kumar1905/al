#!/usr/bin/env node
'use strict';

const json = require('jsonfile');
const join = require('path').join;
const home = process.env.HOME;
const cwd = process.cwd();
const file = require('fs');
var exec = require('child_process').execSync;
const aliasRegex = /(^|\n)\s*alias\s+([^\s]*)\s*=\s*\'(.+)\'\s*(\n|;|&&)?/g;
const pathRegex = /(^|\n)\s*export\s+PATH\s*=\s*(.+)\s*(\n|;|&&)?/g;

const task = process.argv[2];

switch(task){
  case 'init':
    console.log(yellow('Setting up in '+cwd));
    init();
    break;
  case 'load':
    console.log(yellow('loading profile from ' + cwd));
    load();
    break;
  default:
   console.log('Unknown command :', task || 'did you mean `\x1B[31m al init \x1B[31m`?');
}


function init() {
  json.writeFileSync(join(cwd,'path.json'), process.env.PATH.split(':'), {spaces: 2});
  let contents = file.existsSync(join(home,'.bash_profile')) ? file.readFileSync(join(home,'.bash_profile')) : '';
  let matches = getAliases();
  json.writeFileSync(join(cwd,'alias.json'), matches, {spaces: 2});
}

function load(){
    const paths = file.existsSync(join(cwd,'path.json')) ? json.readFileSync(join(cwd,'path.json')).join(':') : {};
    const alias = file.existsSync(join(cwd,'alias.json')) ? json.readFileSync(join(cwd,'alias.json')) : {};
    let source = paths.length ? 'export PATH=' + paths + ';\n' : '';
    Object.keys(alias).forEach(function(key) { source += 'alias ' + key + '=\''+ alias[key]+'\';\n'; });
    file.writeFileSync(join(cwd,'.profile'), '#!/usr/bin/env bash\n' + source);
    console.log(red('Writing to ' + join(home, '.bash_profile')));
    let contents = file.existsSync(join(home,'.bash_profile')) ? file.readFileSync(join(home,'.bash_profile'),'utf-8') : '';
    contents = contents.replace(aliasRegex, '');
    contents = contents.replace(pathRegex, '');
    file.writeFileSync(join(home,'.bash_profile'), contents + '\n' + source);
    console.log(green(join(home, '.bash_profile') + ' updated'));
    console.log('To update current console run `'+green('source .profile') + '`');
}

function green(s){
  return '\x1B[32m' + s + '\x1B[0m';
}
function red(s){
  return '\x1B[31m' + s + '\x1B[0m';
}

function yellow(s){
  return '\x1B[33m' + s + '\x1B[0m';
}

function getAliases(contents){
  let matches = {};
  var match;
  while ( ( match = aliasRegex.exec(contents) ) != null )
  {
      matches[match[2]] = match[3];
  }
  return matches;
}
