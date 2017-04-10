[![Build Status](https://travis-ci.org/Milewski/options-to-spawn-args.svg?branch=master)](https://travis-ci.org/Milewski/options-to-spawn-args)
[![npm version](https://badge.fury.io/js/options-to-spawn-args.svg)](https://badge.fury.io/js/options-to-spawn-args)
[![npm downloads](https://img.shields.io/npm/dm/options-to-spawn-args.svg)](https://www.npmjs.com/package/options-to-spawn-args)
[![dependencies](https://david-dm.org/Milewski/options-to-spawn-args.svg)](https://www.npmjs.com/package/options-to-spawn-args)

# options-to-spawn-args

Converts an options object to an array suitable for passing to `child_process.spawn()`.

- Single letter object properties (e.g. `c: "red"`) convert to short-option args (e.g. `-c red`).
- Longer object properties (e.g. `colour: "red"`) convert to long-option args (e.g. `--colour red`).
- Object property values equalling `true` convert to flags (e.g. `-l`).

This options object:
```js
const options = {
    l: true,
    c: "red",
    man: "pete",
    tramp: true
}
```
converts to
```js
[ "-l", "-c", "red", "--man", "pete", "--tramp" ]
```

## Installation

```bash
$ npm install options-to-spawn-args --save
```

## Usage

```js
import toSpawnArgs from 'object-to-spawn-args';
import { spawn } from 'child_process';

const options = {
    l: true,
    a: true
};

spawn('ls', toSpawnArgs(options), { stdio: 'inherit' });
```

# Options

### prefix `[string|function]=standard`

Example

```js
const options = { resize: '50%', r: '100%' }

toSpawnArgs(options, { prefix: '-' }) // [ '-resize', '50%', '-r', '100%' ]
toSpawnArgs(options, { prefix: item => item.length > 1 ? '++' : '--' }) // [ '++resize', '50%', '--r', '100%' ]
```

### equal `[boolean]=false`

Example

```js
const options = { resize: '50%' }

toSpawnArgs(options, { equal: true }) // [ '--resize=50%' ]
```

### quote `[boolean]=false`

Example

```js
const options = { resize: '50%', demo: 10 }

toSpawnArgs(options, { quote: true }) // [ '--resize', '"50%"', '--demo', '"10"' ]
```

## License 

[MIT](LICENSE)
