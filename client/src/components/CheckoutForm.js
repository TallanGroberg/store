import React, {useState,} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'


const CheckoutForm = (props) =>  {
  const [complete, setComplete] = useState(false)
  
    const  submit =  async (ev) =>  {
      let {token} = await props.stripe.createToken({name: "Name"});

        await axios.post('/charge',{
          headers: {"Content-Type": "text/plain"},
          token: token.id,  
          amount: props.totalPrice
        }
      ).then( res => {
        if(res.status === 200) return setComplete(!complete)
      })
    }
  
    return (
      <>
      {complete ? 
      <h1>payment successful, {props.totalPrice / 100} will be removed from your account</h1>

        :
      <>
      <p>Would you like to complete the purchase?</p>
      <xmp>this is for test purposes only please enter 4242 4242 4242 4242 4242 to test the system </xmp>
      <CardElement />
      <button onClick={submit}>Purchase</button>
      </>
    }
    </>
    );
  }


export default injectStripe(CheckoutForm);