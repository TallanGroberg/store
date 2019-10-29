import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
const Nav = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect( () => {
    if(typeof(props.user) !== 'object') {
      setUser(JSON.parse(props.user).user)
      setIsLoggedIn(prev => (!prev))
    } 
  }, [])

  const handleLogout = () => {
    props.logout(user._id)
    props.history.push('/login')
    setUser(user => {})
    setIsLoggedIn(prev => (!prev))

  }
  
  return (
    <nav>
      <Link to='products'>products</Link>
   
      {props.token ? 
      <button onClick={handleLogout}>logout</button>
        :
        <p>welcome</p>
    }
    </nav>
  );
};

export default withRouter(withAuth(Nav));