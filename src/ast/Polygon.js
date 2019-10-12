import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

class Polygon {
    constructor() {
        this.name = "";
        this.latlons = [];
        this.color = "red";
        this.opacity = 0.5;
    }

    parse () {}

    evaluate() {
        let mapStore = MapStore.getInstance();
        let latlons = [];
        this.latlons.forEach((latlon) => {
            latlon = VarStore.getType(latlon);

            latlons.push(latlon.evaluate);
        });

        let polygon = mapStore.addPolygon(latlons, this.color, this.opacity);
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