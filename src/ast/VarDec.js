import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Type from './Type';

const varTypes = ['marker', 'polygon', 'circle', 'popup', 'tooltip', 'latlon'];
let tokenizer;

class VarDec {
  constructor() {
    this.name = "";
    this.type = null;
    this.color = null;
    this.opacity = null;
    this.radius = null;
    this.text = "";
    this.location = null;
    this.locations = []; // [ [LAT, LON] || VAR_NAME, [LAT, LON] ]
    tokenizer = Tokenizer.getTokenizer();
  }

  parse() {
    const type = new Type();
    type.parse();
    this.name = tokenizer.getNext();
    const token = tokenizer.checkNext();
    while (!varTypes.includes(token) && token !== 'with') {
      let latlon = [];
      if (typeof tokenizer.checkNext() === 'number') {
        latlon.push(tokenizer.getNext()); // lat
        latlon.push(tokenizer.getNext()); // lon
      } else {
        latlon = tokenizer.getNext();
      }
      this.locations.push(latlon);
    }
    tokenizer.getAndCheckNext('with');
    const option = new Option();
    option.parse();
  }

  evaluate() {
    if (this.locations) {
      this.type.setLocation(this.locations);
    }
    if (this.color) {
      this.type.setColor(this.color);
    }
    if (this.radius) {
      this.type.setRadius(this.radius);
    }
    if (this.opacity) {
      this.type.setOpacity(this.opacity);
    }
    if (this.text) {
      this.type.setText(this.text);
    }
    this.type.setName(this.name);
    VarStore.setType(this.name, this.type);
    this.type.evaluate();
  }
}
export { VarDec as default }
