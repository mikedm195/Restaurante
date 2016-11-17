import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';
import classname from 'classnames';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
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
        );

        this.state = {};
        this.state.editar = false;
        this.state.nombre = props.producto.nombre;
        this.state.cantidad = props.producto.cantidad;
        this.state.producto = props.producto;

    }

    handleNombre(e) {
        this.setState({ nombre: e.target.value });
    }

    handleCantidad(e) {
        this.setState({ cantidad: e.target.value });
    }
    handleEditar() {
        if(!this.state.editar)
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
    getColor(){
        if(this.state.cantidad == 0)
            return classname('list-group-item list-group-item-danger');
        if(this.state.cantidad < 10)
            return classname('list-group-item list-group-item-warning');
        else
            return classname('list-group-item list-group-item-success');
    }
    render() {
        var producto = this.props.producto;
        return (
            <div onClick={this.handleEditar}>
                {!this.state.editar ?
                    <li className={this.getColor()}>
                        {producto.nombre}
                        <span className="badge">
                            {producto.cantidad}
                        </span>
                    </li>
                    :
                    <li className="list-group-item">
                        <input type="text" value={this.state.nombre} onChange={this.handleNombre} placeholder="nombre" />
                        <input type="text" value={this.state.cantidad} onChange={this.handleCantidad} placeholder="cantidad" />
                        <input type="button" value="editar" onClick={this.handleAgregar} />
                        <input type="button" value="eliminar" onClick={this.handleEliminar} />
                    </li>
                }
            </div>
        );
    }
}

Producto.propTypes = {
    producto: PropTypes.object.isRequired,
};