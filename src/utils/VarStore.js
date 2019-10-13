
var typeStore = new Map();
var mapObjectStore = new Map();
var valueStore = new Map();

class VarStore {

    static setType(name, type) {
        typeStore.set(name, type);
    }

    static getType(name) {
        return typeStore.get(name);
    }

    static getMapObject(name) {
        return mapObjectStore.get(name);
    }

    static setMapObject(name, options) {
        mapObjectStore.set(name, options);
    }

    static setValue(name, value) {
        valueStore.set(name, value);
    }

    static getValue(name) {
        return valueStore.get(name);
    }

    static clearStores() {
        typeStore = new Map();
        mapObjectStore = new Map();
        valueStore = new Map();
    }
}

export default VarStore
