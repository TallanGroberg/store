import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import { bearerAxios } from '../provider/AuthProvider';
import {withstoreCrud} from '../provider/ProductProvider'


const Cart = (props) => {
  //will be the landing ground for setup of payment systems 

  //will proceed to checkout

  
  //then push back to the home page

  useEffect( () => {
    props.getCart()
  }, [])


    const removeFromCart = p => {
      p.isIncart = false
      props.handleCart(p, p._id)
    }

  return (
    <div>
      {props.cart.length === 0 ? 
      <>
        <p>you have no items in your cart</p>
        <button onClick={() => props.history.push('/')}>see all products</button>
      </>
      :
        props.cart.map(p => {
          return <>
          <h1>{p.title}</h1>
            <p>{p.price}</p>
            <button onClick={() => removeFromCart(p) }>remove from Cart</button>
          </>

        })
      }
          <button onClick={() => props.history.push('/checkout')}>proceed to checkout</button>
    </div>
  );
};

export default withRouter(withstoreCrud(Cart));