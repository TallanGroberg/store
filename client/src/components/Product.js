import React, {useEffect, useState,} from 'react';
import {Link} from 'react-router-dom'

import {bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud, } from '../provider/ProductProvider'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [file, setFile] = useState({})
  
  useEffect( () => {
    bearerAxios.get(`/api/product/id/${props.match.params._id}`)
    .then( res => {
      setProduct(res.data)
    })
  }, [])
  const {title, description, price } = product






  return (

    <div>
      <h1>{title}</h1>
        <p>{description}</p>
          <p>{price}</p>
          <button onClick={() => props.addToCart(product)}>add to cart</button>

    </div>
  );
};

export default withstoreCrud(Product);