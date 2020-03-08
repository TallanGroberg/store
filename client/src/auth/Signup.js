import React, {useState} from 'react';
import {withRouter} from 'react-router-dom'
import {withAuth} from '../provider/AuthProvider'
import {storage} from '../firebase/index.js'

const Signup = (props) => {
  const initState = {
    name: '',
    email: '',
    password: '',
    imgUrl: '',
  }
  const [inputs, setInputs] = useState(initState)
  const [hide, setHide] = useState(true)
  const [image, setImage] = useState('')
  const [imgUrl, setImgUrl] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.signup(inputs)  
  }
  console.log(hide)
  const handleChange = (e) => {
    const {name, value} = e.target
      setInputs(input => ({...inputs, [name]: value}))    
  } 

  const handleImageChange = (e) => {
    const image = e.target.files[0]
    setImage(input => (image))
}

const handleImageUpload = (e) => {
  e.preventDefault()
  if(image === undefined) {
    console.error("you didnt properly upload an image")
  } else {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    uploadTask.on('state_changed', 
    (snapShot) => {
      
    }, (err) => {
      console.log(err)
    }, () => {
      //completed function
      storage.ref('images').child(image.name).getDownloadURL().then(url => {
        setInputs(inputs => ({...inputs, imgUrl: url}))
      })
    })
  }
}


  return (
    <div>
        <h1>Signup</h1>
        
          {inputs.imgUrl !== '' && <>
          <br />
          <p>profile picture</p>
          <img height="100" src={inputs.imgUrl} alt='profile picture' />
          <br />
          </>
          }
        <form onSubmit={handleSubmit}>
          <input
          placeholder="name"
          name='name'
          value={inputs.name}
          onChange={handleChange}
        />
      <br />
          <input
            placeholder="email"
            name='email'
            value={inputs.email}
            onChange={handleChange}
          />
      <br />
          <input style={{marginLeft: 60}}
          type={hide && 'password'}
            placeholder="password"
            name='password'
            value={inputs.password}
            onChange={handleChange}
          />
        <button>submit</button>

      </form>
      <button style={{fontSize: 10, marginRight: 100, }} onClick={() => setHide(prev => (!prev))}>{hide ? "show" : 'hide'}</button>
      <br />

      {inputs.imgUrl === '' && 
      <form>
        <p>profile photo</p>
        <input type="file"  
        id='file' 
        name="file"
        placeholder="file"
        onChange={handleImageChange}
        />
        <br />
        <button onClick={handleImageUpload}>upload image</button>
        </form>
      } 
        {inputs.imgUrl !== '' && 'you sucessfully uploaded an image'}
        <br />
        <button onClick={()=> props.history.push('/login')}>go to Login</button>


      
     
    </div>
  );
};

export default withRouter(withAuth(Signup));