import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { PedidosAlmacenApi } from '/imports/api/PedidosAlmacen.js';
import Pedido from './Pedido.jsx';

// Task component - represents a single todo item
export default class PedidosAlmacen extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,               
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
    render() {
        return (
            <div className="container">
                <h1>Pedidos</h1>                                        
                {this.renderPedido()}
            </div>
        );
    }
}

PedidosAlmacen.propTypes = {
    pedidos: PropTypes.array.isRequired,
};