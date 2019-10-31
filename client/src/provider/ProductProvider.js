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
    this.getAllBuyables()
}

 

  getAllBuyables = () => {
    bearerAxios.get('/api/product')
    .then(res  => {
      console.log('get all buyables',res.data)
      this.setState(prev => {
        const productToSell = res.data.filter(p => {
          return p.isIncart  === false
        })
        return {products: productToSell}
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

  handleCart = (p, _id) => {
    console.log('product in add to Cart, product provider', p.isIncart)
    bearerAxios.put(`/api/product/${_id}`, p)
    if(!p.isIncart) {
      return this.getCart()
    } else {
      this.removeFromProductList(p)
    } 
  }

  //get everything that has the cart boolean true
  getCart = () => {
    bearerAxios.get('/api/product/cart')
    .then( res => {
      this.setState({
        cart: [...res.data]
      })
    })
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


  


  render() {
    const {products,cart,} = this.state

    return (
      <Provider value={{
        products,
        cart,
        makeProduct: this.makeProduct,
        handleCart: this.handleCart,
        deleteProduct: this.deleteProduct,
        getCart: this.getCart,
        removeFromProductList: this.removeFromProductList,
        getAllBuyables: this.getAllBuyables,
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