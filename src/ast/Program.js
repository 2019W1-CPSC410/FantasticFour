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
        console.log(tokenizer.checkNext());
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
            // Need 'end' case because otherwise for this case:
            //  create map
            //  latlon richmond at 49.1817 -123.1351
            //  centered at richmond
            // Tokenizer will get rid of the last element (richmond), since
            // the last word is expected to be a static literal that has
            // underscores surrounding it, but since it's a var, it doesn't.
            case 'end':
                return {
                    parse: () => {
                        tokenizer.getNext();
                        console.log('Parse routine has completed successfully!');
                    },
                    evaluate: () => {
                        console.log('Evaluation routine has completed successfully!');
                    },
                    nameCheck: () => {
                        console.log('Name check routine has completed successfully!');
                    },
                };
            default:
                return null;
        }
    }

    parse () {
        tokenizer.getAndCheckNext('createmap');
        while (tokenizer.moreTokens()) {
            let s = this.getSubStatement();
            console.log(s);
            if (s) {
                s.parse();
                this.statements.push(s);
            } else {
                throw new Error(`Unexpected token: ${tokenizer.checkCurrent()}`)
            }
        }
    }

    nameCheck() {
        this.statements.forEach((statement) => {
            statement.nameCheck();
        })
    }

    evaluate() {
        this.statements.forEach((statement) => {
            statement.evaluate();
        })
    }

}

export { Program as default}