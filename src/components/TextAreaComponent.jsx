import React, { Component } from 'react';
import MapComponent from './MapComponent';
import { withStyles } from '@material-ui/styles';
import Tokenizer from '../libs/Tokenizer';
import Program from '../ast/Program';
import VarStore from '../utils/VarStore';

const styles = {
    textAreaContainer: {
        width: '600px',
        height: '200px',
    },
    submitButton: {
        width: '600px'
    }
};

const literals = ["create map", "end", "centered", "\\[", "\\]", ";",
    "titled", "legend item", "marker", "polygon", ",", "link",
    "circle", "polyline", "latlon", "popup", "text", "color",
    "opacity", "with", "radius", " add ", " at ", " to ", "zoom level",
];

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'create map',
            tokens: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        //TODO: perform tokenization here, save to state!!
        // alert('A map was submitted: ' + this.state.text);
        Tokenizer.makeTokenizer(this.state.text, literals);
        event.preventDefault();
        let program = new Program();
        program.parse();
        program.evaluate();
        // TODO: Once user clicks submit, need to restart tokenizer
        Tokenizer.clearTokenizer();
        VarStore.clearStores();
        // TODO: Clear map state?? We're expecting the user to modify his program
        // in the text area to see his changes, but if we don't clear map state,
        // when the user submits the program for 3 times, every element on the map
        // will appear 3 times on the map.
    }

    render() {
        const { classes } = this.props;
        // Must set defined height for map to render
        return <div>
            <MapComponent
                tokens={this.state.tokens}
            />
            <div align={"left"}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <textarea value={this.state.text}
                                  onChange={this.handleChange}
                                  id="textArea"
                                  className={classes.textAreaContainer}/>
                    </label>
                    <div>
                    <input type="submit"
                           value="Submit"
                           className={classes.submitButton}/>
                    </div>
                </form>
            </div>
        </div>
    }
}

export default withStyles(styles)(TextArea);
