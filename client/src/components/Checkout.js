import React, {useEffect} from 'react';
// import StripeCheckout from 'react-stripe-checkout';
import {withAuth, bearerAxios } from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider' 
import {withRouter} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'

const Checkout = (props) => {

  useEffect( () => {
    props.getCart()
  }, [])

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
      <CheckoutForm cart={cart} totalPrice={totalPrice} />
      <p>your total is: {totalPrice / 100}</p>
    </div>
  );
};

export default withRouter(withAuth(withstoreCrud(Checkout)));