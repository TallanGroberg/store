import React, {useEffect, useState,} from 'react';
import {Link} from 'react-router-dom'
import {bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud, } from '../provider/ProductProvider'

const Product = (props) => {
  const [product, setProduct] = useState({})
  
  useEffect( () => {
    bearerAxios.get(`/api/product/id/${props.match.params._id}`)
    .then( res => {
      console.log(res.data)
      setProduct(res.data)
    })
  }, [])

console.log(typeof(product), product)
  const {title, description, price } = product




  return (

    <div>
      <h1>{title}</h1>
        <p>{description}</p>
          <p>{price}</p>
     
    </div>
  );
};

export default withstoreCrud(Product);