import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'
import ProductProvider from './provider/ProductProvider'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

<Router>
  <AuthProvider> 
    <ProductProvider>
      <App />
    </ProductProvider>
  </AuthProvider> 
</Router>

, document.getElementById('root'));


serviceWorker.unregister();
