import React, {useState} from 'react';
import {withAuth} from '../provider/AuthProvider'
const AuthForm = (props) => {
  const initState = {
    name: '',
    pasword: '',}
  const [inputs, setInputs] = useState(initState)
  

  const toggler = () => {
    props.toggleSignUp()
    props.history.push('/login/signup')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.isSigningUp ?  props.signup(inputs) : props.login(inputs) 
    
  }
  const handleChange = (e) => {
    const {name, value} = e.target
      setInputs(input => ({...inputs, [name]: value}))    
  } 

  return (
    <div>
        <h1>{props.isSigningUp ? 'signup' : 'login'}</h1>
       <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          name='name'
          value={inputs.name}
          onChange={handleChange}
        />
        {props.isSigningUp ? 
        <input
        placeholder="email"
        name='email'
        value={inputs.email}
        onChange={handleChange}
        />
        : 
        null
      }
        <input
          placeholder="password"
          name='password'
          value={inputs.password}
          onChange={handleChange}
        />
  <button>submit</button>
      </form>
      <button onClick={toggler}>{props.isSigningUp ? 'go to login': 'go to signup' }</button>
    </div>
  );
};

export default withAuth(AuthForm);