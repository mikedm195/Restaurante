import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
//import OverlayTrigger from 'react-bootstrap';

import { _ } from 'lodash';

export default class HomeHeader extends Component {    
    render() {                
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Restaurante</a>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#">Home</a></li>
                            <li><Link to="/almacen">Almacen</Link></li>
                            <li><a href="#">Restaurante</a></li>
                        </ul>                        
                    </div>
                </div>
            </nav>
        );
    }
}

