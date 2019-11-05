import React, {useState} from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import {bearerAxios} from '../provider/AuthProvider'
import {withRouter} from 'react-router-dom'
import {storage} from '../firebase/index.js'
const MakeProduct = (props) => {
  const initState = {title: '',description: '',price: '',imgUrl: ''}
    const [inputs, setInputs] = useState(initState)
    const [image, setImage] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    

  console.log(inputs,)


  const handleSubmit = async e => {
    e.preventDefault()
    setImgUrl(inputs.imgUrl)
   
    await makeProduct(inputs)
    props.history.push('/')
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
        console.log(snapShot)
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
    <form onSubmit={handleSubmit}>
      <input
      placeholder='title'
      name='title'
      value={inputs.title}
      onChange={handleChange} />
      <input
      placeholder='description'
      name='description'
      value={inputs.description}
      onChange={handleChange} />
      <input
      type='number'
      placeholder='price'
      name='price'
      value={inputs.price}
      onChange={handleChange} />
      <br />
      {inputs.imgUrl === '' && 'remember to upload the image before you submit a product' }
      <button>submit</button>
    </form>
    <form>
      <input type="file"  
      id='file' 
      name="file"
      placeholder="file"
      onChange={handleImageChange}
      />
      <button onClick={handleImageUpload}>upload image</button>
      </form>
      {inputs.imgUrl !== '' && 'you sucessfully uploaded an image'}
     
    </>
  );
};

export default withRouter(withstoreCrud(MakeProduct));