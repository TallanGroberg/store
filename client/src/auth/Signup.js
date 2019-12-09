import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
const Signup = (props) => {
  const initState = {
    name: '',
    email: '',
    password: '',}
  const [inputs, setInputs] = useState(initState)
    const [hide, setHide] = useState(true)
  const handleSubmit = (e) => {
    e.preventDefault()
    props.signup(inputs)  
    
  }
  console.log(hide)
  const handleChange = (e) => {
    const {name, value} = e.target
      setInputs(input => ({...inputs, [name]: value}))    
  } 

  return (
    <div>
        <h1>Signup</h1>
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
          type={hide && 'password'}
            placeholder="password"
            name='password'
            value={inputs.password}
            onChange={handleChange}
          />
    
  <button>submit</button>
      </form>
      <button onClick={()=> props.history.push('/login')}>go to Login</button>
      <button style={{marginLeft: '40px'}} onClick={() => setHide(prev => (!prev))}>{hide ? "show password" : 'hide password'}</button>
    </div>
  );
};

export default withRouter(withAuth(Signup));