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
      err: '',
      user: localStorage.getItem('user') || {},
      name: '',
      email: '',
      password: '',
      token: localStorage.getItem('token') || '',
    }

    signup = (user) => {
      bearerAxios.post('user/signup', user)
      .then(res => {
        const {token, input} = res.data
        delete user.password
        localStorage.setItem('token', token )
        localStorage.setItem('user', JSON.stringify(res.data))
        this.setState({token, input})
      })
      .catch(err =>  {
        console.log('err.message',err.message)
        this.setState({
          err: err.message
        })
      })
    }
    login = (user) => {
      bearerAxios.post('user/login', user)
      .then(res => {
        delete user.password
        const {token, input} = res.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(res.data))
        this.setState({token, input})
      })
      .catch(err => {
        this.setState({
          err: err.message
        })
      })
    }
    logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    deleteAccount = (_id) => {
      bearerAxios.delete(`user/${_id}`)
      .then( res => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      })
    }
    
    
    
    
    
    
    render() {
      const {err,user,name,email,signup,login,token,} = this.state
      console.log('err in state',this.state.err)
      return (
        <Provider 
        value={{
          err,
          user,
          name,
          email,
            signup,
            login,
            token,
            login: this.login,
            signup: this.signup,
            logout: this.logout,
            deleteAccount: this.deleteAccount,
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