import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiAlertCircle } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import CustomDialogContent from '../components/Modal';
import { CustomDialog } from 'react-st-modal';

import mapMarkerImg from '../images/logo.png';

import '../styles/pages/poi-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface POI {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

function POIMap(): JSX.Element {
  const [pois, setPOIs] = useState<POI[]>([]);

  useEffect(() => {
    api.get('/pointofinterest').then(response => {
      setPOIs(response.data);
    });
  }, []);

  const handleReport = () => {
    alert('oi');
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img className="map-marker" src={mapMarkerImg} alt="LocalTips" />
          </Link>

          <h2>Escolha um dos pontos no mapa</h2>
          <p>Descubra os detalhes dos locais que deseja visitar</p>
        </header>

        <footer>
          <strong>Belém</strong>
          <span>Universidade Federal do Pará</span>
        </footer>
      </aside>

      <Map
        center={[-1.4738618, -48.454288]}
        zoom={17}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {pois.map(poi => {
          return (
            <Marker
              key={poi.id}
              icon={mapIcon}
              position={[poi.latitude, poi.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={280}
                maxHeight={260}
                closeOnEscapeKey={true}
                className="map-popup"
              >
                {poi.name}
                <div className="Icons__Container">
                  <Link to={`/pointsofinterest/${poi.id}`}>
                    <FiArrowRight size={20} color="#FFF" />
                  </Link>
                  <FiAlertCircle
                    className="warning"
                    size={20}
                    color="red"
                    onClick={async () => {
                      const result = await CustomDialog(<CustomDialogContent />, {
                        title: 'Você deseja denunciar esse ponto de interesse? Insira o motivo e nossa equipe analisará se é cabível ou não',
                        showCloseIcon: true,
                      });
                    }}
                  />
                </div>
              </Popup>

            </Marker>
          );
        })}
      </Map>

      <Link to="/pointofinterest/create" className="create-poi">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default POIMap;
