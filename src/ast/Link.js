import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

let tokenizer;

class Link {
    constructor() {
        this.first_location = '';
        this.second_location = '';
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('link');
        this.first_location = tokenizer.getNext(); // variable
        tokenizer.getAndCheckNext('with');
        this.second_location = tokenizer.getNext(); // variable
    }

    nameCheck() {
        if (this.first_location && !VarStore.containsName(this.first_location)) {
            throw Error('Link: variable ' + this.first_location + ' does not exist!');
        }
        if (this.second_location && !VarStore.containsName(this.second_location)) {
            throw Error('Link: variable ' + this.second_location + ' does not exist!');
        }
    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        let first_object = VarStore.getMapObject(this.first_location);
        let second_object = VarStore.getMapObject(this.second_location);

        // TODO: type check that links are only between circles and markers (see class example)
        let first_latlon = first_object.getLatLng();
        let second_latlon = second_object.getLatLng();

        // TODO: could add options to link since its a polyline, for now only default color.
        let marker = mapStore.addPolyline([first_latlon, second_latlon]);
    }
}

export { Link as default}