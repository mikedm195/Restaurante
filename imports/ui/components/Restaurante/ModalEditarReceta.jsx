import React, { Component } from 'react';
import { _ } from 'lodash';
import { Modal } from 'react-bootstrap';

import { RecetasApi } from '/imports/api/Recetas.js';

export default class ModalEditarReceta extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombreReceta',
            'handleProducto',
            'handleAgregarProductoAReceta',
            'handleGuardarReceta',
            'handleTipoReceta',
            'handlePrecioReceta',            
        );        
        this.state = this.crearDesdeProps(props);
    }

    crearDesdeProps(props) {
        var state = {};
        state.receta = props.receta;
        state.nombreReceta = props.receta.nombre;
        state.receta = '';
        state.tipoReceta = props.receta.tipoReceta;
        state.precioReceta = props.receta.precio;
        state.productosReceta = props.receta.ingredientes;
        return state;
    }

    handleGuardarReceta(event) {
        event.preventDefault();
        var nombreReceta = this.state.nombreReceta;
        var tipoReceta = this.state.tipoReceta;
        var precioReceta = this.state.precioReceta;
        var productosReceta = this.state.productosReceta;        
        if (nombreReceta != '' && tipoReceta != '' && precioReceta != '' && productosReceta.length > 0) {
            RecetasApi.update(this.props.receta._id,
                {
                    $set: {
                        nombre: nombreReceta,
                        tipoReceta: tipoReceta,
                        precio: precioReceta,
                        ingredientes: productosReceta,
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

    handleNombreReceta(e) {
        this.setState({ nombreReceta: e.target.value });
    }

    handleTipoReceta(e) {
        this.setState({ tipoReceta: e.target.value });
    }

    handleProducto(e) {
        this.setState({ producto: e.target.value });
    }

    handlePrecioReceta(e) {
        this.setState({ precioReceta: e.target.value });
    }

    eliminarReceta(receta) {
        RecetasApi.remove(receta._id);
    }

    handleAgregarProductoAReceta(e) {
        var productosReceta = this.state.productosReceta;
        if (this.state.producto != '') {
            productosReceta.push(this.state.producto);
            this.setState({ productosReceta: productosReceta });
        }
    }

    render() {
        var listaProductos = this.props.productos.map((producto) => (
            <option key={producto._id} value={producto.nombre}>{producto.nombre}</option>
        ));
        return (
            <Modal {...this.props} >
                <Modal.Header closeButton>
                    <input type="text" value={this.state.nombreReceta} onChange={this.handleNombreReceta} placeholder="Nombre de la receta" />
                    <select className="pull-right" value={this.state.tipoReceta} onChange={this.handleTipoReceta}>
                        <option value=""></option>
                        <option value="bebida">Bebida</option>
                        <option value="platillo">Platillo</option>
                    </select>
                </Modal.Header>
                <Modal.Body>
                    <select value={this.state.producto} onChange={this.handleProducto}>
                        <option value=""></option>
                        {listaProductos}
                    </select>
                    <input type="button" value="Agregar a receta" onClick={this.handleAgregarProductoAReceta} />
                    <hr />
                    {this.renderProductosRecetas(this.state.productosReceta)}
                    <hr />
                    $<input className="pull-right" type="number" value={this.state.precioReceta} onChange={this.handlePrecioReceta} />
                </Modal.Body>
                <Modal.Footer>
                    <input className="btnEditar" type="button" value="Guardar" onClick={this.handleGuardarReceta} />
                    <input type="button" onClick={this.props.onHide} value="Cancelar" />
                </Modal.Footer>
            </Modal>
        );
    }
}

