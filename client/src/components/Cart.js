import React from 'react';
import {withRouter} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'


const Cart = (props) => {
  //will be the landing ground for setup of payment systems 

  //will proceed to checkout

  //then add credit card information 
  //then push back to the home page
  console.log(props)
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
            <button onClick={() => props.history.push('/checkout')}>proceed to checkout</button>
          </>

        })
      }
    </div>
  );
};

export default withRouter(withstoreCrud(Cart));