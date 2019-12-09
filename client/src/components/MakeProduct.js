import React, {useState} from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import {bearerAxios} from '../provider/AuthProvider'
import {withRouter} from 'react-router-dom'
import {storage} from '../firebase/index.js'
const MakeProduct = (props) => {
  const initState = {title: '',description: '',price: '',imgUrl: ''}
    const [inputs, setInputs] = useState(initState)
    const [image, setImage] = useState('')
    const [imgUrl, setImgUrl] = useState('https://firebasestorage.googleapis.com/v0/b/the-stor-e.appspot.com/o/images%2Fdownload.png?alt=media&token=9a6c5aba-42a1-43a0-bd6d-f0462b6bdb84')
    
  const handleSubmit = async e => {
    e.preventDefault()
    if(inputs.price <= 50) {
      makeProduct(inputs)
    } else {
      await makeProduct(inputs)
      props.history.push('/')
    }
  }
  const handleChange = e => {
    const {name,value} = e.target
    setInputs(input => ({...inputs, [name]: value }))
  }

  const handleImageChange = (e) => {
      const image = e.target.files[0]
      setImage(input => (image))
  }

  const handleImageUpload = (e) => {
    e.preventDefault()
    if(image === undefined) {
      console.error("you didnt properly upload an image")
    } else {
      const uploadTask = storage.ref(`/images/${image.name}`).put(image)
      uploadTask.on('state_changed', 
      (snapShot) => {
        
      }, (err) => {
        console.log(err)
      }, () => {
        //completed function
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
          setInputs(inputs => ({...inputs, imgUrl: url}))
        })
      })
    }
  }

  const {makeProduct, } = props
  return (
    <>
      {props.productError !== '' ? <h1>{props.productError}</h1> : null}
      <form onSubmit={handleSubmit}>
        <p>Title</p>
        <input
        placeholder='title'
        name='title'
        value={inputs.title}
        onChange={handleChange} />
      <br />
      <p>Description</p>
        <textarea rows='4' cols='50'
        placeholder='description'
        name='description'
        value={inputs.description}
        onChange={handleChange} />
      <br />
      <p>Price</p>
        <input
        type='number'
        placeholder='price'
        name='price'
        value={inputs.price}
        onChange={handleChange} />
        <br />
        {inputs.imgUrl === '' && 'Remember to upload the image before you submit a product, if you are on mobile you may not be able to submit an image from your photo library.' }
        <br />
        <button>submit</button>
      </form>
      <br />
      <form>
        <input type="file"  
        id='file' 
        name="file"
        placeholder="file"
        onChange={handleImageChange}
        />
        <br />
        <button onClick={handleImageUpload}>upload image</button>
        </form>
        {inputs.imgUrl !== '' && 'you sucessfully uploaded an image'}
      
    </>
  );
};

export default withRouter(withstoreCrud(MakeProduct));