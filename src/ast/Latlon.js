import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

class Marker {
    constructor() {
        this.name = "";
        this.lat = null;
        this.lon = null;
    }

    parse () {

    }

    evaluate() {
        return [this.lat, this.lon];
    }

    setName(name) {
        this.name = name;
    }

    setLat(lat) {
        this.lat = lat;
    }

    setLon(lon) {
        this.lon = lon;
    }
}

export { Marker as default}