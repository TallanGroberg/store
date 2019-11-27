import React, { useState, } from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import magnify from './images/Nav.jpeg'
const SearchForm = (props) => {
  const initInputs = { title: "" }
  const [inputs, setInputs] = useState(initInputs)

  const handleChange = e => {
    const {name, value} = e.target
    setInputs(inputs => ({...inputs, [name]: value}))
  }

  const handleSubmit = e => {
    e.preventDefault()

    
    props.handleProductSearch(Object.keys(inputs).join(''), inputs.title)

  }
  return (
    <form onSubmit={handleSubmit}>
      <img src={magnify} height='10pt'  />
      <input type="text" placeholder='search'
      name='title'
      value={inputs.title}
      onChange={handleChange} />
      <br />
      <button>search products for sell</button>
    </form>
  );
};

export default withstoreCrud(SearchForm);