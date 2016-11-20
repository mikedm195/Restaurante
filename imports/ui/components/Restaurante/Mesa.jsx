import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import classname from 'classnames';

import { MesasApi } from '/imports/api/Mesas.js';
import { HistorialCuentasRestauranteApi } from '/imports/api/HistorialCuentasRestaurante.js';

import ModalPedirCuenta from './ModalPedirCuenta.jsx';

export default class Mesa extends React.Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'agregarARecetas',
            'agregarAMenus',
            'eliminaDeRecetas',
            'eliminaDeMenus',
            'hacerPedido',
            'handlePagar',
            'open',
            'close',
        );

        this.state = this.crearDesdeProps(props);

    }

    crearDesdeProps(props) {
        return this.state = {
            platillosTemp: [],
            bebidasTemp: [],
            menusTemp: [],
            show: false,
        }
    }

    componentWillMount() {
        this.guardarMenusConDebounce = _.debounce(this.guardarMenus, 5000);
    }

    getcolor(receta) {
        if (receta.tipoReceta == "bebida")
            return classname('btn btn-warning btn-sm')
        else
            return classname('btn btn-primary btn-sm')
    }

    generateTooltip(menu) {
        return <Tooltip id="tooltip">
            {menu.recetas.map((receta, i) =>
                <div key={i}>{receta}</div>
            )}
        </Tooltip>
    }

    agregarARecetas(obj) {
        if (obj.tipoReceta == "bebida") {
            var pedido = this.state.bebidasTemp;
            pedido.push(obj);
            this.setState({ bebidasTemp: pedido });
        } else {
            pedido = this.state.platillosTemp;
            pedido.push(obj);
            this.setState({ platillosTemp: pedido });
        }
    }

    agregarAMenus(obj) {
        var pedido = this.state.menusTemp;
        pedido.push(obj);
        this.setState({ menusTemp: pedido });
    }

    eliminaDeRecetas(tipoReceta, id) {
        if (tipoReceta == "bebida") {
            var pedido = this.state.bebidasTemp;
            pedido.splice(id, 1);
            this.setState({ bebidasTemp: pedido });
        } else {
            pedido = this.state.platillosTemp;
            pedido.splice(id, 1);
            this.setState({ platillosTemp: pedido });
        }
    }

    eliminaDeMenus(id) {
        var pedido = this.state.menusTemp;
        pedido.splice(id, 1);
        this.setState({ menusTemp: pedido });
    }

    listaRecetasParaAgregar(recetas) {
        return recetas.map((receta, i) => (
            <button key={i} type="button" className={this.getcolor(receta)} onClick={() => this.agregarARecetas(receta)}>
                {receta.nombre}
            </button>
        ));
    }

    listaMenusParaAgregar(menus) {
        return menus.map((menu, i) => (
            <OverlayTrigger key={i} placement="bottom" overlay={this.generateTooltip(menu)} >
                <button type="button" className="btn btn-danger btn-sm" onClick={() => this.agregarAMenus(menu)}>
                    {menu.nombre}
                </button>
            </OverlayTrigger>
        ));
    }

    listaRecetasParaEliminar(recetas) {
        return recetas.map((receta, i) => (
            <button key={i} type="button" className={this.getcolor(receta)} onClick={() => this.eliminaDeRecetas(receta.tipoReceta, i)}>
                {receta.nombre}
            </button>
        ));
    }

    listaMenusParaEliminar(menus) {
        return menus.map((menu, i) => (
            <OverlayTrigger key={i} placement="bottom" overlay={this.generateTooltip(menu)} >
                <button type="button" className="btn btn-danger btn-sm" onClick={() => this.eliminaDeMenus(i)}>
                    {menu.nombre}
                </button>
            </OverlayTrigger>
        ));
    }

    hacerPedido() {
        console.log("Se guardo");
        this.guardarRecetas(this.state.bebidasTemp, this.state.platillosTemp);
        this.guardarMenusConDebounce(this.state.menusTemp);
        this.setState({
            bebidasTemp: [],
            platillosTemp: [],
            menusTemp: [],
        })
    }

    guardarRecetas(bebidas, platillos) {
        var bebidasMesa = _.concat(this.props.mesa.bebidas, bebidas);
        var platillosMesa = _.concat(this.props.mesa.platillos, platillos);
        MesasApi.update(this.props.mesa._id,
            {
                $set: {
                    bebidas: bebidasMesa,
                    platillos: platillosMesa,
                }
            }
        );
    }

    guardarMenus(menus) {
        var menusMesa = _.concat(this.props.mesa.menus, menus);
        MesasApi.update(this.props.mesa._id,
            {
                $set: {
                    menus: menusMesa,
                }
            }
        );
    }

    open() {
        this.setState({ show: true });
    }

    close() {
        this.setState({ show: false });
    }

    handlePagar() {
        HistorialCuentasRestauranteApi.insert(this.props.mesa);
        MesasApi.update(this.props.mesa._id,
            {
                $set: {
                    bebidas: [],
                    platillos: [],
                    menus: [],
                }
            }
        );
        this.setState({
            bebidasTemp: [],
            platillosTemp: [],
            menusTemp: [],
        });
        this.close();
    }

    render() {
        return (
            <div className="col-sm-6">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <button type="button" className="close" onClick={() => this.props.eliminarMesa(this.props.mesa)}>&times;</button>
                        <p>Mesa {this.props.id + 1}</p>
                    </div>
                    <div className="panel-body">
                        <h3>Hacer pedido</h3>
                        <h5>(Toca sobre las recetas para hacer pedido)</h5>
                        <br />
                        {this.listaRecetasParaAgregar(this.props.recetas)}
                        {this.listaMenusParaAgregar(this.props.menus)}
                        <hr />
                        <h3>Pedido</h3>
                        <h5>(Aquí se ven los pedidos antes de que se envien a la cocina)</h5>
                        <div className="row border-between">
                            <div className="col-sm-4">
                                <h5>Bebidas</h5>
                                {this.listaRecetasParaEliminar(this.state.bebidasTemp)}
                            </div>
                            <div className="col-sm-4">
                                <h5>Platillos</h5>
                                {this.listaRecetasParaEliminar(this.state.platillosTemp)}
                            </div>
                            <div className="col-sm-4">
                                <h5>Menus</h5>
                                {this.listaMenusParaEliminar(this.state.menusTemp)}
                            </div>
                        </div>
                        <input type="button" value="Hacer pedido" onClick={this.hacerPedido} />
                        <h3>Entregados</h3>
                        <h5>(Aquí se ven los pedidos que ya se entregaron)</h5>
                        <div className="row border-between">
                            <div className="col-sm-4">
                                <h5>Bebidas</h5>
                                {this.props.mesa.bebidas.map((receta, i) => (
                                    <button key={i} type="button" className={this.getcolor(receta)} >
                                        {receta.nombre}
                                    </button>
                                ))}
                            </div>
                            <div className="col-sm-4">
                                <h5>Platillos</h5>
                                {this.props.mesa.platillos.map((receta, i) => (
                                    <button key={i} type="button" className={this.getcolor(receta)} >
                                        {receta.nombre}
                                    </button>
                                ))}
                            </div>
                            <div className="col-sm-4">
                                <h5>Menus</h5>
                                {this.props.mesa.menus.map((menu, i) => (
                                    <OverlayTrigger key={i} placement="bottom" overlay={this.generateTooltip(menu)} >
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => this.eliminaDeMenus(i)}>
                                            {menu.nombre}
                                        </button>
                                    </OverlayTrigger>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer clearfix">
                        <input className="btnEditar pull-right" type="button" value="Pedir cuenta" onClick={this.open} />
                    </div>
                </div>
                <ModalPedirCuenta show={this.state.show} onHide={this.close} mesa={this.props.mesa} pagar={this.handlePagar} />
            </div>
        );
    }
}

Mesa.propTypes = {
    mesa: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    recetas: PropTypes.array.isRequired,
    menus: PropTypes.array.isRequired,
    eliminarMesa: PropTypes.func.isRequired,
}