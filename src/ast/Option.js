import Tokenizer from '../libs/Tokenizer';

class Option {
  constructor() {
    this.type = '';
    this.value = '';
  }

  parse() {
    Tokenizer.getAndCheckNext('with');
    this.type = Tokenizer.getNext(); // option types: color, opacity, radius, etc
    this.value = Tokenizer.getNext(); // option values: 'red', '50%', 1, etc
  }

  evaluate() {

  }
}
export { Option as default }