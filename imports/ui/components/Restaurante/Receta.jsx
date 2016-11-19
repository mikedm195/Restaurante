import React, { Component } from 'react';
import { _ } from 'lodash';
import ModalEditarReceta from './ModalEditarReceta.jsx';

import { RecetasApi } from '/imports/api/Recetas.js';

export default class Receta extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'open',
            'close',
            'eliminarReceta',
        );

        this.state = {
            show: false
        }
    }

    renderProductosRecetas(productos) {
        return productos.map((producto, i) => (
            <span key={i} className="label label-default">{producto}</span>
        ));
    }

    close() {
        this.setState({ show: false });
    }

    open() {
        this.setState({ show: true });
    }

    eliminarReceta(){
        RecetasApi.remove(this.props.receta._id);
    }

    render() {
        var receta = this.props.receta;
        var productos = this.props.productos;
        return (
            <div className="col-sm-4">
                <div className="panel panel-default">
                    <p>{receta.nombre}</p><p className="pull-right">{receta.tipoReceta}</p>
                    <div className="panel-heading">
                    </div>
                    <div className="panel-body">
                        {this.renderProductosRecetas(receta.ingredientes)}
                        <hr />
                        <p className="pull-right">${receta.precio}</p>
                    </div>
                    <div className="panel-footer">
                        <input className="btnEditar" type="button" value="Ediar" onClick={this.open} />
                        <input className="btnEditar pull-right" type="button" value="Eliminar" onClick={this.eliminarReceta} />
                    </div>
                </div>
                <ModalEditarReceta show={this.state.show} onHide={this.close} productos={productos} receta={receta} />
            </div>
        );
    }
}

