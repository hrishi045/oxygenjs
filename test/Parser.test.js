const assert = require('assert');
const Parser = require('../src/Parser');

describe("Parser", function () {
    describe("StringLiteral", function() {
        it("should parse a string with only letters", function () {
            const e = Parser.StringLiteral.run('"HelloWorld"').result;
            assert.deepEqual(e, ['"', 'HelloWorld', '"']);
        });

        it("should parse whitespace", function() {
            const e = Parser.StringLiteral.run('"Hello World"').result;
            assert.deepEqual(e, ['"', 'Hello World', '"']);
        });

        it("should parse numbers", function() {
            const e = Parser.StringLiteral.run('"Hello 42 Wo5rld"').result;
            assert.deepEqual(e, ['"', 'Hello 42 Wo5rld', '"']);
        });

        it("should parse escape sequences", function() {
            const e = Parser.StringLiteral.run('"Hello \\"42 Wo5rld"').result;
            assert.deepEqual(e, ['"', 'Hello "42 Wo5rld', '"']);
        });

        it("should parse escape sequences", function() {
            const e = Parser.StringLiteral.run('"Hello \\"42 Wo5rld"').result;
            assert.deepEqual(e, ['"', 'Hello "42 Wo5rld', '"']);
        });

        it("should parse symbols", function() {
            const e = Parser.StringLiteral.run('"!#%&()*+,-./:;<=>?[]^_{|}~"').result;
            assert.deepEqual(e, ['"', '!#%&()*+,-./:;<=>?[]^_{|}~', '"']);
        });
    });

    describe("Integer32Literal", function() {
        it("should parse integers", function() {
            const e = Parser.Integer32Literal.run("1234").result;
            assert.deepEqual(e, [null, '1234']);
        });

        it("should not parse integers outside the range", function() {
            const e = Parser.Integer32Literal.run("1234349587349857");
            assert(e.isError);
        });

        it("should not parse integers outside the range", function() {
            const e = Parser.Integer32Literal.run("-1234349587349857");
            assert(e.isError);
        });
    });

    describe("UnsignedInteger32Literal", function() {
        it("should parse unsigned integers", function() {
            const e = Parser.UnsignedInteger32Literal.run("1234").result;
            assert.deepEqual(e, '1234');
        });

        it("should not parse negative integers", function() {
            const e = Parser.UnsignedInteger32Literal.run("-1234");
            assert(e.isError);
        });

        it("should not parse integers outside the range", function() {
            const e = Parser.UnsignedInteger32Literal.run("1234349587349857");
            assert(e.isError);
        });
    });

    describe("Integer64Literal", function() {
        it("should parse integers", function() {
            const e = Parser.Integer64Literal.run("5000000000").result;
            assert.deepEqual(e, [null, '5000000000']);
        });

        it("should not parse integers outside the range", function() {
            const e = Parser.Integer64Literal.run("123434955435587349857");
            assert(e.isError);
        });

        it("should not parse integers outside the range", function() {
            const e = Parser.Integer64Literal.run("-123434955435587349857");
            assert(e.isError);
        });
    });

    describe("UnsignedInteger64Literal", function() {
        it("should parse unsigned integers", function() {
            const e = Parser.UnsignedInteger64Literal.run("5000000000").result;
            assert.deepEqual(e, '5000000000');
        });

        it("should not parse negative integers", function() {
            const e = Parser.UnsignedInteger64Literal.run("-1234");
            assert(e.isError);
        });

        it("should not parse integers outside the range", function() {
            const e = Parser.UnsignedInteger64Literal.run("123434955435587349857");
            assert(e.isError);
        });
    });

    describe("Identifier", function() {
        it("should parse single-letter identifiers", function() {
            const e = Parser.Identifier.run("a");
            assert.equal(e.result, "a");
        });

        it("should parse multi-letter identifiers", function() {
            const e = Parser.Identifier.run("foo");
            assert.equal(e.result, "foo");
        });

        it("should parse identifiers with numbers", function() {
            const e = Parser.Identifier.run("bar123");
            assert.equal(e.result, "bar123");
        });

        it("should parse identifiers with underscores", function() {
            const e = Parser.Identifier.run("foo_123");
            assert.equal(e.result, "foo_123");
        });

        it("should parse identifiers beginning with underscores", function() {
            const e = Parser.Identifier.run("_123");
            assert.equal(e.result, "_123");
        });

        it("should not parse identifiers beginning with numbers", function() {
            const e = Parser.Identifier.run("1foo");
            assert(e.isError);
        });
    })
});