import React, {useState, useEffect} from 'react';

import {withstoreCrud} from '../provider/ProductProvider'
import {withAuth,bearerAxios} from '../provider/AuthProvider'
import ProductEditPage from '../auth/ProductEditPage'


const Profile = (props) => {
  const [toggle, setToggle] = useState(false)
  const [yourStuff, setYourStuff] = useState([])
  const [user, setUser] = useState(props.user)
  const [, forceUpdate] = useState();
  
  
  // console.log("props in profile.js",props)
    const {_id} = user

    const getUsersProducts = () => {
      bearerAxios.get(`/api/product/user/${user._id}`)
      .then( res => {
        setYourStuff(res.data)
      })
    }

    const initProducts = props.products
    
      useEffect( ()  => {
        getUsersProducts()
        
      }, props.products)


        const toggler = () => {
          setToggle(prev => (!prev))
        }

        const deleteStuff = async (_id) => {
          const filterArray = yourStuff.filter( thing => {
            return thing._id !== _id
            })
            await setYourStuff( prev => (filterArray))
              props.deleteProduct(_id)
        }
        

        

  return (
    <div>
      <button onClick={() => props.history.push('/usersettings')}>user Settings</button>
      <h1>your products to sell</h1>
      {yourStuff.map( stuff => {
        return <ProductEditPage getUsersProducts={getUsersProducts} deleteStuff={deleteStuff} yourStuff={stuff} />
      })}
    </div>
  );
};

export default withAuth(withstoreCrud(Profile));