import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { PedidosAlmacenApi } from '/imports/api/PedidosAlmacen.js';
import Pedido from './Pedido.jsx';
import PedidoRestaurante from './PedidoRestaurante.jsx';

// Task component - represents a single todo item
export default class PedidosAlmacen extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,  
            'renderPedidoRestaurante'             
        );
        //this.state = this.crearDesdeProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ pedidos: nextProps.pedidos });
    }
        
    renderPedido() {        
        return this.props.pedidos.map(function (pedido) {
            if(pedido.estado != 'recibido')
                return <Pedido key={pedido._id} pedido={pedido} />;                
        });        
    }
    renderPedidoRestaurante() {
        var productos = this.props.productos;
        return this.props.pedidosRestaurante.map(function (pedido) {
            if(pedido.estado != 'recibido')
                return <PedidoRestaurante key={pedido._id} pedido={pedido} productos={productos} />;                
        });        
    }
    render() {
        return (
            <div className="container">
                <h1>Pedidos</h1>                                        
                {this.renderPedido()}
                <hr/>
                <h1>Pedidos de Restaurante</h1>
                {this.renderPedidoRestaurante()}
            </div>
        );
    }
}

PedidosAlmacen.propTypes = {
    pedidos: PropTypes.array.isRequired,
    productos: PropTypes.array.isRequired,
    pedidosRestaurante: PropTypes.array.isRequired,
};