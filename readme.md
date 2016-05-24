# Protosaurus

Protosaurus in a basic proto object for custom class system. It's main feature
is support of ES2015 object syntax and customizable inheritance strategies based
on a new features of Symbol properties.

## Install

Install via npm:

```
npm i protosaurus
```

## Example

```javascript
const Protosaurus = require('protosaurus');

const A = Protosaurus.extend({
    constructor(name) {
        this.name = name;
    },
    greet() {
        return `Hello ${this.name}`;
    }
});

const B = A.extend({
    greet() {
        return `Hi ${this.name}`;
    }
});

var a = new A('World');
var b = new B('World');

a.greet(); // => "Hello World"
b.greet(); // => "Hi World"
```
