import React, { Component } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom'

const { Provider, Consumer } = React.createContext()

export const bearerAxios = axios.create()
bearerAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  
  config.headers.Authorization = `Bearer ${token}`
  return config
})

interface User{
  name: string;
  email: string;
}

interface InitialState{
  err: string;
  user: User;
  token: string;
}

class AuthProvider extends Component {
 state: InitialState = {
      err: '',
      isSigningUp: false,
      user: JSON.parse(localStorage.getItem('user')),
      name: '',
      email: '',
      password: '',
      token: localStorage.getItem('token') || '',
    }

    signup = async (user: User) => {
      await bearerAxios.post('/user/signup', user)
      .then(res => {
        const {token, input} = res.data
        delete user.password
        localStorage.setItem('token', token )
        this.setState({token, user: input})
        localStorage.setItem('user', JSON.stringify(res.data))
      })
      .catch(err =>  {
        console.log('err.message',err.message)
        this.setState({
          err: err.message
        })
      })
      
      this.props.history.push('/')
    }

    login = async (user: User) => {
      await axios.post('/user/login', user)
      .then(res => {
        // delete user.password;

        const {token, user} = res.data;
          
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        this.setState({token, user})
        
      })
      .catch(err => {
        this.props.history.push('/login/signup')
        this.setState({
          err: err.message
        })
      })
      this.props.history.push('/')
    }

    logout = () => {
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.setState({
        token: '',
        user: {},
      })
    }

    deleteAccount = (_id: String) => {
      bearerAxios.delete(`user/${_id}`)
      .then( res => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      })
    }

    toggleSignUp = () => {
      this.setState(prev => ({
        isSigningUp: !prev.isSigningUp,
      }))
    }
    editUser = (user: User, _id: String) => {
      bearerAxios.put(`/user/${_id}`, user)
      .then(res => {
        delete user.password
        this.setState({
          user: user,
        })
      })

    }
    
    
    
    
    
    
    render() {
      const {err,isSigningUp,user,name,email,signup,login,token,} = this.state
      return (
        <Provider 
        value={{
          //state
          err,
          isSigningUp,
          user,
          name,
          email,
          signup,
          login,
          token,
            //props from router
            
            //in component functions
              login: this.login,
              signup: this.signup,
              logout: this.logout,
              deleteAccount: this.deleteAccount,
              toggleSignUp: this.toggleSignUp,
              editUser: this.editUser,
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


export default withRouter(AuthProvider);