import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Tokenizer from '../libs/Tokenizer';
import Program from '../ast/Program';
import VarStore from '../utils/VarStore';
import MapStore from '../utils/MapStore'
import L from 'leaflet';

const styles = {
    textAreaContainer: {
        width: '600px',
        height: '200px',
    },
    submitButton: {
        width: '600px'
    },
    mapContainer: {
        width: '600px',
        height: '600px',
    },
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
            tokens: [],
            map: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    createMap() {
        // TODO: create AST and evaluate here from tokens passed in as props.tokens
        // Create map L.map() returns a map object
        let mapStore = MapStore.getInstance();
        mapStore.setMap(L.map('map', {
            center: [49.25, -123.12],
            zoom: 13,
            layers: [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ]
        }));
    }
    componentDidMount() {
        this.createMap();
    }
    handleChange(event) {
        this.setState({text: event.target.value});
    }
    handleSubmit(event) {
        //TODO: perform tokenization here, save to state!!
        // alert('A map was submitted: ' + this.state.text);
        let mapStore = MapStore.getInstance();
        let map = mapStore.getMap();

        // deletes the map
        map.remove();
        this.createMap();
        Tokenizer.makeTokenizer(this.state.text, literals);
        event.preventDefault();
        let program = new Program();
        program.parse();
        program.evaluate();
        // TODO: Once user clicks submit, need to restart tokenizer
        Tokenizer.clearTokenizer();
        VarStore.clearStores();
    }
    render() {
        const { classes } = this.props;
        // Must set defined height for map to render
        return <div>
            <div id="map" className={classes.mapContainer} />
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
