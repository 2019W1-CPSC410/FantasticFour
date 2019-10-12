import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Type from './Type';

const varTypes = ['marker', 'polygon', 'circle', 'popup', 'tooltip', 'latlon'];

class VarDec {
  constructor() {
    this.name = "";
    this.type = null;
    this.color = null;
    this.opacity = null;
    this.radius = null;
    this.location = null;
    this.locations = []; // [ [LAT, LON] || VAR_NAME, [LAT, LON] ]
  }

  parse() {
    const type = new Type();
    type.parse();
    this.name = Tokenizer.getNext();
    const token = Tokenizer.checkNext();
    while (!varTypes.includes(token) && token !== 'with') {
      let latlon = [];
      if (typeof Tokenizer.checkNext() === 'number') {
        latlon.push(Tokenizer.getNext()); // lat
        latlon.push(Tokenizer.getNext()); // lon
      } else {
        latlon = Tokenizer.getNext();
      }
      this.locations.push(latlon);
    }
    Tokenizer.getAndCheckNext('with');
    const option = new Option();
    option.parse();
  }

  evaluate() {

  }
}
export { VarDec as default }