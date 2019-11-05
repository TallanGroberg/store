import React from 'react';
import {withAuth, bearerAxios} from './AuthProvider'
import {withRouter} from 'react-router-dom'



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
    console.log(this.state.cart)
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

  //this function is sound
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

  editProduct =  (inputs, _id) => {
    bearerAxios.put(`api/product/${_id}`, inputs)
    .then(res => {
      console.log('The response is here!!!', res.data)
      this.setState(prev => {
        const updatedProducts = prev.products.map(aProduct => aProduct._id === _id ? res.data : aProduct)
        return { products: [...updatedProducts] }
      })
    })
    .catch(err => console.log(err))
  }
  
  handleProductAdd = (_id) => {
    bearerAxios.put(`/api/product/${_id}`, {isIncart: false})
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
  

  handleCartAdd = ( _id) => {
    bearerAxios.put(`/api/product/${_id}`, {isIncart: true})
    .then(res => {
      this.setState(prev => {
        const filterProduct = prev.products.filter(prod => {
          return prod._id !== _id  
        })

        return {products: [...filterProduct]}
      })
      
    })
    .catch(err => console.log(err))

  }
  


  


  render() {
    const {products,cart, bought} = this.state

    return (
      <Provider value={{
        products,
        cart,
        bought,
        makeProduct: this.makeProduct,
        handleCartAdd: this.handleCartAdd,
        handleProductAdd: this.handleProductAdd,
        deleteProduct: this.deleteProduct,
        getCart: this.getCart,
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