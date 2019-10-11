import MapStore from '../utils/MapStore'

class Marker {
    constructor() {
        this.latlon = [49.25, -123.12];
    }

    parse () {

    }

    evaluate() {
        let mapStore = MapStore.getInstance();
        mapStore.addMarker(this.latlon);
    }
}

export { Marker as default}