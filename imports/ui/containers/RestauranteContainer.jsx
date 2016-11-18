import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import Restaurante from '../layouts/Restaurante.jsx';
import { ProductosAlmacenApi } from '../../api/ProductosAlmacen.js';
import { ProductosRestauranteApi } from '../../api/ProductosRestaurante.js';

export default createContainer((props) => {
    return {        
        productos: ProductosRestauranteApi.find({}).fetch(),
        productosAlmacen: ProductosAlmacenApi.find({}).fetch(),
    }
}, Restaurante);
