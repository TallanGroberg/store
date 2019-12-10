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

  console.log(props)

  const emailReceipt = () => {
    const boughtStuff = props.yourCart.map((p,i) => ` ${i + 1}. Name: ${p.title}, 
    Price: ${p.price / 100} Item id. ${p._id}` )
    bearerAxios.post('/contact', {
      email: props.email, artHub: 'artHub12341234@gmail.com',
      subject: `purchase reciept`, 
      message: `${boughtStuff}` })
      .then(res => {
        console.log('hit the then')
        // emailSeller()
      })
      .catch(err => console.log(err.message))
      
  }
  // const emailSeller = () => {
  //   const boughtStuff = props.yourCart.map((p,i) => ` ${i + 1}. Name: ${p.title}, 
  //   Price: ${p.price / 100} Item id. ${p._id}` )
    
  //   props.yourCart.map( product => {
  //       bearerAxios.get(`/user/${product.user}`)
  //       .then( res => {
  //         debugger
  //         const email = res.data.email
  //         console.log('seller email', email, product, res)
  //         bearerAxios.post('/contact', {
  //         email: email, artHub: 'artHub12341234@gmail.com',
  //         subject: `someone bought ${product.title}`, 
  //         message: `congrats someone ${product.title} bought your thing` 
  //           })
  //         })
  //       .catch(err => console.log(err))
  //   })
  // }
  
    const  submit =  async (ev) =>  {
      let {token} = await props.stripe.createToken({name: "Name"});

        await axios.post('/charge',{
          headers: {"Content-Type": "text/plain"},
          token: token.id,  
          amount: props.totalPrice,
        }
        
      ).then(res => {
        if(res.status === 200) {
          emailReceipt()
          
          props.yourCart.map( async p  => {
            
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
      
        
        {complete ? 
          <>
            <h1>payment successful, {props.totalPrice / 100} will be removed from your account, to view your purchases click here.</h1>
              <button onClick={() => props.history.push('/purchases')}>go to your purchases page</button>
          </>

          :

            <>
              <p>Would you like to complete the purchase?</p>
                <CardInputStyle>
                  <p>this is for test purposes only please enter do not enter your creditcard information until the seller knows you are going to buy a product. </p>
                    <CardElement  />
                      <button id="checkout-button" onClick={submit}>Purchase</button>
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
    #checkout-button {
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
      

    }
  `;


export default injectStripe(withstoreCrud(CheckoutForm));