const assert = require('assert');
const Parser = require('../src/Parser');

describe("Parser", function () {
    describe("OStringLiteral", function() {
        it("should parse a string with only letters", function () {
            const e = Parser.OStringLiteral.run('"HelloWorld"').result;
            assert.deepEqual(e, ['"', 'HelloWorld', '"']);
        });

        it("should parse whitespace", function() {
            const e = Parser.OStringLiteral.run('"Hello World"').result;
            assert.deepEqual(e, ['"', 'Hello World', '"']);
        });

        it("should parse numbers", function() {
            const e = Parser.OStringLiteral.run('"Hello 42 Wo5rld"').result;
            assert.deepEqual(e, ['"', 'Hello 42 Wo5rld', '"']);
        });

        it("should parse escape sequences", function() {
            const e = Parser.OStringLiteral.run('"Hello \\"42 Wo5rld"').result;
            assert.deepEqual(e, ['"', 'Hello "42 Wo5rld', '"']);
        });

        it("should parse escape sequences", function() {
            const e = Parser.OStringLiteral.run('"Hello \\"42 Wo5rld"').result;
            assert.deepEqual(e, ['"', 'Hello "42 Wo5rld', '"']);
        });

        it("should parse symbols", function() {
            const e = Parser.OStringLiteral.run('"!#%&()*+,-./:;<=>?[]^_{|}~"').result;
            assert.deepEqual(e, ['"', '!#%&()*+,-./:;<=>?[]^_{|}~', '"']);
        });
    });
});