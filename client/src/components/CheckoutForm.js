import React, {useState,} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import styled from 'styled-components'
import axios from 'axios'
import {bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'


const CheckoutForm = (props) =>  {
  const [complete, setComplete] = useState(false)
  const [fail, setFail] = useState(false)
    console.log('complete in checkoutfrom',complete)
    const  submit =  async (ev) =>  {
      let {token} = await props.stripe.createToken({name: "Name"});

        await axios.post('/charge',{
          headers: {"Content-Type": "text/plain"},
          token: token.id,  
          amount: props.totalPrice,
        }
      ).then( res => {
        if(res.status === 200) {
          props.yourCart.map(p => {
            debugger
            p.isBought = true
            p.isIncart = false
        
            bearerAxios.put(`/api/product/bought/${p._id}`, p)
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
          <h1>payment successful, {props.totalPrice / 100} $ will be removed from your account</h1>

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
    margin: auto;
    left: 0;
    right: 0;
    width: 80%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-auto-flow: column;
    grid-gap: 5pt;
    margin-bottom: 10pt;
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
    .card {
      border: 1px solid black;

    }
  `;


export default injectStripe(withstoreCrud(CheckoutForm));