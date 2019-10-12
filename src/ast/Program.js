import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';
import Tokenizer from '../libs/Tokenizer';
import Latlon from './Latlon';
import Marker from './Marker';
import Circle from './Circle';
import Popup from './Popup';
import Tooltip from './Tooltip';
import Polygon from './Polygon';
import Polyline from './Polyline';
import Link from './Link';
import Center from './Center';

class Program {
    constructor() {
        this.statements = [];
    }

    getSubStatement() {
        switch (Tokenizer.checkToken()) {
            case 'latlon':
                return new Latlon();
            case 'marker':
                return new Marker();
            case 'circle':
                return new Circle();
            case 'popup':
                return new Popup();
            case 'tooltip':
                return new Tooltip();
            case 'polygon':
                return new Polygon();
            case 'polyline':
                return new Polyline();
            case 'link':
                return new Link();
            case 'centered at':
                return new Center();
            default:
                return null;
        }
    }

    parse () {
        while (Tokenizer.moreTokens()) {
            let s = this.getSubStatement();
            s.parse();
            this.statements.push(s);
        }
    }

    evaluate() {
        this.statements.forEach((statement) => {
            statement.evalutate();
        })
    }

}

export { Program as default}