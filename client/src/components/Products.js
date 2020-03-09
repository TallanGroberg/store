import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'

import {withAuth, bearerAxios} from '../provider/AuthProvider'
import {Link, Switch, Route} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'
import ProductLink from './ProductLink'
import EditProductForm from '../auth/EditProductForm'
import magnify from './images/Nav.jpeg'
import SearchForm from './SearchForm';

const Products = (props) => {
  const [toggle, setToggle] = useState(false)
  const [usersPic, setUsersPic] = useState({_id: '', imgUrl: '' })
  const {products, getAllBuyables, deleteProduct, editProduct, handleCartAdd, user } = props


  useEffect( () => {
    getAllBuyables()
  }, [])

  const handleAdd = (p) => {
    p.buyer = user._id
    handleCartAdd(p._id, p.buyer)
  }

 

  return (

<div>

<br />
        <SearchForm />
      {products.length <= 0 ? 
      <p>loading, if it takes a while try refreshing the page</p>  
      :
    <>
      
            <ProductPageStyle>


  
  {products.map( p =>  {
    return ( <>
        
      <div style={{margin: 5}}>
          <ProductLink product={p} />
  <br />
        {props.token !== '' && p.user === user._id  ? 
            <>
                <p>this is your product. </p> 
                  <button onClick={() => deleteProduct(p._id)}>delete your product</button>
                    
            </>
              : 
              <>
              {props.token !== '' ? <button onClick={() => handleAdd(p)}>add to cart</button> : null}
              </>
              }
      </div>
                </>)
        }
        )}
        </ProductPageStyle>
        </>
      }

      <Switch>
        <Route expact path='/products/:_id' render={ (rProps) => <Product {...rProps} handleCartAdd={handleCartAdd}  />} />
      </Switch>
    
    
</div>
  );
};

const ProductPageStyle = styled.div`
  
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200pt, 1fr));
  grid-auto-flow: row;
  grid-gap: 5pt;
  margin-bottom: 10pt;
  
`

export default withRouter(withAuth(withstoreCrud(Products)));