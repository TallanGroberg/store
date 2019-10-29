import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
const Nav = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  
  useEffect( () => {
    if(typeof(props.user) !== 'object') {
      setIsLoggedIn(prev => (!prev))
    } 
  }, [])



  const handleLogout = () => {
    props.logout()
    props.history.push('/login/signup')
    if(isLoggedIn){
      setIsLoggedIn(prev => (!prev))
    }

  }

  
  return (
    <nav>
      {props.token ? 
      <>
        <Link to='products'>products</Link>
          <button onClick={handleLogout}>logout</button>
      </>
        :
        <p>welcome</p>
    }
    </nav>
  );
};

export default withRouter(withAuth(Nav));