import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

class Marker {
    constructor() {
        this.name = "";
        this.latlon = null;
    }

    parse () {
        Tokenizer.getAndCheckNext('marker');
        this.name = Tokenizer.getNext();
        let latlon = [];
        if (typeof Tokenizer.checkNext() === 'number') {
            latlon.push(Tokenizer.getNext()); // lat
            latlon.push(Tokenizer.getNext()); // lon
        } else {
            latlon = Tokenizer.getNext();
        }
        this.latlon = latlon;
    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        let latlon = VarStore.getType(this.latlon);
        let marker = mapStore.addMarker(latlon.evaluate());
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