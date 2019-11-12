import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import {withAuth,bearerAxios} from '../provider/AuthProvider'
import ProductEditPage from '../auth/ProductEditPage'


const Profile = (props) => {
  const {getUsersProducts, yourStuff, deleteProduct, user } = props
    const [toggle, setToggle] = useState(false)
    
    const {_id} = user

    
    

      useEffect( ()  => {
        getUsersProducts()
      }, props.products)


        const toggler = () => {
          setToggle(prev => (!prev))
        }

        
        

        

  return (
    <div>
      {/* <button onClick={() => props.history.push('/usersettings')}>user Settings</button> */}
      <Link to='/usersettings'>User Settings</Link>
      <h1>your products to sell</h1>
      {yourStuff.map( stuff => {
        return <ProductEditPage mappedStuff={stuff} />
      })}
    </div>
  );
};

export default withAuth(withstoreCrud(Profile));