import React, { useState, } from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import magnify from './images/Nav.jpeg'
import styled from 'styled-components'

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
    <SearchFormStyle>
    <form onSubmit={handleSubmit}>
      <img src={magnify} height='10pt'  />
        <input type="text" placeholder='search'
        name='title'
        value={inputs.title}
        onChange={handleChange} />
      <br />
          <button>products for sell</button>
    </form>
      </SearchFormStyle>
  );
};

const SearchFormStyle = styled.div`
  text-align: right;
`;

export default withstoreCrud(SearchForm);