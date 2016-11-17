import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
import Producto from './Producto.jsx';

// Task component - represents a single todo item
export default class ProductosAlmacen extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombre',            
            'handleSubmit',
        );
        this.state = this.crearDesdeProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ productos: nextProps.productos });
    }

    generateId() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    crearDesdeProps(props) {
        var state = {};
        state.nombre = '';
        state.apellido = '';
        state.productos = this.props.productos;
        return state;
    }
    handleNombre(e) {
        this.setState({ nombre: e.target.value });
    }    
    handleSubmit(event) {
        event.preventDefault();
        
        const productos = this.state.productos;
        
        ProductosAlmacenApi.insert({
            nombre: this.state.nombre,
            cantidad: 0,                                    
        });
        this.setState({ nombre: '', productos: productos });
    }   
    renderProducto() {                
        return this.props.productos.map((producto) => (
            <Producto key={producto._id} producto={producto} />            
        ));
    } 
    render() {
        return (
            <ul className="list-group">
                {this.renderProducto()}                
                <li className="list-group-item">
                    <form className="new-task" onSubmit={this.handleSubmit} >
                        <input type="text" value={this.state.nombre} onChange={this.handleNombre} />                        
                        <input type="submit" value="agregar" />
                    </form>
                </li>
            </ul>
        );
    }
}

ProductosAlmacen.propTypes = {
    productos: PropTypes.array.isRequired,
};