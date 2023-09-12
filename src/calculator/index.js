import { Lexer } from "chevrotain";
import tokens from "./grammar/tokens";
import Parser from "./grammar/parser";
import Interpreter from "./grammar/interpreter";

const processText = (text) => {

    // creating lexer instance and tokenizing input
    const lexer = new Lexer(tokens);
    const lexingResult = lexer.tokenize(text);

    // creating parser instance and setting input as tokens created by lexer
    const parser = new Parser([]);
    parser.input = lexingResult.tokens;

    // Creating cst by parsing
    const cst = parser.expression();

    // creating interpreter instance and interpreting created cst
    const interpreter = new Interpreter();
    const expression = interpreter.visit(cst);

    return {
        lexingResult: lexingResult,
        parsingErrors: parser.errors,
        expression: expression,
    }
}


console.log(processText("(1+2)"))