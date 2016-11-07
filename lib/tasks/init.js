import { home, cwd, aliasRegex } from '../constants';
import { green, yellow } from '../color';
import json from 'jsonfile';
import { join } from 'path';
import file from 'fs';

export default function() {
  // write paths to paths.json
  json.writeFileSync(join(cwd, 'path.json'), process.env.PATH.split(':'), {spaces: 2});
  // read from bash profile
  let contents = file.existsSync(join(home, '.bash_profile')) ? file.readFileSync(join(home, '.bash_profile')) : '';
  //check for aliases
  let matches = getAliases(contents);
  // write .bash_profile aliases to alias.json
  json.writeFileSync(join(cwd, 'alias.json'), matches, {spaces: 2});
  console.log(yellow(`done! you should have ${green('path.json')} & ${green('alias.json')} in your current directory`));
}

function getAliases(contents){
  let matches = {};
  var match;
  //loop through matches for aliases and return alias object
  while ( ( match = aliasRegex.exec(contents) ) !== null )
  {
      matches[match[2]] = match[3];
  }
  return matches;
}
