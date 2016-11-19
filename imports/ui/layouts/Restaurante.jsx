import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'lodash';

import EmpleadosAlmacen from '/imports/ui/components/Almacen/EmpleadosAlmacen.jsx';
import ProductosRestaurante from '/imports/ui/components/Restaurante/ProductosRestaurante.jsx';
import PedidosRestaurante from '/imports/ui/components/Restaurante/PedidosRestaurante.jsx';
import Menus from '/imports/ui/components/Restaurante/Menus.jsx';
import RestauranteHeader from '../components/Restaurante/RestauranteHeader.jsx';
import Footer from '../components/Footer.jsx';

export default class Restaurante extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleOpcion',
        );

        this.state = {};
        this.state.opcion = 0;
    }

    handleOpcion(n) {
        this.setState({ opcion: n });
    }
    seleccionar() {
        return (
            <div className="container">
                <div className="jumbotron">
                    <h1>Restaurante de Ariel</h1>
                    <p>Aqui se administra el restaurante de Ariel</p>
                </div>                
            </div>
        );
    }    
    render() {
        var content;
        if (this.state.opcion == 1)
            content = <PedidosRestaurante/>;
        else if (this.state.opcion == 2)
            content = <ProductosRestaurante productos={this.props.productos} productosAlmacen={this.props.productosAlmacen}/>;
        else if (this.state.opcion == 3)
            content = <Menus productos={this.props.productos} recetas={this.props.recetas} menus={this.props.menus}/>;
        else if (this.state.opcion == 0)
            content = this.seleccionar();
        return (
            <div>
                <RestauranteHeader productos={this.props.productos} onClick={this.handleOpcion} />
                {content}                
                <Footer />
            </div>
        );
    }
}

Restaurante.propTypes = {    
    productos: PropTypes.array.isRequired,
    productosAlmacen: PropTypes.array.isRequired,
    recetas: PropTypes.array.isRequired,
    menus: PropTypes.array.isRequired,
};