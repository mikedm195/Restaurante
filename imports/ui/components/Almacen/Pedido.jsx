import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
import { PedidosAlmacenApi } from '/imports/api/PedidosAlmacen.js';

export default class Pedido extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'recibeProducto',
        );
    }

    recibeProducto(event) {
        event.preventDefault();

        ProductosAlmacenApi.update(this.props.pedido._idProducto,
            {
                $inc: {
                    cantidad: parseInt(this.props.pedido.cantidad),
                }
            });
        PedidosAlmacenApi.update(this.props.pedido._id,
            {
                $set: {
                    estado: 'recibido',
                    fechaRecibido: new Date(),
                }
            });
    }

    render() {        
        return (
            <div>
                Producto: {this.props.pedido.producto}
                Cantidad: {this.props.pedido.cantidad}
                <input type="button" value="Recibir" onClick={this.recibeProducto} />
            </div>
        );
    }
}

Pedido.propTypes = {
    pedido: PropTypes.object.isRequired,
};