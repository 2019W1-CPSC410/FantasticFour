import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Tokenizer from '../libs/Tokenizer';
import Program from '../ast/Program';
import VarStore from '../utils/VarStore';
import MapStore from '../utils/MapStore'
import L from 'leaflet';
import { Button, Typography } from '@material-ui/core';

const styles = {
  pageContent: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textAreaContainer: {
    width: '540px',
    height: '480px',
    fontSize: '16px',
    padding: '10px',
  },
  submitButton: {
    width: '560px',
    padding: '10px',
    margin: '5px',
    backgroundColor: '#0388ca',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '600px',
    height: '700px',
  },
  development: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  consoleArea: {
    width: '540px',
    height: '100px',
    padding: '5px 10px',
    border: '1px solid #000000',
    textAlign: 'left',
  },
  successText: {
    color: '#008000',
    fontSize: '14px',
  },
  errorText: {
    color: '#ff0000',
    fontSize: '14px',
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
        map: null,
        console: '',
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
      ],
    }));
  }

  componentDidMount() {
    this.createMap();
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit() {
    // Clear map state and reset error state
    let mapStore = MapStore.getInstance();
    let map = mapStore.getMap();
    map.remove();
    this.createMap();
    this.setState({ console: '' });
    // Initiate tokenizer
    Tokenizer.makeTokenizer(this.state.text, literals);
    // Start running program
    let program = new Program();
    try {
      program.parse();
      program.nameCheck();
      program.typeCheck();
      program.evaluate();
      this.setState({ console: 'Success!' });
    } catch (error) {
      this.setState({ console: error.message });
    }
    // Once user clicks submit, need to:
    // 1. Restart tokenizer (Have pointer pointing to beginning again)
    // 2. Reset variables
    Tokenizer.clearTokenizer();
    VarStore.clearStores();
  }

  render() {
    const { classes } = this.props;
    const { console } = this.state;
    // Must set defined height for map to render
    return (
      <div className={classes.pageContent}>
        <div id="map" className={classes.mapContainer} />
        <div className={classes.development}>
          <form onSubmit={this.handleSubmit}>
            <label>
              <textarea
                value={this.state.text}
                onChange={this.handleChange}
                id="textArea"
                className={classes.textAreaContainer}
              />
            </label>
            <div>
              <Button
                style={styles.submitButton}
                onClick={() => this.handleSubmit()}
              >
                SUBMIT
              </Button>
            </div>
          </form>
          <div className={classes.consoleArea}>
            <Typography style={console === 'Success!' ? styles.successText : styles.errorText}>
              {console}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(TextArea);
