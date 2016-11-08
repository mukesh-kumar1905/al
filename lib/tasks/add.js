import json from 'jsonfile';
import { join } from 'path';
import { cwd } from '../constants';
import { yellow, green } from '../color';

export default function(alias, to){
  // add alias to existing aliases
  const aliases = json.readFileSync(join(cwd, 'alias.json'));
  aliases[alias] = to;
  json.writeFileSync(join(cwd, 'alias.json'), aliases, {spaces: 2});

  // give instruction on how to load
  console.log(yellow(`Added alias ${green(alias)} for ${green(to)} to config`));
  console.log(`Run ${green('al load')} to load config`);
}
