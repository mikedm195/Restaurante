import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import AlmacenContainer from '/imports/ui/containers/AlmacenContainer.jsx';
import Home from '/imports/ui/components/Home.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={Home}>
      <Route path="/" component={Home} />  
    </Route>
    <Route path="/almacen" component={AlmacenContainer} />    
  </Router>
);
