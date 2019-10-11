import L from 'leaflet';

let instance = null;

class MapStore {

    constructor() {}

    static getInstance() {
        if (!instance) {
            instance = new MapStore();
        }
        return instance;
    }

    getMap() {
        return this.map;
    }

    setMap(map) {
        this.map = map;
    }

    addMarker(latlon) {
        L.marker(latlon).addTo(this.map)
    }

    addPolygon(latlons, color='blue', opacity=0.5) {
        L.polygon(latlons, {
            color: color,
            fillOpacity: opacity
        }).addTo(this.map)
    }

    addPolyline(latlons, color='green') {
        L.polyline(latlons, {color: color}).addTo(this.map);
    }

    addCircle(latlon, color='red', opacity=0.5, radius=50) {
        L.circle(latlon, {
            radius: radius,
            color: color,
            fillOpacity: opacity
        }).addTo(this.map);
    }

    addPopup(mapObject, text) {
        mapObject.bindPopup(text).openPopup();
    }
}

export default MapStore;
