import Tokenizer from '../libs/Tokenizer';

class LatLon {
  constructor() {
    this.varName = '';
    this.lat = 0;
    this.lon = 0;
  }

  parse() {
    Tokenizer.getAndCheckNext('latlon');
    this.varName = Tokenizer.getNext();
    this.lat = Tokenizer.getNext();
    this.lon = Tokenizer.getNext();
  }

  evaluate() {

  }
}

export { LatLon as default }