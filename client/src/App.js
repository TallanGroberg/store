import React, {useState} from 'react';
import { withAuth } from './provider/AuthProvider.js'
import {withstoreCrud} from './provider/ProductProvider'
import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import AuthForm from './auth/AuthForm'
import Products from './components/Products'
import Product from './components/Product'
import Nav from './components/Nav'

const App = props => {
  


  const {token, isSigningUp} = props
  return (
    <div>
      <Nav />
        <Route exact path='/products' render={ rProps => token ? <Products {...rProps} /> : <AuthForm /> } />
        <Route path='/products/:_id' render={ rProps => <Product {...rProps}  />} />
        <Route expact path='/login/signup' render={ rProps => <AuthForm {...rProps} />} />
    </div>
  );
};

export default withAuth(withstoreCrud(App))
