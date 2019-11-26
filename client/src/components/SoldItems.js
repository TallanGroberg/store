import React, {useEffect,} from 'react';
import {withstoreCrud} from '../provider/ProductProvider'
import {withAuth} from '../provider/AuthProvider'

const SoldItems = (props) => {

  const {user, getAllBoughtProducts, bought} = props

  useEffect( () => {
    getAllBoughtProducts()
  }, [])

  const soldProducts = bought.filter( product => product.user === user._id)

  console.log('sold products in soldItems.js',soldProducts, )
  return (
    <>
      
      {soldProducts.length === 0 ? <h1>you haven't sold anything yet but it shouldn't be long</h1>
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