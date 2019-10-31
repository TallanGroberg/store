import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import axios from 'axios'


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }
  
  

  //may need to change to bearerAxios.post
  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});

    await axios.post('/charge',
    {
        
        headers: {"Content-Type": "text/plain"},
        token: token.id,  
        amount: this.props.totalPrice
      }
    )
   
    // let response = await fetch("/charge", {
    //   method: "POST",
    //   headers: {"Content-Type": "text/plain"},
    //   body: token.id,  
    //   amount: this.props.totalPrice
    // });
  
    // if (response.ok) this.setState({complete: true});
  }

 

  render() {
    console.log('checkoutform', this.props)
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);