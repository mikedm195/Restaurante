import React, { Component } from 'react';
import { _ } from 'lodash';
import { Modal } from 'react-bootstrap';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
import { PedidosAlmacenApi } from '/imports/api/PedidosAlmacen.js';

export default class ModalNuevaConsulta extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'calcularTotalCuenta',
            'handleNumPersonas',
        );

        this.state = this.crearDesdeProps(props);
    }

    crearDesdeProps(props) {
        return this.state = {
            totalCuenta: 0,
            numPersonas: 0,
            totalProductos: _.concat(props.bebidas, props.platillos, props.menus),
            cuentaDividida: [],
        }
    }

    calcularTotalCuenta() {
        var precio = 0;
        if (this.props.mesa.bebidas && this.props.mesa.platillos && this.props.mesa.menus) {
            var orden = _.concat(this.props.mesa.bebidas, this.props.mesa.platillos, this.props.mesa.menus);
            for (let i = 0; i < orden.length; i++) {
                precio += parseInt(orden[i].precio);
            }
            return precio;
        }
        return 0;
    }

    handleNumPersonas(e) {
        if (e.target.value == '') {
            var cuentaDividida = [];
        } else {
            var totalCuenta = this.calcularTotalCuenta();
            var pagarPorPersona = (totalCuenta / e.target.value).toFixed(2);
            var cuentaDividida = _.fill(Array(parseInt(e.target.value)), pagarPorPersona);
        }
        this.setState({
            numPersonas: e.target.value,
            cuentaDividida: cuentaDividida,
        });

    }

    render() {
        var totalCuenta = this.calcularTotalCuenta();
        return (
            <Modal {...this.props} >
                <Modal.Header closeButton>
                    <Modal.Title>Pedir cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Dividir cuenta</h3>
                    <p>Numero de personas para dividir cuenta:</p>
                    <input type="number" value={this.state.numPersonas} onChange={this.handleNumPersonas} />
                    {(this.state.numPersonas > 0) ?
                        <div><p>Le toca
                            <strong> ${(totalCuenta / this.state.numPersonas).toFixed(2)} </strong>
                            por persona</p></div>
                        : ''}
                </Modal.Body>
                <Modal.Footer>
                    <p className="pull-left">Total de la cuenta: <strong>${totalCuenta}</strong></p>
                    <input type="button" onClick={this.props.pagar} value="Pagar" />
                </Modal.Footer>
            </Modal>
        );
    }
}
