
import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'lodash';

import EmpleadosAlmacen from '/imports/ui/components/Almacen/EmpleadosAlmacen.jsx';
import ProductosAlmacen from '/imports/ui/components/Almacen/ProductosAlmacen.jsx';
import PedidosAlmacen from '/imports/ui/components/Almacen/PedidosAlmacen.jsx';
import AlmacenHeader from '/imports/ui/components/Almacen/AlmacenHeader.jsx';
import Footer from '/imports/ui/components/Footer.jsx';
export default class Almacen extends Component {

  constructor(props) {
    super(props);

    _.bindAll(
      this,
      'handleOpcion',
      'available',
      'handle_report',
      'prox_expire',
      'expired',
    );

    this.state = {};
    this.state.opcion = 0;
    this.state.val = '';
  }




  available() {
    var p = this.props.productos;
    return p.map((producto) => (
      <div key={producto._id} className="col-sm-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <p>{producto.nombre}</p><p className="pull-right">{producto.cantidad}</p>
          </div>
        </div>
      </div>
    ));
  }


  prox_expire() {
    var p = this.props.productos;
    return p.map(function(producto){
      if(Date.parse(producto.caducidad) < Date.parse(new Date()) + 864000000 && Date.parse(producto.caducidad) > Date.parse(new Date())){
        return(
          <div key={producto._id} className="col-sm-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <p>{producto.nombre}</p><p className="pull-right">{producto.cantidad}</p>
              </div>
            </div>
          </div>
        );
      }
    });
  }


  expired() {
    var p = this.props.productos;
    return p.map(function(producto){
      if(Date.parse(producto.caducidad) < Date.parse(new Date())){
        return(
          <div key={producto._id} className="col-sm-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <p>{producto.nombre}</p><p className="pull-right">{producto.cantidad}</p>
              </div>
            </div>
          </div>
        );
      }
    });
  }

  handle_report(x){
    this.setState({val:x})
  }


  handleOpcion(n) {
    this.setState({ opcion: n });
  }
  seleccionar() {
    var reportes;
    if(this.state.val == 1)
    reportes = this.available();
    else if(this.state.val == 2)
    reportes = this.prox_expire();
    else if(this.state.val == 3)
    reportes = this.expired();
    return (
      <div className="container">
        <div className="jumbotron jumbo_almacen">
          <h1>El <strong>GoRdInAcO</strong> Contento</h1>
          <p>Aplicación en la cual podrás manejar tu restaurante y/o tu almacen de la mejor manera posible ;)</p>
        </div>

        <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" onClick={()=>this.handle_report(1)}>Productos disponibles</button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default" onClick={()=>this.handle_report(2)}>Productos pŕoximos a caducar</button>
          </div>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-default"onClick={()=>this.handle_report(3)}>Productos que ya caducaron</button>
          </div>
        </div>
        {reportes}
      </div>

    );


  }


  render() {
    var content;

    if (this.state.opcion == 1)
    content = <EmpleadosAlmacen empleados={this.props.empleados} />;
    else if (this.state.opcion == 2)
    content = <ProductosAlmacen productos={this.props.productos} />;
    else if (this.state.opcion == 3)
    content = <PedidosAlmacen pedidos={this.props.pedidos} productos={this.props.productos} pedidosRestaurante={this.props.pedidosRestaurante}/>;
    else if (this.state.opcion == 0)
    content = this.seleccionar();

    return (
      <div>
        <AlmacenHeader productos={this.props.productos} pedidos={this.props.pedidos} onClick={this.handleOpcion} pedidosRestaurante={this.props.pedidosRestaurante} />
        {content}
        <Footer />
      </div>
    );
  }
}

Almacen.propTypes = {
  empleados: PropTypes.array.isRequired,
  productos: PropTypes.array.isRequired,
  pedidos: PropTypes.array.isRequired,
  pedidosRestaurante: PropTypes.array.isRequired,
};
