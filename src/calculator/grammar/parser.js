import { CstParser } from "chevrotain";
import tokens from "./tokens";

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
            $.SUBRULE($.multiplicationExpression, { LABEL: "lhs"});

            // consumes AdditionOperator group, i.e. Plus and Minus tokens
            $.MANY(() => {
                $.CONSUME(tokens.AdditionOperator);
                $.SUBRULE2($.multiplicationExpression, { LABEL: "rhs"});
            })

        });

        // parsing rule for multiplication expression
        $.RULE("multiplicationExpression", () => {
            $.SUBRULE($.atomicExpression, { LABEL: "lhs"});

            // consumes MultiplicationOperator group, i.e. Multiply and Divide tokens
            $.MANY(() => {
                $.CONSUME(tokens.MultiplicationOperator);
                $.SUBRULE2($.atomicExpression, { LABEL: "rhs"});
            });
        });


        // parsing rule for atomic expression
        $.RULE("atomicExpression", () => {
            $.OR([
                {ALT: () => $.SUBRULE($.parenthesisExpression)},
                {ALT: () => $.CONSUME(tokens.NumberLiteral)},
                {ALT: () => $.SUBRULE($.powerFnExpression)}
            ])
        });


        // parsing rule for parenthesis expression
        $.RULE("parenthesisExpression", () => {
            $.CONSUME(tokens.LeftParen);
            $.SUBRULE($.expression);
            $.CONSUME(tokens.RightParen);
        });

        // parsing rule for powerFn expression
        $.RULE("powerFnExpression", () => {
            $.CONSUME(tokens.PowerFn);
            $.CONSUME(tokens.LeftParen);
            $.SUBRULE($.expression, { LABEL: "base"});
            $.CONSUME(tokens.Comma);
            $.SUBRULE($.expression, {LABEL: "exponent"});
            $.CONSUME(tokens.RightParen);
        });

        this.performSelfAnalysis();
    }
}
export default Parser;

