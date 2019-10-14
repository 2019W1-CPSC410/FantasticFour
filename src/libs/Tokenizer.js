

var theTokenizer;

class Tokenizer {

    constructor(program, literalsList) {
        this.program = program;
        this.literals = literalsList;
        this.tokens = [];
        this.currentToken = 0;
        this.tokenize();
    }

    tokenize() {
        let tokenizedProgram = this.program;
        tokenizedProgram = tokenizedProgram.replace(/\n/g, "");

        // extracts replacing them with _$_, stores them in an array
        // to be added back in later.
        var texts = [...tokenizedProgram.matchAll(/"[^"]*"/g)];
        tokenizedProgram = tokenizedProgram.replace(/"[^"]*"/g, "_$_");

        // prevents leading 'lat' in lat lon from combining with variable name token
        tokenizedProgram = tokenizedProgram.replace(/[-]*\d+\.\d+/g, function(m){ return "_" + m + "_"; });
        console.log(tokenizedProgram);

        this.literals.forEach((s) => {
            let regex = new RegExp(s, "g");
            tokenizedProgram = tokenizedProgram.replace(regex, "_"+s+"_");
            console.log(tokenizedProgram);
        });
        //TODO: Below will make lat and lon hard to distinguish?? may need comma between them??
        tokenizedProgram = tokenizedProgram.replace(/[ ]+/g, "");

        texts.forEach((text) => {
            tokenizedProgram = tokenizedProgram.replace(/\$/, text);
        });

        tokenizedProgram = tokenizedProgram.replace(/[_]+/g, "_");
        console.log(tokenizedProgram);
        let tempTokens = tokenizedProgram.split("_");
        if (tempTokens[tempTokens.length - 2] !== 'end') {
            throw new Error('Missing end statement.');
        }
        this.tokens = tempTokens.slice(1, tempTokens.length -1);
    }

    checkNext() {
        if (this.currentToken < this.tokens.length) {
            return this.tokens[this.currentToken];
        }
        return "NO_MORE_TOKENS";
    }

    checkCurrent() {
        return this.tokens[this.currentToken];
    }

    getNext() {
        let token = "NULLTOKEN";
        if (this.currentToken < this.tokens.length) {
            token = this.tokens[this.currentToken];
            this.currentToken++;
        }
        return token;
    }

    checkToken(testString) {
        let s = this.getNext();
        console.log("comparing: |" + s + "| to |" + testString + "|");
        return s === testString;
    }

    getAndCheckNext(testString) {
        let s = this.getNext();
        if (s !== testString) {
            console.log("Incorrect syntax at: " + s);
            //TODO: throw error here to be handled up stream!!
            throw new Error("Incorrect syntax at: " + s);
        }
        console.log("Matched: " + s + " to " + testString);
    }

    moreTokens() {
        return this.currentToken < this.tokens.length;
    }

    static makeTokenizer(program, literals) {
        if (!theTokenizer) {
            theTokenizer = new Tokenizer(program, literals);
        }
    }

    static clearTokenizer() {
        theTokenizer = null;
    }

    static getTokenizer() {
        return theTokenizer;
    }
}

export default Tokenizer;