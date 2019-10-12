import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

class Circle {
    constructor() {
        this.name = "";
        this.latlon = [];
        this.options = [];
    }

    parse () {
        Tokenizer.getAndCheckNext('circle');
        this.name = Tokenizer.getNext();
        let latlon = [];
        if (typeof Tokenizer.checkNext() === 'number') {
            latlon.push(Tokenizer.getNext()); // lat
            latlon.push(Tokenizer.getNext()); // lon
        } else {
            latlon = VarStore.getValue(Tokenizer.getNext());
        }
        this.latlon = latlon;
        while (Tokenizer.checkNext() !== ';') {
            let option = new Option();
            option.parse();
            this.options.push(option);
        }
    }

    evaluate() {
        const colorOption = this.options.find(option => option.type === 'color') || {};
        const opacityOption = this.options.find(option => option.type === 'opacity') || {};
        const radiusOption = this.options.find(option => option.type === 'radius') || {};
        let mapStore = MapStore.getInstance();
        let circle = mapStore.addCircle(
            this.latlon,
            colorOption.value,
            opacityOption.opacity,
            radiusOption.radius
        );
        if (this.name) {
            VarStore.setMapObject(this.name, circle);
        }
    }

    setLocation(latlon) {
        this.latlon = latlon[0];
    }

    setName(name) {
        this.name = name;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    setColor(color) {
        this.color = color;
    }

    setOpacity(opacity) {
        this.opacity = opacity;
    }
}

export { Circle as default}

