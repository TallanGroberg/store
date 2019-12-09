import React from 'react';
import {withAuth, bearerAxios} from './AuthProvider'
import {withRouter} from 'react-router-dom'
import axios from 'axios'


const { Provider, Consumer, } = React.createContext()



class ProductProvider extends React.Component {
  state = {
    products: [],
    cart: [],
    bought: [],
    yourStuff: [],
    productError: ''
  }
  
  componentDidMount() {
    this.getAllBuyables()
  }
  
  
  getAllBuyables = () => {
    axios.get('/products')
    .then(res  => {

   
      this.setState(prev => {
             const filterProducts = res.data.filter(product => {
              return product.isIncart === false
            })
            return {products: [ ...filterProducts]}
          })
        })
        .catch(err => console.log(err.message))
  }

  getCart = () => {
    bearerAxios.get('/api/product/cart')
    .then( res => {
      this.setState(prev => {
        return {cart: [...res.data]}
      })
    })
    
  }
  

  getUsersProducts = () => {
    bearerAxios.get(`/api/product/user/${this.props.user._id}`)
    .then( res => {
      this.setState({
        yourStuff: [...res.data],
      })
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
  }

  
  makeProduct = (inputs) => {
    if(inputs.price <= 50) {
      this.setState({
        productError: 'you have to make the product more than 50 cents'
      })
    } else {
      bearerAxios.post('/api/product', inputs)
      .then( res => {
        this.setState( prev => ({
          products: [...prev.products, inputs]
        }))
      })
      .catch(err => console.log(err))
    }
  }


  deleteProduct = (_id) => {
    bearerAxios.delete(`/api/product/${_id}`)
    .then( res => {
      this.setState( prev => {
        const filterProductsArray = prev.products.filter( thing => {
          return thing._id !== _id
        })
          const filterUsersArray = prev.yourStuff.filter(stuff => {
            return stuff._id !== _id
          })
            return {products: filterProductsArray, yourStuff: filterUsersArray,}
      })
    })
  } 

  editProduct =  (inputs, _id) => {
    bearerAxios.put(`api/product/${_id}`, inputs)
    .then(res => {
      this.setState(prev => {
        const updatedProducts = prev.products.map(aProduct => aProduct._id === _id ? res.data : aProduct)
        return { products: [...updatedProducts] }
      })
    })
    .catch(err => console.log(err))
  }
  
  handleProductAdd = (_id, buyer) => {
    bearerAxios.put(`/api/product/${_id}`, {isIncart: false, buyer})
    .then(res => {
      this.setState(prev => {
        const filterCart = prev.cart.filter(prod => {
          return prod._id !== _id  
        })
        return {cart: [...filterCart]}
      })
    })
    .catch(err => console.log(err))
  }
  

  handleCartAdd = ( _id, buyer) => {
    bearerAxios.put(`/api/product/${_id}`, {isIncart: true, buyer})
    .then(res => {
      debugger
      this.setState(prev => {
        const filterProduct = prev.products.filter(prod => {
          return prod._id !== _id  
        })
        return {products: [...filterProduct]}
      })
      
    })
    .catch(err => console.log(err))
  }
  
  handleProductSearch = (name ,value) => {
    bearerAxios.get( `/products/search?${name}=${value}`)
    .then(res => {
      this.setState(prev => {
        const filterProductsInCart = res.data.filter(product => product.isIncart === false)
        const filterProductsBought = filterProductsInCart.filter(product => product.isBought === false)
        // const filterYourProducts = filterProductsBought.filter(product => product.user !== this.props.user._id)
        return {products: [ ...filterProductsBought]}
      })
    })
    .catch(err => console.log(err))
  }


  


  render() {
    const {productError, products,cart, bought, yourStuff} = this.state

    return (
      <Provider value={{
        products,
        cart,
        bought,
        yourStuff,
        productError,
        getUsersProducts: this.getUsersProducts,
        makeProduct: this.makeProduct,
        handleCartAdd: this.handleCartAdd,
        handleProductAdd: this.handleProductAdd,
        deleteProduct: this.deleteProduct,
        getCart: this.getCart,
        getAllBuyables: this.getAllBuyables,
        getAllBoughtProducts: this.getAllBoughtProducts,
        editProduct: this.editProduct,
        handleProductSearch: this.handleProductSearch,
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