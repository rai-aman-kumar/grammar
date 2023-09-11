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


