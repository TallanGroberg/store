import React, {useState,} from 'react';
import {withAuth, bearerAxios} from '../provider/AuthProvider'
import {storage} from '../firebase/index'


const EditUserForm = (props) => {
  const {name, email, imgUrl, _id } = props.user
    const [inputs, setInputs] = useState({ name: name,  email: email, _id: _id, password: '', imgUrl: ''})
    const [isEditingPic, setIsEditingPic] = useState(false)
    const [image, setImage] = useState('')


    const handleSubmit = (e) => {
    e.preventDefault()
      props.editUser(inputs, _id )
    }

  const handleChange = (e) => {
    const {name,value} = e.target
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
        storage.ref('images').child(image.name).getDownloadURL().then( async url => {
          await setInputs(inputs => ({...inputs, imgUrl: url}))
          alert('image upload complete be sure to include the password you want before you submit, changes may not be reflected until you sign back in')
        })
      })
    }
  }

  return (
    <>
      
      <h1>{name}</h1>
        <img height='100' src={imgUrl} />
          {isEditingPic && <form>
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
          <button onClick={() => setIsEditingPic(!isEditingPic)}>{isEditingPic ? 'hide' : 'edit profile picture'}</button>

        <h4>{email}</h4>
          <p>you can update your password</p>
            <form onSubmit={handleSubmit}>
              <input 
                placeholder='name'
                name='name'
                value={inputs.name}
                onChange={handleChange} />
              <input 
                placeholder='email'
                name='email'
                value={inputs.email}
                onChange={handleChange} />
              <input 
                placeholder='password'
                type="password"
                name='password'
                value={inputs.password}
                onChange={handleChange} />
                  <button>submit</button>
            </form>
    </>
  );
};

export default withAuth(EditUserForm);