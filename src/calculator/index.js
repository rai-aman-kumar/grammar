import { Lexer } from "chevrotain";
import tokens from "./grammar/tokens";
import Parser from "./grammar/parser";

// creating lexer and parser for our calculator
const lexer = new Lexer(tokens);
const parser = new Parser([]);