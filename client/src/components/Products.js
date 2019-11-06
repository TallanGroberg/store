import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'
import {withAuth} from '../provider/AuthProvider'
import {Link, Switch, Route} from 'react-router-dom'
import {withstoreCrud} from '../provider/ProductProvider'
import Product from './Product'

const Products = (props) => {

  const {products, getAllBuyables, deleteProduct, handleCartAdd, user } = props

console.log(props)
  useEffect( () => {
    getAllBuyables()
  }, [])

  const handleAdd = (p) => {

    p.buyer = user._id
    handleCartAdd(p._id, p.buyer)
    console.log(p.buyer, user._id)
  }
 



  return (

<div>
        
      {products.length <= 0 ? 
      <p>loading, if it takes a while try refreshing the page</p>  
      :
    <>
            <ProductPageStyle>
      {products.map( p =>  {
        return ( <>
              <div>
          <Link to={'/products/' + p._id}>
            <h1>
              {p.title}
            </h1>
              <p>
                {p.description}
              </p>
                <p>
                  {p.price / 100}
                </p>
                <img src={p.imgUrl} width='200' height="200" alt="a product" />
          </Link>
          <br />
        {user._id === p.user ? 
            <>
              <p>this is your product. </p> 
                <button onClick={() => deleteProduct(p._id)}>delete your product</button>
            </>
              : 
              <button onClick={() => handleAdd(p)}>add to cart</button>}
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