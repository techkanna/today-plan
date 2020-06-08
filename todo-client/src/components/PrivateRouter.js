import React, { useContext } from 'react';
import { TodoContext } from '../globalStates/todoContext';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRouter = ({ children, ...rest }) => {
  const { isAuthenticated } = useContext(TodoContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
