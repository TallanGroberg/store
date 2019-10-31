import React, {useEffect, useState,} from 'react';
import {Link} from 'react-router-dom'

import {bearerAxios, withAuth} from '../provider/AuthProvider'
import {withstoreCrud } from '../provider/ProductProvider'

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
  const {user, handleCart,} = props

  return (
    <div>
      <h1>{title}</h1>
        <p>{description}</p>
          <p>{price}</p>
          {/* <button onClick={() => handleCartAddInProduct(product)}>add to cart</button> */}

    </div>
  );
};

export default withAuth(withstoreCrud(Product));