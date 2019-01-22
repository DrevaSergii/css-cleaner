# Css cleaner

Timber is a tool for clean up styles.

### Installation

Install as a dependency.

```
$ npm install --save https://github.com/DrevaSergii/css-cleaner.git#master
```

### Development

Open your favorite Terminal and run this commands to start the program.

```
$ cd css-cleaner
$ npm install
$ npm run build
$ npm run test
```

### Usage

Example:

```javascript
const Cleaner = require('css-cleaner');
const cleaner = new Cleaner({
    sort: {
        ...
    },
});

cleaner.clean('source.css')
    .then(() => console.log('Clean Success!'))
    .catch((error) => console.error(error));
```

### Options
Common options:
* [`sort`](https://www.npmjs.com/package/postcss-sorting): order rules.

### License

MIT
