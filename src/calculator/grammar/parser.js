import { CstParser } from "chevrotain";
import { tokens } from "./lexer";

class Parser extends CstParser {
    constructor() {
        // passing tokens for the grammar this parser is supposed to parse
        super(tokens);
        
        const $ = this;

        // parsing rule for base expression
        $.RULE("expression", () => {
            $.SUBRULE($.additionExpression)
        })

        // parsing rule for addition expression
        $.RULE("additionExpression", () => {
            $.SUBRULE($.multiplicationExpression, { label: "lhs"});

            // additionExpression consumes AdditionOperator which is a group made of Plus and Minus
            // so these are the only 2 tokens this rule will consume
            $.MANY(() => {
                $.CONSUME(tokens.AdditionOperator);
                $.SUBRULE2($.multiplicationExpression, { label: "rhs"});
            })

        })

    }
}