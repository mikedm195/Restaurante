import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import AlmacenContainer from '/imports/ui/containers/AlmacenContainer.jsx';
import RestauranteContainer from '/imports/ui/containers/RestauranteContainer.jsx';
import Home from '/imports/ui/components/Home.jsx';
import Team from '/imports/ui/components/team.jsx';


export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={Home}>
      <Route path="/" component={Home} />
    </Route>
    <Route path="/almacen" component={AlmacenContainer} />
    <Route path="/restaurante" component={RestauranteContainer} />
    <Route path="/team" component={Team} />
  </Router>
);
