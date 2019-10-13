import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

let tokenizer;

class Circle {
    constructor() {
        this.name = "";
        this.latlon = [];
        this.options = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('circle');
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

