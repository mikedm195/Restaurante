import React, { Component, PropTypes } from 'react';
//import { AppRegistry, View, Image } from 'react-native';

import HomeHeader from './HomeHeader.jsx';
import Footer from '../components/Footer.jsx';

export default class Home extends Component {
  render() {
    return (
      <div>
        <HomeHeader />
        <div className="container">
            <div className="jumbotron jumbo_almacen">
              <h1>El <strong>gordinaco</strong> Contento</h1>
              <p>Aplicación en la cual podrás manejar tu restaurante y/o tu almacen de la mejor manera posible ;)</p>
            </div>

        </div>
        <Footer />
      </div>

    );
  }
}
