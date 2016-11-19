import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { RecetasApi } from '/imports/api/Recetas.js';
import { MenusApi } from '/imports/api/Menus.js';

export default class Menus extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            //Para recetas
            'handleNombreNuevaReceta',
            'handleProducto',
            'handleAgregarProductoAReceta',
            'handleGuardarReceta',
            'handleTipoReceta',
            'renderRecetas',
            //Para menus
            'handleNombreNuevoMenu',
            'handleReceta',
            'handleAgregarRecetasAMenu',
            'handleGuardarMenu',            
            'renderMenus',
        );

        this.state = this.crearDesdeProps();

    }

    crearDesdeProps(props) {
        var state = {};
        state.nombreNuevaReceta = '';
        state.nombreNuevoMenu = '';
        state.producto = '';
        state.receta = '';
        state.tipoReceta = '';
        state.productosReceta = [];
        state.productosMenu = [];
        state.productos = [];
        return state;
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }
//Para recetas
    handleGuardarReceta(event) {
        event.preventDefault();
        var nombreNuevaReceta = this.state.nombreNuevaReceta;
        var tipoReceta = this.state.tipoReceta;
        var productosReceta = this.state.productosReceta;
        if (nombreNuevaReceta != '' && tipoReceta != '' && productosReceta.length > 0) {
            RecetasApi.insert({
                nombre: nombreNuevaReceta,
                tipoReceta: tipoReceta,
                ingredientes: productosReceta,
            });
            this.setState({
                nombreNuevaReceta: '',
                tipoReceta: '',
                productosReceta: [],
            })
        }

    }

    renderRecetas() {
        return this.props.recetas.map((receta) => (
            <div key={receta._id} className="col-sm-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <p>{receta.nombre}</p><p className="pull-right">{receta.tipoReceta}</p>
                    </div>
                    <div className="panel-body">
                        {this.renderProductosRecetas(receta.ingredientes)}
                    </div>
                    <div className="panel-footer">
                        <input className="btnEditar" type="button" value="Ediar" />
                    </div>
                </div>
            </div>
        ));
    }

    renderProductosRecetas(productos) {
        return productos.map((producto, i) => (
            <h3 key={i}><span className="label label-default">{producto}</span></h3>
        ));
    }

    handleNombreNuevaReceta(e) {
        this.setState({ nombreNuevaReceta: e.target.value });
    }

    handleTipoReceta(e) {
        this.setState({ tipoReceta: e.target.value });
    }

    handleProducto(e) {
        this.setState({ producto: e.target.value });
    }

    handleAgregarProductoAReceta(e) {
        var productosReceta = this.state.productosReceta;
        if (this.state.producto != '') {
            productosReceta.push(this.state.producto);
            this.setState({ productosReceta: productosReceta });
        }
    }
//Para menus

    handleGuardarMenu(event) {
        event.preventDefault();
        var nombreNuevoMenu = this.state.nombreNuevoMenu;        
        var productosMenu = this.state.productosMenu;
        if (nombreNuevoMenu != '' && productosMenu.length > 0) {
            MenusApi.insert({
                nombre: nombreNuevoMenu,                
                recetas: productosMenu  ,
            });
            this.setState({
                nombreNuevoMenu: '',                
                productosMenu: [],
            })
        }

    }

    renderMenus() {
        return this.props.menus.map((menu) => (
            <div key={menu._id} className="col-sm-4">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <p>{menu.nombre}</p>
                    </div>
                    <div className="panel-body">
                        {this.renderProductosRecetas(menu.recetas)}
                    </div>
                    <div className="panel-footer">
                        <input className="btnEditar" type="button" value="Ediar" />
                    </div>
                </div>
            </div>
        ));
    }    

    handleNombreNuevoMenu(e) {
        this.setState({ nombreNuevoMenu: e.target.value });
    }

    handleReceta(e) {
        this.setState({ receta: e.target.value });
    }

    handleAgregarRecetasAMenu(e) {
        var productosMenu = this.state.productosMenu;
        if (this.state.receta != '') {
            productosMenu.push(this.state.receta);
            this.setState({ productosMenu: productosMenu });
        }
    }
    render() {
        var listaProductos = this.props.productos.map((producto) => (
            <option key={producto._id} value={producto.nombre}>{producto.nombre}</option>
        ));
        var listaRecetas = this.props.recetas.map((recetas) => (
            <option key={recetas._id} value={recetas.nombre}>{recetas.nombre}</option>
        ));
        return (
            <div className="container">
                <h1>Recetas</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input type="text" value={this.state.nombreNuevaReceta} onChange={this.handleNombreNuevaReceta} placeholder="Nombre de la receta" />
                                <select className="pull-right" value={this.state.tipoReceta} onChange={this.handleTipoReceta}>
                                    <option value=""></option>
                                    <option value="bebida">Bebida</option>
                                    <option value="platillo">Platillo</option>
                                </select>
                            </div>
                            <div className="panel-body">
                                <select value={this.state.producto} onChange={this.handleProducto}>
                                    <option value=""></option>
                                    {listaProductos}
                                </select>
                                <input type="button" value="Agregar a receta" onClick={this.handleAgregarProductoAReceta} />
                                <hr />
                                {this.renderProductosRecetas(this.state.productosReceta)}
                            </div>
                            <div className="panel-footer">
                                <input className="btnEditar" type="button" value="Guardar" onClick={this.handleGuardarReceta} />
                            </div>
                        </div>
                    </div>
                    {this.renderRecetas()}
                </div>
                <h1>Menus</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <input type="text" value={this.state.nombreNuevoMenu} onChange={this.handleNombreNuevoMenu} placeholder="Nombre del menu" />                                
                            </div>
                            <div className="panel-body">
                                <select value={this.state.receta} onChange={this.handleReceta}>
                                    <option value=""></option>
                                    {listaRecetas}
                                </select>
                                <input type="button" value="Agregar a menu" onClick={this.handleAgregarRecetasAMenu} />
                                <hr />
                                {this.renderProductosRecetas(this.state.productosMenu)}
                            </div>
                            <div className="panel-footer">
                                <input className="btnEditar" type="button" value="Guardar" onClick={this.handleGuardarMenu} />
                            </div>
                        </div>
                    </div>
                    {this.renderMenus()}
                </div>
            </div>
        );
    }
}

Menus.propTypes = {
    productos: PropTypes.array.isRequired,
    recetas: PropTypes.array.isRequired,
    menus: PropTypes.array.isRequired,
};