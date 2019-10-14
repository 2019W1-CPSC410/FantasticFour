import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

let tokenizer;

class Marker {
    constructor() {
        this.name = '';
        this.latlon = [];
        this.varuse = '';
        this.options = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('marker');
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext('at');
        if (!isNaN(tokenizer.checkNext())) {
            let latlon = [];
            latlon.push(tokenizer.getNext()); // lat
            latlon.push(tokenizer.getNext()); // lon
            this.latlon = latlon;
        } else {
            this.varuse = tokenizer.getNext(); // variable
        }
        if (tokenizer.checkNext() === 'with') {
            // This check is needed because with is optional
            while (tokenizer.checkNext() === 'with') {
                let option = new Option();
                option.parse();
                this.options.push(option);
                // This handles the termination of when to stop parsing for options
                if (tokenizer.checkNext() !== 'with') {
                    break;
                }
            }
        }
    }

    evaluate() {
        let location = this.latlon;

        if (this.varuse) {
            location = VarStore.getValue(this.varuse);
        }

        let mapStore = MapStore.getInstance();
        let marker = mapStore.addMarker(location);
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