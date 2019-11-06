import React, {useState} from 'react';
import EditProductForm from './EditProductForm'
import {storage} from '../firebase/index'
import {bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'


const ProductEditPage = (props) => {
  const {deleteStuff, getUsersProducts, yourStuff: {title, description, price, imgUrl, _id}} = props
  const initState = {title, description, price, _id, imgUrl}
  const [toggle, setToggle] = useState(false)
  const [complete, setComplete] = useState(false)
  const [loading, setLoading] = useState(0)
  const [inputs, setInputs] = useState(initState)
  console.log(loading)
  // console.log('props in product edit page', props)

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
      <EditProductForm  handleImageUpload={handleImageUpload} toggler={toggler} getUsersProducts={getUsersProducts}   title={title} description={description} imgUrl={imgUrl} price={price} _id={_id} /> 
      {complete && 'your image has been updated please wait a moment for the server to respond' }
      <button onClick={() => setToggle(prev => (!prev))}>hide form</button>
      </>
      :
      <>
      <h1>{title}</h1>
        <img src={imgUrl} width='100pt' height='100pt' />
        <p>{description}</p>
        <p>{price / 100}</p>
      <button onClick={() => deleteStuff(_id)}>Delete</button>
      <button onClick={() => setToggle(prev => (!prev))}>show form</button>
      </>
    }
    </>
  );
};

export default withstoreCrud(ProductEditPage);