import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

class Polyline {
    constructor() {
        this.name = "";
        this.latlons = [];
        this.color = "red";
    }

    parse () {}

    evaluate() {
        let mapStore = MapStore.getInstance();
        let latlons = [];
        this.latlons.forEach((latlon) => {
            latlon = VarStore.getType(latlon);
            latlons.push(latlon.evaluate);
        });

        let polyline = mapStore.addPolyline(latlons, this.color);
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