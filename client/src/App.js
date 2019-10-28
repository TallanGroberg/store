import React, {useState} from 'react';
import AuthForm from './auth/AuthForm'
import { withAuth } from './provider/AuthProvider.js'

console.log(withAuth)


const App = props => {
  const [inputs, setInputs] = useState({})
  console.log(inputs)

  const handleSubmit = (e) => {
    e.preventDefault()
    props.signup(inputs)
  }
  const handleChange = (e) => {
    const {name, value} = e.target
      setInputs(input => ({...inputs, [name]: value}))    
  } 

  console.log(props)
  return (
    <div>
     <AuthForm />
    
    </div>
  );
};

export default withAuth(App)
