module.exports = Protosaurus;

function Protosaurus(){};
Protosaurus.extend = extend;
Protosaurus.onExtend = Symbol('onExtend');

function extend (proto, _super) {
    var Super = _super || this;
    var ctor;

    if (typeof proto === 'function') {
        ctor = proto;
        proto = ctor.prototype;
    } else {
        if (proto.hasOwnProperty('constructor')) {
            ctor = proto.constructor;
        } else {
            ctor = function () {
                Super.apply(this, arguments);
            };
        }
    }

    // For methods...
    if (! ctor.prototype) {
        let _ctor = ctor;
        ctor = function() {
            _ctor.call(this, ...arguments);
        };
    }


    Object.setPrototypeOf(ctor.prototype, Super.prototype);

    // Copy static methods and properties.
    Object.getOwnPropertyNames(Super).forEach((name) => {
        if (['arguments', 'length', 'name', 'caller', 'prototype'].indexOf(name) > -1) {
            return;
        }

        ctor[name] = this[name];
    });

    if (proto !== ctor.prototype) {
        // Copy prototype methods and properties.
        Object.getOwnPropertyNames(proto).forEach((name) => {
            if (name === 'constructor') {
                return;
            }

            ctor.prototype[name] = proto[name];
        });
    }

    ctor.extend = extend;

    if (Protosaurus.onExtend in proto) {
        ctor[Protosaurus.onExtend] = proto[Protosaurus.onExtend];
        proto[Protosaurus.onExtend](Super, ctor, proto);
    }

    return ctor;
}
