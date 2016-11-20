import React, { Component } from 'react';
import { _ } from 'lodash';
import ModalEditarMenu from './ModalEditarMenu.jsx';

import { MenusApi } from '/imports/api/Menus.js';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'open',
            'close',
            'eliminarMenu',
        );

        this.state = {
            show: false
        }
    }

    renderProductosRecetas(productos) {
        return productos.map((producto, i) => (
            <span key={i} className="label label-default">{producto.nombre}</span>
        ));
    }

    close() {
        this.setState({ show: false });
    }

    open() {
        this.setState({ show: true });
    }

    eliminarMenu(){
        MenusApi.remove(this.props.menu._id);
    }

    render() {
        var menu = this.props.menu;
        var recetas = this.props.recetas;
        return (
            <div className="col-sm-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <p>{menu.nombre}</p>
                    </div>
                    <div className="panel-body">
                        {this.renderProductosRecetas(menu.recetas)}
                        <hr/>
                        <p className="pull-right">${menu.precio}</p>
                    </div>
                    <div className="panel-footer">
                        <input className="btnEditar" type="button" value="Ediar" onClick={this.open} />
                        <input className="btnEditar pull-right" type="button" value="Eliminar" onClick={this.eliminarMenu} />
                    </div>
                </div>
                <ModalEditarMenu show={this.state.show} onHide={this.close} recetas={recetas} menu={menu} />
            </div>
        );
    }
}

