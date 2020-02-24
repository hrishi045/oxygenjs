const a = require('arcsecond');

const Parser = {};

Parser.OStringLiteral = a.sequenceOf([
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

module.exports = Parser;
