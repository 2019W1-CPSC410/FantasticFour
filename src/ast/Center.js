import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

class Center {
    constructor() {
        this.latlon = [];
    }

    parse () {
        Tokenizer.getAndCheckNext('centered at');
        let latlon = [];
        if (typeof Tokenizer.checkNext() === 'number') {
            latlon.push(Tokenizer.getNext()); // lat
            latlon.push(Tokenizer.getNext()); // lon
        } else {
            latlon = VarStore.getValue(Tokenizer.getNext());
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