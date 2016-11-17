import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import App from '../layouts/App.jsx';
import { EmpleadosAlmacenApi } from '../../api/EmpleadosAlmacen.js';
import { ProductosAlmacenApi } from '../../api/ProductosAlmacen.js';

export default createContainer((props) => {
    return {
        empleados: EmpleadosAlmacenApi.find({}).fetch(),
        productos: ProductosAlmacenApi.find({}).fetch(),
    }
}, App);
