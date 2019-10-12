import VarStore from '../utils/VarStore';

class Popup {
    constructor() {
        this.name = "";
        this.text = "";
    }

    parse () {}

    evaluate() {
        return this.text;
    }

    setName(name) {
        this.name = name;
    }

    setText(text) {
        this.text = text;
    }
}

export { Popup as default}