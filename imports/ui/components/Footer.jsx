import React from 'react';
import { Link, browserHistory } from 'react-router';

const Footer = () => (
    <footer className="footer">
      <nav>
        <ul>
          <li><Link to ="/"> Home </Link></li>
          <li><Link to ="/team"> Quiénes somos</Link></li>
          <li><Link to ="/almacen"> Almacen </Link></li>
          <li><Link to ="/restaurante"> Restaurante </Link></li>
          <li><h2>El <strong>gordinaco</strong> contento</h2></li>
        </ul>
      </nav>
    </footer>
);

export default Footer;
