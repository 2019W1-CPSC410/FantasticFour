import Tokenizer from '../libs/Tokenizer';

class Option {
  constructor() {
    this.optionType = '';
    this.optionValue = '';
  }

  parse() {
    this.optionType = Tokenizer.getNext();
    this.optionValue = Tokenizer.getNext();
  }

  evaluate() {

  }
}
export { Option as default }