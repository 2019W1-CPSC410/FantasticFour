import Tokenizer from '../libs/Tokenizer';

let tokenizer;

class Option {
  constructor() {
    this.type = '';
    this.value = '';
    tokenizer = Tokenizer.getTokenizer();
  }

  parse() {
    tokenizer.getAndCheckNext('with');
    this.type = tokenizer.getNext(); // option types: color, opacity, radius, etc
    this.value = tokenizer.getNext(); // option values: 'red', '50%', 1, etc
  }

  evaluate() {

  }
}
export { Option as default }