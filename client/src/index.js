import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './provider/AuthProvider'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(

<AuthProvider>  
  <App />
</AuthProvider> 

, document.getElementById('root'));


serviceWorker.unregister();
