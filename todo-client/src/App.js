import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { PrivateRouter } from './components/PrivateRouter';
import { RegisterPage } from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { Home } from './components/Home';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <PrivateRouter path="/home">
          <Home />
        </PrivateRouter>
        <Route path="/register" component={RegisterPage} />
        <Route path="/*">
          <h1>Sorry page not found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
