import React, {useEffect, useState,} from 'react';
import {Link} from 'react-router-dom'

import {bearerAxios, withAuth} from '../provider/AuthProvider'
import {withstoreCrud } from '../provider/ProductProvider'

const Product = (props) => {
  const {user, handleCartAdd} = props
  
  const [product, setProduct] = useState({})
  const [toggle, setToggle] = useState(false)
  useEffect( () => {
    bearerAxios.get(`/api/product/id/${props.match.params._id}`)
    .then( res => {
      setProduct(res.data)
    })
  }, [])
  console.log(product.user, user._id)
  const {title, description, price, imgUrl, } = product

  const handleCart = () => {
    setToggle(prev => (!prev))
    handleCartAdd(props.match.params._id)
  }



  return (
    <div>
      <h1>{title}</h1>
          <img src={imgUrl} width="400" height='400' />
            <p>{description}</p>
            <p>{price / 100}</p>
            {toggle ? <>
            <p>this item has been added to your cart, would you like to continue shoppin or proceed to checkout?</p>
            <button onClick={props.history.push('/cart')}>see all the items in your cart</button>
            <button onClick={props.history.push('/')}>go back to shopping</button>
            </>
            :
              
              <>
              {props.user._id === product.user ? <p>this is your product</p>
              :
                <button onClick={handleCart}>Buy now</button>
              }
            </>
            }

    </div>
  );
};

export default withAuth(withstoreCrud(Product));