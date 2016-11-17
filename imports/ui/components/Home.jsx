import React, { Component, PropTypes } from 'react';

import HomeHeader from './HomeHeader.jsx';
import Footer from '../components/Footer.jsx';

export default class Home extends Component {
    render() {
        return (
            <div>
                <HomeHeader />
                <div className="container">
                    <div className="jumbotron">
                        <h1>Proyecto de Ariel</h1>
                        <p>Proyecto para la clase de Analisis y modelacion de software</p>
                    </div>
                    <p>Miguel Del Moral.</p>
                    <p>Alejandro Herce.</p>
                    <p>Margot Duek.</p>
                    <p>Jacobo Calderon.</p>
                </div>
                <Footer />
            </div>
        );
    }
}
