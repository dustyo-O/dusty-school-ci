import { Widget } from '../../lib/widget';
import { EarthquakePanel } from '../earthquake-panel/earthquake-panel';

class EarthquakeList extends Widget {
  static _block = 'earthquake-list';

  static template() {
    return {
      block: 'div',
      cls: this.elem(),
    }
  }

  constructor(container) {
    super(container);

    this.renderEarthquakes = this.renderEarthquakes.bind(this);

    this.render();

    this.getEarthquakes()
      .then(this.renderEarthquakes);
  }

  getEarthquakes() {
    return fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
      .then(response => response.json());
  }

  renderEarthquakes({ features }) {
    const earthquakeData = features.map(({ properties, geometry }) => ({
      title: properties.title,
      magnitude: properties.mag,
      tsunami: properties.tsunami === 1,
      alert: properties.alert,
      coordinates: { lat: geometry.coordinates[1], lon: geometry.coordinates[0] },
    }));

    for (const earthquake of earthquakeData) {
      new EarthquakePanel(this.widget, earthquake);
    }
  }
}

export { EarthquakeList };
