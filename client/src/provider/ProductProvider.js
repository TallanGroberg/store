import React from 'react';
import {withAuth} from './AuthProvider'

const { Provider, Consumer, } = React.createContext()

class Products extends React.Component {
  state = {
    products: [],
  }

  render() {
    return (
      <Provider value={{

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

export default withAuth(storeCrudeProvider);