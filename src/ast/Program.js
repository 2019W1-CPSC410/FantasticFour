import Tokenizer from '../libs/Tokenizer';
import Latlon from './Latlon';
import Marker from './Marker';
import Circle from './Circle';
import Popup from './Popup';
// import Tooltip from './Tooltip';
import Polygon from './Polygon';
import Polyline from './Polyline';
import Link from './Link';
import Center from './Center';

var tokenizer;

class Program {
    constructor() {
        this.statements = [];
        tokenizer = Tokenizer.getTokenizer();
    }

    getSubStatement() {
        switch (tokenizer.checkNext()) {
            case 'latlon':
                return new Latlon();
            case 'marker':
                return new Marker();
            case 'circle':
                return new Circle();
            case 'popup':
                return new Popup();
            // case 'tooltip':
            //     return new Tooltip();
            case 'polygon':
                return new Polygon();
            case 'polyline':
                return new Polyline();
            case 'link':
                return new Link();
            case 'centered':
                return new Center();
            case 'end':
                return {
                    parse: () => {
                        tokenizer.getNext();
                        console.log('Completed successfully!');
                    }
                };
            default:
                return null;
        }
    }

    parse () {
        tokenizer.getAndCheckNext('createmap');
        while (tokenizer.moreTokens()) {
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