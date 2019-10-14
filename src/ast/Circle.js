import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

let tokenizer;

class Circle {
    constructor() {
        this.type = 'map';
        this.name = '';
        this.latlon = [];
        this.varuse = '';
        this.options = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        tokenizer.getAndCheckNext('circle');
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext('at');
        if (!isNaN(tokenizer.checkNext())) {
            let latlon = [];
            latlon.push(tokenizer.getNext()); // lat
            latlon.push(tokenizer.getNext()); // lon
            this.latlon = latlon;
        } else {
            this.varuse = tokenizer.getNext(); // variable
        }
        if (tokenizer.checkNext() === 'with') {
            // This check is needed because with is optional
            while (tokenizer.checkNext() === 'with') {
                let option = new Option();
                option.parse();
                this.options.push(option);
                // This handles the termination of when to stop parsing for options
                if (tokenizer.checkNext() !== 'with') {
                    break;
                }
            }
        }
    }

    evaluate() {
        let location = this.latlon;

        if (this.varuse) {
            location = VarStore.getValue(this.varuse);
        }

        const colorOption = this.options.find(option => option.type === 'color') || {};
        const opacityOption = this.options.find(option => option.type === 'opacity') || {};
        const radiusOption = this.options.find(option => option.type === 'radius') || {};
        let mapStore = MapStore.getInstance();
        let circle = mapStore.addCircle(
            location,
            colorOption.value,
            opacityOption.value, // TODO: parse opacity value -> it's currently a string
            radiusOption.value, // TODO: parse radius value -> it's currently a string
        );
        if (this.name) {
            VarStore.setMapObject(this.name, circle);
        }
    }

    nameCheck() {
        if (this.varuse && !VarStore.containsName(this.varuse)) {
            throw Error('Circle: variable ' + this.varuse + ' does not exist!');
        }
        if (this.name && VarStore.containsName(this.name)) {
            throw Error('Circle: name ' + this.name + ' already exists!');
        }
        if (this.name) {
            VarStore.setName(this.name);
        }
    }

    typeCheck() {
        if (this.name) {
            VarStore.setType(this.name, this.type);
        }
    }

    setLocation(latlon) {
        this.latlon = latlon[0];
    }

    setName(name) {
        this.name = name;
    }

    setRadius(radius) {
        this.radius = radius;
    }

    setColor(color) {
        this.color = color;
    }

    setOpacity(opacity) {
        this.opacity = opacity;
    }
}

export { Circle as default}

