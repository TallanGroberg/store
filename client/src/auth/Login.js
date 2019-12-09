import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'


const AuthForm = (props) => {
  const initState = {
    name: '',
    email: '',
    password: '',}
  const [inputs, setInputs] = useState(initState)
  const [hide, setHide] = useState(true)
  const handleSubmit = (e) => {
    e.preventDefault()
    props.login(inputs) 
    
  }
  const handleChange = (e) => {
    const {name, value} = e.target
      setInputs(input => ({...inputs, [name]: value}))    
  } 

  return (
    <div>
        <h1>Welcome to Art hub. </h1>
          <h4>The website to connect artist and see there best pieces. </h4>
            <h4>this is a place where you can buy art, sell art or just browse and see something amazing</h4>
        <form onSubmit={handleSubmit}>
          <input
         
          placeholder="name"
          name='name'
          value={inputs.name}
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
      <button onClick={()=> props.history.push('/signup')}>go to signup</button>
      <button onClick={()=> setHide(prev => (!prev))}>{hide ? 'show password' : 'hide password'}</button>
    </div>
  );
};

export default withRouter(withAuth(AuthForm));