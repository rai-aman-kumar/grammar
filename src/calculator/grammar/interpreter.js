import { tokenMatcher } from "chevrotain";
import Parser from "./parser";
import tokens from "./tokens";

// creating base cst visitor for interpreter
const parser = new Parser([]);
const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

class Interpreter extends BaseCstVisitor {

    constructor() {
        super();
        this.validateVisitor();
    }

    // interpreter for base expression
    expression(context) {
        return this.visit(context.additionExpression);
    }

    // interpreter for addition expression
    additionExpression(context) {
        // evaluating lhs
        let result = this.visit(context.lhs);

        // if rhs is present, evaluating it
        if(context.rhs) {
            context.rhs.forEach((rhsOperand, index) => {
                // evaluating rhsValue
                const rhsValue = this.visit(rhsOperand);
                const operator = context.AdditionOperator[index];

                // Since AdditionOperator contains just "tokens.Plus" and "tokens.Minus", if else would suffice
                if(tokenMatcher.matches(operator, tokens.Plus)) {
                    result += rhsValue;
                }
                else {
                    result -= rhsValue;
                }
            })
        }
        return result;
    }

    // interpreter for multiplication expression
    multiplicationExpression(context) {
        // evaluation lhs
        let result = this.visit(context.lhs);

        // if rhs is present, evaluating it
        if(context.rhs) {
            context.rhs.forRach((rhsOperand, index) => {
                // evaluating rhsValue
                const rhsValue = this.visit(rhsOperand);
                const operator = context.MultiplicationOperator[index];

                // Since Multiplication operator contains just "tokens.Multiply" and "tokens.Divide", if else would suffice
                if(tokenMatcher.matches(operator, tokens.Multiply)) {
                    result *= rhsValue;
                }
                else {
                    result /= rhsValue;
                }

            })
        }
        return result;
    }

    // interpreter or atomic expression
    atomicExpression(context) {
        if(context.parenthesisExpression) {
            return this.visit(context.parenthesisExpression);
        }
        else if(context.powerFnExpression) {
            return this.visit(context.powerFnExpression);
        }
        else if(context.NumberLiteral) {
            return parseInt(context.NumberLiteral[0].image, 10)
        }
    }


    // interpreter for parenthesis expression
    parenthesisExpression(context) {
        // a parenthesis expression will contain LeftParen, RightParen and expression in between
        // but for evaluation, LeftParen and RightParen won't matter, so not interpreting it
        return this.visit(context.expression);
    }

    powerFnExpression(context) {
        const base = this.visit(context.base);
        const exponent = this.visit(context.exponent);
        return Math.pow(base, exponent);
    }

}

export default Interpreter;