import { CstParser } from "chevrotain";
import { tokens } from "./lexer";

class Parser extends CstParser {
    constructor() {
        // passing tokens for the grammar this parser is supposed to parse
        super(tokens);
        
        const $ = this;

        // parsing rule for base expression
        $.RULE("expression", () => {
            $.SUBRULE($.additionExpression);
        });

        // parsing rule for addition expression
        $.RULE("additionExpression", () => {
            $.SUBRULE($.multiplicationExpression, { label: "lhs"});

            // consumes AdditionOperator group, i.e. Plus and Minus tokens
            $.MANY(() => {
                $.CONSUME(tokens.AdditionOperator);
                $.SUBRULE2($.multiplicationExpression, { label: "rhs"});
            })

        });

        // parsing rule for multiplication expression
        $.RULE("multiplicationExpression", () => {
            $.SUBRULE($.atomicExpression, { label: "lhs"});

            // consumes MultiplicationOperator group, i.e. Multiply and Divide tokens
            $.MANY(() => {
                $.CONSUME(tokens.MultiplicationOperator);
                $.SUBRULE2($.atomicExpression, { label: "rhs"});
            });
        });


        // parsing rule for atomic expression
        $.RULE("atomicExpression", () => {
            $.OR([
                {ALT: () => $.SUBRULE($.parenthesisExpression)},
                {ALT: () => $.CONSUME(tokens.NumberLiteral)},
                {ALT: () => $.SUBRULE($.powerFnExpression)}
            ])
        })

    }
}