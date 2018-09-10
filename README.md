# LittleConf

LittleConf is a simple library for loading project configuration files.

```js
const config = require('littleconf').getConfig();
```

This will load a YAML configuration file named `<PackageName>.conf` from the package root directory.  By default, the package name is discovered from the project's package.json file.

## Config Defaults

LittleConf will also look for a file named `<PackageName>-defaults.conf` in the package root directory.  This file is merged with the main config file and can supply
defaults.  By convention, the defaults file should be committed to the source repository, and the main config file should not.

## Config Filename and Search Path

LittleConf looks for the main config file under the following namess.  It uses the first one that applies:

- The value of the `filenameOverride` option.
- The value of the `-c` command-line argument.
- The value of the environment variable `PACKAGE_NAME_CONFIG`.
- The value of the `filename` option.
- `package-name.conf`

If the above does not yield an absolute path, LittleConf first looks for the file in the package root directory, then in `/etc`.

## Environments

In the config file, you can specify a set of configuration values that are only applied when a given "environment" is configured.  The config file with environments
looks like this:

```yaml
foo: "banana"
bar: 12
environments:
	local:
		foo: "apple"
	prod:
		foo: "pear"
```

The envionment is normally selected using the `NODE_ENV` or `PROJECT_NAME_ENV` environment variable, but can also be selected using the following methods (the first that exists is used):

- The `environmentOverride` option.
- The `--config-env` command-line argument.
- The `PROJECT_NAME_ENV` environment variable.
- The `NODE_ENV` environment variable.
- The `defaultEnvironment` option.
- The default environment of "local"

## Command-line Arguments

To allow LittleConf to handle command-line arguments, it needs to be supplied with the `argv` option.  This can come from a standard argument parsing package like `optimist` or `yargs`.

```js
const argv = require('yargs').argv;
const config = require('littleconf').getConfig({ argv: argv });
```

## Individual Setting Overrides

Individual settings can be overridden using command-line arguments or environment variables.  Environment variables are named `PROJECT_NAME_CONFIG_SETTINGNAME` and command-line
arguments look like `--config-setting-SETTINGNAME`.

## Options

These options can be supplied in the argument to `getConfig()`.

- `argv` - The set of command-line arguments.
- `projectName` - The name of the project.  Defaults to the `name` property in package.json.
- `environmentOverride` - Force a specific config environment value.
- `cliArgumentEnvironment` - The name of the CLI argument to use for selecting the config environment.  Defaults to "config-env".
- `rootDir` - The root directory of the project.  By default this is determined by using `require.main` and traversing upwards until
  a package.json is found.
- `envVariableEnvironment` - Selects a specific name for the environment variable to determine the config environment rather than
  the default of `PROJECT_NAME_ENV`.
- `defaultEnvironment` - Sets the default config environment.  Defaults to "local".
- `defaultsFilename` - Sets the filename to use for the defaults file.  Normally "projectname-defaults.conf".
- `filenameOverride` - Forces the name/path of the main config file.
- `filename` - Default name of the main config file.  Defaults to "projectname.conf".
- `cliArgumentFile` - Name of the command-line argument to specify the config file.  Defaults to "c".
- `envVariableFile` - Name of the environment variable to specify the config file.  Defaults to `PROJECT_NAME_CONFIG`.


