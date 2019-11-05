import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
import {withstoreCrud} from '../provider/ProductProvider'

const Nav = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  
  useEffect( () => {
    if(typeof(props.user) !== 'object') {
      setIsLoggedIn(prev => (!prev))
    } 
  }, [])



  const handleLogout = () => {
    props.logout()
    props.history.push('/login')
    if(isLoggedIn){
      setIsLoggedIn(prev => (!prev))
    }
  }

  console.log('props in nav',props.cart)

  
  return (
    <nav>
      
      {props.token ? 
      <>
          
        <Link to='/products'>products</Link>
          <button onClick={handleLogout}>logout</button>
          <button onClick={() => props.history.push('/makeproduct')}>make a product</button>
          <button onClick={() => props.history.push('/cart')}>Cart</button>
          <button onClick={() => props.history.push('/yourprofile')}> your profile</button>
          <button onClick={() => props.history.push('/purchases')}> your purchases</button>
      </>
        :
        <p>welcome</p>
    }
    </nav>
  );
};

export default withRouter(withAuth(withstoreCrud(Nav)));