import VarStore from '../utils/VarStore';
import MapStore from '../utils/MapStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

let tokenizer;

class Popup {
    constructor() {
        this.name = '';
        this.latlon = [];
        this.varuse = '';
        this.options = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        // Command format: popup popupName addingToObjectName with text "popup text";
        tokenizer.getAndCheckNext('popup');
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext('at');
        // TODO: If location is specified (constants or variable)
        // if (!isNaN(tokenizer.checkNext())) {
        //     let latlon = [];
        //     latlon.push(tokenizer.getNext()); // lat
        //     latlon.push(tokenizer.getNext()); // lon
        //     this.latlon = latlon;
        // } else {
        //     this.varuse = tokenizer.getNext(); // variable
        // }
        // If a MapObject is specified
        this.varuse = tokenizer.getNext();
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
        } else {
            throw new Error('No text option specified for popup.');
        }
    }

    evaluate() {
        const textOption = this.options.find(option => option.type === 'text');

        const text = textOption.value;

        const mapObject = VarStore.getMapObject(this.varuse);

        let mapStore = MapStore.getInstance();
        let popup = mapStore.addPopup(mapObject, text);

        if (this.name) {
            VarStore.setMapObject(this.name, popup);
        }

        return text;
    }

    setName(name) {
        this.name = name;
    }

    setText(text) {
        this.text = text;
    }
}

export { Popup as default}