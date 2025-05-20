import React from 'react';
import { FaTrophy, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5><FaTrophy className="me-2" />Gestor de ligas</h5>
            <p className="text-muted">La mejor herramienta para tus ligas</p>
          </div>
          <div className="col-md-3">
            <h5>Links rapidos</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-muted">Home</a></li>
              <li><a href="stats.html" className="text-decoration-none text-muted">Estadisticas</a></li>
              <li><a href="matches.html" className="text-decoration-none text-muted">Partidos</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Contacto</h5>
            <ul className="list-unstyled text-muted">
              <li><FaEnvelope className="me-2" /> info@leaguemanager.com</li>
              <li><FaPhone className="me-2" /> (123) 456-7890</li>
            </ul>
          </div>
        </div>
        <hr className="my-4 bg-secondary" />
        <div className="text-center text-muted">
          <small>&copy; 2023 Sports League Manager. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
