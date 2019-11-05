import React from 'react';
import {withAuth, bearerAxios} from './AuthProvider'
import {withRouter} from 'react-router-dom'
import {storage} from '../firebase/index.js'

//set up all the data entry fields to save and create objects outside of this file
// this should only be the the plact to interact with the database. 


const { Provider, Consumer, } = React.createContext()

class ProductProvider extends React.Component {
  state = {
    products: [],
    cart: [],
    bought: [],
  }

  componentDidMount() {
    this.getAllBuyables()
}

getAllBuyables = () => {
  bearerAxios.get('/api/product/')
  .then(res  => {
 
    this.setState(prev => {
      const productNotInCart = res.data.filter(p => {
        return p.isIncart  === false
      })
        const productsNotBought = productNotInCart.filter(product => {
          return product.isBought  === false
        })
            return {products: productsNotBought}
    })
})
.catch(err => console.log(err.message))
}
//end of start chain



  makeProduct = (inputs) => {
    bearerAxios.post('/api/product', inputs)
    .then( res => {
      this.setState( prev => ({
        products: [...prev.products, inputs]
      }))
    })
    .catch(err => console.log(err))
  }

  deleteProduct = (_id) => {
    bearerAxios.delete(`/api/product/${_id}`)
    .then( res => {

      this.setState( prev => {
        const filterArray = prev.products.filter( thing => {
          return thing._id !== _id
        })
        return {products: filterArray}
      })
    })

  }

  //section for cart functionality

  handleCart = (p, _id) => {
    console.log(p,'in cart')
    bearerAxios.put(`/api/product/${_id}`, p)
    .then(res => {
      this.setState(prev => {
        const filterCart = prev.cart.filter(aProduct => {
          return aProduct._id !== _id
        })
        return {cart: filterCart}
      })
    })
      this.removeFromProductList(p)
    
  }






  //get everything that has the cart Boolean true

  getCart = () => {
    bearerAxios.get('/api/product/cart')
    .then( res => {
      this.setState(prev => ({
        cart: [...res.data]
      }))
    })
  }

  getAllBoughtProducts = () => {
    bearerAxios.get('/api/product/bought')
    .then(res  => {
      this.setState(prev => ({
        bought: [...res.data]
      }))
    })
  .catch(err => console.log(err.message))
  // console.log(this.state.bought)
  }



  removeFromProductList =  (p) => {
      this.setState(prev => {
        const productsForSale = prev.products.filter(aProduct => {
          return aProduct.isIncart !== p.isIncart
        })
        return {products: productsForSale}
      })
      this.getAllBuyables()
  }

  editProduct =  (inputs, _id) => {
    // console.log('inputs in edProduct',inputs, '_id in editproduct',_id)
    
    bearerAxios.put(`api/product/${_id}`, inputs)
    .then(res => {
      console.log('The response is here!!!', res.data)
      this.setState(prev => {
        const updatedProducts = prev.products.map(aProduct => aProduct._id === _id ? res.data : aProduct)
        // console.log(prev.products.forEach(prod => console.log(prod.imgUrl)), 99999, updatedProducts.forEach(prod => console.log(prod.imgUrl)))
        return { products: [...updatedProducts] }
      })
    })
    .catch(err => console.log(err))
    
  }


 

  


  


  render() {
    // console.log(this.state.products)
    const {products,cart, bought} = this.state

    return (
      <Provider value={{
        products,
        cart,
        bought,
        makeProduct: this.makeProduct,
        handleCart: this.handleCart,
        deleteProduct: this.deleteProduct,
        getCart: this.getCart,
        removeFromProductList: this.removeFromProductList,
        getAllBuyables: this.getAllBuyables,
        getAllBoughtProducts: this.getAllBoughtProducts,
        editProduct: this.editProduct,
      }}>
        {this.props.children}
      </Provider>
    )
  }
};

export const withstoreCrud = C => props => (
  <Consumer>
    {value => <C {...props} {...value} /> }
  </Consumer>
)

export default withRouter(withAuth(ProductProvider));