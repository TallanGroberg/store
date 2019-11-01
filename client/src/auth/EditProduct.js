import React, {useState} from 'react';
import {withAuth,bearerAxios} from '../provider/AuthProvider'
const EditProduct = (props) => {
  console.log(props)
  const initState = { 
    title: '',
    description: '',
    price: '',
  }
    
    const [inputs, setInputs] = useState(initState)

    console.log('asdfadf',props.yourStuff)

    
    const handleChange = e => {
      const {name, value} = e.target
      setInputs(inputs => ({...inputs, [name]: value, }))
    }

    const handleEdits = (e) => {
      e.preventDefault()
      props.handleSubmit(inputs, props.yourStuff._id)
    }
 
  return (
    <form onSubmit={props.handleEdits}>
      <input placeholder="title" name='title' value={inputs.title} onChange={handleChange} />
      <input placeholder="description" name='description' value={inputs.description} onChange={handleChange} />
      <input placeholder="price" name='price' value={inputs.price} onChange={handleChange} />
      <button>submit</button>
    </form>
  );
};

export default EditProduct;