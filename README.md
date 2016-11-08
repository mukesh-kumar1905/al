# Al

Al is a CLI helper that makes [aliases](https://en.wikipedia.org/wiki/Alias_(command)) and [path](http://www.linfo.org/path_env_var.html) easy to manage.

## Installing

`npm install -g al-cli`

## Using Al

* Go to folder you want to keep your configs and run `al init`. Al creates configuration files to manage paths and aliases.
* Generated config file `path.json` is an array of paths of your environment paths. You can use `al addp $PATH` to add a path to config or modify paths manually to `path.json`. eg. `al addp /usr/bin` adds `/usr/bin` to path config.
* Generated config file `alias.json` is a json with key as the alias as value what you want it to alias to. It initially contains all you aliases in `.bash_profile` and `.bashrc`. You can use `al add $ALIAS '$TO'` to add an alias or you can manually edit aliases by editing `alias.json`. eg. `al add ll 'ls -la'` adds alias `ll` for `ls -la` to alias config. 
* Run `al load` to load your changes. Al writes to `.bash_profile` (for future terminals) and generates a `.profile` in the current directory which can be run with `source .profile`. We have to do this an node running in a chld process of the terminal cannot modify its parent process' environment.

# License

MIT.