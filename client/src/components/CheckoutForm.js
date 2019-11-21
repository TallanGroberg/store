import React, {useState,} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import styled from 'styled-components'
import axios from 'axios'
import {bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'


const CheckoutForm = (props) =>  {
  const [complete, setComplete] = useState(false)
  const [fail, setFail] = useState(false)

  const {editProduct, getCart} = props
  
    const  submit =  async (ev) =>  {
      let {token} = await props.stripe.createToken({name: "Name"});

        await axios.post('/charge',{
          headers: {"Content-Type": "text/plain"},
          token: token.id,  
          amount: props.totalPrice,
        }
      ).then( res => {
        if(res.status === 200) {
          props.cart.map( async p  => {
             p.isBought = true
            p.isIncart = false
            await editProduct(p, p._id)
            getCart()
            
          })
          return setComplete(!complete)
        } else if(res.status === 500) {
          setFail(true)
        }
      })
      .catch(err => console.log(err.message))
    }
  
    return (
      <>
        {fail && <p>payment failed this was probaby due to stripe payment system</p> }
        {complete ? 
          <>
            <h1>payment successful, {props.totalPrice / 100} will be removed from your account, to view your purchases click here.</h1>
              <button onClick={() => props.history.push('/purchases')}></button>
          </>

          :

          <>
              <p>Would you like to complete the purchase?</p>
                <CardInputStyle>
                  <p>this is for test purposes only please enter do not enter your creditcard information until the seller knows you are going to buy a product. </p>
                    <CardElement  />
                      <button onClick={submit}>Purchase</button>
                        </CardInputStyle>
        </>
        }
    </>
    );
  }

  const CardInputStyle = styled.div`
    display: grid;
    width: 80%;
    grid-template-rows: 1fr 2fr 1fr;
    grid-auto-flow: column;
    grid-gap: 5pt;
    margin: auto;
    left: 0;
    right: 0;
    margin-bottom: 10pt;
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
    .card {
      border: 1px solid black;

    }
  `;


export default injectStripe(withstoreCrud(CheckoutForm));