import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { _ } from 'lodash';

export default class Header extends Component {
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
                        <Link className="navbar-brand" to="/">Restaurante</Link>
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className="nav navbar-nav">
                            <li onClick={() => this.props.onClick(0)} className="active"><a href="#">Home</a></li>
                            <li onClick={() => this.props.onClick(1)}><a href="#">Pedidos</a></li>
                            <li onClick={() => this.props.onClick(2)}><a href="#">Productos</a></li>
                            <li onClick={() => this.props.onClick(3)}><a href="#">Menus</a></li>
                            <li onClick={() => this.props.onClick(4)}><a href="#">Empleados</a></li>
                        </ul>                        
                    </div>
                </div>
            </nav>
        );
    }
}

