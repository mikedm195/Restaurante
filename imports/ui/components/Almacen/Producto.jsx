import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';
import classname from 'classnames';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
import ModalPedirProducto from './ModalPedirProducto.jsx';
// Task component - represents a single todo item
export default class Producto extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombre',
            'handleCantidad',
            'handleEditar',
            'handleAgregar',
            'handleEliminar',
            'open',
            'close',
        );

        this.state = {};
        this.state.editar = false;
        this.state.producto = props.producto;
        this.state.nombre = props.producto.nombre;
        this.state.cantidad = props.producto.cantidad;

    }

    handleNombre(e) {
        this.setState({ nombre: e.target.value });
    }

    handleCantidad(e) {
        this.setState({ cantidad: e.target.value });
    }
    handleEditar() {
        if (!this.state.editar)
            this.setState({ editar: true });
    }
    handleAgregar(event) {
        //event.preventDefault();

        this.setState({ editar: false });

        const producto = this.state.producto;
        const nombre = this.state.nombre;
        const cantidad = this.state.cantidad;


        ProductosAlmacenApi.update(producto._id,
            {
                $set: {
                    nombre: nombre,
                    cantidad: cantidad,
                }
            });
    }
    handleEliminar() {
        ProductosAlmacenApi.remove(this.state.producto._id);
    }
    getColor() {
        if (this.props.producto.cantidad == 0)
            return classname('list-group-item list-group-item-danger');
        if (this.props.producto.cantidad < 10)
            return classname('list-group-item list-group-item-warning');
        else
            return classname('list-group-item list-group-item-success');
    }

    close() {
        this.setState({ show: false });
        this.forceUpdate();
    }

    open() {
        this.setState({ show: true });
    }

    render() {
        var producto = this.props.producto;
        return (
            <div onClick={this.open}>
                <li className={this.getColor()}>
                    {producto.nombre}
                    <span className="badge">
                        {producto.cantidad}
                    </span>
                </li>
                <ModalPedirProducto show={this.state.show} onHide={this.close} producto={this.props.producto} />
            </div>
        );
    }
}

Producto.propTypes = {
    producto: PropTypes.object.isRequired,
};