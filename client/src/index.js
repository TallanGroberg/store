import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {BrowserRouter as Router} from 'react-router-dom'
import AuthProvider from './provider/AuthProvider'
import ProductProvider from './provider/ProductProvider'
import * as serviceWorker from './serviceWorker';
import {Elements, StripeProvider} from 'react-stripe-elements';
ReactDOM.render(
<StripeProvider apiKey={process.env.REACT_APP_APIKEY}>
  <Elements>
    <Router>
      <AuthProvider> 
        <ProductProvider>
          <App />
        </ProductProvider>
      </AuthProvider> 
    </Router>
  </Elements>
</StripeProvider>

, document.getElementById('root'));


serviceWorker.unregister();
