import React, {useEffect} from 'react';
import {withAuth, bearerAxios } from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider' 
import {withRouter} from 'react-router-dom'

const Checkout = (props) => {

  useEffect( () => {
    props.getCart()
  }, [])
  console.log('props in Cart.js',props)
  const {getCart, cart} = props

  const prices = cart.map( p => p.price  )
  const totalPrice = prices.reduce( (t,f) => t + f, 0)

  //this will be the page that a user can enter credit card information and go back to the product page. 
  return (
    <div>
      {cart.map(p => {
        return <>
        <h1>{p.title}</h1>
        <p>{p.price / 100}</p>
        </>
      })}
      <p>your total is: {totalPrice / 100}</p>
    </div>
  );
};

export default withRouter(withAuth(withstoreCrud(Checkout)));