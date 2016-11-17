import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

import AppContainer from '/imports/ui/containers/AppContainer.jsx';
import App from '/imports/ui/layouts/App.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route component={AppContainer}>
      <Route path="/" component={AppContainer} />    
    </Route>
  </Router>
);
