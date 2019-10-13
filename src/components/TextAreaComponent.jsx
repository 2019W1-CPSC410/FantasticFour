import React, { Component } from 'react';
import MapComponent from './MapComponent';
import { withStyles } from '@material-ui/styles';
import Tokenizer from '../libs/Tokenizer';
import Program from '../ast/Program';

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
    "titled", "legend item", "marker", "polygon", ",",
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
