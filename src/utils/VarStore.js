
var typeStore = new Map();
var mapObjectStore = new Map();
var valueStore = new Map();

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

    static setValue(name, value) {
        valueStore.put(name, value);
    }

    static getValue(name) {
        valueStore.get(name);
    }

    static clearStores() {
        typeStore = new Map();
        mapObjectStore = new Map();
    }
}

export default VarStore
