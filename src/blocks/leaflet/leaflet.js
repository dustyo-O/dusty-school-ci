import { Widget } from '../../lib/widget';
import { map, tileLayer, marker } from "leaflet";

import '../../../node_modules/leaflet/dist/leaflet.css';
import './leaflet.css';

class Leaflet extends Widget {
  static _block = 'leaflet';

  static template() {
    return {
      block: 'div',
      cls: this.elem(undefined, ['hidden']),
      content: '',
    }
  }

  constructor(container, { coordinatesOrigin }) {
    super(container);

    this.render();

    this.onSelectCoordinates = this.onSelectCoordinates.bind(this);

    coordinatesOrigin.addEventListener('framework:earthquake-panel:select', this.onSelectCoordinates);
  }

  getMapImage(latitude, longitude, zoom = 14) {
    this._map = this._map ?? map(this.widget);

    const mapEntity = this._map.setView([latitude, longitude], zoom);
    // Add OpenStreetMap tiles
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapEntity);
    // Add a marker
    marker([latitude, longitude]).addTo(mapEntity);
  }

  onSelectCoordinates(event) {
    console.log(event);
    this.widget.classList.remove(Leaflet.elem() + '_hidden');

    setTimeout(() => {
      this.getMapImage(event.detail.lat, event.detail.lon);
    }, 0)
  }
}

export { Leaflet };
