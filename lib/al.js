#!/usr/bin/env node
'use strict';

import { home, cwd, aliasRegex, pathRegex } from './constants';
import { yellow } from './color';

const task = process.argv[2];
import load from './tasks/load';
import init from './tasks/init';

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


