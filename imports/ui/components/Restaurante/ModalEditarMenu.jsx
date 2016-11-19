import React, { Component } from 'react';
import { _ } from 'lodash';
import { Modal } from 'react-bootstrap';

import { MenusApi } from '/imports/api/Menus.js';

export default class ModalEditarMenu extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombreMenu',
            'handleReceta',
            'handleAgregarRecetaAMenu',
            'handlePrecioMenu',
            'handleGuardarMenu',
        );
        this.state = this.crearDesdeProps(props);
    }

    crearDesdeProps(props) {
        var state = {};
        state.menu = props.menu;
        state.nombreMenu = props.menu.nombre;
        state.receta = '';
        state.precioMenu = props.menu.precio;
        state.productosMenu = props.menu.recetas;
        return state;
    }

    handleGuardarMenu(event) {
        event.preventDefault();
        var nombreMenu = this.state.nombreMenu;
        var productosMenu = this.state.productosMenu;
        var precioMenu = this.state.precioMenu;
        if (nombreMenu != '' && precioMenu != '' && productosMenu.length > 0) {
            MenusApi.update(this.props.menu._id,
                {
                    $set: {
                        nombre: nombreMenu,
                        precio: precioMenu,
                        recetas: productosMenu,
                    }
                });
            
            this.props.onHide();
        }

    }

    renderProductosRecetas(productos) {
        return productos.map((producto, i) => (
            <span key={i} className="label label-default">{producto}</span>
        ));
    }

    handleNombreMenu(e) {
        this.setState({ nombreMenu: e.target.value });
    }

    handleReceta(e) {
        this.setState({ receta: e.target.value });
    }

    handlePrecioMenu(e) {
        this.setState({ precioMenu: e.target.value });
    }

    handleAgregarRecetaAMenu(e) {
        var productosMenu = this.state.productosMenu;
        if (this.state.receta != '') {
            productosMenu.push(this.state.receta);
            this.setState({ productosMenu: productosMenu });
        }
    }

    render() {
        var listaRecetas = this.props.recetas.map((recetas) => (
            <option key={recetas._id} value={recetas.nombre}>{recetas.nombre}</option>
        ));
        return (
            <Modal {...this.props} >
                <Modal.Header closeButton>
                    <input type="text" value={this.state.nombreMenu} onChange={this.handleNombreMenu} placeholder="Nombre del menu" />
                </Modal.Header>
                <Modal.Body>
                    <select value={this.state.producto} onChange={this.handleReceta}>
                        <option value=""></option>
                        {listaRecetas}
                    </select>
                    <input type="button" value="Agregar a menu" onClick={this.handleAgregarRecetaAMenu} />
                    <hr />
                    {this.renderProductosRecetas(this.state.productosMenu)}
                    <hr />
                    $<input className="pull-right" type="number" value={this.state.precioMenu} onChange={this.handlePrecioMenu} />
                </Modal.Body>
                <Modal.Footer>
                    <input className="btnEditar" type="button" value="Guardar" onClick={this.handleGuardarMenu} />
                    <input type="button" onClick={this.props.onHide} value="Cancelar" />
                </Modal.Footer>
            </Modal>
        );
    }
}

