import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.png';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [38, 40],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

export default mapIcon;
