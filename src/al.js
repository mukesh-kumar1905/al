#!/usr/bin/env node

import { cwd } from './constants';
import { yellow, green, red } from './color';

import file from 'fs';
import { join } from 'path';
const existsInCWD = (name) => file.existsSync(join(cwd, name));

const task = process.argv[2];

import { load, init, add, addp } from './tasks';

switch (task) {
  case 'init':{
    console.log(yellow('Setting up in ' + cwd));
    init();
    break;
  }
  case 'load':{
    console.log(yellow('loading profile from ' + cwd));
    load();
    break;
  }
  case 'add':{
    if (!existsInCWD('alias.json')) {
      console.log(red('alias file does not exist. Are you in the correct folder ? Did you run `al init`?'));
      process.exit();
    }
    const alias = process.argv[3];
    const to = process.argv[4];
    if (!alias || !to) {
      console.log(red(`Missing arguments. To add an alias, correct format is ${green('al add $ALIAS \'$TO\'')}`));
      process.exit();
    }
    console.log(yellow(`adding alias ${alias} => ${to}`));
    add(alias, to);
    break;
  }
  case 'addp':{
    if (!existsInCWD('path.json')) {
      console.log(red('path file does not exist. Are you in the correct folder ? Did you run `al init`?'));
      process.exit();
    }
    const path = process.argv[3];
    if (!path) {
      console.log(red(`Missing arguments. To add a path, correct format is ${green('al addp $PATH')}`));
      process.exit();
    }
    console.log(yellow(`adding ${path} to paths`));
    addp(path);
    break;
  }
  default:{
   console.log('al doesnt know what to do with', red(task || '""'), `. Did you mean '${green('al init')}'?`);
 }
}


