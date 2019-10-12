import MapStore from '../utils/MapStore';
import VarStore from '../utils/VarStore';

var statements = [];

class Program {
    constructor() {}

    parse () {

    }

    evaluate() {
        statements.forEach((statement) => {
            statement.evalutate();
        })
    }

}

export { Program as default}