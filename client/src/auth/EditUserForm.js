import React, {useState,} from 'react';
import {withAuth, bearerAxios} from '../provider/AuthProvider'

const EditUserForm = (props) => {
  const {name, email, _id } = props.user
    const [inputs, setInputs] = useState({name: name, email: email, password: ''})
  
    const handleSubmit = (e) => {
    e.preventDefault()
      props.editUser(inputs, props.user._id )
    }

  const handleChange = (e) => {
    const {name,value} = e.target
      setInputs(input => ({...inputs, [name]: value}))
  }

  return (
    <>
      <h1>{name}</h1>
        <h4>{email}</h4>
          <p>you can update your password</p>
            <form onSubmit={handleSubmit}>
              <input 
                placeholder='name'
                name='name'
                value={inputs.name}
                onChange={handleChange} />
              <input 
                placeholder='email'
                name='email'
                value={inputs.email}
                onChange={handleChange} />
              <input 
                placeholder='password'
                type="password"
                name='password'
                value={inputs.password}
                onChange={handleChange} />
                  <button>submit</button>
            </form>
    </>
  );
};

export default withAuth(EditUserForm);