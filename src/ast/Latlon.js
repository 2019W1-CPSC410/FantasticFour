import Tokenizer from '../libs/Tokenizer';

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
        tokenizer.getAndCheckNext('at');
        this.lat = tokenizer.getNext();
        this.lon = tokenizer.getNext();
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