import React, {useEffect,useState} from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import {withAuth, bearerAxios} from '../provider/AuthProvider'
import {Link} from 'react-router-dom'
import axios from 'axios';
const SoldItems = (props) => {
  const [buyerName, setBuyerName] = useState([])
  const {user, getAllBoughtProducts, bought} = props

  useEffect( () => {
    getAllBoughtProducts()
  }, [])

  const soldProducts = bought.filter( product => product.user === user._id)
  
  

  return (
    <>
      
      {soldProducts.length === 0 ? 

      <>
        <h1>you haven't sold anything yet but it shouldn't be long</h1>
        <Link to='/yourprofile'>back to profile</Link>
        <br />
        <Link to='/'>Continue Shopping</Link>
      </>

      :
        <>
          {soldProducts.map( product => {
            return <>
                    <h1>{product.title}</h1>
                      <p>{product.description}</p>
                        <img src={product.imgUrl} height="200pt" width="200pt" alt="an image" />
                          <p>receipt id: {product._id}</p>
                            
                    </>
          })}
        </>
      }
    </>
  );
};

export default withAuth(withstoreCrud(SoldItems));