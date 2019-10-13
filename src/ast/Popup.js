import VarStore from '../utils/VarStore';
import MapStore from '../utils/MapStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

let tokenizer;

class Popup {
    constructor() {
        this.name = '';
        this.mapObject = null;
        tokenizer = Tokenizer.getTokenizer();
    }

    parse () {
        // Command format: popup popupName addingToObjectName with text "popup text";
        tokenizer.getAndCheckNext('popup');
        this.name = tokenizer.getNext();
        tokenizer.getAndCheckNext('at');
        this.mapObject = VarStore.getMapObject(tokenizer.getNext());
        if (tokenizer.checkNext() === 'with') {
            // This check is needed because with is optional
            while (tokenizer.checkNext() === 'with') {
                let option = new Option();
                option.parse();
                this.options.push(option);
                // THis handles the termination of when to stop parsing for options
                if (tokenizer.checkNext() !== 'with') {
                    break;
                }
            }
        }
    }

    evaluate() {
        const textOption = this.options.find(option => option.type === 'text');
        const text = textOption.value;

        let mapStore = MapStore.getInstance();
        let popup = mapStore.addPopup(this.mapObject, text);

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