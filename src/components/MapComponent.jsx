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
      center: [49.8419, 24.0315],
      zoom: 16,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });

    this.setState({
      map,
    });
  }

  render() {
    const { classes } = this.props;
    // Must set defined height for map to render
    return <div id="map" className={classes.mapContainer} />
  }
}

export default withStyles(styles)(Map);