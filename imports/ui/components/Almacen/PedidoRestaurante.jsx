import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
import { ProductosRestauranteApi } from '/imports/api/ProductosRestaurante.js';
import { PedidosAlmacenARestauranteApi } from '/imports/api/PedidosAlmacenARestaurante.js';

import { getObjectFromArray } from './helpers.js';
//import { getObjectFromArray } from '/imports/ui/helpers/helpers.js';

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
        var productos = this.props.productos
        var ProductoEnAlmacen = getObjectFromArray(this.props.productos, this.props.pedido._idProducto);
        if (ProductoEnAlmacen && this.props.pedido.cantidad > ProductoEnAlmacen.cantidad) {
            alert("no hay suficientes productos en el almacen");
        } else {
            var ProductoEnRestaurante = ProductosRestauranteApi.findOne({ nombre: this.props.pedido.producto });
            var nuevaCantidadAlmacen = parseInt(ProductoEnAlmacen.cantidad) - parseInt(this.props.pedido.cantidad);
            if (ProductoEnRestaurante) {
                var nuevaCantidadRestaurante = parseInt(ProductoEnRestaurante.cantidad) + parseInt(this.props.pedido.cantidad);
                ProductosRestauranteApi.update(ProductoEnRestaurante._id,
                    {
                        $set: {
                            cantidad: nuevaCantidadRestaurante,
                        }

                    });
            } else {
                ProductosRestauranteApi.insert({
                    nombre: this.props.pedido.producto,
                    cantidad: this.props.pedido.cantidad,
                });
            }
            ProductosAlmacenApi.update(ProductoEnAlmacen._id,
                {
                    $set: {
                        cantidad: nuevaCantidadAlmacen,
                    }

                });
            PedidosAlmacenARestauranteApi.update(this.props.pedido._id,
                {
                    $set: {
                        estado: 'recibido',
                        fechaRecibido: new Date(),
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <p>Producto: {this.props.pedido.producto}</p><br/>
                <p>Cantidad: {this.props.pedido.cantidad}</p>
                <input className="btn btn-default" type="button" value="Enviar" onClick={this.recibeProducto} />
            </div>
        );
    }
}

Pedido.propTypes = {
    pedido: PropTypes.object.isRequired,
};