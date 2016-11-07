import { home, cwd, aliasRegex, pathRegex } from '../constants';
import { red, green } from '../color';
import json from 'jsonfile';
import { join } from 'path';
import file from 'fs';

export default function init() {
  json.writeFileSync(join(cwd,'path.json'), process.env.PATH.split(':'), {spaces: 2});
  let contents = file.existsSync(join(home,'.bash_profile')) ? file.readFileSync(join(home,'.bash_profile')) : '';
  let matches = getAliases(contents);
  json.writeFileSync(join(cwd,'alias.json'), matches, {spaces: 2});
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