import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

let tokenizer;

class Center {
    constructor() {
        this.type = 'center';
        this.latlon = [];
        this.varuse = '';
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('centered');
        tokenizer.getAndCheckNext('at');
        if (!isNaN(tokenizer.checkNext())) {
            let latlon = [];
            latlon.push(tokenizer.getNext()); // lat
            latlon.push(tokenizer.getNext()); // lon
            this.latlon = latlon;
        } else {
            this.varuse = tokenizer.getNext(); // variable
        }
    }

    nameCheck() {
        if (this.varuse && !VarStore.containsName(this.varuse)) {
            throw Error('Center: variable ' + this.varuse + ' does not exist!');
        }
    }

    typeCheck() {
        VarStore.setType('center', this.type);
    }

    evaluate() {
        let location = this.latlon;

        if (this.varuse) {
            location = VarStore.getValue(this.varuse);
        }

        let mapStore = MapStore.getInstance();
        let center = mapStore.setCenter(location);
    }

    setLocation(latlon) {
        this.latlon = latlon;
    }
}

export { Center as default}