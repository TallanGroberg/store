import React, { Component } from 'react';
import axios from 'axios'
const { Provider, Consumer } = React.createContext()

export const bearerAxios = axios.create()
bearerAxios.interceptors.request.use((config) => {
  // const token = localStorage.getItem('token')
  config.headers.Athorization = `Bearer ${localStorage.getItem('token')}`
  return config
})




class AuthProvider extends Component {
 state = {
      name: '',
      email: '',
      password: '',
    }

    signup = (user) => {
      bearerAxios.post('user/signup', user)
      .then(res => {
        const {token, input} = res.data
        localStorage.setItem('token', token )
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({token, input})
      })
      .catch(err => console.log(err))
    }
    login = (user) => {
      bearerAxios.post('user/login', user)
      .then(res => {
        console.log('login in authprovider', res.data)
        const {token, input} = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({token, input})
      })
      .catch(err => console.log(err))
    }
  



  
  
  render() {
    return (
        <Provider 
          value={{
            name: this.state.name,
            email: this.state.email,
            signup: this.signup,
            login: this.login,
          }}>
            {this.props.children}
        </Provider>
   
    );
  }
}

export const withAuth = C => props => (
  <Consumer>
    {value => <C {...value} {...props} />}
    </Consumer>
)


export default AuthProvider;