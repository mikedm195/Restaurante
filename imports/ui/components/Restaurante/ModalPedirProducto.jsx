import React, { Component } from 'react';
import { _ } from 'lodash';
import { Modal } from 'react-bootstrap';

import { ProductosRestauranteApi } from '/imports/api/ProductosRestaurante.js';

export default class ModalNuevaConsulta extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,            
            'handleCantidad',               
            'guardar',              
            'eliminarProducto',             
        );

        this.state = {};
        this.state.producto = props.producto;        
        this.state.cantidad = '';        
    }
    
    handleCantidad(e) {        
        var num = parseInt(e.target.value);        
        if((num > 0 && num <= this.props.producto.cantidad))
            this.setState({ cantidad: num });
        if(isNaN(num))
            this.setState({ cantidad: '' });
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

    guardar(){                 
        let producto = this.state.producto;
        let nombre = this.state.nombre;
        let cantidad = parseInt(this.state.cantidad);
        if(isNaN(cantidad)){
            cantidad = 0;
        }
        cantidad = parseInt(producto.cantidad) - cantidad;

        ProductosRestauranteApi.update(producto._id,
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
        ProductosRestauranteApi.remove(this.state.producto._id);
    }
    render() {
        //const { pacienteId } = this.state.pacienteId;        
        return (
            <Modal {...this.props} >
                <Modal.Header closeButton>
                    <Modal.Title>Editar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    Nombre: {this.props.producto.nombre} <br/>
                    Cuantas {this.props.producto.nombre + "s"} desea eliminar (maximo {this.props.producto.cantidad}):<input type="text" value={this.state.cantidad} onChange={this.handleCantidad} />                                         
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

