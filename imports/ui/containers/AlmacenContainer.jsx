import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Almacen from '../components/Almacen/home_almacen.jsx';
import { EmpleadosAlmacenApi } from '../../api/EmpleadosAlmacen.js';
import { ProductosAlmacenApi } from '../../api/ProductosAlmacen.js';
import { PedidosAlmacenApi } from '../../api/PedidosAlmacen.js';
import { PedidosAlmacenARestauranteApi } from '../../api/PedidosAlmacenARestaurante.js';

export default createContainer((props) => {
    return {
        empleados: EmpleadosAlmacenApi.find({}).fetch(),
        productos: ProductosAlmacenApi.find({}).fetch(),
        pedidos: PedidosAlmacenApi.find({}).fetch(),
        pedidosRestaurante: PedidosAlmacenARestauranteApi.find({}).fetch(),
    }
}, Almacen);
