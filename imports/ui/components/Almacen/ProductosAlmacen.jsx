import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
import Producto from './Producto.jsx';

export default class ProductosAlmacen extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombre',
            'handleBuscar',
            'handleSubmitBuscar',
            'handleSubmitEditar',
        );
        this.state = this.crearDesdeProps(props);
    }

    crearDesdeProps(props) {
        var state = {};
        state.nombre = '';
        state.buscar = '';
        state.show = false;
        state.productos = this.props.productos;
        state.resultadosBusqueda = state.producto;

        return state;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ productos: nextProps.productos, resultadosBusqueda: nextProps.productos });
    }

    obtenerProductos(busqueda) {
        return ProductosAlmacenApi.find({ nombre: { $regex: ".*" + busqueda + ".*" } }).fetch();
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

    handleNombre(e) {
        this.setState({ nombre: e.target.value });
    }

    handleBuscar(e) {
        this.setState({ buscar: e.target.value });
    }

    handleSubmitBuscar() {
        event.preventDefault();

        var busqueda = this.state.buscar;

        var p = this.obtenerProductos(busqueda);
        this.setState({ resultadosBusqueda: p });
    }

    handleSubmitEditar(event) {
        event.preventDefault();

        const productos = this.state.productos;

        ProductosAlmacenApi.insert({
            nombre: this.state.nombre,
            cantidad: 0,
        });
        this.setState({ nombre: '', productos: productos });
    }
    
    renderProducto() {
        if (this.state.resultadosBusqueda)
            return this.state.resultadosBusqueda.map((producto) => (
                <Producto key={producto._id} producto={producto} open={this.open}/>
            ));
        else
            return this.props.productos.map((producto) => (
                <Producto key={producto._id} producto={producto} open={this.open}/>
            ));
    }
    render() {
        return (
            <div>
                <form className="buscar" onSubmit={this.handleSubmitBuscar}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search"
                            value={this.state.buscar} onChange={this.handleBuscar}
                            />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
                <ul className="list-group">
                    {this.renderProducto()}
                    <li className="list-group-item">
                        <form className="new-task" onSubmit={this.handleSubmitEditar} >
                            <input type="text" value={this.state.nombre} onChange={this.handleNombre} />
                            <input type="submit" value="agregar" />
                        </form>
                    </li>
                </ul>                
            </div>
        );
    }
}

ProductosAlmacen.propTypes = {
    productos: PropTypes.array.isRequired,
};