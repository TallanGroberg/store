import React from 'react';
import {withAuth} from '../provider/AuthProvider'
const Products = (props) => {

  console.log(props)
  //this is the products page. this is where the products will be listed for further exploration


  return (
    <div>
      
    </div>
  );
};

export default withAuth(Products);