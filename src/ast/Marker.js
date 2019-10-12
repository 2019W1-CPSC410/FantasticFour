import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

class Marker {
    constructor() {
        this.name = "";
        this.latlon = null;
    }

    parse () {

    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        let latlon = VarStore.getType(this.latlon);
        let marker = mapStore.addMarker(latlon.evaluate());
        if (this.name) {
            VarStore.setMapObject(this.name, marker);
        }
    }

    setLocation(latlon) {
        this.latlon = latlon[0];
    }

    setName(name) {
        this.name = name;
    }
}

export { Marker as default}