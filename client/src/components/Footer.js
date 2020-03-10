import React from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'


const Footer = () => {
  return (
  
    
      <Link className='footer' to='/contact'>contact</Link>
    
  
  );
};

const FooterStyle = styled.div`
  margin-bottom: 100px;
  position: relative;
  bottom: 0;
`;

export default Footer;