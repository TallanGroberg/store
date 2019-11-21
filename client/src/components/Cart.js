import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import { bearerAxios, withAuth } from '../provider/AuthProvider';
import {withstoreCrud} from '../provider/ProductProvider'
import CheckoutForm from './CheckoutForm'


const Cart = (props) => {
  //will be the landing ground for setup of payment systems 

  //will proceed to checkout

  //i want to kick all things out of the cart if it is in for a certain amout of time.

  const {handleProductAdd, user, cart} = props

  useEffect( () => {
    props.getCart()
  }, [])
  
  
  
  const yourCart = cart.filter( product => product.buyer === user._id)
  const prices = yourCart.map( p => p.price  )
  const totalPrice = prices.reduce( (t,f) => t + f, 0)
  
  return (
    <CartStyle>
      {yourCart.length === 0 ? 
      <>
        <p>you have no items in your cart</p>
      </>
      :
      <>
        {yourCart.map(p => {
          return <div>{p.isBought === false ? 
          <>
            <h1>{p.title}</h1>
              <img src={p.imgUrl} width='100pt' height='100pt' alt='no picture added'/>
                <p>{p.price / 100} $</p>
                  <button onClick={() => props.handleProductAdd(p._id, '')}>remove from Cart</button>
          </>
              : 
              <p>your cart is empty, go back to the product page</p>
            }
            <CheckoutForm yourCart={yourCart} totalPrice={totalPrice} />
              <p>your total is:  {totalPrice / 100} $</p>
          </div>

        })}
        </>
      }
      
              <button onClick={() => props.history.push('/products')}>go to products page</button> 
            
    </CartStyle>
  );
};

const CartStyle = styled.div`
  display: grid;
  
  
  grid-gap: 5pt;

  margin-bottom: 10pt;
`;

export default withRouter(withAuth(withstoreCrud(Cart)));