import React, {useEffect, useState,} from 'react';
import {Link} from 'react-router-dom'

import {bearerAxios, withAuth} from '../provider/AuthProvider'
import {withstoreCrud } from '../provider/ProductProvider'
import axios from 'axios'

const Product = (props) => {
  const {user, handleCartAdd, deleteProduct, editProduct, } = props
  const { push } = props.history

    const [product, setProduct] = useState({})
    const [toggle, setToggle] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

  useEffect( () => {
    axios.get(`/products/id/${props.match.params._id}`)
    .then( res => {
      setProduct(res.data)
    })
  }, [])
 
  const {title, description, price, imgUrl, _id } = product

  const handleCart = (product) => {
    setToggle(!toggle)
    product.buyer = user._id
    handleCartAdd(props.match.params._id, product.buyer)
  }

  const handleDelete = () => {
    deleteProduct(props.match.params._id)
    push('/products')
  }


  


  return (
    <div>
      <h1>{title}</h1>
          <img src={imgUrl} width="400" height='400' />
            <p>{description}</p>
            <p>$ {price / 100}</p>
            {toggle ? <>
            <p>this item has been added to your cart, would you like to continue shoppin or proceed to checkout?</p>
            <button onClick={() => push('/cart')}>see all the items in your cart</button>
            <button onClick={() => push('/')}>go back to shopping</button>
            </>
            :
              
              <>
              {props.token !== '' && product.user === user._id ? 
                <>
                  <p>this is your product</p>
                    <button onClick={handleDelete}> Delete Product</button>
                    <button onClick={() => push('/yourprofile')}>edit product</button>
                </>
              :
                <>
                  {props.token !== '' ? <button onClick={() => handleCart(product)}>Buy now</button> : <><button onClick={() => push('/')}>keep looking.</button> <button onClick={() => push('/signup')}>signup and buy.</button></>}
                </>
              }
            </>
            }

    </div>
  );
};

export default withAuth(withstoreCrud(Product));