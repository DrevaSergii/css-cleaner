# Timber

Timber is a tool for clean up styles.

### Installation

Install as a dependency.

```
$ npm install --save https://github.com/DrevaSergii/timber.git#master
```

### Development

Open your favorite Terminal and run this commands to start the program.

```
$ cd timber
$ npm install
$ npm run build
$ npm run test
```

### Usage

Example:

```javascript
const Timber = require('timber');
const timber = new Timber({
    sort: {
        ...
    },
});

timber.clean({
    from: 'input.css',
    to: 'output.css',
})
    .then(() => console.log('Clean Success!'))
    .catch((error) => console.error(error));
```

### Options
The plugin has no default options. Everything is disabled by default.

Common options:
* [`sort`](https://www.npmjs.com/package/postcss-sorting): order rules.

### License

MIT
