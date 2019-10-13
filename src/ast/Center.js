import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

let tokenizer;

class Center {
    constructor() {
        this.latlon = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('centered');
        tokenizer.getAndCheckNext('at');
        let latlon = [];
        if (!isNaN(tokenizer.checkNext())) {
            latlon.push(tokenizer.getNext()); // lat
            latlon.push(tokenizer.getNext()); // lon
        } else {
            latlon = VarStore.getValue(tokenizer.getNext());
        }
        this.latlon = latlon;
    }

    evaluate() {
        let latlon = VarStore.getType(this.latlon);
        let mapStore = MapStore.getInstance();
        let center = mapStore.setCenter(latlon.evaluate());
    }

    setLocation(latlon) {
        this.latlon = latlon;
    }
}

export { Center as default}