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
        return L.marker(latlon).addTo(this.map)
    }

    addPolygon(latlons, color='blue', opacity=0.5) {
        return L.polygon(latlons, {
            color: color,
            fillOpacity: opacity
        }).addTo(this.map)
    }

    addPolyline(latlons, color='green') {
        return L.polyline(latlons, {color: color}).addTo(this.map);
    }

    addCircle(latlon, color='red', opacity=0.5, radius=50) {
        return L.circle(latlon, {
            radius: radius,
            color: color,
            fillOpacity: opacity
        }).addTo(this.map);
    }

    addPopup(mapObject, text) {
        return mapObject.bindPopup("<p>" + text + "</p>").openPopup();
    }

    setCenter(latlon) {
        return this.map.setView(latlon, this.map.getZoom());
    }
}

export default MapStore;
