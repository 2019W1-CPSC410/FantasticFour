import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';

class Circle {
    constructor() {
        this.name = "";
        this.latlon = null;
        this.color = "red";
        this.opacity = 0.5;
        this.radius = 50;
        this.option = null;
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
        this.option = new Option();
        this.option.parse();
    }

    evaluate() {
        const { color, opacity, radius } = this.option;
        let mapStore = MapStore.getInstance();
        let latlon = VarStore.getType(this.latlon);
        let circle = mapStore.addCircle(latlon.evaluate(), color, opacity, radius);
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

