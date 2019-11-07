import React, {useEffect, useState} from 'react';
import {Link, withRouter} from 'react-router-dom'
import styled from 'styled-components'
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



  
  return (
    <nav>
      
      {props.token ? 
      // <NavStyle className={window.innerWidth < 1000 ? 'footer' : null}>
      <NavStyle>

        <Link to='/products'>products</Link>
          <button onClick={() => props.history.push('/makeproduct')}>make a product</button>
          <button onClick={() => props.history.push('/cart')}>Cart</button>
          <button onClick={() => props.history.push('/yourprofile')}> your profile</button>
          <button onClick={() => props.history.push('/purchases')}> your purchases</button>
          <button onClick={handleLogout}>logout</button>
      </NavStyle>
        :
        <p>welcome</p>
    }
    </nav>
  );
};

const NavStyle = styled.nav`
    z-index: 2;
    position: fixed;
    @media only screen and (max-width: 1000px) {
      bottom: -2px;
      

    }
    @media only screen and (min-width: 1000px) {
      top: -2px;
      
    }

  

 font-family: Verdana, Geneva, sans-serif; 
    text-align:center;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    background: white;
    width: 101%;
    height: 30pt;
    
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
  
  h1 {
    font-size: 22pt;
    box-shadow: -1px 18px 10px -22px rgba(0,0,0,0.75);
  }
  h2 {
    font-size: 20pt;
  }
  h3 {
    font-size: 17pt;
  }
  h4 {
    font-size: 14pt;
  }
  p {
    font-size: 12pt;
  }
  a {
    text-decoration: none;

    color: #171717;
    transition: 0.3s;
  }
  a:hover {
    color: #696969;
    /* box-shadow: -1px 18px 10px -22px rgba(0,0,0,0.75); */
  }
  input:focus,
    select:focus,
      textarea:focus,
        button:focus {
          outline: none;
        }
  button {
  
  font-size: 12pt;
  padding: 3pt;
  margin: 0.5pt;
  border: none;
  background: none;
  transition: 0.3s;
    color: #696969;
  }
  button:hover {
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
    background-color: #FCFCFC;
    color: black;
  }
`

export default withRouter(withAuth(withstoreCrud(Nav)));