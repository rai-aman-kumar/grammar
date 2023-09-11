import { createToken, Lexer } from "chevrotain";

// tokens for plus(+) and minus(-)
const AdditionOperator = createToken({
    name: "AdditionOperator",
    pattern: Lexer.NA
});

const Plus = createToken({
    name: "Plus",
    pattern: /\+/,
    categories: AdditionOperator
});

const Minus = createToken({
    name: "Minus",
    pattern: /-/,
    categories: AdditionOperator
});


// tokens for multiply(*) and divide(/)
const MultiplicationOperator = createToken({
    name: "MultiplicationOperator",
    pattern: Lexer.NA
});

const Multiply = createToken({
    name: "Multiply",
    pattern: /\*/,
    categories: MultiplicationOperator
});

const Divide = createToken({
    name: "Divide",
    pattern: /\//,
    categories: MultiplicationOperator
})


// tokens for parens
const LeftParen = createToken({
    name: "LeftParen",
    pattern: /\(/
});

const RightParen = createToken({
    name: "RightParen",
    pattern: /\)/
});

// Tokens for different types of literals
const NumberLiteral = createToken({
    name: "NumberLiteral",
    pattern: /[1-9]\d*/
});

// other tokens
const PowerFn = createToken({
    name: "PowerFn",
    pattern: /power/
});

const Comma = createToken({
    name: "Comma",
    pattern: /,/
});

// whitespace token
const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED
});
