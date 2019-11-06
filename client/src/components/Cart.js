import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import { bearerAxios, withAuth } from '../provider/AuthProvider';
import {withstoreCrud} from '../provider/ProductProvider'



const Cart = (props) => {
  //will be the landing ground for setup of payment systems 

  //will proceed to checkout

  const {handleProductAdd, user} = props

  useEffect( () => {
    props.getCart()
  }, [])
  
  
  
  const yourCart = props.cart.filter( product => {
    console.log(product)
    return product.buyer === props.user._id
  })
  
  return (
    <div>
      {yourCart.length === 0 ? 
      <>
        <p>you have no items in your cart</p>
        <button onClick={() => props.history.push('/')}>see all products</button>
      </>
      :
        yourCart.map(p => {
          return <>
          
          <h1>{p.title}</h1>
          <img src={p.imgUrl} width='100pt' height='100pt' alt='no picture added'/>
            <p>{p.price}</p>
            <button onClick={() => props.handleProductAdd(p._id, '')}>remove from Cart</button>
          </>

        })
      }
          <button onClick={() => props.history.push('/checkout')}>proceed to checkout</button>
    </div>
  );
};

export default withRouter(withAuth(withstoreCrud(Cart)));