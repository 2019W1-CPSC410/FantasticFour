import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Option from './Option';
import Tokenizer from '../libs/Tokenizer';

let tokenizer;

class Polyline {
    constructor() {
        this.name = '';
        this.latlons = [];
        this.options = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('polyline');
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext("at");
        tokenizer.getAndCheckNext('\\[');
        let latlons = [];
        while (tokenizer.checkNext() !== '\\]') {
            let latlon = [];
            if (!isNaN(tokenizer.checkNext())) {
                latlon.push(tokenizer.getNext()); // lat
                latlon.push(tokenizer.getNext()); // lon
            } else {
                latlon = VarStore.getValue(tokenizer.getNext());
            }
            latlons.push(latlon);
            // Multiple lat lons
            if (tokenizer.checkNext() === ',') {
                tokenizer.getAndCheckNext(',');
            }
        }
        tokenizer.getAndCheckNext('\\]');
        this.latlons = latlons;
        if (tokenizer.checkNext() === 'with') {
            // This check is needed because with is optional
            while (tokenizer.checkNext() === 'with') {
                let option = new Option();
                option.parse();
                this.options.push(option);
                // THis handles the termination of when to stop parsing for options
                if (tokenizer.checkNext() !== 'with') {
                    break;
                }
            }
        }
    }

    evaluate() {
        let mapStore = MapStore.getInstance();

        const latlons = this.latlons.map((latlon) => {
            if (typeof latlon === 'string') {
                return VarStore.getValue(latlon);
            }
            return latlon;
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