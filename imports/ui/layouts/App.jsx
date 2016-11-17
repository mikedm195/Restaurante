import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'lodash';

import EmpleadosAlmacen from '/imports/ui/components/Almacen/EmpleadosAlmacen.jsx';
import ProductosAlmacen from '/imports/ui/components/Almacen/ProductosAlmacen.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
// App component - represents the whole app
export default class App extends Component {
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
                    <p>Proyecto para la clase de Analisis y modelacion de software</p>
                </div>
                <p>Miguel Del Moral.</p>
                <p>Alejandro Herce.</p>
                <p>Margot Duek.</p>
                <p>Jacobo Calderon.</p>
            </div>
        );
    }    
    render() {
        var content;
        if (this.state.opcion == 1)
            content = <EmpleadosAlmacen empleados={this.props.empleados} />;
        else if (this.state.opcion == 2)
            content = <ProductosAlmacen productos={this.props.productos} />;
        else if (this.state.opcion == 0)
            content = this.seleccionar();
        return (
            <div>
                <Header productos={this.props.productos} onClick={this.handleOpcion} />
                {content}
                {/*<EmpleadosAlmacen empleados={this.props.empleados} />*/}
                <Footer />
            </div>
        );
    }
}

App.propTypes = {
    empleados: PropTypes.array.isRequired,
    productos: PropTypes.array.isRequired,
};