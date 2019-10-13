import VarStore from '../utils/VarStore';
import MapStore from '../utils/MapStore';
import Tokenizer from '../libs/Tokenizer';
import Option from './Option';

class Popup {
    constructor() {
        this.name = '';
        this.mapObject = null;
    }

    parse () {
        // Command format: popup popupName addingToObjectName with text "popup text";
        Tokenizer.getAndCheckNext('popup');
        this.name = Tokenizer.getNext();
        Tokenizer.getAndCheckNext(' at ');
        this.mapObject = VarStore.getMapObject(Tokenizer.getNext());
        while (Tokenizer.checkNext() !== 'with') {
            let option = new Option();
            option.parse();
            this.options.push(option);
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