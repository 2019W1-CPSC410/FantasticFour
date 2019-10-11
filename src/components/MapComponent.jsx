import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import L from 'leaflet';
import MapStore from '../utils/MapStore'
import Marker from '../ast/Marker'

const styles = {
  mapContainer: {
    width: '600px',
    height: '600px',
  },
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
    };
  }

  componentDidMount() {
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
    // TODO: Remove when interactivity is added, this is just for PoC
    var marker = new Marker();
    marker.evaluate();
    mapStore.addPolygon([
        [49.25, -123.12],
        [49.2505, -123.11],
        [49.2495, -123.12],
    ]);
  }

  render() {
    const { classes } = this.props;
    // Must set defined height for map to render
    return <div id="map" className={classes.mapContainer} />
  }
}

export default withStyles(styles)(Map);