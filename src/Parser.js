const a = require('arcsecond');

const Parser = {};

Parser.StringLiteral = a.sequenceOf([
    a.char('"'),
    a.many(a.choice([
        a.letters,
        a.whitespace,
        a.digits,
        a.str('\\"').map(x => x[1]),
        a.anyOfString('\'\\!#%&()*+,-./:;<=>?[]^_{|}~'),
    ])).map(x => x.join("")),
    a.char('"'),
]);

function numberLiteral(min, max, unsigned) {
    const numeric = a.digits.chain(numStr => {
        const numVal = BigInt(numStr);

        if (numVal > BigInt(max) || numVal < BigInt(min)) {
            return a.fail();
        }

        return a.succeedWith(numStr);
    });

    if (unsigned) {
        return numeric;
    } else {
        return a.sequenceOf([
            a.possibly(a.char('-')),
            numeric,
        ]);
    }
}

Parser.Integer32Literal = numberLiteral(-(2n**31n-1n), 2n**31n, false);
Parser.UnsignedInteger32Literal = numberLiteral(0n, 2n**32n-1n, true);
Parser.Integer64Literal = numberLiteral(-(2n**63n-1n), 2n**63n, false);
Parser.UnsignedInteger64Literal = numberLiteral(0n, 2n**64n, true);

Parser.SingleLineComment = a.between(a.str('//'))(a.char('\n'));

Parser.Identifier = a.sequenceOf([
    a.choice([
        a.letter,
        a.char('_'),
    ]),
    a.many(a.choice([
        a.letter,
        a.digit,
        a.char('_'),
    ])).map(a => a.join('')),
]).map(a => a.join(''));

module.exports = Parser;
