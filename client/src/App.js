import React, {useState} from 'react';
import { withAuth } from './provider/AuthProvider.js'
import {Route, Switch} from 'react-router-dom'
import AuthForm from './auth/AuthForm'
import Products from './components/Products'
import Nav from './components/Nav'

const App = props => {
  



  console.log(props)
  return (
    <div>
  <Nav />
     <AuthForm />
     <Products />
    
    </div>
  );
};

export default withAuth(App)
