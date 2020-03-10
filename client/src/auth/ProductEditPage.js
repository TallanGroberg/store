import React, {useState} from 'react';
import EditProductForm from './EditProductForm'
import {storage} from '../firebase/index'
import {bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'
import Footer from '../components/Footer'
import styled from 'styled-components'
import {Link} from 'react-router-dom'


const ProductEditPage = (props) => {
  const {deleteProduct, getUsersProducts,} = props
    const {title ,description,imgUrl,price,_id} = props.mappedStuff
    const initState = {title, description, price, _id, imgUrl}
      const [toggle, setToggle] = useState(false)
      const [complete, setComplete] = useState(false)
      const [inputs, setInputs] = useState(initState)
  
  

  const toggler = () => {
    setToggle(prev => (!prev))
  }

  const handleImageUpload = (arg, _id) => {
    if(arg === undefined) {
      console.error("you didnt properly upload an image")
    } else {
      const uploadTask = storage.ref(`/images/${arg.name}`).put(arg)
      uploadTask.on('state_changed', 
      (snapShot) => {
        
      }, (err) => {
        console.log(err)
      }, () => {
        //completed function
        storage.ref('images').child(arg.name).getDownloadURL().then(url => {
          if(url) {
            setComplete(true)
          }
          props.editProduct({imgUrl: url}, _id)
          setInputs(prev => ({...prev, imgUrl: url}))
          props.getUsersProducts()
        })
        
      })
    }
  }
  return (
    <>
      {toggle ? 
      <>
        <EditProductForm title={title} description={description} price={price} imgUrl={imgUrl} _id={_id} 
         handleImageUpload={handleImageUpload}
          toggler={toggler}  /> 
          <br />
            {complete && 'your image has been updated please wait a moment for the server to respond' }
              <br />
                <button onClick={() => setToggle(prev => (!prev))}>hide form</button>
      </>
      :
      <>
        <h1>{title}</h1>
          <img src={imgUrl} width='100pt' height='100pt' />
            <p>{description}</p>
              <p>{price / 100}</p>
                <button onClick={() => deleteProduct(_id)}>Delete</button>
                  <button onClick={() => setToggle(prev => (!prev))}>show form</button>

      </>
      }
      <br />
      <Link className='footer' to='/contact'>contact</Link>
      
    </>
  );
};

const EditProductStyle = styled.div`
.footer {
    position: sticky;
   text-align: left;
   bottom: 75px;
   width: 100%;
  }
`;


export default withstoreCrud(ProductEditPage);