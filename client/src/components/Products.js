import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
import {Link, Switch, Route} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'

const Products = (props) => {

  

  const {products, getAllBuyables, handleCartAdd, user } = props

console.log(props)
  useEffect( () => {
    getAllBuyables()
  }, [])

  
 



  return (

    <div>
        
      {products.length <= 1 ? 
      <p>no products on display</p>  
      :
    <>
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
         <button onClick={() => handleCartAdd(p._id)}>add to cart</button>
      </>
        }
        </>)
      })}
    </>
      }

<Switch>
  <Route expact path='/products/:_id' render={ (rProps) => <Product {...rProps}  />} />
</Switch>
    
    
    </div>
  );
};

export default withRouter(withAuth(withstoreCrud(Products)));