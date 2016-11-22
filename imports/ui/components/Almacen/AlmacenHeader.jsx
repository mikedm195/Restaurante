import React, { Component, PropTypes } from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router';

import { _ } from 'lodash';

export default class Header extends Component {

    getPopOverDataNotificacion() {
        return this.props.productos.map(function (data, i) {
            if (data.cantidad == 0)
                return (<div key={data._id}>Se acabo <strong>{data.nombre}</strong>{data.cantidad}</div>);
            else if (data.cantidad < 10)
                return (<div key={data._id}>Casi se acaba <strong>{data.nombre}</strong>{data.cantidad}</div>);
            if (Date.parse(data.caducidad) <= Date.parse(new Date()))
              return (<div key={data._id}>Se caducó <strong>{data.nombre}</strong></div>);
            else if (Date.parse(data.caducidad) <= Date.parse(new Date()) + 864000000)
              return (<div key={data._id}>Casi se caduca <strong>{data.nombre}</strong></div>);
        });
    }

    getPopOverProductosRestaurant() {
        return this.props.pedidosRestaurante.map(function (data, i) {
          if (data.estado != 'recibido')
              return (<div key={data._id}>Nuevo pedido <strong>{data.producto}</strong></div>);
        });
    }

    getPopOverDataRecibidos() {
        return this.props.pedidos.map(function (pedido) {
            if (pedido.estado != 'recibido')
                return (<div key={pedido._id}>Nuevo pedido <strong>{pedido.producto}</strong></div>);
        });
    }

    getNumNotify() {
        let cont = 0;
        this.props.productos.map(function (data, i) {
            if (data.cantidad < 10){
                cont++;
            }
            if(Date.parse(data.caducidad) <= Date.parse(new Date())){
                  cont++;
            }
        });
        return cont;
    }

    getNumRecibidos() {
        let cont = 0;
        this.props.pedidos.map(function (pedido) {
            if (pedido.estado != 'recibido')
                cont++;
        });
        this.props.pedidosRestaurante.map(function (pedido) {
            if (pedido.estado != 'recibido')
                cont++;
        });
        return cont;
    }

    render() {
        const popoverNotificacion = (
            <Popover id="popover-trigger-click-root-close" title="Notificaciones">
                <div onClick={() => this.props.onClick(2)}>
                    {this.getPopOverDataNotificacion()}
                </div>
            </Popover>
        );
        const popoverRecibidos = (
            <Popover id="popover-trigger-click-root-close" title="Entregas">
                <div onClick={() => this.props.onClick(3)}>
                    {this.getPopOverDataRecibidos()}
                    {this.getPopOverProductosRestaurant()}
                </div>
            </Popover>
        );

        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid almacen_header">
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
                            <li onClick={() => this.props.onClick(3)}><a href="#">Recepción de Productos</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="notify ">
                                <OverlayTrigger className="inline-block" trigger="click" rootClose placement="bottom" overlay={popoverNotificacion}>
                                    <div>
                                        <span className="glyphicon glyphicon-bell">
                                            <span className="badge">
                                                {this.getNumNotify()}
                                            </span>
                                        </span>
                                        Notificaciones
                                </div>
                                </OverlayTrigger>
                            </li>
                            <li className="notify ">
                                <OverlayTrigger className="inline-block" trigger="click" rootClose placement="bottom" overlay={popoverRecibidos}>
                                    <div>
                                        <span className="glyphicon glyphicon-road">
                                            <span className="badge">
                                                {this.getNumRecibidos()}
                                            </span>
                                        </span>
                                        Entregas
                                </div>
                                </OverlayTrigger>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
