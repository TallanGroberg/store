import React from 'react';
import {withRouter} from 'react-router-dom'
import {Link, Switch, Route} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'
const Products = (props) => {

  console.log('props.match Products',props)

  const {products, addToCart } = props
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
          <button onClick={() => addToCart(p)}>add to cart</button>
        </>)
      })}

<Switch>
  <Route expact path='/products/:_id' render={ (rProps) => <Product />} />
</Switch>
    
    
    </div>
  );
};

export default withRouter(withstoreCrud(Products));