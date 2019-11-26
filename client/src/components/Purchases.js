import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth,bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'


const Purchases = (props) => {
  const {user, getAllBoughtProducts} = props

  useEffect( () => {
    getAllBoughtProducts()
  }, [])

  const yourPurchases = props.bought.filter( product => {
    return product.buyer === user._id
  })

   
  return (
      <div>
        {yourPurchases.length === 0 
        ? 
          <>
            <p>you haven't bought anything yet. </p>
            <button onClick={() => props.history.push('/products')}>go to products page</button> 
          </>
        : 
          null}
          
        {yourPurchases.map( p => {
          return <>
                  <h1>{p.title}</h1>
                    <p>{p.description}</p>
                      <p>{p.price / 100}</p>
                        <p>{p.buyer}</p>
                          <img src={p.imgUrl} width='200' alt='no image' />
                            <p>Product id: {p._id}</p>
                </>
          })
        }
        
      </div>
  );
};

export default withRouter(withAuth(withstoreCrud(Purchases)));