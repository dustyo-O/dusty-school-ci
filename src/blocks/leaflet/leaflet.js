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
    this._map = this._map ?? L.map(this.widget);

    const map = this._map.setView([latitude, longitude], zoom);
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    // Add a marker
    L.marker([latitude, longitude]).addTo(map);
  }

  onSelectCoordinates(event) {
    console.log(event);
    this.widget.classList.remove(Leaflet.elem() + '_hidden');

    setTimeout(() => {
      this.getMapImage(event.detail.lat, event.detail.lon);
    }, 0)
  }
}
