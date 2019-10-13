import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Option from './Option';
import Tokenizer from '../libs/Tokenizer';

class Polyline {
    constructor() {
        this.name = '';
        this.latlons = [];
        this.options = [];
    }

    parse () {
        Tokenizer.getAndCheckNext('polyline');
        this.name = Tokenizer.getNext();
        Tokenizer.getAndCheckNext('[');
        let latlons = [];
        while (Tokenizer.checkNext() !== ']') {
            let latlon = [];
            if (typeof Tokenizer.checkNext() === 'number') {
                latlon.push(Tokenizer.getNext()); // lat
                latlon.push(Tokenizer.getNext()); // lon
            } else {
                latlon = VarStore.getValue(Tokenizer.getNext());
            }
            latlons.push(latlon);
            // Multiple lat lons
            if (Tokenizer.checkNext() === ',') {
                Tokenizer.getAndCheckNext(',');
            }
        }
        this.latlons = latlons;
        while (Tokenizer.checkNext() !== 'with') {
            let option = new Option();
            option.parse();
            this.options.push(option);
        }
    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        let latlons = [];
        this.latlons.forEach((latlon) => {
            latlons.push(latlon);
        });

        const colorOption = this.options.find(option => option.type === 'color') || {};

        let polyline = mapStore.addPolyline(latlons, colorOption.value);
        if (this.name) {
            VarStore.setMapObject(this.name, polyline);
        }
    }

    setLocation(latlon) {
        this.latlon = latlon;
    }

    setName(name) {
        this.name = name;
    }

    setColor(color) {
        this.color = color;
    }
}

export { Polyline as default}