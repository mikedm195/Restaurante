import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';
import { MesasApi } from '/imports/api/Mesas.js';

import Mesa from './Mesa.jsx';  

export default class PedidosRestaurante extends Component {

    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'renderMesas',
        );

        this.state = this.crearDesdeProps();

    }

    crearDesdeProps(props) {
        var state = {};
        return state;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    renderMesas() {
        return this.props.mesas.map((mesa, i) => (
            <Mesa key={mesa._id} mesa={mesa} id={i} recetas={this.props.recetas} menus={this.props.menus} eliminarMesa={this.eliminarMesa} productos={this.props.productos}/>            
        ));
    }

    eliminarMesa(mesa) {
        if(mesa.bebidas.length == 0 && mesa.bebidas.length == 0 && mesa.menus.length == 0)
            MesasApi.remove(mesa._id);
        else
            alert('Termine de atender a los clientes antes de eliminar la mesa');
    }

    agregarMesa() {
        MesasApi.insert({
            bebidas:[],
            platillos:[],
            menus:[],
        })
    }
    
    render() {                
        return (
            <div className="container">
                <h1>Recetas</h1>
                <div className="row">
                    {this.renderMesas()}
                    <button type="button" className="btn btn-default btn-circle btn-xl" onClick={this.agregarMesa}>
                        <i className="glyphicon glyphicon-plus"></i>
                    </button>
                    <strong>Agregar mesa</strong>
                </div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        );
    }
}

PedidosRestaurante.propTypes = {
    mesas: PropTypes.array.isRequired,
    recetas: PropTypes.array.isRequired,
    menus: PropTypes.array.isRequired,
    productos: PropTypes.array.isRequired, 
};
