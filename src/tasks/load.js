import { home, cwd, aliasRegex, pathRegex } from '../constants';
import { green } from '../color';
import json from 'jsonfile';
import { join } from 'path';
import file from 'fs';

export default function (){
    // read paths and aliases
    const paths = file.existsSync(join(cwd, 'path.json')) ? json.readFileSync(join(cwd, 'path.json')).join(':') : {};
    const alias = file.existsSync(join(cwd, 'alias.json')) ? json.readFileSync(join(cwd, 'alias.json')) : {};

    // source to be written to bash files for changes
    let source = '';
    // if paths found write paths
    source += (paths.length ? 'export PATH=' + paths + ';\n' : '');
    // write aliases
    Object.keys(alias).forEach(function(key) { source += 'alias ' + key + '=\'' + alias[key] + '\';\n'; });

    // write changes for parent process
    file.writeFileSync(join(cwd, '.profile'), '#!/usr/bin/env bash\n' + source);

    let contents = file.existsSync(join(home, '.bash_profile')) ? file.readFileSync(join(home, '.bash_profile'), 'utf-8') : '';
    // replace existing path
    contents = contents.replace(aliasRegex, '');
    //replace existing contnts
    contents = contents.replace(pathRegex, '');

    file.writeFileSync(join(home, '.bash_profile'), contents + '\n' + source);
    console.log(green(join(home, '.bash_profile') + ' updated'));

    console.log('To update current console run `' + green('source .profile') + '`');
}
