import React, {useState} from 'react';
import EditProductForm from './EditProductForm'

const ProductEditPage = (props) => {
  const [toggle, setToggle] = useState(false)
  console.log('props in product edit page', props)

  const toggler = () => {
    setToggle(prev => (!prev))
  }

  const {deleteStuff, getUsersProducts, yourStuff: {title, description, price, _id}} = props
  console.log('description', description)
  return (
    <>
      {toggle ? 
      <>
      <EditProductForm toggler={toggler} getUsersProducts={getUsersProducts}  title={title} description={description} price={price} _id={_id} /> 
      <button onClick={() => setToggle(prev => (!prev))}>hide form</button>
      </>
      :
      <>
      <h1>{title}</h1>
        <p>{description}</p>
        <p>{price}</p>
      <button onClick={() => deleteStuff(_id)}>Delete</button>
      <button onClick={() => setToggle(prev => (!prev))}>show form</button>
      </>
    }
    </>
  );
};

export default ProductEditPage;