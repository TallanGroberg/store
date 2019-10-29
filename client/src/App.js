import React, {useState} from 'react';
import { withAuth } from './provider/AuthProvider.js'
import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import AuthForm from './auth/AuthForm'
import Products from './components/Products'
import Nav from './components/Nav'

const App = props => {
  


  const {token} = props
  return (
    <div>
      <Nav />
        <ProtectedRoute exact path='/' render={ rProps => token ? <Products {...rProps} /> : <AuthForm /> } />
        <Route expact path='/login' render={ rProps => <AuthForm {...rProps} />} />
    </div>
  );
};

export default withAuth(App)
