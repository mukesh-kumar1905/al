import { home, cwd, aliasRegex, pathRegex } from '../constants';
import { red, green } from '../color';
import json from 'jsonfile';
import { join } from 'path';
import file from 'fs';

export default function load(){
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