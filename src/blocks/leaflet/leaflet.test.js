
import { Leaflet } from "./leaflet";
import { map, tileLayer, marker } from "leaflet";

jest.mock("leaflet");

const setView = jest.fn(([lat, lon], zoom) => `${lat}-${lon}-${zoom}`);
const tileLayerAddTo = jest.fn();
const markerAddTo = jest.fn();

map.mockImplementation(() => ({
  setView,
}));

tileLayer.mockImplementation(() => ({
  addTo: tileLayerAddTo,
}));

marker.mockImplementation(() => ({
  addTo: markerAddTo,
}));

beforeEach(() => {
  jest.clearAllMocks();
});

test('[leaflet] getMapImage calls map if _map is empty', () => {
  const coordinatesOrigin = document.createElement('main');

  const leaflet = new Leaflet(document.body, { coordinatesOrigin });

  expect(leaflet._map).toBeUndefined();

  leaflet.getMapImage(1, 2, 10);
  expect(map).toBeCalledTimes(1);
  expect(map).toBeCalledWith(leaflet.widget);
});

test('[leaflet] getMapImage skips call map if _map is set', () => {
  const coordinatesOrigin = document.createElement('main');

  const leaflet = new Leaflet(document.body, { coordinatesOrigin });

  expect(leaflet._map).toBeUndefined();

  leaflet._map = {
    setView,
  };

  leaflet.getMapImage(1, 2, 10);
  expect(map).toBeCalledTimes(0);
});

test('[leaflet] getMapImage calls marker with latitude and longitude', () => {
  const coordinatesOrigin = document.createElement('main');

  const leaflet = new Leaflet(document.body, { coordinatesOrigin });

  leaflet.getMapImage(11, 25, 0);
  expect(marker).toBeCalledTimes(1);
  expect(marker).toBeCalledWith([11, 25]);
});

test('[leaflet] getMapImage calls marker().addTo with setView result', () => {
  const coordinatesOrigin = document.createElement('main');

  const leaflet = new Leaflet(document.body, { coordinatesOrigin });

  leaflet.getMapImage(51, 23.4, 1);
  expect(markerAddTo).toBeCalledTimes(1);
  expect(markerAddTo).toBeCalledWith('51-23.4-1');
});

test('[leaflet] getMapImage calls map setView with longitude, latitude and zoom', () => {
  const coordinatesOrigin = document.createElement('main');

  const leaflet = new Leaflet(document.body, { coordinatesOrigin });

  leaflet.getMapImage(1, 2, 10);

  expect(setView).toBeCalledTimes(1);
  expect(setView).toBeCalledWith([1, 2], 10);
});

test('[leaflet] getMapImage calls tilePlayer and tilePlayer().addTo', () => {
  const coordinatesOrigin = document.createElement('main');

  const leaflet = new Leaflet(document.body, { coordinatesOrigin });

  leaflet.getMapImage(1, 2, 10);
  expect(tileLayer).toBeCalledTimes(1);
  expect(tileLayerAddTo).toBeCalledTimes(1);
  expect(tileLayerAddTo).toBeCalledWith('1-2-10');
});
