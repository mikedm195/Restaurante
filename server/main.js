import { Meteor } from 'meteor/meteor';

import '../imports/api/EmpleadosAlmacen.js';
import '../imports/api/ProductosAlmacen.js';
import '../imports/api/ProductosRestaurante.js';
import '../imports/api/PedidosAlmacen.js';
import '../imports/api/PedidosAlmacenARestaurante.js';
import '../imports/api/Recetas.js';
import '../imports/api/Menus.js';
import '../imports/api/Mesas.js';
import '../imports/api/HistorialCuentasRestaurante.js';
import '../imports/api/EmpleadosRestaurante.js';

Meteor.startup(() => {
  // code to run on server at startup
});
