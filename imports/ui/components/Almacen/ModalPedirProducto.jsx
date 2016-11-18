import React, { Component } from 'react';
import { _ } from 'lodash';
import { Modal } from 'react-bootstrap';

import { ProductosAlmacenApi } from '/imports/api/ProductosAlmacen.js';
//import { agregarOActualizarConsulta } from '/imports/api/pacientes/methods.js';

export default class ModalNuevaConsulta extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombre',
            'handleCantidad', 
            'handlePedir',  
            'guardar', 
            'hacerPedido',  
            'eliminarProducto',             
        );

        this.state = {};
        this.state.producto = props.producto;
        this.state.nombre = props.producto.nombre;
        this.state.cantidad = '';
        this.state.pedir = '';
    }

    handleNombre(e) {
        this.setState({ nombre: e.target.value });
    }

    handleCantidad(e) {        
        var num = parseInt(e.target.value);        
        if((num > 0 && num <= this.props.producto.cantidad))
            this.setState({ cantidad: num });
        if(isNaN(num))
            this.setState({ cantidad: '' });
    }
    handlePedir(e) {
        this.setState({ pedir: e.target.value });
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
    hacerPedido(){
        alert("Se hizo pedido de " + this.state.pedir + " " + this.state.producto.nombre + "s");
    }
    guardar(){                 
        let producto = this.state.producto;
        let nombre = this.state.nombre;
        let cantidad = parseInt(this.state.cantidad);
        if(isNaN(cantidad)){
            cantidad = 0;
        }
        cantidad = parseInt(producto.cantidad) - cantidad;

        ProductosAlmacenApi.update(producto._id,
            {
                $set: {
                    nombre: nombre,
                    cantidad: cantidad,
                }
            });
        this.setState({cantidad: '', pedir: ''})
        this.props.onHide();
    }
    eliminarProducto(){
        ProductosAlmacenApi.remove(this.state.producto._id);
    }
    render() {
        //const { pacienteId } = this.state.pacienteId;        
        return (
            <Modal {...this.props} >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    Nombre:<input type="text" value={this.state.nombre} onChange={this.handleNombre} /><br/>
                    Cuantas {this.state.nombre + "s"} desea eliminar (maximo {this.props.producto.cantidad}):<input type="text" value={this.state.cantidad} onChange={this.handleCantidad} /> 
                    <hr />
                    Hacer Pedido de <input type="text" value={this.state.pedir} onChange={this.handlePedir} /> {this.state.nombre}<br/>
                    <input type="button" value="Hacer Pedido" onClick={this.hacerPedido} />
                    <hr />
                    <input className="pull-right" type="button" onClick={this.eliminarProducto} value="Eliminar Producto" /><br/>                    
                </Modal.Body>
                <Modal.Footer>
                    <input type="button" onClick={this.guardar} value="Guardar" />
                    <input type="button" onClick={this.props.onHide} value="Cancelar" />
                </Modal.Footer>
            </Modal>
        );
    }
}

