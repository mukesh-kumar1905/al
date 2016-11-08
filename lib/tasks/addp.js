import json from 'jsonfile';
import { join } from 'path';
import { cwd } from '../constants';
import { yellow, red, green } from '../color';

export default function(path){
  const paths = json.readFileSync(join(cwd, 'path.json'));
  if (paths.indexOf(path) !== -1){
    console.log(red(`Path ${path} already exists in paths`));
    return;
  }
  paths.push(path);
  json.writeFileSync(join(cwd, 'path.json'), paths, {spaces: 2});
  console.log(yellow(`Added ${path} to paths config`));
  console.log(`Run ${green('al load')} to load config`);
}
