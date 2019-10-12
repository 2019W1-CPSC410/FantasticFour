import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

class PopupAdd {
    constructor() {
        this.first_name = "";
        this.second_name = "";
    }

    parse () {}

    evaluate() {
        let popup = VarStore.getType(this.first_name);
        let mapStore = MapStore.getInstance();
        let mapObject = VarStore.getMapObject(this.second_name);
        let popupObject = mapStore.addPopup(mapObject, popup.evaluate());
        VarStore.setMapObject(this.first_name, popupObject);
    }
}

export { PopupAdd as default}