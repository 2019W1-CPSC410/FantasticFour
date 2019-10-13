import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

class Marker {
    constructor() {
        this.name = ''
        this.latlon = [];
        this.options = [];
    }

    parse () {
        Tokenizer.getAndCheckNext('marker');
        this.name = Tokenizer.getNext();
        let latlon = [];
        if (typeof Tokenizer.checkNext() === 'number') {
            latlon.push(Tokenizer.getNext()); // lat
            latlon.push(Tokenizer.getNext()); // lon
        } else {
            latlon = VarStore.getValue(Tokenizer.getNext());
        }
        this.latlon = latlon;
        while (Tokenizer.checkNext() !== 'with') {
            let option = new Option();
            option.parse();
            this.options.push(option);
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