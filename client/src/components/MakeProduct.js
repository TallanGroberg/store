import React, {useState} from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import {withRouter} from 'react-router-dom'
const MakeProduct = (props) => {
  const initState = {title: '',description: '',price: '',}
    const [inputs, setInputs] = useState(initState)

  console.log('props in makeproduct',props)

  const handleSubmit = async e => {
    e.preventDefault()
    await makeProduct(inputs)
    props.history.push('/')
  }
  const handleChange = e => {
    const {name,value} = e.target
    setInputs(input => ({...input, [name]: value }))
  }


  const {makeProduct, } = props
  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
      placeholder='title'
      name='title'
      value={inputs.title}
      onChange={handleChange} />
      <input
      placeholder='description'
      name='description'
      value={inputs.description}
      onChange={handleChange} />
      <input
      type='number'
      placeholder='price'
      name='price'
      value={inputs.price}
      onChange={handleChange} />
      <button>submit</button>
    </form>
      
    </>
  );
};

export default withRouter(withstoreCrud(MakeProduct));