//dependencies
import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'

//context
import {withstoreCrud} from './provider/ProductProvider'
import { withAuth } from './provider/AuthProvider.js'
// made components
import ProtectedRoute from './auth/ProtectedRoute'
import Nav from './components/Nav'
import AuthForm from './auth/AuthForm'
import Products from './components/Products'
import Product from './components/Product'
import MakeProduct from './components/MakeProduct'
import Profile from './auth/Profile'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
const App = props => {
  


  const {token, isSigningUp} = props
  return (
    <div>
      <Nav />
        <Switch>
          <Route expact path='/login/signup' render={ rProps => <AuthForm {...rProps} />} />
          <Route exact path='/' render={ rProps => token ? <Products {...rProps} /> : <AuthForm /> } />
            <ProtectedRoute exact path='/products' render={ rProps => <Products /> } />
            <ProtectedRoute exact path='/makeproduct' render={ rProps => <MakeProduct /> } />
            <ProtectedRoute exact path='/yourproducts' render={ rProps => <Profile /> } />
            <ProtectedRoute exact path='/cart' render={ rProps => <Cart /> } />
            <ProtectedRoute exact path='/checkout' render={ rProps => <Checkout /> } />
            <ProtectedRoute path='/products/:_id' render={ rProps => <Product {...rProps}  />} />
        </Switch>
    </div>
  );
};

export default withAuth(withstoreCrud(App))
