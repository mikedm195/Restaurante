import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { EmpleadosRestauranteApi } from '/imports/api/EmpleadosRestaurante.js';
import Empleado from './Empleado.jsx';

// Task component - represents a single todo item
export default class EmpleadosRestaurante extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombre',
            'handleApellido',
            'handleSubmit',
        );
        this.state = this.crearDesdeProps(props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ empleados: nextProps.empleados });
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

    crearDesdeProps(props) {
        var state = {};
        state.nombre = '';
        state.apellido = '';
        state.empleados = this.props.empleados;
        return state;
    }
    handleNombre(e) {
        this.setState({ nombre: e.target.value });
    }
    handleApellido(e) {
        this.setState({ apellido: e.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const empleados = this.state.empleados;

        //empleados.push(empleado);
        EmpleadosRestauranteApi.insert({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            createAt: new Date(),
        });
        this.setState({ nombre: '', apellido: '', empleados: empleados });

        // Clear form
    }
    renderEmpleado() {

        return this.props.empleados.map((empleado) => (
            <Empleado key={empleado._id} empleado={empleado} />
        ));
    }
    render() {
        return (
            <div className="container">
                <form className="new-task" onSubmit={this.handleSubmit} >
                    <div className="col-md-5">
                        <input className="form-control" type="text" value={this.state.nombre} onChange={this.handleNombre} />
                    </div>
                    <div className="col-md-5">
                        <input className="form-control" type="text" value={this.state.apellido} onChange={this.handleApellido} />
                    </div>
                    <div className="col-md-2">
                        <input className="btn btn-default" type="submit" value="Agregar empleado" />
                    </div>
                </form>
                <br/><br/>
                <div className="row">
                    {this.renderEmpleado()}
                </div>

            </div>
        );
    }
}

EmpleadosRestaurante.propTypes = {
    empleados: PropTypes.array.isRequired,
};
