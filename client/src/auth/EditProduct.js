import React, {useState} from 'react';
import {withAuth,bearerAxios} from '../provider/AuthProvider'
const EditProduct = (props) => {
  console.log(props)
  const initState = { 
    title: '',
    description: '',
    price: '',
    imgUrl: '',
  }
    
    const [inputs, setInputs] = useState(initState)

    console.log('asdfadf',props.yourStuff)

    
    const handleChange = e => {
      const {name, value} = e.target
      setInputs(inputs => ({...inputs, [name]: value, }))
    }

    const handleEdits = (e) => {
      e.preventDefault()
      props.handleSubmit(inputs, props.yourStuff._id)
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
 
  return (
    <form onSubmit={props.handleEdits}>
      <input 
      placeholder="title" 
      name='title' 
      value={inputs.title} 
      onChange={handleChange} />
      <input 
      placeholder="description" 
      name='description' 
      value={inputs.description} 
      onChange={handleChange} />
      <input 
      placeholder="price" 
      name='price' 
      value={inputs.price} 
      onChange={handleChange} />
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
  );
};

export default EditProduct;