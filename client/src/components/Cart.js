import React, {useEffect} from 'react';
import styled from 'styled-components'
import {withAuth, bearerAxios } from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider' 
import {withRouter} from 'react-router-dom'
import CheckoutForm from './CheckoutForm'

const Cart = (props) => {
  const {getCart, cart, handleProductAdd, user} = props

  useEffect( () => {
    props.getCart()
  }, [])

  const yourCart = cart.filter( product => {
    return product.buyer === user._id
  })
  const prices = yourCart.map( p => p.price  )
  const totalPrice = prices.reduce( (t,f) => t + f, 0)

  
  //this will be the page that a user can enter credit card information and go back to the product page. 
  return (<>
    <CartStyle>
      {yourCart.map(p => {
        return <div>
        <h1>{p.title}</h1>
          <img src={p.imgUrl} alt='no image' height='100' width='100' />
        <p>{p.price / 100}</p>
        <button onClick={ () => handleProductAdd(p._id, p)}>Remove From cart</button>
        </div>
      })}
    </CartStyle>
      <CheckoutForm yourCart={yourCart} totalPrice={totalPrice} />
      <p>your total is: {totalPrice / 100}</p>
      </>
  );
};

const CartStyle = styled.div`
  display: grid;
 
  grid-template-columns: repeat(auto-fit, minmax(200pt, 1fr));
  grid-auto-flow: row;
  grid-gap: 5pt;
  margin-bottom: 10pt;

`;

export default withRouter(withAuth(withstoreCrud(Cart)));