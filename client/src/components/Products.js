import React from 'react';
import {Link, Switch, Route} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'
const Products = (props) => {

  console.log('props.match Products',props.match)

  const {products} = props
  console.log('products in products',products)


  return (

    <div>
      {products.map( p =>  {
        return (
        <>
          <Link to={'/products/' + p._id}>
            <h1>
              {p.title}
            </h1>
              <p>
                {p.description}
              </p>
                <p>
                  {p.price}
                </p>
          </Link>
        </>)
      })}

<Switch>
  <Route expact path='/products/:_id' render={ (rProps) => <Product />} />
</Switch>
    
    
    </div>
  );
};

export default withstoreCrud(Products);