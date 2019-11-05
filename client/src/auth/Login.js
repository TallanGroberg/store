import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
const AuthForm = (props) => {
  const initState = {
    name: '',
    email: '',
    password: '',}
  const [inputs, setInputs] = useState(initState)

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
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
          placeholder="name"
          name='name'
          value={inputs.name}
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
      <button onClick={()=> props.history.push('/signup')}>go to signup</button>
    </div>
  );
};

export default withRouter(withAuth(AuthForm));