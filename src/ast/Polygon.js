import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Option from './Option';
import Tokenizer from '../libs/Tokenizer';

class Polygon {
    constructor() {
        this.name = '';
        this.latlons = [];
        this.options = [];
    }

    parse () {
        Tokenizer.getAndCheckNext('polygon');
        this.name = Tokenizer.getNext();
        Tokenizer.getAndCheckNext('\[');
        let latlons = [];
        while (Tokenizer.checkNext() !== '\]') {
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
        while (Tokenizer.checkNext() !== ';') {
            let option = new Option();
            option.parse();
            this.options.push(option);
        }
        Tokenizer.getAndCheckNext(';');
    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        let latlons = [];
        this.latlons.forEach((latlon) => {
            latlons.push(latlon);
        });

        const colorOption = this.options.find(option => option.type === 'color') || {};
        const opacityOption = this.options.find(option => option.type === 'opacity') || {};

        let polygon = mapStore.addPolygon(latlons, colorOption.value, opacityOption.value);
        if (this.name) {
            VarStore.setMapObject(this.name, polygon);
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

    setOpacity(opacity) {
        this.opacity = opacity;
    }
}

export { Polygon as default}