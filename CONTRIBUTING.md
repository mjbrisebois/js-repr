[back to README.md](README.md)

# Contributing

## Overview
This package was named after the Python function
[`repr()`](https://docs.python.org/3/library/functions.html#repr).


## Development

### `logging()`
Turns on debugging logs.

```javascript
const repr = require('@whi/repr');

repr.logging(); // show debug logs
```

### Environment

- Developed using Node.js `v14.17.3`

### Building
```bash
npm run build
```

### Testing

To run all tests with logging
```
make test-debug
```

- `make test-unit-debug` - **Unit tests only**

> **NOTE:** remove `-debug` to run tests without logging
