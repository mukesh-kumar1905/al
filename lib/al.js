#!/usr/bin/env node

import { cwd } from './constants';
import { yellow, green, red } from './color';

const task = process.argv[2];
import load from './tasks/load';
import init from './tasks/init';

switch (task) {
  case 'init':
    console.log(yellow('Setting up in ' + cwd));
    init();
    break;
  case 'load':
    console.log(yellow('loading profile from ' + cwd));
    load();
    break;
  default:
   console.log('Unknown command', red(task || ''), `. Did you mean '${green('al init')}'?`);
}


