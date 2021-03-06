//dependencies
import React, {useState, useEffect} from 'react';
import {Route, Switch, Link} from 'react-router-dom'
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
import NoMatch from './components/NoMatch'
import Footer from './components/Footer'
import Contact from './components/Contact'
import SoldItems from './components/SoldItems';

const App = props => {
  

  const {token, isSigningUp} = props
  return (<>
      <Nav  /> 
    <Container>
        <Switch>
          <Route expact path='/login' render={ rProps => <Login {...rProps} />} />
          <Route expact path='/signup' render={ rProps => <Signup {...rProps} />} />
          <Route exact path='/' render={ rProps => <Products {...rProps} />} />
          <Route path='/contact' render={ rProps => <Contact {...rProps}  />} />
            <Route exact path='/products' render={ rProps => <Products /> } />
            <Route exact path='/product' render={ rProps => props.token !== '' && <Products /> } />
            <Route path='/products/:_id' render={ rProps => <Product {...rProps}  />} />
            <Route exact path='/cart' render={ rProps => props.token ?  <Cart /> : 
            <>
              <h1>make an account to buy a piece you love</h1>
              <Link to='/signup'>make an account</Link> </>} />
            <Route exact path='/makeproduct' render={ rProps => props.token ? <MakeProduct /> : 
            <>
              <h1>To post your own art you have to have an account</h1>
              <Link to='/signup'>make an account</Link> </>} />
            
            <ProtectedRoute exact path='/yourprofile' render={ rProps => <Profile {...rProps} /> } />
            <ProtectedRoute exact path='/usersettings' render={ rProps => <EditUserForm {...rProps} /> } />
            <ProtectedRoute exact path='/purchases' render={ rProps => <Purchases /> } />
            <ProtectedRoute exact path='/solditems' render={ rProps => <SoldItems /> } />
            <Route render={rProps => <NoMatch />}/>
        </Switch>
            
    </Container>
    
        
  </>);
};

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Cormorant+Upright');
   font-family: "Cormorant Upright", serif;
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
    font-size: 15pt;
    font-family: "Cormorant Upright", serif;
    text-decoration: none;
    transition: 0.3s;
    color: #171717;
  }
  a:after {
  content: '';
  position: absolute;
  width: 0; height: 3px;
  display: block;
  margin-top: 5px;
  right: 0;
  background: #fff;
  transition: width .2s ease;
  -webkit-transition: width .2s ease;
}
  input {
    border-top: rgba(0,0,0,0);
    border-left: rgba(0,0,0,0)
  }
  textarea {
    border-top: rgba(0,0,0,0);
    border-left: rgba(0,0,0,0);
    

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
    font-family: "Cormorant Upright", serif;
    font-size: 15pt;
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
