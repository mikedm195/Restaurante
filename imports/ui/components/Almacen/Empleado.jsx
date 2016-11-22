import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';

import { EmpleadosAlmacenApi } from '/imports/api/EmpleadosAlmacen.js';
// Task component - represents a single todo item
export default class Empleado extends Component {
    constructor(props) {
        super(props);

        _.bindAll(
            this,
            'handleNombre',
            'handleApellido',
            'handleSubmit',
            'deleteEmpleado',
            'handleEditar',
        );

        this.state = {};
        this.state.editar = false;
        this.state.nombre = props.empleado.nombre;
        this.state.apellido = props.empleado.apellido;
        this.state.empleado = props.empleado;

    }

    handleNombre(e) {
        this.setState({ nombre: e.target.value });
    }
    handleApellido(e) {
        this.setState({ apellido: e.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();

        const empleado = this.state.empleado;

        EmpleadosAlmacenApi.update(empleado._id,
            {
                $set: {
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    modifiedAt: new Date(),
                }
            });
        this.setState({ editar: false });
    }

    handleEditar(e) {
        this.setState({ editar: true });
    }

    deleteEmpleado() {
        EmpleadosAlmacenApi.remove(this.state.empleado._id);
    }

    render() {
        var empleado = this.props.empleado;
        return (
            <div className="col-sm-4">
                <div className="panel panel-primary">
                    <div className="panel-heading">{this.props.empleado.nombre + " " + this.props.empleado.apellido}</div>
                    {this.state.editar ?
                        <div className="panel-body">
                            <form className="new-task" onSubmit={this.handleSubmit} >
                                <input className="form-control" type="text" value={this.state.nombre} onChange={this.handleNombre} />
                                <input className="form-control" type="text" value={this.state.apellido} onChange={this.handleApellido} />
                                <input className="btn-primary" type="submit" value="Editar" />
                            </form>
                        </div>
                        : ''}
                    <div className="panel-footer">                        
                        <input className="btnEditar btn btn-primary" type="button" value="editar" onClick={this.handleEditar} />
                        <input className="btnEditar btn btn-danger" type="button" value="eliminar" onClick={this.deleteEmpleado} />                        
                    </div>
                </div>
            </div>
        );
    }
}

Empleado.propTypes = {
    empleado: PropTypes.object.isRequired,
};
