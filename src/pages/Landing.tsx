import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.png';

function Landing(): JSX.Element {
  return (
    <div>
      <div id="landing-page">
        <div className="content-wrapper">
          <img className="map-logo" src={logoImg} alt="LocalTips" />

          <main>
            <h1>Conheça tudo sobre o lugar</h1>
            <p>Visite os pontos e saiba tudo sobre eles.</p>
          </main>

          <div className="location">
            <strong>Belém</strong>
            <span>Universidade Federal do Pará</span>
          </div>


          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </Link>

        </div>
      </div>
      <div className="footer">
          <span>Criado por Felipe Cunha - 2021</span>
      </div>
    </div>
  );
}

export default Landing;
