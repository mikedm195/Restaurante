import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Almacen from '../layouts/Almacen.jsx';
import { EmpleadosAlmacenApi } from '../../api/EmpleadosAlmacen.js';
import { ProductosAlmacenApi } from '../../api/ProductosAlmacen.js';

export default createContainer((props) => {
    return {
        empleados: EmpleadosAlmacenApi.find({}).fetch(),
        productos: ProductosAlmacenApi.find({}).fetch(),
    }
}, Almacen);
