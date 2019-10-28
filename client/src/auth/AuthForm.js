import React, {useState} from 'react';
import {withAuth} from '../provider/AuthProvider'
const AuthForm = (props) => {
  const initState = {
    name: '',
    email: '',
    pasword: '',}
  const [inputs, setInputs] = useState(initState)
  const [signUp, setSignUp] = useState(false)

    console.log(inputs)
  const toggler = () => {
    setSignUp(prev => (!prev))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signUp ?  props.signup(inputs) : props.login(inputs) 
  }
  const handleChange = (e) => {
    const {name, value} = e.target
      setInputs(input => ({...inputs, [name]: value}))    
  } 

  return (
    <div>
        <h1>{signUp ? 'signup' : 'login'}</h1>
       <form onSubmit={handleSubmit}>
        <input
          placeholder="name"
          name='name'
          value={inputs.name}
          onChange={handleChange}
        />
        <input
          placeholder="email"
          name='email'
          value={inputs.email}
          onChange={handleChange}
        />
        <input
          placeholder="password"
          name='password'
          value={inputs.password}
          onChange={handleChange}
        />
  <button>submit</button>
      </form>
      <button onClick={toggler}>{signUp ? 'signup': 'login' }</button>
    </div>
  );
};

export default withAuth(AuthForm);