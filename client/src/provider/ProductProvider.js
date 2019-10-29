import React from 'react';
import {withAuth, bearerAxios} from './AuthProvider'
import {withRouter} from 'react-router-dom'


const { Provider, Consumer, } = React.createContext()

class ProductProvider extends React.Component {
  state = {
    products: [],
  }
  componentDidMount() {
    bearerAxios.get('/api/product')
    .then(res  => {
      
      this.setState(prev => ({
        products: [ ...res.data]
      }))
    })
  }


  render() {
    const {products} = this.state

    return (
      <Provider value={{
        products
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

export default withAuth(ProductProvider);