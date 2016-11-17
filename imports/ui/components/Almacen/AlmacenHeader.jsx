import React, { Component, PropTypes } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router';

import { _ } from 'lodash';

export default class Header extends Component {    
    
    getPopOverData(){
        return this.props.productos.map(function (data, i) {
            if(data.cantidad == 0)
                return (<div key={data._id}>Se acabo <strong>{data.nombre}</strong>{data.cantidad}</div>);
            else if(data.cantidad < 10 )
                return (<div key={data._id}>Casi se acaba <strong>{data.nombre}</strong>{data.cantidad}</div>);    
        });
    }

    getNumNotify(){
        let cont = 0;
        this.props.productos.map(function (data, i) {
            if(data.cantidad < 10 )
                cont++;            
        });
        return cont;        
    }

    render() {        
        const popoverClickRootClose = (            
            <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                {this.getPopOverData()}
            </Popover>
        );
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
                            <li onClick={() => this.props.onClick(1)}><a href="#">Empleados</a></li>
                            <li onClick={() => this.props.onClick(2)}><a href="#">Productos</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            
                            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverClickRootClose}>
                                <div>
                                    <li className="notify ">
                                        <span className="glyphicon glyphicon glyphicon-bell">
                                            <span className="badge">                            
                                                {this.getNumNotify()}
                                            </span>
                                        </span> 
                                        Notificaciones
                                    </li>                                    
                                </div>
                            </OverlayTrigger>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

