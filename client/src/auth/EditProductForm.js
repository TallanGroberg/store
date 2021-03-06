  import React,{useState} from 'react';
  import {storage} from '../firebase/index'
  import {withstoreCrud} from '../provider/ProductProvider'
  import {withAuth} from '../provider/AuthProvider'
  
  const EditProductForm = props => {
    const { handleImageUpload, editProduct, toggler, getUsersProducts, title, description, price, imgUrl, _id} = props

    
      const initState = { title, description, price, imgUrl }
        const [inputs, setInputs] = useState(initState)
        const [image,setImage] = useState('')
      

        const handleSubmit = async (e) => {
          e.preventDefault()
            await editProduct(inputs, _id)
            await toggler()
            getUsersProducts()
            handleImageUpload(image, _id)
        } 

        const handleChange = e => {
          const {name,value} = e.target
          setInputs( input => ({...inputs, [name]: value}))
        }

        const handleImage = (e) => {
          e.preventDefault()
          handleImageUpload(image, _id)
         
        }

        const handleImageChange = (e) => {
          const image = e.target.files[0]
          setImage(input => (image))
      }


        


    return (
      <>
        <form onSubmit={handleSubmit}>
          <p>title</p>
          <input placeholder="title"
            name='title' 
            value={inputs.title}
            onChange={handleChange} />
            <p>description</p>
          <textarea rows='4' cols='50'
           placeholder="description"
            name='description' 
            value={inputs.description}
            onChange={handleChange} />
            <p>price</p>
          <input type='number'
           placeholder="price"
            name='price' 
            value={inputs.price}
            onChange={handleChange} />
            <button>submit</button>
        </form>
          <br />
        <input type="file"  
          id='file' 
          name="file"
          placeholder="file"
          onChange={handleImageChange}
        />
        <br />
          <button onClick={handleImage}>change image</button>
        <br />
        <img src={imgUrl} width="100" height='100' alt='no image' />
      </>
    );
  };
  
  
  
  export default withAuth(withstoreCrud(EditProductForm));