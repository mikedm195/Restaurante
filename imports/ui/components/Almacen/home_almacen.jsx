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
            'handle_report'
        );

        this.state = {};
        this.state.opcion = 0;
        this.state.val = '';
    }




    available() {
      var p = this.props.productos;
      console.log(p);
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

    handle_report(x){
      console.log(x);
      this.setState({val:x})
    }


    handleOpcion(n) {
        this.setState({ opcion: n });
    }
    seleccionar() {
        var reportes;
        console.log(this.state.val);
        if(this.state.val == 1)
          reportes = this.available();
        else if(this.state.val == 2)
          reportes = this.available();
        else if(this.state.val == 3)
          reportes = this.available();
        return (
            <div className="container">
              <div className="jumbotron">
                <h1>Almacen de Ariel</h1>
                <p>Aqui se administra el almacen de Ariel</p>
              </div>
              <div className="btn-group btn-group-justified" role="group" aria-label="...">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default" onClick={()=>this.handle_report(1)}>Productos disponibles</button>
                </div>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default">Productos pŕoximos a caducar</button>
                </div>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default">Productos que ya caducaron</button>
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
                <AlmacenHeader productos={this.props.productos} pedidos={this.props.pedidos} onClick={this.handleOpcion} />
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
