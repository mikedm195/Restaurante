import React, { Component, PropTypes } from 'react';
import { _ } from 'lodash';
import { Mesas } from '/imports/api/Mesas.js';


export default class PedidosRestaurante extends Component {

  constructor(props) {
      super(props);

      _.bindAll(
          this,

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
      return this.props.mesas.map((mesa) => (
          <div key={mesa._id} className="col-sm-4">
              <div className="panel panel-default">
                  <div className="panel-heading">
                      <p>{mesa.nombre}</p><p className="pull-right">{mesa.tipomesa}</p>
                  </div>
                  <div className="panel-body">
                      {this.renderProductosRecetas(mesa.ingredientes)}
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

    render() {
        return (
            <div className="container">
                evidkjvsnlvs
            </div>
        );
    }
}

PedidosRestaurante.propTypes = {

};
