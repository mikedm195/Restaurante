import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { _ } from 'lodash';

import EmpleadosAlmacen from '/imports/ui/components/Almacen/EmpleadosAlmacen.jsx';
import ProductosRestaurante from '/imports/ui/components/Restaurante/ProductosRestaurante.jsx';
import PedidosRestaurante from '/imports/ui/components/Restaurante/PedidosRestaurante.jsx';
import Menus from '/imports/ui/components/Restaurante/Menus.jsx';
import Mesa from '/imports/ui/components/Restaurante/Mesa.jsx';

import RestauranteHeader from '../components/Restaurante/RestauranteHeader.jsx';
import Footer from '../components/Footer.jsx';

export default class Restaurante extends Component {
  constructor(props) {
    super(props);

    _.bindAll(
      this,
      'handleOpcion',
      'topPlates'
    );

    this.state = {};
    this.state.opcion = 0;
  }

  handleOpcion(n) {
    this.setState({ opcion: n });
  }

  topPlates(){
    var p = this.props.recetas;
    return p.map((receta) => (
      <div key={receta._id} className="col-sm-4">
        <div className="panel panel-default">
          <div className="panel-heading">
            <p>{receta.nombre}</p><p className="pull-right">{receta.popularidadReceta}</p>
          </div>
        </div>
      </div>
    ));
  }


  seleccionar() {
    var top;
    top = this.topPlates();
    return (
      <div className="container">
        <div className="jumbotron jumbo_almacen">
          <h1>El <strong>gordinaco</strong> Contento</h1>
          <p>Aplicación en la cual podrás manejar tu restaurante y/o tu almacen de la mejor manera posible ;)</p>
        </div>
        <div>
          {top}
        </div>
      </div>
    );
  }
  render() {
    if (this.state.opcion == 1)
    content = <PedidosRestaurante mesas={this.props.mesas} recetas={this.props.recetas} menus={this.props.menus} productos={this.props.productos}/>;
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
  mesas: PropTypes.array.isRequired,

};
