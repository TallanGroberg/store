import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import {withAuth, bearerAxios} from '../provider/AuthProvider'
import ProductEditPage from '../auth/ProductEditPage'
import SoldItems from '../components/SoldItems'

// i want to show if someone bought a users product. 
const Profile = (props) => {
  const {getUsersProducts, yourStuff, user } = props
    const [toggle, setToggle] = useState(false)
    
    const {_id} = user

      useEffect( ()  => {
        getUsersProducts()
      }, props.products)

        const toggler = () => {
          setToggle(prev => (!prev))
        }
      // const soldProducts = props.products.filter

  return (
    <div>
      <Link to='/usersettings'>User Settings</Link>
      <br />
      <br />
        <Link to='/purchases'>your purchases</Link>
      <br />
      <br />
        <Link to='/solditems'>Items Sold</Link>
          <h1>your products to sell</h1>
          {yourStuff.map( stuff => {
            return stuff.isBought === false ?  <ProductEditPage mappedStuff={stuff} /> : null
         })}
       
        

    </div>
  );
};

export default withAuth(withstoreCrud(Profile));