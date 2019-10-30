import React from 'react';
import {withAuth, bearerAxios} from './AuthProvider'
import {withRouter} from 'react-router-dom'


//set up all the data entry fields to save and create objects outside of this file
// this should only be the the plact to interact with the database. 


const { Provider, Consumer, } = React.createContext()

class ProductProvider extends React.Component {
  state = {
    products: [],
    cart: [],
   
  }

  componentDidMount() {
    this.getAllProducts()
}

  getAllProducts = () => {
    bearerAxios.get('/api/product')
    .then(res  => {
      
      this.setState(prev => ({
        products: [...res.data]
    }))
  })
  .catch(err => console.log(err))
  }

  makeProduct = (inputs) => {
    bearerAxios.post('/api/product', inputs)
    .then( res => {
      this.setState( prev => ({
        products: [...prev.products, inputs]
      }))
    })
    .catch(err => console.log(err))
  }

  deleteProduct = async (_id) => {
    await bearerAxios.delete(`/api/product/${_id}`)
    .then( res => {

      this.setState( prev => {
        const filterArray = prev.products.filter( thing => {
          return thing._id !== _id
        })
        return {products: filterArray}
      })
    })
    this.getAllProducts()
  }

  //section for cart functionality

  addToCart = async product => {
    console.log('product in add to Cart, product provider', product)
    await this.state.cart.push(product)
    alert(`you added ${product.title} to your cart` )
  }

  


  render() {
    const {products,cart,} = this.state

    return (
      <Provider value={{
        products,
        cart,
        makeProduct: this.makeProduct,
        addToCart: this.addToCart,
        deleteProduct: this.deleteProduct,
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