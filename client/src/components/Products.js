import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
import {Link, Switch, Route} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'

const Products = (props) => {

  

  const {products, getAllBuyables, handleCart,removeFromProductList, user } = props
  // console.log('user', JSON.parse(user).user)

  useEffect( () => {
    getAllBuyables()
  }, [])
 

  const handleCartAdd = (p) => {
    
    // p.buyer = JSON.parse(user).user._id
    console.log('P.isInCart from products',p.IsIncart)
    p.isIncart = true
    handleCart(p, p._id)
    // removeFromProductList(p)
  }

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
          <button onClick={() => handleCartAdd(p)}>add to cart</button>
        </>)
      })}

<Switch>
  <Route expact path='/products/:_id' render={ (rProps) => <Product {...rProps}  />} />
</Switch>
    
    
    </div>
  );
};

export default withRouter(withAuth(withstoreCrud(Products)));