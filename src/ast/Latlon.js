import Tokenizer from '../libs/Tokenizer';
import VarStore from '../utils/VarStore';

let tokenizer;

class Latlon {
    constructor() {
        this.name = '';
        this.type = 'latlon';
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

    nameCheck() {
        if (this.name && VarStore.containsName(this.name)) {
            throw Error('Latlon: variable ' + this.name + ' already exists!');
        } else if (this.name) {
            VarStore.setName(this.name);
        }
    }

    typeCheck() {
        if (this.name) {
            VarStore.setType(this.name, this.type);
        }
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