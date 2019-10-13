import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

let tokenizer;

class Link {
    constructor() {
        this.first_name = '';
        this.second_name = '';
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('link');
        this.first_name = tokenizer.getNext();
        tokenizer.getAndCheckNext('with');
        this.second_name = tokenizer.getNext();
    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        let first_object = VarStore.getMapObject(this.first_name);
        let second_object = VarStore.getMapObject(this.second_name);

        // TODO: type check that links are only between circles and markers (see class example)
        let first_latlon = first_object.getLatLng();
        let second_latlon = second_object.getLatLng();

        // TODO: could add options to link since its a polyline, for now only default color.
        let marker = mapStore.addPolyLine([first_latlon, second_latlon]);
    }
}

export { Link as default}