import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
  const redirect = rest.location.pathname;

  return (
    <Route {...rest} render={function(props) {
      return (
        rest.loggedIn
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
            
          }} />
      )}
    } />
  );
}

export default withRouter(ProtectedRoute);