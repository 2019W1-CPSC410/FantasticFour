import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

let tokenizer;

class Marker {
    constructor() {
        this.name = ''
        this.latlon = [];
        this.options = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('marker');
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext('at');
        let latlon = [];
        if (!isNaN(tokenizer.checkNext())) {
            latlon.push(tokenizer.getNext()); // lat
            latlon.push(tokenizer.getNext()); // lon
        } else {
            latlon = VarStore.getValue(tokenizer.getNext());
        }
        this.latlon = latlon;
        if (tokenizer.checkNext() === 'with') {
            // This check is needed because with is optional
            while (tokenizer.checkNext() !== 'with') {
                let option = new Option();
                option.parse();
                this.options.push(option);
            }
        }
    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        let marker = mapStore.addMarker(this.latlon);
        if (this.name) {
            VarStore.setMapObject(this.name, marker);
        }
    }

    setLocation(latlon) {
        this.latlon = latlon[0];
    }

    setName(name) {
        this.name = name;
    }
}

export { Marker as default}