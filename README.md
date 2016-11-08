# Al

Al is a CLI helper that makes aliases and path variables easy to manage.

## Installing

`npm install -g al`

## Using Al

* go to folder you want to keep your configs
* do `al init`. Al creates the configuration files to manage paths and aliases into json files in that directory. 
* generated file `path.json` is an array of paths of your environment paths. You can use `al addp $PATH` or add path manually to `path.json`.
* generated file `alias.json` is a json with key as the alias as value what you want it to alias to. It initially contains all you aliases in `.bash_profile` and `.bashrc`. You can use `al add $ALIAS '$TO'` to add an alias or you can do it manually by editing `alias.json`.
* Run `al load` to load your changes. Al writes to `.bash_profile` (for future terminals) and generates a `.profile` in the current directory which can be run with `source .profile`. We have to do this an node running in a chld process of the terminal cannot modify its parent process' environment.

# License
`wtfpl` license. Check [LICENSE](./LICENSE).