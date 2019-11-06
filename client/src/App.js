//dependencies
import React, {useState, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom'
import styled from 'styled-components'

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
  return (<>
      <Nav  /> 
    <Container>
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
    </Container>
    
        
  </>);
};

const Container = styled.div`
  font-family: Verdana, Geneva, sans-serif; 
  text-align:center;
 
  h1 {
    font-size: 22pt;
    border-top: 1px solid #F0F0F0;
    /* box-shadow: -1px 18px 10px -22px rgba(0,0,0,0.75); */
  }
  h2 {
    font-size: 20pt;
  }
  h3 {
    font-size: 17pt;
  }
  h4 {
    font-size: 14pt;
  }
  p {
    font-size: 12pt;
  }
  a {
    text-decoration: none;
    transition: 0.3s;
    color: #171717;
  }

  a:hover {
    box-shadow: -1px 18px 10px -22px rgba(0,0,0,0.75);
    color: #303030;
  }
  input:focus,
    select:focus,
      textarea:focus,
        button:focus {
          outline: none;
        }
  button {
    font-size: 12pt;
    padding: 3pt;
    margin: 0.5pt;
    border: none;
    background: none;
    transition: 0.3s;
    color: #696969;
  }
  button:hover {
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
    background-color: #FCFCFC;
    color: black;
  }
  img {
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
  }
  @media only screen and (max-width: 1000px) {
    margin-bottom: 40px;
  }
  @media only screen and (min-width: 1000px) {
    margin-top: 50px;
  }

`

export default withAuth(withstoreCrud(App))
