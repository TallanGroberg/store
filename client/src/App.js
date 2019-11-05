//dependencies
import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom'

//context
import {withstoreCrud} from './provider/ProductProvider'
import { withAuth } from './provider/AuthProvider.js'
// made components
import ProtectedRoute from './auth/ProtectedRoute'
import Nav from './components/Nav'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Products from './components/Products'
import Product from './components/Product'
import MakeProduct from './components/MakeProduct'
import Profile from './auth/Profile'
import EditUserForm from './auth/EditUserForm'
import Cart from './components/Cart'
import Purchases from './components/Purchases'
import Checkout from './components/Checkout'
import NoMatch from './components/NoMatch'

const App = props => {
  


  const {token, isSigningUp} = props
  return (
    <div>
      <Nav />
        <Switch>
          <Route expact path='/login' render={ rProps => <Login {...rProps} />} />
          <Route expact path='/signup' render={ rProps => <Signup {...rProps} />} />
          <Route exact path='/' render={ rProps => token ? <Products {...rProps} /> : <Login /> } />
            <ProtectedRoute exact path='/products' render={ rProps => <Products /> } />
            <ProtectedRoute exact path='/makeproduct' render={ rProps => <MakeProduct /> } />
            <ProtectedRoute exact path='/yourprofile' render={ rProps => <Profile {...rProps} /> } />
            <ProtectedRoute exact path='/usersettings' render={ rProps => <EditUserForm {...rProps} /> } />
            <ProtectedRoute exact path='/cart' render={ rProps => <Cart /> } />
            <ProtectedRoute exact path='/checkout' render={ rProps => <Checkout /> } />
            <ProtectedRoute exact path='/purchases' render={ rProps => <Purchases /> } />
            <ProtectedRoute path='/products/:_id' render={ rProps => <Product {...rProps}  />} />
            <Route render={rProps => <NoMatch />}/>
        </Switch>
    </div>
  );
};

export default withAuth(withstoreCrud(App))
