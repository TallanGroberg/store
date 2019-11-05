import React, {useState, useEffect} from 'react';
import {withAuth,bearerAxios} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'


const Purchases = (props) => {


  useEffect( () => {
    props.getAllBoughtProducts()
  }, [])
   
  return (
    <div>
      {props.bought.map( p => {
        return <>
                <h1>{p.title}</h1>
                  <p>{p.description}</p>
                  <p>{p.price}</p>
                    <img src={p.imgUrl} alt='no image' />
                      <p>Product id: {p._id}</p>
              </>
      })}
    </div>
  );
};

export default withAuth(withstoreCrud(Purchases));