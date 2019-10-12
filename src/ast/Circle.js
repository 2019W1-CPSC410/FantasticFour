import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

class Circle {
    constructor() {
        this.name = "";
        this.latlon = null;
        this.color = "red";
        this.opacity = 0.5;
        this.radius = 50;
    }

    parse () {}

    evaluate() {
        let mapStore = MapStore.getInstance();
        let latlon = VarStore.getType(this.latlon);
        let circle = mapStore.addCircle(latlon.evaluate(), this.color, this.opacity, this.radius);
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

