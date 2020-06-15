import React, { useEffect, useContext } from 'react';
import { TodoContext } from './globalStates/todoContext';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import { PrivateRouter } from './components/PrivateRouter';
import { RegisterPage } from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { Home } from './components/Home';

function App() {
  const { loginURL, setIsAuthenticated, setUser } = useContext(TodoContext);

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    let mounted = true;
    if (token !== null) {
      const getUser = async () => {
        try {
          const res = await fetch(loginURL + '/user', {
            method: 'Get',
            headers: { 'x-auth-token': token },
          });
          const data = await res.json();
          if (data.userName && mounted) {
            setIsAuthenticated(true);
            setUser(data.userName);
            let { from } = location.state || { from: { pathname: '/home' } };
            history.replace(from);
          }
        } catch (e) {
          console.log(e);
        }
      };

      getUser();
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
