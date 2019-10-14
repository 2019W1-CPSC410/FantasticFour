import Tokenizer from '../libs/Tokenizer';
import VarStore from '../utils/VarStore';

let tokenizer;

class Latlon {
    constructor() {
        this.name = '';
        this.lat = 0;
        this.lon = 0;
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('latlon');
        this.name = tokenizer.getNext();
        this.lat = tokenizer.getNext();
        this.lon = tokenizer.getNext();
    }

    evaluate() {
        const latlon = [this.lat, this.lon];
        VarStore.setValue(this.name, latlon);
        return latlon;
    }

    setName(name) {
        this.name = name;
    }

    setLat(lat) {
        this.lat = lat;
    }

    setLon(lon) {
        this.lon = lon;
    }
}

export { Latlon as default}