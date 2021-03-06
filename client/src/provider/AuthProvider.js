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





class AuthProvider extends Component {
 state = {
      err: '',
      isSigningUp: false,
      user: JSON.parse(localStorage.getItem('user')),
      name: '',
      email: '',
      password: '',
      imgUrl: '',
      token: localStorage.getItem('token') || '',
    }

    signup = async (user) => {
      await axios.post('/user/signup', user)
      .then(res => {
        const {token, user} = res.data
        delete user.password
        localStorage.setItem('token', token )
        this.setState({token, user})
        localStorage.setItem('user', JSON.stringify(res.data))

      })
      .catch(err =>  {
        console.log('err.message',err.message)
        this.setState({
          err: err.message
        })
      })
        if(this.state.token !== '') {
          this.props.history.push('/')
        } else {
          alert('login unsuccessful')
        }
    }

    login = (user) => {
      axios.post('/user/login', user)
      .then(res => {
        const {token, user, } = res.data;
        localStorage.setItem('token', token)
        this.setState({token, user})
        localStorage.setItem('user', JSON.stringify(res.data.user))
        this.props.history.push('/')
      })
      .catch(err => {
        this.props.history.push('/login')
        this.setState({
          err: err.message
        })
      })
      
    }

    logout = () => {
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.setState({
        token: '',
        user: {},
      })
    }

    deleteAccount = (_id) => {
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
    editUser = async (user, _id) => {
      
      
      bearerAxios.put(`/user/${_id}`, user)
      .then(res => {
        debugger
        delete user.password
        localStorage.setItem('user', JSON.stringify(user))
        this.setState(prev => ({
          user: user,
        }))
      })
    }
    
    
    
    
    
    
    render() {
      const {err,isSigningUp,user,name,email,imgUrl, signup,login,token,} = this.state
      return (
        <Provider 
        value={{
          //state
          err,
          isSigningUp,
          user,
          name,
          email,
          imgUrl,
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