import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

class Latlon {
    constructor() {
        this.name = '';
        this.lat = 0;
        this.lon = 0;
    }

    parse () {
        Tokenizer.getAndCheckNext('latlon');
        this.name = Tokenizer.getNext();
        this.lat = Tokenizer.getNext();
        this.lon = Tokenizer.getNext();
    }

    evaluate() {
        return [this.lat, this.lon];
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