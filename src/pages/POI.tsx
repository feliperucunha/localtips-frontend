import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import '../styles/pages/poi.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface POI {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  whatsapp: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface POIRouteParams {
  id: string;
}

export default function POI(): JSX.Element {
  const params = useParams<POIRouteParams>();
  const [poi, setPOI] = useState<POI>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`/pointofinterest/${params.id}`).then(response => {
      setPOI(response.data);
    });
  }, [params.id]);

  if (!poi) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="poi-page">
      <Sidebar/>

      <main>
        <div className="poi-details">
          {poi.images.length > 0 ? (
            <div>
              <img
                src={(poi.images[activeImageIndex].url)}
                alt={poi.name}
              />

              <div className="images">
                {poi.images.map((image, index) => {
                  return (
                    <button
                      key={image.id}
                      className={activeImageIndex === index ? 'active' : ''}
                      type="button"
                      onClick={() => {
                        setActiveImageIndex(index);
                      }}
                    >
                      <img src={image.url} alt={poi.name} />
                    </button>
                  );
                })}
              </div>
            </div>
            ):(
              <div></div>
            )
          }

          <div className="poi-details-content">
            <h1>{poi.name}</h1>
            <p>{poi.about}</p>

            <div className="map-container">
              <Map
                center={[poi.latitude, poi.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZmVsaXBlcnViZW4iLCJhIjoiY2txbWNrOHVsMGllcTJubW1vZWk2Z2M0OSJ9.034JAoTbANp818iC7b0lrw`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[poi.latitude, poi.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${poi.latitude},${poi.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{poi.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta
                <br />
                {poi.opening_hours}
              </div>

              {poi.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  O autor tem
                  <br />
                  confiabilidade na informação
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  O autor não tem
                  <br />
                  confiabilidade na informação
                </div>
              )}
            </div>

            {poi.whatsapp ?
            (
              <a href={`https://api.whatsapp.com/send?1=pt_BR&phone=55${poi.whatsapp}`}>
                <button type="button" className="contact-button">
                  <FaWhatsapp size={20} color="#FFF"/>
                  Entrar em contato
                </button>
              </a>
            ): (
              null
            )
            }
          </div>
        </div>
      </main>
    </div>
  );
}
