import React from 'react';
import {Link} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'
const Products = (props) => {

  console.log('props Products',props)

  const {products} = props
  console.log(products)
  return (
    <div>
      {products.map( p => <Link key={p._id} to={p._id}> <Product key={p._id} product={p} /> </Link>)}
    </div>
  );
};

export default withstoreCrud(Products);