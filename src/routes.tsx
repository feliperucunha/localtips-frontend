import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import POIMap from './pages/POIMap';
import POI from './pages/POI';
import CreatePOI from './pages/CreatePOI';

function Routes(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={POIMap} />
        <Route path="/pointofinterest/create" component={CreatePOI} />
        <Route path="/pointsofinterest/:id" component={POI} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
