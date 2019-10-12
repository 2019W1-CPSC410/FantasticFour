
var typeStore = new Map();
var mapObjectStore = new Map();

class VarStore {

    static setType(name, type) {
        typeStore.put(name, type);
    }

    static getType(name) {
        return typeStore.get(name);
    }

    static getMapObject(name) {
        return mapObjectStore.get(name);
    }

    static setMapObject(name, options) {
        mapObjectStore.put(name, options);
    }

    static clearStores() {
        typeStore = new Map();
        mapObjectStore = new Map();
    }
}

export default VarStore
