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
        console.log(props);
        console.log(this.state);
    }

    crearDesdeProps(props) {
        return this.state = {
            totalCuenta: this.calcularTotalCuenta(props),
            numPersonas: 0,
            totalProductos: _.concat(props.bebidas, props.platillos, props.menus),
            cuentaDividida: [],
        }
    }

    calcularTotalCuenta(props) {
        var precio = 0;
        for (let i = 0; i < props.mesa.bebidas.length; i++) {
            precio += parseInt(props.mesa.bebidas[i].precio);
        }
        for (let i = 0; i < props.mesa.platillos.length; i++)
            precio += parseInt(props.mesa.platillos[i].precio);
        for (let i = 0; i < props.mesa.menus.length; i++)
            precio += parseInt(props.mesa.menus[i].precio);
        return precio;
    }

    handleNumPersonas(e){
        var pagarPorPersona = (this.state.totalCuenta / e.target.value).toFixed(2);
        var cuentaDividida = _.fill(Array(parseInt(e.target.value)),pagarPorPersona);        
        this.setState({
            numPersonas: e.target.value,
            cuentaDividida: cuentaDividida,
        });
    }

    renderPersonas(){
        return this.state.cuentaDividida.map((persona,i) => (
            <div key={i}><p>Persona {i+1}: ${persona}</p></div>
        ));
    }

    render() {
        //const { pacienteId } = this.state.pacienteId;
        return (
            <Modal {...this.props} >
                <Modal.Header closeButton>
                    <Modal.Title>Pedir cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Dividir cuenta</h3>
                    <p>Numero de personas para dividir cuenta:</p>
                    <input type="number" value={this.state.numPersonas} onChange={this.handleNumPersonas}/>
                    {this.renderPersonas()}
                </Modal.Body>
                <Modal.Footer>
                    <p className="pull-left">Total de la cuenta: <strong>${this.state.totalCuenta}</strong></p>
                    <input type="button" onClick={this.props.pagar} value="Pagar" />
                </Modal.Footer>
            </Modal>
        );
    }
}
