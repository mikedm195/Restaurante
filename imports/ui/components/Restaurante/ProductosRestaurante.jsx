import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { ProductosRestauranteApi } from '/imports/api/ProductosRestaurante.js';
import { PedidosAlmacenARestauranteApi } from '/imports/api/PedidosAlmacenARestaurante.js';

import Producto from './Producto.jsx';

export default class ProductosRestaurante extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,            
            'handleBuscar',
            'handleSubmitBuscar',
            'handleProductoAlmacen',
            'handleCantidadAlmacen',
            'handleHacerPedido',            
        );
        this.state = this.crearDesdeProps(props);
    }

    crearDesdeProps(props) {
        var state = {};        
        state.buscar = '';
        state.show = false;
        state.productos = this.props.productos;
        state.productoAlmacen = '';
        state.cantidadAlmacen = '';
        state.resultadosBusqueda = state.producto;

        return state;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ productos: nextProps.productos, resultadosBusqueda: nextProps.productos });
    }

    obtenerProductos(busqueda) {
        return ProductosRestauranteApi.find({ nombre: { $regex: ".*" + busqueda + ".*" } }).fetch();
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

    handleBuscar(e) {
        this.setState({ buscar: e.target.value });
    }

    handleSubmitBuscar() {
        event.preventDefault();

        var busqueda = this.state.buscar;

        var p = this.obtenerProductos(busqueda);
        this.setState({ resultadosBusqueda: p });
    }    
    handleProductoAlmacen(event){        
        let id = event.target.value;
        this.setState({productoAlmacen: id});
    }
    handleCantidadAlmacen(event){                                
        this.setState({cantidadAlmacen: event.target.value});
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
    handleHacerPedido(){
        if(this.state.productoAlmacen != ''){
            let pA = this.props.productosAlmacen;
            let nombre = '';
            for(var i = 0;i<pA.length;i++){                
                if(this.state.productoAlmacen == pA[i]._id){
                    nombre = pA[i].nombre;
                }
            }
            PedidosAlmacenARestauranteApi.insert({
                _idProducto: this.state.productoAlmacen,
                producto: nombre,
                cantidad: this.state.cantidadAlmacen,
                estado: 'enviado',
            });
            alert("Se hizo pedido de " + this.state.cantidadAlmacen + " " + nombre + "s");
        }
    
    }
    render() {
        var listaProductosAlmacen = this.props.productosAlmacen.map((producto,i) => (
            <option key={producto._id} value={producto._id}>{producto.nombre}</option>
        ));
        return (
            <div>
                <h3>Pedir productos</h3>
                Producto: <select value={this.state.productoAlmacen} onChange={this.handleProductoAlmacen}>
                    <option value=""></option>
                    {listaProductosAlmacen}
                </select>
                Cantidad: <input type="number" value={this.state.cantidadAlmacen} onChange={this.handleCantidadAlmacen}/>
                <input type="button" value="Hacer pedido" onClick={this.handleHacerPedido}/>                                
                <h3>Mis Productos</h3>
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
                </ul> 
                <br/><br/><br/><br/><br/><br/>
            </div>
        );
    }
}

ProductosRestaurante.propTypes = {
    productos: PropTypes.array.isRequired,
    productosAlmacen: PropTypes.array.isRequired,
};