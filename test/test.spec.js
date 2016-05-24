const assert = require('assert');
const Protosaurus = require('../');

describe('Constructor Extender', () => {
    it('Should create class', () => {
        var A = Protosaurus.extend({
            constructor(name) {
                this.name = name;
            },
            greet() {
                return this.name;
            }
        });

        assert.equal(typeof A, 'function', 'new class should be a function');

        var a = new A('user');
        assert.equal(a.name, 'user', 'It should set property name');
        assert.equal(a.greet(), 'user', 'It should call method');
        assert.ok(a instanceof A, 'a is instanceof A');
    });

    it('Should inherits properly', () => {
        var A = Protosaurus.extend({
            constructor(name) {
                this.name = name;
            },
            getName() {
                return this.name;
            }
        });

        var B = A.extend({
            constructor(name) {
                A.call(this, name);
            }
        });

        var b = new B('User');

        assert.equal(b.name, 'User', 'It should set property name');
        assert.equal(b.getName(), 'User', 'It should call method getName');
        assert.ok(b instanceof B, 'b is instanceof B');
        assert.ok(b instanceof A, 'a is instanceof A');
    });

    it('Should extend onExtention', () => {
        var A = Protosaurus.extend({
            [Protosaurus.onExtend](Super, ctor) {
                ctor.new = function() {
                    return new this(...arguments);
                };
            },
            constructor(name) {
                this.name = name;
            },
            getName() {
                return this.name;
            }
        });

        var a = A.new('User');

        assert.equal(a.name, 'User', 'It should set property name');
        assert.equal(a.getName(), 'User', 'It should call method getName');
        assert.ok(a instanceof A, 'a is instanceof A');
    });

    it('Should extend onExtention', () => {
        var A = Protosaurus.extend({
            [Protosaurus.onExtend](Super, ctor, proto) {
                ctor.new = function() {
                    return new this(...arguments);
                };
            },
            constructor(name) {
                this.name = name;
            },
            getName() {
                return this.name;
            }
        });

        var B = A.extend({
            [Protosaurus.onExtend]: A[Protosaurus.onExtend]
        });

        var b = B.new('User');

        assert.ok(b instanceof B, 'b is instanceof B');
        assert.ok(b instanceof A, 'b is instanceof A');
        assert.equal(b.name, 'User', 'It should set property name');
        assert.equal(b.getName(), 'User', 'It should call method getName');
    });
});
