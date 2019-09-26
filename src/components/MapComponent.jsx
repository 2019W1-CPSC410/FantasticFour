import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import L from 'leaflet';

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
    // Create map L.map() returns a map object
    const map = L.map('map', {
      center: [49.25, -123.12],
      zoom: 13,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    // TODO: Remove when interactivity is added, this is just for PoC
    L.marker([49.25, -123.12]).addTo(map);

    this.setState({
      map,
    });
  }

  // TODO: Implement addMarker in DSL
  handleAddMarker = () => {
    const { map } = this.state;
    // TODO: coords should be passed as a parameter
    const coords = [49.25, -123.12];

    L.marker(coords).addTo(map);
  }

  render() {
    const { classes } = this.props;
    // Must set defined height for map to render
    return <div id="map" className={classes.mapContainer} />
  }
}

export default withStyles(styles)(Map);