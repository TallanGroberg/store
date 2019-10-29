import React from 'react';
import {Route, Redirect, withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
const ProtectedRoute = (props) => {
  const {component: Component, ...rest } = props
  //make to require a token 
  return (
    props.token 
      ? 
        <Route { ...rest} component={Component} /> 
      :
        <Redirect to='/login/signup' />
  );
};

export default withRouter(withAuth(ProtectedRoute));