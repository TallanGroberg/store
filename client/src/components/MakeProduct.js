import React, {useState} from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import {bearerAxios} from '../provider/AuthProvider'
import {withRouter} from 'react-router-dom'
const MakeProduct = (props) => {
  const initState = {title: '',description: '',price: '', image: ''}
    const [inputs, setInputs] = useState(initState)
    const [image, setImage] = useState({})

  console.log('image outside handleFile',image[0])

  const handleSubmit = async e => {
    e.preventDefault()
    await makeProduct(inputs)
    props.history.push('/')
  }
  const handleChange = e => {
    const {name,value} = e.target
    setInputs(input => ({...input, [name]: value }))
  }
  const handleUpload = (e) => {
    const file = e.target.files
    console.log(file[0])
    setImage(image => (file[0]))
    bearerAxios.post('api/images', file[0] )
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
      <input type="file"  
      id='file' 
      name="file"
      placeholder="file"
      value={inputs.image}
      onChange={handleUpload}
      />
      <button>submit</button>
    </form>
      
    </>
  );
};

export default withRouter(withstoreCrud(MakeProduct));