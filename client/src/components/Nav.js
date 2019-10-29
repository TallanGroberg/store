import React, {useEffect, useState} from 'react';
import {withAuth} from '../provider/AuthProvider'
const Nav = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  console.log(isLoggedIn)
  useEffect( () => {
    if(typeof(props.user) !== 'object') {
      setUser(JSON.parse(props.user).user)
      setIsLoggedIn(prev => (!prev))
    } 
  }, [])
  
  return (
    <nav>
   
      <button onClick={() => props.logout(user._id)}>logout</button>
    </nav>
  );
};

export default withAuth(Nav);