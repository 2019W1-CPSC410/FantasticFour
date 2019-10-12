import VarStore from '../utils/VarStore'

class VarDec {
    constructor() {
        this.name = "";
        this.type = null;
        this.color = null;
        this.opacity = null;
        this.radius = null;
        this.locations = [];
        this.text = "";
    }

    parse() {}

    evaluate() {
        if (this.locations) {
            this.type.setLocation(this.locations);
        }
        if (this.color) {
            this.type.setColor(this.color);
        }
        if (this.radius) {
            this.type.setRadius(this.radius);
        }
        if (this.opacity) {
            this.type.setOpacity(this.opacity);
        }
        if (this.text) {
            this.type.setText(this.text);
        }
        this.type.setName(name);
        VarStore.setType(this.name, this.type);
        this.type.evaluate();
    }
}

export { VarDec as default}