import L from 'leaflet';
import MapStore from '../utils/MapStore'

class Marker {
    constructor() {}

    addMarker (latlon) {
        L.marker(latlon).addTo(MapStore.getMap());
    };


    evaluate() {
        this.addMarker([49.25, -123.12]);
    }
}

export { Marker as default}