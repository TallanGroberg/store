import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
import {Link, Switch, Route} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'

const Products = (props) => {

  

  const {products, getAllBuyables, handleCart, user } = props


  useEffect( () => {
    getAllBuyables()
  }, [])

  const makeIsInCartTrue = (p) => {
    p.isIncart = true
    p.buyer = user._id
  }
 

  const handleCartAdd =  (p) => {
      p.isIncart = true
      p.buyer = user._id
    if(p.isInCart === true && p.buyer !== undefined) {
      handleCart(p, p._id)
    } else {
     makeIsInCartTrue(p)
    }
    getAllBuyables()

    
  }

  return (

    <div>
      {products.map( p =>  {
        return ( <>
        {user._id === p._id ?
          null
            :
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
                <img src={p.imgUrl} width='200' height="200" alt="a product" />
          </Link>
         <button onClick={() => handleCartAdd(p)}>add to cart</button>
         </>
        }
        </>)
      })}

<Switch>
  <Route expact path='/products/:_id' render={ (rProps) => <Product {...rProps}  />} />
</Switch>
    
    
    </div>
  );
};

export default withRouter(withAuth(withstoreCrud(Products)));