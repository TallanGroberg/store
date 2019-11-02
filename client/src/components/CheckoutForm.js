import React, {useState,} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';

import axios from 'axios'
import {bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'


const CheckoutForm = (props) =>  {
  const [complete, setComplete] = useState(false)

  
    const  submit =  async (ev) =>  {
      let {token} = await props.stripe.createToken({name: "Name"});

        await axios.post('/charge',{
          headers: {"Content-Type": "text/plain"},
          token: token.id,  
          amount: props.totalPrice,
          
        }
      ).then( res => {
        if(res.status === 200) {
          props.cart.map(p => {
            p.isBought = true
            p.isInCart = false
            bearerAxios.put(`/api/product/bought/${p._id}`, p)
          })
         
          return setComplete(!complete)
        }
      })
      .catch(err => console.log(err.message))
    }
  
    return (
      <>
        {complete ? 
          <h1>payment successful, {props.totalPrice / 100} will be removed from your account</h1>

          :
        <>
          <p>Would you like to complete the purchase?</p>
            <xmp>this is for test purposes only please enter 4242 4242 4242 4242 4242 or  to test the system </xmp>
            <CardElement />
              <button onClick={submit}>Purchase</button>
        </>
        }
    </>
    );
  }


export default injectStripe(withstoreCrud(CheckoutForm));