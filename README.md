[![](https://img.shields.io/npm/v/@whi/repr/latest?style=flat-square)](http://npmjs.com/package/@whi/repr)

# `repr()`
This module is intended to make short, limited string representations of complex object.

For a more detailed inspection tool, try [`@whi/json`](https://www.npmjs.com/package/@whi/json)
which has a `json.debug()` method for deep representational inspection.


[![](https://img.shields.io/github/issues-raw/mjbrisebois/js-repr?style=flat-square)](https://github.com/mjbrisebois/js-repr/issues)
[![](https://img.shields.io/github/issues-closed-raw/mjbrisebois/js-repr?style=flat-square)](https://github.com/mjbrisebois/js-repr/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/github/issues-pr-raw/mjbrisebois/js-repr?style=flat-square)](https://github.com/mjbrisebois/js-repr/pulls)


## Overview
The main use-case for this library is expected to be for logging.

### Features

- Distinguish primitive types from their similar object version
- Truncate large list types
- Display formats for Map types:
  - Boolean, Number, String, Date, RegExp, Function, Object
- Display formats for List types:
  - Array, Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array,
    Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array
- Display formats for Primitives:
  - string, number, bigint, boolean, null, undefined, symbol
- Custom object formatting by implementing a `toRepr()` method.


## Install

```bash
npm i @whi/repr
```

## Usage

The default import is a single function.

```javascript
const repr = require('@whi/repr');
```

Pass any value to `repr` to get the representational value.

```javascript
const value = [0,1,2,3,4,5,6,7,8,9];

repr( input )
// Array (10) [ 0, 1, 2, 3 … 6, 7, 8, 9 ]

repr( input, true );
// Array(10)
```

```javascript
const value = {a:0,b:0,c:0,d:0,e:0,f:0,g:0,h:0,i:0,j:0};

repr( input )
// Object { a: 0, b: 0, c: 0, d: 0 … 6 more properties }

repr( input, true );
// Object(10)
```

Second-level values are automatically displayed using the minimal format.

```javascript
const value = [ [], {}, new Boolean(1), new Number(1), new String("hi"), new Date(1646429736851), RegExp(/.*/gi), () => {} ];

repr( input )
// Array (8) [ Array(0), Object(0), Bool(1), Number(1), String("hi"), 2022-03-04T21:35:36.851Z, RegExp(/.*/gi), function(0 args) ]

repr( input, true );
// Array(8)
```

## Custom formatting

```javascript
class Rectangle {
    constructor ( x, y ) {
        this.x = x;
        this.y = y;
    }

    toRepr ( minimal ) {
        return minimal
            ? `${this.constructor.name}(${this.x},${this.y})`
            : `${this.constructor.name} { x: ${this.x}, y: ${this.y} }`;
    }
}

const value = new Rectangle( 3, 4 );

repr( value )
// Rectangle { x: 3, y: 4 }

repr( value, true )
// Rectangle(3,4)
```

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)
