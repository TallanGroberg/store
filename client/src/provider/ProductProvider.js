import React from 'react';
import {withAuth, bearerAxios} from './AuthProvider'
import {withRouter} from 'react-router-dom'


//set up all the data entry fields to save and create objects outside of this file
// this should only be the the plact to interact with the database. 


const { Provider, Consumer, } = React.createContext()

class ProductProvider extends React.Component {
  state = {
    products: [],
   
  }

  componentDidMount() {
    bearerAxios.get('/api/product')
    .then(res  => {
      const data = res.data.reverse()
      this.setState(prev => ({
        products: [...data]
    }))
  })
  .catch(err => console.log(err))
}

  makeProduct = (inputs) => {
    bearerAxios.post('/api/product', inputs)
    .then( res => console.log(res))
    .catch(err => console.log(err))
  }

  


  render() {
    const {products,title,description,price,} = this.state

    return (
      <Provider value={{
        products,
        makeProduct: this.makeProduct,
       
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