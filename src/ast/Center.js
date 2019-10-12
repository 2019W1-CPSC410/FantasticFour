import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

class Center {
    constructor() {
        this.latlon = null;
    }

    parse () {}

    evaluate() {
        let latlon = VarStore.getType(this.latlon);
        let mapStore = MapStore.getInstance();
        let center = mapStore.setCenter(latlon.evaluate());
    }

    setLocation(latlon) {
        this.latlon = latlon;
    }
}

export { Center as default}