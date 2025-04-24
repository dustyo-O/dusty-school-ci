import { EarthquakeList } from './blocks/earthquake-list/earthquake-list';
import { Leaflet } from './blocks/leaflet/leaflet';

const root = document.querySelector('.root');

const earthquakeList = new EarthquakeList(root);
const leaflet = new Leaflet(root, { coordinatesOrigin: earthquakeList.widget });
