# Asguard

Automated check to use as a guard against security risks and unused, missing or outdated dependencies.

Can be used standalone, but is highly customized for use by [Frosti Boilerplates](https://github.com/frostijs/cli).

### Scan For Security Vulnerabilities

Utilizes [npm audit](https://docs.npmjs.com/cli/audit) to scan project dependencies for any know vulnerabilities.

### Find Unused, Missing & OUt Of Date Dependencies

Uses [depcheck](https://www.npmjs.com/package/depcheck) to look for any missing or unused dependencies in your projects `package.json` file.

## Usage

### Install

###### As a Module

```
$ npm install @frosti/asguard
```

###### Globally

```
$ npm install @frosti/asguard -g
```

### Automated scanning

The recommended usage is as an npm script in conjunction with something like [Husky](https://www.npmjs.com/package/husky) to automatically run before pushing any code into source control:

```
{
  "scripts": {
    "check": "asguard"
  },
  "husky": {
    "hooks": {
      "pre-push": "npm run check"
    }
  },
}
```

### Manual scanning

If you prefer to just run your checks manually, you can also simply run Asguard directly:

###### Installed globally

```
$ asguard
```

###### Installed as a module

```
$ npx asguard
```

## Options

### Warn Only

By default Asguard will throw an error and exit with [process.exit(1)](https://nodejs.org/api/process.html#process_event_exit) if it encounters any problems.

If you would prefer to just show a warning instead of throwing an error, you can use the `--warn` flag.

```
$ asguard --warn
```
