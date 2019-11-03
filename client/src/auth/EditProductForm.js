  import React,{useState} from 'react';

  import {withstoreCrud} from '../provider/ProductProvider'
  import {withAuth} from '../provider/AuthProvider'
  
  const EditProductForm = props => {
    const {title,description ,price, _id, editProduct, getUsersProducts, toggler} = props
      const initState = { title: title, description: description, price: price,}
        const [inputs, setInputs] = useState(initState)

        const handleSubmit = async (e) => {
          e.preventDefault()
         
            await editProduct(inputs, _id)
            await getUsersProducts()
            toggler()
          
        } 
        const handleChange = e => {
          const {name,value} = e.target
          setInputs( input => ({...inputs, [name]: value}))
        }
        console.log('inputs in editproductform', inputs)


    return (
      <>
        <form onSubmit={handleSubmit}>
          <p>title</p>
          <input placeholder="title"
            name='title' 
            value={inputs.title}
            onChange={handleChange} />
            <p>description</p>
          <input placeholder="description"
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
      </>
    );
  };
  
  
  
  export default withAuth(withstoreCrud(EditProductForm));