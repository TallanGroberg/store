import React, {useState, useEffect} from 'react';
import {Link } from 'react-router-dom'
import {bearerAxios} from '../provider/AuthProvider'
import styled from 'styled-components'


const ProductLink = (props) => {
  const [usersPic, setUsersPic] = useState({_id: '', imgUrl: '' })
  const {product} = props
  const {_id, user, title, description, price, imgUrl} = product

  useEffect( () => {
    getUsersPic(user)
  }, [])

  console.log(props.product)

  const getUsersPic = (userIdOnProduct) => {
    
    bearerAxios.get(`/user/${userIdOnProduct}`)
    .then(res => {
      setUsersPic(prev => ({...prev, _id: res.data._id, imgUrl: res.data.imgUrl}))
    })
    .catch( err => {
      console.error(err)
    })
  }

  


  return (<Container>
    
    <Link to={'/products/' + _id}>
            {console.log("user",user, usersPic._id)}
            <h1>{title}</h1>
              <p>{description}</p>
                <p className='price' >{price / 100}</p>
                <div className="imageContainer">
            {user === usersPic._id && <img className='profile' src={usersPic.imgUrl} height="50" />}
                <img className='artwork' src={imgUrl}  alt="a product" />
                </div>
          </Link>

          </Container>
  );
};

const Container = styled.div`
 .artwork {
   height: 100px;
 }
  
`;



export default ProductLink;